/* =====================================================================
 *  CONTENT — edit every word of the birthday film here.
 *  No component needs to be touched to change text.
 * ===================================================================== */

// ---- Names & date ---------------------------------------------------
export const HIS_NAME = "Shayan";
export const HER_NAME = "Kuchu Puchu";
export const DATE_STAMP = "12 · 10";

// ---- 0. Curtain intro -----------------------------------------------
export const intro = {
  line: "Ek khaas din hai… aur ek khaas insaan.",
  button: "Tap to begin",
  presents: `${HER_NAME} presents`,
};

// ---- 1. Hero --------------------------------------------------------
export const hero = {
  pre: "Happy Birthday,",
  name: HIS_NAME,
  urdu: "سالگرہ مبارک",
  tagline: "A film in many, many reels. Starring you. Directed, badly, by your girlfriend.",
  scrollHint: "scroll, jaan",
};

// ---- 2. Shayari (one per screen) -----------------------------------
// `urdu` and `roman` are arrays of lines. `note` is the funny framing.
export const shayari: {
  urdu: string[];
  roman: string[];
  english: string;
  note?: string;
  credit?: string;
}[] = [
  {
    urdu: ["عشق پر زور نہیں ہے یہ وہ آتش غالب", "کہ لگائے نہ لگے اور بجھائے نہ بنے"],
    roman: ["Ishq par zor nahi hai ye woh aatish Ghalib", "Ke lagaaye na lage aur bujhaaye na bane"],
    english: "Love won't be forced. It's a fire, Ghalib, that won't light on command and won't die when told.",
    credit: "— Mirza Ghalib",
  },
  {
    urdu: ["ان کے دیکھے سے جو آ جاتی ہے منہ پر رونق", "وہ سمجھتے ہیں کہ بیمار کا حال اچھا ہے"],
    roman: ["Unke dekhe se jo aa jaati hai munh par raunaq", "Woh samajhte hain ke beemar ka haal achha hai"],
    english: "One glance from them and my face lights up, so they assume the patient is doing fine.",
    note: "this is how Kuchu Puchu looks when she sees you.",
    credit: "— Mirza Ghalib",
  },
  {
    urdu: ["ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے"],
    roman: ["Hazaaron khwahishein aisi…", "magar pehli khwahish: Shayan ka birthday cake."],
    english: "A thousand desires, each worth dying for. First on the list, obviously: cake.",
    note: "Ghalib, forgive me. Priorities.",
    credit: "— Ghalib, lightly vandalised",
  },
  {
    urdu: ["چائے میں چینی کم تھی، مگر آپ جو آ گئے", "مٹھاس اتنی بڑھی کہ شربت شرما گئے"],
    roman: ["Chai mein cheeni kam thi, magar aap jo aa gaye", "Mithaas itni badhi ke sharbat sharma gaye"],
    english: "There wasn't enough sugar in my tea, but then you walked in, and the sweetness got so strong even the sharbat blushed.",
    credit: "— Kuchu Puchu, original",
  },
  {
    urdu: ["غالب کے درد کی دوا نہ ہوئی، نہ سہی", "میرا علاج آپ ہیں، اور دردِ سر بھی"],
    roman: ["Ghalib ke dard ki dawa na hui, na sahi", "Mera ilaaj aap hain, aur dard-e-sar bhi"],
    english: "Ghalib never found a cure for his pain, fine. You're my cure, and also my headache.",
    credit: "— Kuchu Puchu, original",
  },
];

// ---- 3. Reasons you're loved (film credits) ------------------------
export const reasonsTitle = { roman: "Wajah", urdu: "وجوہات", english: "Reasons you're loved" };
export const reasons: { text: string; urduWord?: string }[] = [
  { text: "Aapki hasi meri bad mood ki sabse badi dushman hai.", urduWord: "ہنسی" },
  { text: "Aap khaana share karte hain… kabhi kabhi.", urduWord: "کھانا" },
  { text: "Aapke saath chup rehna bhi boring nahi lagta.", urduWord: "خاموشی" },
  { text: "Aap meri har bakwaas ko seriously sunte hain.", urduWord: "بکواس" },
  { text: "Aur sabse bada reason: aap Shayan hain. Bas.", urduWord: "بس" },
];

// ---- 4. Film strip ---------------------------------------------------
export const filmTitle = "Moments, developed in the dark";
export const frames = [
  { numeral: "I", label: "Frame 01", caption: "The day it all started" },
  { numeral: "II", label: "Frame 02", caption: "The first time you made me laugh till I cried" },
  { numeral: "III", label: "Frame 03", caption: "Every random call that lasted 3 hours" },
  { numeral: "IV", label: "Frame 04", caption: "The moment I knew, 'oh no, it's him'" },
  { numeral: "V", label: "Frame 05", caption: "Many more frames loading…" },
];

