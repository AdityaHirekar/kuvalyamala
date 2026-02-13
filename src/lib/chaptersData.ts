import { Language } from "./LanguageContext";
import { verses } from "./verses";

export interface Theme {
    label: string;
    desc: string;
    modern: string;
}

export interface ReflectionOption {
    text: string;
    type: "deep" | "shallow";
    traits: string[];
}

export interface Chapter {
    id: number;
    title: string;
    narrative: string;
    audio: string;
    image: string;
    themes: Theme[];
    reflection: {
        title: string;
        question: string;
        options: ReflectionOption[];
        feedback: { deep: string; shallow: string };
    };
    bg: string;
    align: string;
}

// English Data
const chaptersEn: Chapter[] = [
    {
        id: 1,
        title: "The Palace & The Restless Heart",
        narrative: `The golden spires of Jalore pierced the sky, a testament to King Kuvalayachandra's power. Yet, amidst the fragrant garlands and courtly music, Prince Kuvalaya felt a gnawing emptiness. The silks that draped him felt like chains; the praise of poets sounded like hollow echoes. Sitting by the ornate window, watching the sun set over his kingdom, a profound question took root in his heart: "Is this theatre of pleasure all there is to existence?" It was here, in the lap of unparalleled luxury, that the first seed of renunciation—Vairagya—was quietly sown.`,
        audio: "/audio/chapter-1.mp3",
        image: "/images/chapter-1-v2.png",
        themes: [
            {
                label: "Vairagya (Detachment)",
                desc: "The realization that worldly pleasures are fleeting and do not offer lasting happiness.",
                modern: "In a consumerist world, Vairagya invites us to find joy in simplicity and inner contentment rather than accumulation."
            }
        ],
        reflection: {
            title: "Impermanence / Vairāgya",
            question: "When do you feel most empty, even when things seem 'good'?",
            options: [
                { text: "When I have everything I wanted but still feel bored.", type: "shallow", traits: ["Awareness"] },
                { text: "When I realize that nothing I have will last forever.", type: "deep", traits: ["Detachment", "Awareness"] },
                { text: "When others don't appreciate my success.", type: "shallow", traits: ["Ego"] },
                { text: "When I see that my comfort requires others' labor.", type: "deep", traits: ["Compassion", "Awareness"] }
            ],
            feedback: {
                deep: "You've touched the root of Vairagya—seeing beyond the surface comfort to the transient nature of reality.",
                shallow: "It's natural to feel that way. Kuvalaya felt it too—that the external world often fails to satisfy the internal spirit."
            }
        },
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 2,
        title: "The Road & The Many Worlds",
        narrative: `Trading his royal robes for the dust of the road, Kuvalaya stepped into the vast, chaotic tapestry of India. He walked the great trade routes where caravans carried spices and stories. He stood in bustling marketplaces where eighteen languages mingled in the air—Apabhramsha poets debating with Sanskrit scholars, merchants haggling in Prakrit, thieves whispering in secret codes. He saw the raw beauty of art intertwined with the ugliness of greed. The world was not the idyllic garden of the palace; it was detailed, suffering, vibrant, and utterly human.`,
        audio: "/audio/chapter-2.mp3",
        image: "/images/chapter-2.png",
        themes: [
            {
                label: "Society & Culture",
                desc: "The text vividly documents 8th-century Indian society, capturing the diversity of languages, trades, and customs.",
                modern: "Recognizing our shared history of diversity helps foster tolerance and cultural appreciation today."
            }
        ],
        reflection: {
            title: "Karma / Choice",
            question: "When you meet someone different from you, what is your first instinct?",
            options: [
                { text: "To judge them based on how they look.", type: "shallow", traits: ["Ego"] },
                { text: "To wonder what their life experience has been like.", type: "deep", traits: ["Compassion", "Awareness"] },
                { text: "To avoid them if possible.", type: "shallow", traits: ["Control"] },
                { text: "To see myself in them.", type: "deep", traits: ["Compassion"] }
            ],
            feedback: {
                deep: "This empathy is the bridge between worlds. Kuvalaya learned that every stranger holds a mirror to our own humanity.",
                shallow: "We often protect ourselves with judgment. The Prince had to unlearn his royal prejudices to truly see the world."
            }
        },
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 3,
        title: "Encounters & Trials",
        narrative: `The journey tested him not with swords, but with dilemmas. He met characters who wore masks of virtue to hide hearts of vice, and simple peasants who held deep wisdom. He witnessed the play of Karma in the lives of the people—how a moment of anger shattered a family, how a small act of kindness rippled through a village. Every face he met was a mirror, revealing the complexities of the human psyche—the interplay of passion (Kashaya) and reason. He realized that the true battlefield was not on a map, but within the mind.`,
        audio: "/audio/chapter-3.mp3",
        image: "/images/chapter-3.png",
        themes: [
            {
                label: "Karma (Action)",
                desc: "The law of cause and effect, where every intent and action shapes one's future and character.",
                modern: "Understanding that our choices have consequences empowers us to act with responsibility and foresight."
            }
        ],
        reflection: {
            title: "Compassion / Karuṇā",
            question: "What makes it hardest to be kind?",
            options: [
                { text: "When I have everything I wanted but still feel bored.", type: "shallow", traits: ["Control"] },
                { text: "When I feel the other person doesn't deserve it.", type: "deep", traits: ["Ego", "Awareness"] },
                { text: "When no one is watching.", type: "shallow", traits: ["Ego"] },
                { text: "When kindness requires me to give up something I value.", type: "deep", traits: ["Compassion", "Detachment"] }
            ],
            feedback: {
                deep: "True compassion challenges our ego. Kuvalaya found that kindness is most powerful when it is most difficult.",
                shallow: "Fatigue and stress are real barriers. Yet, the story suggests that kindness itself can be a source of strength."
            }
        },
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 4,
        title: "The Monk & The Mirror",
        narrative: `In a quiet grove, shielded from the midday sun, he encountered a Jain monk whose stillness silenced the noise of the prince's mind. The monk did not preach; he simply held up a mirror of wisdom. "The violence you see in the world," the monk spoke softly, "is but a reflection of the violence within." He explained that true Ahimsa is not just the absence of killing, but the absence of the desire to harm. The Prince wept, realizing his own pride and anger were the true enemies he had been fleeing all along.`,
        audio: "/audio/chapter-4.mp3",
        image: "/images/chapter-4.png",
        themes: [
            {
                label: "Ahimsa (Non-Violence)",
                desc: "True non-violence begins in the mind. Aggressive thoughts lead to aggressive actions.",
                modern: "Addressing internal biases and anger is the first step towards creating a peaceful society."
            }
        ],
        reflection: {
            title: "Humility / Vinaya",
            question: "When someone points out your mistake, what is your immediate internal reaction?",
            options: [
                { text: "To defend myself and explain why I did it.", type: "shallow", traits: ["Ego", "Control"] },
                { text: "To feel shame and hide.", type: "shallow", traits: ["Ego"] },
                { text: "To observe the defensiveness without acting on it.", type: "deep", traits: ["Awareness", "Detachment"] },
                { text: "To allow the truth of it to change me.", type: "deep", traits: ["Awareness", "Compassion"] }
            ],
            feedback: {
                deep: "This openness is the essence of Vinaya (Humility). It transforms a mistake into a step towards liberation.",
                shallow: "Defense is the ego's shield. The monk taught Kuvalaya that dropping the shield is the only way to truly grow."
            }
        },
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 5,
        title: "The Inner Turn",
        narrative: `The journey ended where it truly began—within. Kuvalaya understood that true conquest was not of kingdoms, or even of the external world, but of the self—becoming a 'Jina' (Conqueror of Self). He cast aside the weight of his ego like an old garment. Standing under the vast, star-lit sky, he found a lightness he had never known in the palace. The story of the Prince ended, but the story of the Soul—liberated, compassionate, and awake—had just begun.`,
        audio: "/audio/chapter-5.mp3",
        image: "/images/chapter-5.png",
        themes: [
            {
                label: "Dharma (Duty/Ethics)",
                desc: "Dharma is the universal law of moral order that sustains life and leads to spiritual liberation.",
                modern: "Living with integrity and purpose (Dharma) provides a compass in navigating life's complexities."
            }
        ],
        reflection: {
            title: "Integration / Dharma in action",
            question: "What does 'conquering yourself' mean to you now?",
            options: [
                { text: "Being disciplined and strict.", type: "shallow", traits: ["Control"] },
                { text: "Understanding my own mind so it doesn't control me.", type: "deep", traits: ["Awareness", "Control"] },
                { text: "Being better than others.", type: "shallow", traits: ["Ego"] },
                { text: "Finding peace regardless of external circumstances.", type: "deep", traits: ["Detachment", "Awareness"] }
            ],
            feedback: {
                deep: "A profound realization. Like the Jina, you see that true victory is internal freedom.",
                shallow: "Discipline is a tool, but not the goal. The ultimate victory, as Kuvalaya found, is the peace that comes from understanding."
            }
        },
        bg: "bg-paper",
        align: "left"
    }
];

export const getChapters = (lang: Language): Chapter[] => {
    // For now, return English for all languages. 
    // In future, this can switch based on 'lang'.
    // Placeholder logic:
    if (lang === 'en') return chaptersEn;

    // TODO: Create full translations for other languages.
    // Returning English as fallback for now to prevent breaking.
    return chaptersEn;
};
