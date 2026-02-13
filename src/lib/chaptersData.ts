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

export interface KidsChapter {
    id: number;
    title: string;
    narrative: string[]; // Changed to array for paragraphs
    image: string;
    // Simplified reflection for kids
    reflection: {
        question: string;
        options: { text: string; feedback: string; isGood: boolean; tag: string; icon: string }[];
    };
    bg: string;
    badge: string; // Icon name or label for the badge they earn
}

export const kidsChapters: KidsChapter[] = [
    {
        id: 1,
        title: "The Sad Prince",
        narrative: [
            "Once upon a time, there was a Prince named Kuvalaya. He lived in a huge, shiny palace with gold towers and yummy food.",
            "He had everything a kid could want—toys, games, and comfy beds. But he felt bored and sad.",
            "He looked out the window and thought, 'Is having stuff all that matters?' He wanted something more than just toys. He wanted to be truly happy inside."
        ],
        image: "/images/chapter-1-v2.png",
        reflection: {
            question: "Have you ever felt bored even with all your toys?",
            options: [
                { text: "Yes, I want to do something new!", feedback: "That's how the Prince felt! Exploring is fun.", isGood: true, tag: "Curious", icon: "Sparkles" },
                { text: "No, I love my toys!", feedback: "Toys are great! But sometimes our hearts want to share or help others too.", isGood: false, tag: "Grateful", icon: "Gift" }
            ]
        },
        bg: "bg-yellow-50",
        badge: "Seeker Star"
    },
    {
        id: 2,
        title: "The Busy World",
        narrative: [
            "The Prince took off his fancy crown and walked outside. Wow! The world was SO big. He saw busy markets with people speaking many different languages—like a giant school playground!",
            "Some people were happy, but some were sad or hungry. He realized the world wasn't perfect like his palace. It was messy, but also beautiful."
        ],
        image: "/images/chapter-2.png",
        reflection: {
            question: "When you see someone new at school, what do you do?",
            options: [
                { text: "I walk away.", feedback: "It can be scary to say hi. The Prince was a bit scared too!", isGood: false, tag: "Shy", icon: "Ghost" },
                { text: "I smile and say hello!", feedback: "You are kind! The Prince learned that meeting new people is special.", isGood: true, tag: "Friendly", icon: "Smile" }
            ]
        },
        bg: "bg-orange-50",
        badge: "Friendship Heart"
    },
    {
        id: 3,
        title: "Making Good Choices",
        narrative: [
            "Kuvalaya met many people on his walk. He saw that when people were angry, they made others sad. But when they were kind, they made others happy!",
            "It was like magic. He realized that being kind or angry is a choice we make in our heads. He wanted to be the master of his own choices."
        ],
        image: "/images/chapter-3.png",
        reflection: {
            question: "If your friend accidentally breaks your toy, what is the kind choice?",
            options: [
                { text: "Yell at them!", feedback: "That might make them sad. Accidents happen!", isGood: false, tag: "Angry", icon: "Frown" },
                { text: "Say 'It's okay' and help fix it.", feedback: "Wow! You are a superhero of kindness!", isGood: true, tag: "Helping", icon: "HeartHandshake" }
            ]
        },
        bg: "bg-blue-50",
        badge: "Kindness Shield"
    },
    {
        id: 4,
        title: "The Teacher's Secret",
        narrative: [
            "He met a wise teacher sitting under a tree. The teacher was very quiet and peaceful.",
            "He told the Prince, 'The world is like a mirror. If you smile at it, it smiles back. If you frown, it frowns.'",
            "He explained that if we stop angry thoughts, we stop angry actions."
        ],
        image: "/images/chapter-4.png",
        reflection: {
            question: "What do you do when you feel angry?",
            options: [
                { text: "I take a deep breath.", feedback: "Perfect! Breathing helps us calm down like the wise teacher.", isGood: true, tag: "Calm", icon: "Wind" },
                { text: "I hit something.", feedback: "Oh no! Hitting hurts. Next time, try counting to 10!", isGood: false, tag: "Angry", icon: "Hammer" }
            ]
        },
        bg: "bg-green-50",
        badge: "Peace Dove"
    },
    {
        id: 5,
        title: "The Happy Hero",
        narrative: [
            "Finally, the Prince closed his eyes and looked inside his own heart. He let go of being 'The Prince' and just became 'Kuvalaya'.",
            "He felt light as a feather! He didn't need a crown to be special. He was happy just being himself and helping others.",
            "He became a real hero—not by fighting, but by loving."
        ],
        image: "/images/chapter-5.png",
        reflection: {
            question: "What makes you a real hero?",
            options: [
                { text: "Being stronger than everyone.", feedback: "Strength is good, but kindness is stronger!", isGood: false, tag: "Strong", icon: "BicepsFlexed" },
                { text: "Being kind and honest.", feedback: "Yes! Real heroes have big, kind hearts like you.", isGood: true, tag: "Loving", icon: "Heart" }
            ]
        },
        bg: "bg-purple-50",
        badge: "Hero Crown"
    }
];