// ---- 5. Candle -------------------------------------------------------
export const candle = {
  prompt: "Phoonk maariye. Tap kijiye, ya hold kijiye.",
  after: "Ab wish maangiye…",
  afterEnglish: "(make a wish)",
};

// ---- 6. Letter -------------------------------------------------------
export const letter = {
  envelopeHint: "Ek chitthi. Sirf aapke liye. Tap to open.",
  body: `Shayan,
Happy Birthday, meri jaan.
Aap meri zindagi ke sabse achhe plot twist hain.
Aapke saath har din thoda zyada khoobsurat lagta hai, aur thoda zyada pagal bhi.
Yeh website banane mein 3 raatein lagi, shukar kijiye. 😌
Hamesha aapki,
Kuchu Puchu`,
  urduEnd: "آپ میرے ہیں، یہی کافی ہے",
  urduEndEnglish: "You're mine; that's enough.",
};

// ---- 8. Encore: a few more shers (placed after the letter) ----------
export const encore: typeof shayari = [
  {
    urdu: ["وہ آئے گھر میں ہمارے، خدا کی قدرت ہے", "کبھی ہم ان کو، کبھی اپنے گھر کو دیکھتے ہیں"],
    roman: ["Woh aaye ghar mein hamare, khuda ki qudrat hai", "Kabhi hum unko, kabhi apne ghar ko dekhte hain"],
    english: "They've come to my house, what a miracle. I keep looking at them, then at my house, then at them.",
    note: "this is me every time you walk in.",
    credit: "— Mirza Ghalib",
  },
  {
    urdu: ["عشق نے غالبؔ نکمّا کر دیا", "ورنہ ہم بھی آدمی تھے کام کے"],
    roman: ["Ishq ne Ghalib nikamma kar diya", "Warna hum bhi aadmi the kaam ke"],
    english: "Love made Ghalib useless. Otherwise, he too was a man of some use.",
    note: "and that's why this website took 3 raatein.",
    credit: "— Mirza Ghalib",
  },
  {
    urdu: ["ہم کو معلوم ہے جنت کی حقیقت لیکن", "دل کے خوش رکھنے کو غالبؔ یہ خیال اچھا ہے"],
    roman: ["Hum ko maaloom hai jannat ki haqeeqat lekin", "Dil ke khush rakhne ko Ghalib yeh khayal achha hai"],
    english: "We know the truth about paradise, but to keep the heart happy, it's a nice thought.",
    note: "meri jannat? Aapke saath wala Sunday.",
    credit: "— Mirza Ghalib",
  },
];

// ---- 9. Her poem (one verse per screen) -----------------------------
export const poem = {
  label: "REEL 09 · IN HER OWN WORDS",
  title: "The Boy in the Rain",
  urdu: "بارش",
  intro: "Ab kuch alfaaz, jo Kuchu Puchu ne khud likhe.",
  by: "— written by Kuchu Puchu",
  stanzas: [
    [
      "From a rainy-night park to a text on my phone,",
      "From a month of shy glances to feeling less alone,",
      "From the twenty-third of May to the first time we kissed",
      "You've become all those little moments I never want to miss.",
    ],
    [
      "And if I could return to that night in the rain,",
      "I'd let myself fall all over again.",
      "I'd let myself blush, let my nervous heart race,",
      "And I'd still find my way to that same little place.",
    ],
    [
      "For I didn't know then what I know today,",
      "That a boy in the rain would change me this way.",
      "I didn't know one small moment could start",
      "A story I'd carry so deep in my heart.",
    ],
    [
      "And if forever is made of a thousand small choices,",
      "I'd choose you through the silence, the storms, and the noises.",
      "I'd choose you in the beginning, the middle, the end",
      "As my favourite love, my lover, my best friend.",
    ],
    [
      "And Shayan, if there's one thing I hope you'll always know,",
      "It's that no matter how far the days may go,",
      "Before you were mine, you were the boy in the rain",
      "And I'd fall for you, my love, all over again.",
    ],
  ],
};

// ---- 7. End card -----------------------------------------------------
export const endCard = {
  hint: "Scroll up for the song again 🎶",
  tapHint: "(psst… tap his name)",
  egg: "Okay okay, we get it, you're loved.",
  fin: "fin.",
};

// ---- Music -----------------------------------------------------------
export const song = { title: "Katra Katra" };