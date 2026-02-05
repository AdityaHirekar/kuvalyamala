export interface VerseData {
    chapterId: number;
    fragment: string;
    fullVerse: string;
    meaning: string;
    source?: string;
}

export const verses: Record<number, VerseData> = {
    1: {
        chapterId: 1,
        fragment: "कुशाग्रजलविन्दुवत्",
        fullVerse: "जीवितं यौवनं लक्ष्मीलीवण्यं प्रियसंगमः ।\nसर्व चलाचलं लोके कुशाग्रजलविन्दुवत् ॥",
        meaning: "Life, youth, wealth, beauty, and the company of the beloved are fleeting — like a drop of water on the tip of grass.",
        source: "Kuvalayamālā"
    },
    2: {
        chapterId: 2,
        fragment: "कर्मणा राज्यं हार्यते",
        fullVerse: "अयेते कर्मणा राज्यं हार्यते ऽपि च कर्मणा।\nविद्वान् विना न को ऽप्यस्ति कर्मणो हन्ति मर्म यः ॥ ५",
        meaning: "By one’s actions, a kingdom is gained; by one’s actions, it is also lost. True wisdom lies in understanding the power of action.",
        source: "Kuvalayamālā, Verse 5"
    },
    3: {
        chapterId: 3,
        fragment: "कृपासंपूरितस्वान्तः",
        fullVerse: "कृपासंपूरितस्वान्तः स तयोरन्तरा स्थितः ।\nयतः प्राणिपरित्राणं स्वप्राणैः के ऽपि कुर्वते ॥",
        meaning: "With a heart full of compassion, one stands between harm and the helpless; some protect living beings even at the cost of their own lives.",
        source: "Kuvalayamālā"
    },
    4: {
        chapterId: 4,
        fragment: "विनयः शासने मूलं",
        fullVerse: "विनयः शासने मूलं विनीतः संयतो भवेत् ।\nविनयाद्विप्रमुक्तस्य कुतो धर्मः कुतस्तपः ॥",
        meaning: "Humility is the root of discipline; without humility, there can be neither righteousness nor self-restraint.",
        source: "Kuvalayamālā"
    },
    5: {
        chapterId: 5,
        fragment: "आत्मैव ह्यात्मनो बन्धुः",
        fullVerse: "आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ।\nउद्धरेदात्मनात्मानं नात्मानमवसादयेत् ॥",
        meaning: "The self is indeed the friend of the self, and the self is also the enemy of the self. One should elevate oneself by one's own self, not degrade oneself.",
        source: "Classical Verse (Theme: Self-Conquest)"
    }
};