// Hindi Data
const chaptersHi: Chapter[] = [
    {
        id: 1,
        title: "द पैलेस एंड द रेस्टलेस हार्ट",
        narrative: `जालोर के सुनहरे शिखरों ने आकाश को छेद दिया, जो राजा कुवलयचंद्र की शक्ति का प्रमाण है। फिर भी, सुगंधित मालाओं और दरबारी संगीत के बीच, राजकुमार कुवलाया ने एक कुतरने वाला खालीपन महसूस किया। उसे लपेटने वाले रेशम जंजीरों की तरह महसूस करते थे; कवियों की प्रशंसा खोखली गूँज की तरह लग रही थी। अलंकृत खिड़की के पास बैठे, अपने राज्य पर सूरज को डूबते हुए देखकर, एक गहरा सवाल उसके दिल में जड़ें जमा रहा था: "क्या आनंद का यह रंगमंच अस्तित्व के लिए है?" यहीं पर, अद्वितीय विलासिता की गोद में, त्याग का पहला बीज-वैराग्य-चुपचाप बोया गया था।`,
        audio: "/audio/chapter1hin.mp3",
        image: "/images/chapter-1-v2.png",
        themes: chaptersEn[0].themes,
        reflection: chaptersEn[0].reflection,
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 2,
        title: "द रोड एंड द मेनी वर्ल्ड्स",
        narrative: `सड़क की धूल के लिए अपने शाही वस्त्रों का व्यापार करते हुए, कुवलाया ने भारत के विशाल, अराजक टेपेस्ट्री में कदम रखा। वह महान व्यापार मार्गों पर चला जहां कारवां मसाले और कहानियां ले जाता था। वह हलचल भरे बाजारों में खड़ा था, जहां अठारह भाषाएं हवा में घुलमिल रही थीं- अपभ्रंश कवि संस्कृत विद्वानों के साथ बहस कर रहे थे, प्राकृत में सौदेबाजी कर रहे व्यापारी, गुप्त कोड में फुसफुसाते चोर। उन्होंने कला की कच्ची सुंदरता को लालच की कुरूपता के साथ जोड़ते हुए देखा। दुनिया महल का रमणीय उद्यान नहीं थी; यह विस्तृत, पीड़ादायक, जीवंत और पूरी तरह से मानवीय था।`,
        audio: "/audio/chapter2hin.mp3",
        image: "/images/chapter-2.png",
        themes: chaptersEn[1].themes,
        reflection: chaptersEn[1].reflection,
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 3,
        title: "मुठभेड़ और परीक्षण",
        narrative: `यात्रा ने उसे तलवारों से नहीं, बल्कि दुविधाओं से परखा था। वह उन पात्रों से मिले जो बुराई के दिलों को छिपाने के लिए सद्गुण के मुखौटे पहनते थे, और साधारण किसान जिनके पास गहरी बुद्धि थी। उन्होंने लोगों के जीवन में कर्म का खेल देखा - कैसे क्रोध के एक क्षण ने एक परिवार को चकनाचूर कर दिया, कैसे दयालुता का एक छोटा सा कार्य एक गांव में फैल गया। वह जिस भी चेहरे से मिला वह एक दर्पण था, जो मानव मानस की जटिलताओं को प्रकट करता था - जुनून (कषाय) और कारण की परस्पर क्रिया। उन्होंने महसूस किया कि सच्चा युद्धक्षेत्र मानचित्र पर नहीं, बल्कि मन के भीतर था।`,
        audio: "/audio/chapter3hin.mp3",
        image: "/images/chapter-3.png",
        themes: chaptersEn[2].themes,
        reflection: chaptersEn[2].reflection,
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 4,
        title: "द मॉन्क एंड द मिरर",
        narrative: `दोपहर के सूरज से सुरक्षित एक शांत उपवन में, उसका सामना एक जैन भिक्षु से हुआ, जिसकी शांति ने राजकुमार के मन के शोर को शांत कर दिया। भिक्षु ने उपदेश नहीं दिया; उसने बस ज्ञान का दर्पण उठाया। "आप दुनिया में जो हिंसा देखते हैं," भिक्षु ने धीरे से कहा, "लेकिन भीतर की हिंसा का प्रतिबिंब है। उन्होंने समझाया कि सच्ची अहिंसा केवल हत्या का अभाव नहीं है, बल्कि नुकसान पहुंचाने की इच्छा का अभाव है। राजकुमार रोया, यह महसूस करते हुए कि उसका अपना अभिमान और क्रोध ही सच्चे दुश्मन थे जो वह हमेशा से भाग रहा था।`,
        audio: "/audio/chapter4hin.mp3",
        image: "/images/chapter-4.png",
        themes: chaptersEn[3].themes,
        reflection: chaptersEn[3].reflection,
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 5,
        title: "आंतरिक मोड़",
        narrative: `यात्रा वहीं समाप्त हुई जहां यह वास्तव में शुरू हुई थी—भीतर। कुवलय समझ गए थे कि सच्ची विजय राज्यों की नहीं है, या यहां तक कि बाहरी दुनिया की भी नहीं है, बल्कि स्वयं की है - एक 'जिन' (स्वयं का विजेता) बनना। उसने अपने अहंकार का भार एक पुराने वस्त्र की तरह एक तरफ फेंक दिया। विशाल, तारों से जगमगाते आकाश के नीचे खड़े होकर, उसे एक हल्कापन मिला जिसे वह महल में कभी नहीं जानता था। राजकुमार की कहानी समाप्त हो गई, लेकिन आत्मा की कहानी - मुक्त, दयालु और जागृत - अभी शुरू हुई थी।`,
        audio: "/audio/chapter5hin.mp3",
        image: "/images/chapter-5.png",
        themes: chaptersEn[4].themes,
        reflection: chaptersEn[4].reflection,
        bg: "bg-paper",
        align: "left"
    }
];

