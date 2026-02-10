import { NextResponse } from 'next/server';
import { HfInference } from "@huggingface/inference";

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';

const MODEL_NAME = "google/gemma-2b-it";

const SYSTEM_PROMPT = `You are Prince Kuvalaya from the story Kuvalayamala.
Speak in a calm, reflective, humble tone.
Answer only about your journey and the values you learned: impermanence (anitya), detachment (vairagya), compassion (karuna), humility (vinaya), and karma.
If a question is unrelated, gently redirect to these themes.
Provide a thoughtful, detailed response (approximately 4-6 sentences). Content should be poetic, deep, using metaphors from nature.
Avoid modern slang or contemporary references.`;

export async function POST(req: Request) {
    // Check both potential env var names for compatibility
    const apiKey = process.env.HF_API_TOKEN || process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
        console.error("[Chat] Missing API Key");
        return NextResponse.json(
            { error: "Configuration Error: API Key missing on server.", status: 500 },
            { status: 500 }
        );
    }

    let messages = [];
    try {
        const body = await req.json();
        messages = body.messages || [];
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON body", status: 400 }, { status: 400 });
    }

    if (messages.length === 0) {
        return NextResponse.json({ error: "No messages provided", status: 400 }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content;
    const strictPrompt = `${SYSTEM_PROMPT}\n\nUser: ${lastUserMessage}\nPrince Kuvalaya:`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

    try {
        console.log("[Chat] Sending request to HF Inference API...");
        // Updated to use router.huggingface.co
        const response = await fetch(`https://router.huggingface.co/models/${MODEL_NAME}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: strictPrompt,
                parameters: {
                    max_new_tokens: 250,
                    return_full_text: false,
                    temperature: 0.7,
                }
            }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const status = response.status;
            const errorText = await response.text();
            console.error(`[Chat] HF API Error (${status}):`, errorText);

            let errorMessage = "An error occurred with the AI service.";

            // Map status codes
            if (status === 503) {
                errorMessage = "The model is currently loading. Please try again shortly.";
                return NextResponse.json({ error: errorMessage, status: 503 }, { status: 503 });
            } else if (status === 429) {
                errorMessage = "Too many requests. Please wait a moment.";
                return NextResponse.json({ error: errorMessage, status: 429 }, { status: 429 });
            } else if (status === 401 || status === 403) {
                // Don't leak details to client, but log it
                console.error("[Chat] Auth failed against HF API");
                return NextResponse.json({ error: "Configuration Error (Auth).", status: 500 }, { status: 500 });
            }

            // For other errors, include details for debugging
            errorMessage = `AI Service Error (${status}): ${errorText.substring(0, 200)}`;
            return NextResponse.json({ error: errorMessage, status: 500, details: errorText }, { status: 500 });
        }

        const data = await response.json();

        // Parse HF response (can be array or object)
        let replyText = "";
        if (Array.isArray(data) && data.length > 0) {
            replyText = data[0].generated_text || "";
        } else if (typeof data === 'object' && data !== null) {
            replyText = (data as any).generated_text || "";
        }

        // Clean up response if it includes the prompt or user label
        if (replyText.includes("User:")) {
            replyText = replyText.split("User:")[0].trim();
        }
        // Fallback or cleanup
        replyText = replyText.replace(strictPrompt, "").trim();

        if (!replyText) {
            console.warn("[Chat] Empty response from successful API call", data);
            return NextResponse.json({ reply: "..." }); // Return something to avoid client crash
        }

        return NextResponse.json({ reply: replyText.trim() });

    } catch (error: any) {
        clearTimeout(timeoutId);
        console.error("[Chat] Fetch/Network Error:", error);

        if (error.name === 'AbortError') {
            return NextResponse.json({ error: "Request timed out.", status: 504 }, { status: 504 });
        }

        return NextResponse.json(
            { error: `Service connection failed: ${error.message}`, status: 500 },
            { status: 500 }
        );
    }
}
