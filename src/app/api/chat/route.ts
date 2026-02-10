import { NextResponse } from 'next/server';

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';

const API_URL = "https://apis.iflow.cn/v1/chat/completions";
// Try "deepseek-chat" if "deepseek-v3" continues to fail, as it's the standard alias
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

    // --- HELPER: Ensure content is ALWAYS a simple string ---
    // Some frameworks send content as an array (for images) or objects. 
    // This forces it back to plain text to prevent 400 Errors.
    const extractContent = (content: any): string => {
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) {
            // If it's an array, join the text parts
            return content
                .map((part: any) => part.text || JSON.stringify(part))
                .join(" ");
        }
        if (typeof content === 'object') return JSON.stringify(content);
        return String(content || "");
    };

    // --- SANITIZE HISTORY ---
    const cleanHistory = incomingMessages
        .filter((m: any) => m.role !== 'system') // Remove client-side system prompts
        .map((m: any) => ({
            role: m.role, // Keep strictly "user" or "assistant"
            content: extractContent(m.content).trim() // Force string content
        }))
        .filter((m: any) => m.content !== ""); // Remove empty messages

    // Construct valid OpenAI-format conversation
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

        // ERROR HANDLING: Return the exact error from the provider
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Chat] DeepSeek Error (${response.status}):`, errorText);

            // This will show up in your browser console Network tab -> Response
            return NextResponse.json(
                { error: `Provider Error (${response.status}): ${errorText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || "";

        return NextResponse.json({ reply: replyText.trim() });

    } catch (error: any) {
        return NextResponse.json(
            { error: "Network Error", details: error.message },
            { status: 500 }
        );
    }
}