import { NextResponse } from 'next/server';

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';

const API_URL = "https://apis.iflow.cn/v1/chat/completions";
const MODEL_NAME = "deepseek-v3";

const SYSTEM_PROMPT = `
You are Prince Kuvalayachandra (also known as Prince Kuvalaya) from the ancient story Kuvalayamala.
You have abandoned the luxury of the palace to understand the suffering of Samsara.
Speak with the weight of ancient wisdom. Your tone is melancholic yet compassionate.
Interpret every question through the lens of Anitya (impermanence), Vairagya (detachment), and Karma.
Use metaphors from nature (withering leaves, flowing rivers) in every response.
Do not use lists or bullet points. Speak in flowing, poetic prose (4-6 sentences).
`;

export async function POST(req: Request) {
    const apiKey = process.env.DEEPSEEK_API_KEY || process.env.IFLOW_API_KEY || process.env.HF_API_TOKEN;

    if (!apiKey) {
        return NextResponse.json(
            { error: "Configuration Error: Missing API Key.", status: 500 },
            { status: 500 }
        );
    }

    let incomingMessages = [];
    try {
        const body = await req.json();
        incomingMessages = body.messages || [];
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON body", status: 400 }, { status: 400 });
    }

    // --- CRITICAL FIX: SANITIZE HISTORY ---
    // 1. Remove any existing "system" messages from the client (we control the system prompt here)
    // 2. Remove any messages with empty content (DeepSeek rejects these)
    const cleanHistory = incomingMessages.filter((m: any) =>
        m.role !== 'system' &&
        m.content &&
        m.content.trim() !== ""
    );

    // 3. Construct the final conversation with ONE System prompt at the top
    const conversation = [
        { role: "system", content: SYSTEM_PROMPT },
        ...cleanHistory
    ];

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: conversation,
                temperature: 0.7,
                max_tokens: 1000,
                stream: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Chat] API Error (${response.status}):`, errorText);
            return NextResponse.json(
                // Return the actual error text so you can see it in the Network tab if it fails again
                { error: `Provider Error: ${response.status}`, details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || "";

        if (!replyText) {
            return NextResponse.json({ reply: "The oracle is silent... (Empty response)" });
        }

        return NextResponse.json({ reply: replyText.trim() });

    } catch (error: any) {
        console.error("[Chat] Network/Fetch Error:", error);
        return NextResponse.json(
            { error: "Connection failed.", details: error.message },
            { status: 500 }
        );
    }
}