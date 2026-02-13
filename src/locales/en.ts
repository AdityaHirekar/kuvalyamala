export const en = {
    hero: {
        title: "Kuvalayamālā",
        subtitle: "A Prince. A Crisis. An Awakening.",
        cta: "Begin the Journey",
        scroll: "Scroll to Explore",
    },
    context: {
        quote: "\"In a world of dry instruction, stories differ. They are the sugar-coating that makes the medicine of wisdom sweet.\"",
        author: "Uddyotana Sūri",
        timePeriod: "8th Century CE",
        language: "Prakrit",
        labels: {
            author: "Author",
            timePeriod: "Time Period",
            language: "Language",
        },
    },
    ui: {
        chapter: "Chapter",
        visual: "Visual",
        modernReflection: "Modern Reflection",
        locked: "Chapter Locked",
        lockedHint: "Reflect on the previous path to continue.",
    },
    footer: {
        title: "Kuvalaya-mālā",
        subtitle: "\"Stories are the bridge between the known and the unknown.\"",
        project: "An IKS Project by Aditya, Rakesh, Utsav and Piyush",
        source: "View Source",
        rights: "© 2026 Educational Purpose Only",
    },
    reflections: {
        title: "Your Journey's Mirror",
        subtitle: "\"The path you walked, and the thoughts you gathered along the way.\"",
        question: "Question",
        yourChoice: "Your Choice",
        yourNote: "Your Note",
        reset: "Reset My Reflections",
        resetConfirm: "Are you sure you want to clear your reflections? This cannot be undone.",
        sectionTitle: "Why This Story Matters",
        sectionSubtitle: "\"The questions of the 8th century are the questions of today. Tap a card to explore.\"",
        cards: [
            {
                question: "What does it mean to choose wisdom over power today?",
                answer: "It means valuing inner peace over external validation. In a world of endless 'likes', wisdom is the quiet confidence that needs no audience."
            },
            {
                question: "How do the journeys we take change who we become?",
                answer: "We don't just move through the world; the world moves through us. Every challenge chips away what isn't true, revealing the character underneath."
            },
            {
                question: "Can a story teach us better than a set of instructions?",
                answer: "Instructions inform the mind, but stories speak to the heart. We remember how we felt long after we forget what we were told."
            }
        ]
    },
    quiz: {
        title: "Test Your Knowledge",
        subtitle: "Take a quick quiz to verify your understanding.",
        question: "Question",
        completed: "Quiz Completed!",
        score: "You scored",
        outOf: "out of",
        tryAgain: "Try Again",
        questions: [
            {
                text: "Who is the author of Kuvalaya-mālā?",
                options: ["Haribhadra Suri", "Uddyotana Sūri", "Hemachandra", "Jinadasa"]
            },
            {
                text: "What is the central ethical concept explored in the text?",
                options: ["Ahimsa (Non-violence)", "Dana (Charity)", "Tapas (Austerity)", "Puja (Worship)"]
            },
            {
                text: "In which language was the text primarily written?",
                options: ["Sanskrit", "Pali", "Prakrit", "Apabhramsha"]
            },
            {
                text: "What is the literary form of Kuvalaya-mālā?",
                options: ["Epic Poem", "Prose only", "Drama", "Champū (Prose + Poetry)"]
            }
        ]
    },
    ask: {
        title: "Ask Prince Kuvalaya",
        subtitle: "\"I have walked the path from royalty to renunciation. Ask me of my journey, or the doubts that burden your own heart.\"",
        start: "Start Conversation",
        poweredBy: "Powered by AI • Responses for reflection only",
        persona: {
            name: "Prince Kuvalaya",
            role: "Reflective AI Persona"
        },
        placeholder: "Ask a question...",
        empty: "\"The silence is yours to break...\"",
        prompts: [
            "Why did the palace feel empty?",
            "What is the meaning of Vairagya?",
            "How does one practice compassion?",
            "Do you regret leaving your kingdom?"
        ]
    },
    values: {
        title: "The Values Woven into the Journey",
        mobileHint: "Tap a card to explore",
        items: [
            {
                title: "Vairāgya",
                subtitle: "Detachment",
                desc: "True detachment often begins not in poverty, but in comfort—when one realizes that even the finest gold cannot cure the soul's hunger."
            },
            {
                title: "Karunā",
                subtitle: "Compassion",
                desc: "Compassion is not innate; it is learned by walking in the dust of the world and seeing the suffering hidden behind every face."
            },
            {
                title: "Ahimsā",
                subtitle: "Non-Violence",
                desc: "Ahimsā is the brave choice of gentleness over harm, understanding that to hurt another is to wound one's own self."
            },
            {
                title: "Dharma",
                subtitle: "Duty & Ethics",
                desc: "Acting rightly is hardest when no one is watching. Dharma is the quiet inner compass that guides us through moral storms."
            },
            {
                title: "Jñāna",
                subtitle: "Wisdom",
                desc: "Wisdom is not memorized from varied scriptures, but distilled from the raw, lived experience of the journey itself."
            }
        ]
    },
    toggles: {
        reflectionOn: "Reflection Mode On",
        reflectionOff: "Try Reflection Mode",
        versesShow: "Show Verses",
        versesHide: "Hide Verses",
        mute: "Mute all audio",
        unmute: "Unmute all audio",
        lang: "Language"
    }
};

export type Dictionary = typeof en;
