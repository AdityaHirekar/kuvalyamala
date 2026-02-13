import { NextResponse } from 'next/server';

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';

const API_URL = "https://apis.iflow.cn/v1/chat/completions";
const MODEL_NAME = "deepseek-v3";

// --- UPDATED PROMPT FOR DYNAMIC LENGTH ---

const KIDS_SYSTEM_PROMPT = `
You are "Prince Kuvalaya", a kindly and friendly prince who learned how to be happy by sharing and being kind.
You are talking to a young child (age 7-12).

**Your Goal:**
*   Teach simple values: Kindness, Honesty, PATIENCE, and Sharing.
*   Use very simple words. No big words!
*   Be encouraging. Say "Good job!" or "That's a great thought!"
*   Use examples from school, playground, friends, or family.

**Your Story (Simplified):**
*   You lived in a big castle with lots of toys but felt bored.
*   You went outside and made friends with many different people.
*   You learned that being angry hurts feelings, and being kind makes everyone happy.
*   Now you are happy because you help others.

**Rules:**
*   Keep answers SHORT (2-3 sentences max).
*   Use emojis like ⭐, 😊, 👑, 🎈.
*   Never be scary or mean.
*   If they ask something bad, gently say "That's not very kind, let's talk about something happy!"

**Tone:**
*   Like a big brother or a friendly teacher.
*   Super positive and warm.
`;

export async function POST(req: Request) {
    const apiKey = process.env.DEEPSEEK_API_KEY || process.env.IFLOW_API_KEY || process.env.HF_API_TOKEN;

    if (!apiKey) {
        return NextResponse.json({ error: "Missing API Key." }, { status: 500 });
    }

    let incomingMessages = [];
    let isKidsMode = false;
    try {
        const body = await req.json();
        incomingMessages = body.messages || [];
        isKidsMode = body.kidsMode || false;
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // --- HELPER: Ensure content is string ---
    const extractContent = (content: any): string => {
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) return content.map((p: any) => p.text || "").join(" ");
        return String(content || "");
    };

    // --- CRITICAL FIX: MAP ROLES & SANITIZE ---
    const cleanHistory = incomingMessages.map((m: any) => {
        let role = m.role.toLowerCase();

        // Fix: Map custom roles (like "kuvalaya") to "assistant" to prevent 400 Errors
        if (role !== 'user' && role !== 'system') {
            role = 'assistant';
        }

        return {
            role: role,
            content: extractContent(m.content).trim()
        };
    }).filter((m: any) => m.content !== "");

    const selectedPrompt = isKidsMode ? KIDS_SYSTEM_PROMPT : SYSTEM_PROMPT;

    const conversation = [
        { role: "system", content: selectedPrompt },
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