// Marathi Data
const chaptersMr: Chapter[] = [
    {
        id: 1,
        title: "राजवाडा आणि अस्वस्थ हृदय",
        narrative: `जालोरच्या सुवर्ण शिखरांनी आकाश भेदले, राजा कुवलयचंद्राच्या सामर्थ्याची साक्ष देत. तरीही, सुगंधित मालांमध्ये आणि दरबारी संगीताच्या मध्ये, राजकुमार कुवलयाला एक कुरतडणारा रिकामेपणा जाणवत होता. त्याला गुंडाळणारे रेशीम साखळ्यांसारखे वाटत होते; कवींच्या स्तुतीचा गजर पोकळ प्रतिध्वनीसारखा वाटत होता. अलंकृत खिडकीजवळ बसून, आपल्या राज्यावर सूर्य मावळताना पाहताना, एक खोल प्रश्न त्याच्या हृदयात रुजत होता: "आनंदाचे हे नाट्यगृह अस्तित्वासाठी संपूर्ण आहे का?" येथेच, अद्वितीय वैभवाच्या कुशीत, त्यागाचे पहिले बीज—वैराग्य—शांतपणे पेरले गेले.`,
        audio: "/audio/chapter-1.mp3",
        image: "/images/chapter-1-v2.png",
        themes: chaptersEn[0].themes,
        reflection: chaptersEn[0].reflection,
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 2,
        title: "रस्ता आणि अनेक जग",
        narrative: `रस्त्याच्या धुळीसाठी आपले शाही वस्त्र बदलत, कुवलयाने भारताच्या विशाल, अराजक वस्त्रात पाऊल ठेवले. तो महान व्यापार मार्गांवर चालला जिथे कारवान मसाले आणि कथा वाहून नेत होते. तो गजबजलेल्या बाजारपेठांमध्ये उभा राहिला, जिथे अठरा भाषा हवेत मिसळत होत्या—अपभ्रंश कवी संस्कृत विद्वानांशी वाद घालत, प्राकृतमध्ये सौदेबाजी करणारे व्यापारी, गुप्त भाषेत कुजबुजणारे चोर. त्याने कलेचे कच्चे सौंदर्य लालसेच्या कुरूपतेसह गुंफलेले पाहिले. जग राजवाड्याचे रमणीय उद्यान नव्हते; ते विशाल, वेदनादायक, जिवंत आणि पूर्णपणे मानवी होते.`,
        audio: "/audio/chapter-2.mp3",
        image: "/images/chapter-2.png",
        themes: chaptersEn[1].themes,
        reflection: chaptersEn[1].reflection,
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 3,
        title: "भेटी आणि परीक्षा",
        narrative: `प्रवासाने त्याची तलवारींनी नव्हे, तर द्विधा मनस्थितींनी परीक्षा घेतली. तो अशा पात्रांना भेटला ज्यांनी दुष्ट हृदये लपवण्यासाठी सद्गुणांचे मुखवटे घातले होते, आणि साधे शेतकरी ज्यांच्याकडे खोल शहाणपण होते. त्याने लोकांच्या जीवनात कर्माचा खेळ पाहिला—कसा रागाच्या एका क्षणाने कुटुंब उद्ध्वस्त केले, कसा दयाळूपणाच्या एका लहान कृतीने गावभर लाट पसरली. त्याला भेटलेला प्रत्येक चेहरा एक आरसा होता, मानवी मनाच्या गुंतागुंती उघड करणारा—जुनून (कषाय) आणि विवेक यांची आंतरक्रिया. त्याला जाणवले की खरे रणांगण नकाशावर नव्हते, तर मनाच्या आत होते.`,
        audio: "/audio/chapter-3.mp3",
        image: "/images/chapter-3.png",
        themes: chaptersEn[2].themes,
        reflection: chaptersEn[2].reflection,
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 4,
        title: "संन्यासी आणि आरसा",
        narrative: `दुपारच्या उन्हापासून संरक्षित एका शांत उपवनात, त्याची भेट एका जैन भिक्षूशी झाली, ज्याच्या शांतीने राजकुमाराच्या मनातील गोंगाट शांत केला. भिक्षूने उपदेश केला नाही; त्याने फक्त ज्ञानाचा आरसा उचलला. "तुम्ही जगात जी हिंसा पाहता," भिक्षूने हळूवारपणे सांगितले, "ती आतील हिंसेचे प्रतिबिंब आहे." त्याने समजावून सांगितले की खरी अहिंसा केवळ हत्येचा अभाव नाही, तर हानी करण्याच्या इच्छेचा अभाव आहे. राजकुमार रडला, हे जाणवत की त्याचा स्वतःचा अभिमान आणि क्रोधच खरे शत्रू होते ज्यांपासून तो नेहमी पळत होता.`,
        audio: "/audio/chapter-4.mp3",
        image: "/images/chapter-4.png",
        themes: chaptersEn[3].themes,
        reflection: chaptersEn[3].reflection,
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 5,
        title: "आंतरिक वळण",
        narrative: `प्रवास तिथेच संपला जिथे तो खरोखर सुरू झाला होता—आतमध्ये. कुवलयाला समजले होते की खरा विजय राज्यांचा नाही, किंवा बाह्य जगाचाही नाही, तर स्वतःचा आहे—एक 'जिन' (स्वतःचा विजेता) बनणे. त्याने आपल्या अहंकाराचे ओझे जुन्या वस्त्रासारखे बाजूला फेकले. विशाल, ताऱ्यांनी भरलेल्या आकाशाखाली उभे राहून, त्याला एक हलकेपणा सापडला जो त्याला राजवाड्यात कधी माहीत नव्हता. राजकुमाराची कथा संपली, पण आत्म्याची कथा—मुक्त, दयाळू आणि जागृत—नुकतीच सुरू झाली होती.`,
        audio: "/audio/chapter-5.mp3",
        image: "/images/chapter-5.png",
        themes: chaptersEn[4].themes,
        reflection: chaptersEn[4].reflection,
        bg: "bg-paper",
        align: "left"
    }
];

