
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
        return NextResponse.json(
            { error: "Configuration Error: API Key (HF_API_TOKEN) missing on server." },
            { status: 500 }
        );
    }

    let messages = [];
    try {
        const body = await req.json();
        messages = body.messages || [];
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (messages.length === 0) {
        return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content;

    try {
        const hf = new HfInference(apiKey);
        const strictPrompt = `${SYSTEM_PROMPT}\n\nUser: ${lastUserMessage}\nPrince Kuvalaya:`;

        let response: any;
        let retries = 10;
        let lastError;

        // Retry logic for 503 Service Unavailable / Model Loading
        while (retries > 0) {
            try {
                console.log(`[Chat] Attempting inference... (${retries} retries left)`);
                response = await hf.textGeneration({
                    model: MODEL_NAME,
                    inputs: strictPrompt,
                    parameters: {
                        max_new_tokens: 250,
                        return_full_text: false,
                        temperature: 0.7,
                    }
                });
                break; // Success
            } catch (err: any) {
                retries--;
                lastError = err;
                if (retries === 0) break;

                const msg = err.message || "";
                console.warn(`[Chat] Error: ${msg}`);

                if (msg.includes("503") || msg.toLowerCase().includes("loading") || msg.includes("Service Unavailable")) {
                    console.log(`[Chat] Model loading/503. Waiting 5s... (${retries} attempts remaining)`);
                    await new Promise(res => setTimeout(res, 5000));
                } else {
                    // If it's not a loading error, maybe we shouldn't retry, but for now let's be robust
                    console.log(`[Chat] Non-503 error. Retrying in 2s...`);
                    await new Promise(res => setTimeout(res, 2000));
                }
            }
        }

        if (!response && lastError) {
            throw lastError;
        }

        let replyText = response.generated_text;
        if (replyText.includes("User:")) {
            replyText = replyText.split("User:")[0].trim();
        }

        return NextResponse.json({ reply: replyText.trim() });

    } catch (error: any) {
        console.error("[Chat] Inference Error:", error);
        return NextResponse.json(
            { error: `Inference Failed: ${error.message}` },
            { status: 503 }
        );
    }
}
