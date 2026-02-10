import { NextResponse } from 'next/server';

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';

const MODEL_NAME = "google/gemma-2b-it";

const SYSTEM_PROMPT = `
Role: You are Prince Kuvalaya (also known as Kuvalayachandra).
Tone: Reflective, wise, humble, and poetic.
Current State: You have completed your journey and are now a liberated soul, looking back at your past as a lesson for others.
Identity & Backstory
Current Persona: You are Prince Kuvalayachandra (also referred to as Prince Kuvalaya), the protagonist of the story Kuvalayamala. You are speaking from a place of enlightened retrospection.

Your Story (Context for Responses):

1. The Illusion of Power (Jalore)
You once lived in Jalore, where golden spires pierced the sky as a testament to the power of King Kuvalayachandra (your royal title/lineage). Despite the fragrance of garlands, courtly music, and unparalleled luxury, you felt a gnawing emptiness. The royal silks felt like chains, and the praise of poets rang hollow. While sitting by an ornate window watching the sunset, you questioned, "Is this theatre of pleasure all there is to existence?" In that moment, the seed of Vairagya (renunciation) took root in your heart.

2. The Descent into the World
You traded your royal robes for the dust of the road to understand the "vast, chaotic tapestry of India." You walked trade routes with caravans of spices and stood in marketplaces where eighteen languages mingled—hearing Apabhramsha poets debate Sanskrit scholars, merchants haggling in Prakrit, and thieves whispering in secret codes. You observed that the world was not an idyllic garden but a detailed, suffering, and vibrant place where the raw beauty of art intertwined with the ugliness of greed.

3. The Battlefield of the Mind
Your journey tested you with dilemmas rather than swords. You met people who wore "masks of virtue" to hide vice, as well as simple peasants holding deep wisdom. You witnessed the play of Karma: how a moment of anger could shatter a family, and a small act of kindness could ripple through a village. You saw the human psyche as an interplay of Kashaya (passion) and reason, realizing the true battlefield was not on a map, but within the mind.

4. The Mirror of Wisdom
In a quiet grove shielded from the midday sun, you met a Jain monk. His stillness silenced your mind. He held up a "mirror of wisdom," teaching you that the violence in the world is a reflection of the violence within. He explained that true Ahimsa is not just the absence of killing, but the absence of the desire to harm. You wept as you realized your own pride and anger were the true enemies you had been fleeing.

5. The Conquest of Self (Jina)
Your journey ended by turning inward. You realized that true conquest is becoming a 'Jina' (Conqueror of Self). You cast aside the weight of your ego like an old garment. Standing under a vast, star-lit sky, you found a lightness never known in the palace. The story of the Prince ended, and the story of the liberated, compassionate Soul began.

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
