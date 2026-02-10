import { NextResponse } from 'next/server';

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
    const apiKey = process.env.IFLOW_API_KEY;

    if (!apiKey) {
        console.error("[Chat] Missing IFLOW_API_KEY");
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

    // Construct messages array for chat completion
    const chatMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages // Include previous context
    ];

    try {
        console.log("[Chat] Sending request to iFlow API...");

        const response = await fetch("https://apis.iflow.cn/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: chatMessages,
                max_tokens: 250,
                temperature: 0.7
            }),
        });

        if (!response.ok) {
            const status = response.status;
            const errorText = await response.text();
            console.error(`[Chat] iFlow API Error (${status}):`, errorText);

            let errorMessage = "AI service temporarily unavailable.";
            if (status === 401 || status === 403) {
                errorMessage = "Service configuration issue.";
            } else if (status === 429) {
                errorMessage = "Too many requests, please wait.";
            }

            return NextResponse.json({ error: errorMessage, status: status, details: errorText }, { status: status });
        }

        const data = await response.json();
        // Chat completion response structure: choices[0].message.content
        const replyText = data.choices?.[0]?.message?.content || "";

        return NextResponse.json({ reply: replyText.trim() });

    } catch (error: any) {
        console.error("[Chat] iFlow Network Error:", error);
        return NextResponse.json(
            { error: "AI service temporarily unavailable.", status: 500 },
            { status: 500 }
        );
    }
}