// Tamil Data
const chaptersTa: Chapter[] = [
    {
        id: 1,
        title: "அரண்மனையும் அமைதியற்ற இதயமும்",
        narrative: `ஜாலோரின் பொன் சிகரங்கள் வானத்தைத் துளைத்தன, அரசன் குவலயசந்திரனின் வல்லமைக்குச் சான்று. ஆயினும், நறுமண மாலைகள் மற்றும் அரசவை இசையின் மத்தியில், இளவரசர் குவலயா ஒரு கொறிக்கும் வெறுமையை உணர்ந்தார். அவரைச் சுற்றிய பட்டுத்துணிகள் சங்கிலிகள் போல் உணர்ந்தார்; கவிஞர்களின் புகழ்ச்சி வெற்று எதிரொலி போல் ஒலித்தது. அலங்கரிக்கப்பட்ட ஜன்னலருகே அமர்ந்து, தன் ராஜ்ஜியத்தின் மீது சூரியன் மறைவதைப் பார்த்தபோது, ஒரு ஆழமான கேள்வி அவர் இதயத்தில் வேர் கொண்டிருந்தது: "இன்ப நாடகம் இருப்பதற்கு இதுதானா?" இங்கேதான், ஒப்பற்ற ஆடம்பரத்தின் மடியில், துறவின் முதல் விதை—வைராக்கியம்—அமைதியாக விதைக்கப்பட்டது.`,
        audio: "/audio/chapter-1.mp3",
        image: "/images/chapter-1-v2.png",
        themes: chaptersEn[0].themes,
        reflection: chaptersEn[0].reflection,
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 2,
        title: "சாலையும் பல உலகங்களும்",
        narrative: `சாலையின் புழுதிக்காக தன் அரச ஆடைகளை மாற்றிக்கொண்டு, குவலயா இந்தியாவின் பரந்த, குழப்பமான நெசவுக்குள் நுழைந்தார். கார்வான்கள் மசாலாக்களையும் கதைகளையும் சுமந்து சென்ற பெரும் வணிக வழிகளில் நடந்தார். பதினெட்டு மொழிகள் காற்றில் கலந்த பரபரப்பான சந்தைகளில் நின்றார்—அபப்ரம்ச கவிஞர்கள் சமஸ்கிருத அறிஞர்களுடன் விவாதித்தனர், பிரகிருதத்தில் பேரம் பேசும் வணிகர்கள், இரகசிய குறியீடுகளில் கிசுகிசுக்கும் திருடர்கள். கலையின் கச்சா அழகும் பேராசையின் அசிங்கமும் பின்னிப்பிணைந்திருப்பதைக் கண்டார். உலகம் அரண்மனையின் அழகிய தோட்டம் அல்ல; அது பரந்ததும், வேதனையானதும், உயிர்ப்புள்ளதும், முற்றிலும் மனிதத்தன்மை கொண்டதுமாக இருந்தது.`,
        audio: "/audio/chapter-2.mp3",
        image: "/images/chapter-2.png",
        themes: chaptersEn[1].themes,
        reflection: chaptersEn[1].reflection,
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 3,
        title: "சந்திப்புகளும் சோதனைகளும்",
        narrative: `பயணம் அவரை வாள்களால் அல்ல, தர்மசங்கடங்களால் சோதித்தது. தீய இதயங்களை மறைக்க நல்லொழுக்க முகமூடிகள் அணிந்த கதாபாத்திரங்களையும், ஆழ்ந்த ஞானம் கொண்ட எளிய விவசாயிகளையும் சந்தித்தார். மக்களின் வாழ்க்கையில் கர்மாவின் விளையாட்டைக் கண்டார்—ஒரு கோப கணம் எப்படி ஒரு குடும்பத்தை நொறுக்கியது, ஒரு சிறிய கருணைச் செயல் எப்படி ஒரு கிராமம் முழுவதும் பரவியது. அவர் சந்தித்த ஒவ்வொரு முகமும் ஒரு கண்ணாடி, மனித உளவியலின் சிக்கல்களை வெளிப்படுத்தியது—உணர்ச்சிகள் (கஷாய) மற்றும் பகுத்தறிவின் ஊடாட்டம். உண்மையான போர்க்களம் வரைபடத்தில் அல்ல, மனதிற்குள்தான் இருக்கிறது என்பதை உணர்ந்தார்.`,
        audio: "/audio/chapter-3.mp3",
        image: "/images/chapter-3.png",
        themes: chaptersEn[2].themes,
        reflection: chaptersEn[2].reflection,
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 4,
        title: "துறவியும் கண்ணாடியும்",
        narrative: `நண்பகல் வெயிலிலிருந்து பாதுகாக்கப்பட்ட அமைதியான சோலையில், அவர் ஒரு ஜைன துறவியைச் சந்தித்தார், அவரது அமைதி இளவரசரின் மனதின் சத்தத்தை அடக்கியது. துறவி பிரசங்கிக்கவில்லை; அவர் வெறுமனே ஞானத்தின் கண்ணாடியை உயர்த்தினார். "நீங்கள் உலகில் காணும் வன்முறை," துறவி மெதுவாகச் சொன்னார், "உள்ளிருக்கும் வன்முறையின் பிரதிபலிப்பு." உண்மையான அஹிம்சை வெறும் கொலையின்மை அல்ல, தீங்கு செய்ய விரும்பாமை என்று விளக்கினார். இளவரசர் அழுதார், தன்னுடைய பெருமையும் கோபமும்தான் தான் எப்போதும் ஓடிக்கொண்டிருந்த உண்மையான எதிரிகள் என்பதை உணர்ந்து.`,
        audio: "/audio/chapter-4.mp3",
        image: "/images/chapter-4.png",
        themes: chaptersEn[3].themes,
        reflection: chaptersEn[3].reflection,
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 5,
        title: "உள் திருப்பம்",
        narrative: `பயணம் உண்மையில் தொடங்கிய இடத்திலேயே முடிந்தது—உள்ளே. உண்மையான வெற்றி ராஜ்ஜியங்களின் மீது அல்ல, வெளி உலகின் மீதும் அல்ல, தன்னுடையது—ஒரு 'ஜின' (தன்னை வென்றவர்) ஆவது என்று குவலயா புரிந்துகொண்டார். தன் அகங்காரத்தின் சுமையை ஒரு பழைய ஆடை போல ஒதுக்கினார். பரந்த, நட்சத்திரங்கள் நிறைந்த வானத்தின் கீழ் நின்றபோது, அரண்மனையில் ஒருபோதும் அறியாத ஒரு லேசான தன்மையைக் கண்டார். இளவரசரின் கதை முடிந்தது, ஆனால் ஆன்மாவின் கதை—விடுதலையான, கருணையுள்ள, விழிப்புள்ள—இப்போதுதான் தொடங்கியது.`,
        audio: "/audio/chapter-5.mp3",
        image: "/images/chapter-5.png",
        themes: chaptersEn[4].themes,
        reflection: chaptersEn[4].reflection,
        bg: "bg-paper",
        align: "left"
    }
];

