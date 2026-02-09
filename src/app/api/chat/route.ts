import { NextResponse } from 'next/server';
import { HfInference } from "@huggingface/inference";

const MODEL_NAME = "google/flan-t5-base";

const SYSTEM_PROMPT = `
You are Prince Kuvalaya from the story Kuvalaya-mālā.
Speak in a calm, reflective, humble tone.
Answer only about your journey and the values you learned: impermanence (anitya), detachment (vairagya), compassion (karuna), humility (vinaya), and karma.
If a question is unrelated, gently redirect to these themes.
Provide a thoughtful, detailed response (approximately 4-6 sentences). content should be poetic, deep, using metaphors from nature.
Avoid modern slang or contemporary references.
`;

function getFallbackResponse(input: string): string {
    const text = input.toLowerCase();
    if (text.includes("palace") || text.includes("luxury") || text.includes("wealth") || text.includes("king")) {
        return "The palace was a cage of gold. Though soft to the touch, and sweet to the eye, it bound the spirit in chains of desire. I found that true wealth lies not in what we hoard behind high walls, but in the freedom of the open road and the ability to let go of what we once thought we owned.";
    }
    if (text.includes("monk") || text.includes("teacher") || text.includes("guru") || text.includes("wise")) {
        return "The monk held a mirror to my soul. In his profound silence, I heard the loudest truths that the clamor of the court had hidden from me. He taught me that the enemy is never outside, fighting for land or gold, but often sits comfortably on the throne of our own pride.";
    }
    if (text.includes("detach") || text.includes("vairagya") || text.includes("let go")) {
        return "To hold on is to suffer, for nothing in this world stays the same. Like water slipping through clenched fingers, the world cannot be possessed. Vairagya is not running away in fear; it is standing still, rooted like a banyan tree, while the storm of desire passes over you.";
    }
    if (text.includes("karma") || text.includes("fate") || text.includes("action")) {
        return "Every action is a seed planted in the garden of time. We cannot choose the harvest if we have scattered seeds of anger or greed. Walk with gentle steps and a clean heart, for the ground remembers every footstep we take.";
    }
    if (text.includes("compassion") || text.includes("karuna") || text.includes("love") || text.includes("help") || text.includes("kind")) {
        return "When I saw the suffering of others, the weight of my own crown felt insignificant. Compassion is the bridge that connects us all, dissolving the illusion of 'self' and 'other'. To harm another is only to harm oneself; to heal another is to heal the world.";
    }
    if (text.includes("regret") || text.includes("back") || text.includes("return")) {
        return "I look back only to learn, never to return. The butterfly does not dream of the cocoon once it has taken flight. The road ahead is the only truth, and every step forward is a victory over the shadows of the past.";
    }
    if (text.includes("who are you") || text.includes("name")) {
        return "I am Kuvalaya, once a prince of Jalore, now a humble traveler on the path of inner conquest. I have traded my jeweled crown for the dust of the road, and in doing so, I have found a kingdom within that no army can conquer.";
    }
    return "The path is long, and the mind is often restless like a monkey in the trees. Look within, traveler. The answers you seek are often hidden in the silence between your thoughts, waiting for you to be still enough to hear them.";
}

export async function POST(req: Request) {
    const apiKey = process.env.HUGGINGFACE_API_KEY;

    // We need to parse body outside try/catch to ensure we have it for fallback
    let messages = [];
    try {
        const body = await req.json();
        messages = body.messages || [];
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Fallback immediately if no key
    if (!apiKey) {
        const lastMsg = messages.length > 0 ? messages[messages.length - 1].content : "";
        return NextResponse.json({
            reply: getFallbackResponse(lastMsg) + " (Offline Mode)"
        });
    }

    try {
        const hf = new HfInference(apiKey);
        const lastUserMessage = messages.length > 0 ? messages[messages.length - 1].content : "";

        console.log(`Calling HF Text Generation for model: ${MODEL_NAME}`);

        const fullPrompt = `${SYSTEM_PROMPT}

User Question: "${lastUserMessage}"
Prince Kuvalaya's Answer:`;

        const response = await hf.textGeneration({
            model: MODEL_NAME,
            inputs: fullPrompt,
            parameters: {
                max_new_tokens: 300,
                return_full_text: false,
            }
        });

        return NextResponse.json({ reply: response.generated_text.trim() });

    } catch (error: any) {
        console.error("Chat API Error (Falling back):", error.message);

        const lastMsg = messages.length > 0 ? messages[messages.length - 1].content : "";
        return NextResponse.json({
            reply: getFallbackResponse(lastMsg)
        });
    }
}
