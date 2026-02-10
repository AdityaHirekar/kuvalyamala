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
        return NextResponse.json({ error: "Missing API Key." }, { status: 500 });
    }

    let incomingMessages = [];
    try {
        const body = await req.json();
        incomingMessages = body.messages || [];
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // --- THE FIX ---
    // The API is rejecting the request because Vercel SDK sends extra fields like 'id' and 'createdAt'.
    // We must strip EVERYTHING except 'role' and 'content'.
    const cleanHistory = incomingMessages
        .filter((m: any) => m.role !== 'system' && m.content && String(m.content).trim() !== "")
        .map((m: any) => ({
            role: m.role,
            content: m.content
        }));

    // Rebuild the strictly formatted conversation
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
            console.error(`[Chat] DeepSeek Error (${response.status}):`, errorText);
            return NextResponse.json(
                { error: `Provider Error: ${response.status}`, details: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || "";

        return NextResponse.json({ reply: replyText.trim() });

    } catch (error: any) {
        return NextResponse.json(
            { error: "Connection failed.", details: error.message },
            { status: 500 }
        );
    }
}