// Telugu Data
const chaptersTe: Chapter[] = [
    {
        id: 1,
        title: "రాజభవనం మరియు అశాంత హృదయం",
        narrative: `జాలోర్ బంగారు శిఖరాలు ఆకాశాన్ని చీల్చాయి, రాజు కువలయచంద్రుని శక్తికి సాక్ష్యం. అయినప్పటికీ, సుగంధ మాలల మధ్య మరియు రాజసభ సంగీతం మధ్య, యువరాజు కువలయ ఒక కొరికే శూన్యతను అనుభవించాడు. అతనిని చుట్టిన పట్టు వస్త్రాలు గొలుసుల వలె భావించాడు; కవుల ప్రశంసలు బోలు ప్రతిధ్వనుల వలె వినిపించాయి. అలంకరించబడిన కిటికీ పక్కన కూర్చుని, తన రాజ్యంపై సూర్యుడు అస్తమించడం చూస్తూ, ఒక లోతైన ప్రశ్న అతని హృదయంలో వేళ్ళూనుకుంటోంది: "ఆనందపు ఈ నాటకం ఉనికికి ఇదేనా?" ఇక్కడే, అసమానమైన సంపద ఒడిలో, త్యాగం మొదటి విత్తనం—వైరాగ్యం—మౌనంగా విత్తబడింది.`,
        audio: "/audio/chapter-1.mp3",
        image: "/images/chapter-1-v2.png",
        themes: chaptersEn[0].themes,
        reflection: chaptersEn[0].reflection,
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 2,
        title: "మార్గం మరియు అనేక లోకాలు",
        narrative: `రహదారి ధూళి కోసం తన రాజ వస్త్రాలను మార్చుకొని, కువలయ భారతదేశపు విశాల, అవ్యవస్థిత వస్త్రంలో అడుగుపెట్టాడు. సుగంధ ద్రవ్యాలు మరియు కథలను మోసుకెళ్ళే కార్వాన్‌లతో కూడిన గొప్ప వాణిజ్య మార్గాలలో నడిచాడు. పద్దెనిమిది భాషలు గాలిలో కలిసిన కోలాహల బజార్లలో నిలబడ్డాడు—అపభ్రంశ కవులు సంస్కృత పండితులతో వాదించారు, ప్రాకృతంలో బేరం చేసే వ్యాపారులు, రహస్య సంకేతాలలో గుసగుసలాడే దొంగలు. కళ యొక్క ముడి అందం దురాశ యొక్క వికృతతో అల్లుకోబడింది. ప్రపంచం రాజభవన అందమైన ఉద్యానవనం కాదు; అది విశాలమైనది, బాధాకరమైనది, సజీవమైనది మరియు పూర్తిగా మానవీయమైనది.`,
        audio: "/audio/chapter-2.mp3",
        image: "/images/chapter-2.png",
        themes: chaptersEn[1].themes,
        reflection: chaptersEn[1].reflection,
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 3,
        title: "సమావేశాలు మరియు పరీక్షలు",
        narrative: `ప్రయాణం అతనిని కత్తులతో కాకుండా, ధర్మసంకటాలతో పరీక్షించింది. దుష్ట హృదయాలను దాచడానికి సద్గుణ ముసుగులు ధరించిన పాత్రలను, లోతైన జ్ఞానం కలిగిన సాధారణ రైతులను కలిశాడు. ప్రజల జీవితాలలో కర్మ ఆట చూశాడు—కోపం యొక్క ఒక క్షణం ఒక కుటుంబాన్ని ఎలా నాశనం చేసింది, దయ యొక్క ఒక చిన్న చర్య ఒక గ్రామం అంతా ఎలా వ్యాపించింది. అతను కలిసిన ప్రతి ముఖం ఒక అద్దం, మానవ మనస్తత్వ సంక్లిష్టతలను బయటపెట్టేది—తీవ్ర భావాలు (కషాయ) మరియు వివేకం యొక్క పరస్పర ప్రభావం. నిజమైన యుద్ధభూమి పటంపై కాదు, మనసులోనే ఉందని గ్రహించాడు.`,
        audio: "/audio/chapter-3.mp3",
        image: "/images/chapter-3.png",
        themes: chaptersEn[2].themes,
        reflection: chaptersEn[2].reflection,
        bg: "bg-paper",
        align: "left"
    },
    {
        id: 4,
        title: "సన్యాసి మరియు దర్పణం",
        narrative: `మధ్యాహ్న ఎండ నుండి రక్షించబడిన ప్రశాంత ఉపవనంలో, అతను ఒక జైన సన్యాసిని కలిశాడు, అతని ప్రశాంతత యువరాజు మనస్సులోని ధ్వనిని శాంతపరిచింది. సన్యాసి ప్రబోధించలేదు; కేవలం జ్ఞానం యొక్క అద్దాన్ని ఎత్తాడు. "మీరు ప్రపంచంలో చూసే హింస," సన్యాసి మెల్లగా చెప్పాడు, "లోపలి హింస యొక్క ప్రతిబింబం." నిజమైన అహింస కేవలం హత్య లేకపోవడం కాదు, హాని చేయాలనే కోరిక లేకపోవడం అని వివరించాడు. తన స్వంత అహంకారం మరియు కోపమే తాను ఎప్పుడూ పారిపోతున్న నిజమైన శత్రువులు అని గ్రహించి యువరాజు ఏడ్చాడు.`,
        audio: "/audio/chapter-4.mp3",
        image: "/images/chapter-4.png",
        themes: chaptersEn[3].themes,
        reflection: chaptersEn[3].reflection,
        bg: "bg-[#EAE5D9]",
        align: "right"
    },
    {
        id: 5,
        title: "అంతర్గత మలుపు",
        narrative: `ప్రయాణం నిజంగా ప్రారంభమైన చోటే ముగిసింది—లోపల. నిజమైన విజయం రాజ్యాలపై కాదు, బాహ్య ప్రపంచంపైనా కాదు, తన మీద తానే—'జిన' (తనను తాను జయించిన వాడు) కావడం అని కువలయ అర్థం చేసుకున్నాడు. తన అహంకారపు భారాన్ని పాత వస్త్రం వలె పక్కకు తోసాడు. విశాల, నక్షత్రాలతో వెలిగే ఆకాశం కింద నిలబడి, రాజభవనంలో ఎన్నడూ తెలియని ఒక తేలిక తనాన్ని కనుగొన్నాడు. యువరాజు కథ ముగిసింది, కానీ ఆత్మ కథ—విముక్తమైన, కరుణగల, మేల్కొన్న—ఇప్పుడే ప్రారంభమైంది.`,
        audio: "/audio/chapter-5.mp3",
        image: "/images/chapter-5.png",
        themes: chaptersEn[4].themes,
        reflection: chaptersEn[4].reflection,
        bg: "bg-paper",
        align: "left"
    }
];

export const getChapters = (lang: Language): Chapter[] => {
    if (lang === 'hi') return chaptersHi;
    if (lang === 'mr') return chaptersMr;
    if (lang === 'ta') return chaptersTa;
    if (lang === 'te') return chaptersTe;
    if (lang === 'en') return chaptersEn;

    // Fallback
    return chaptersEn;
};

export const getKidsChapters = (lang: Language): KidsChapter[] => {
    return kidsChapters;
};
