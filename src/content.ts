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
  tagline: "A film in seven reels. Starring you. Directed, badly, by your girlfriend.",
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
    urdu: ["چائے میں چینی کم تھی، مگر تم جو آ گئے", "مٹھاس اتنی بڑھی کہ شربت شرما گئے"],
    roman: ["Chai mein cheeni kam thi, magar tum jo aa gaye", "Mithaas itni badhi ke sharbat sharma gaye"],
    english: "There wasn't enough sugar in my tea, but then you walked in, and the sweetness got so strong even the sharbat blushed.",
    credit: "— Kuchu Puchu, original",
  },
  {
    urdu: ["غالب کے درد کی دوا نہ ہوئی، نہ سہی", "میرا علاج تم ہو، اور دردِ سر بھی"],
    roman: ["Ghalib ke dard ki dawa na hui, na sahi", "Mera ilaaj tum ho, aur dard-e-sar bhi"],
    english: "Ghalib never found a cure for his pain, fine. You're my cure, and also my headache.",
    credit: "— Kuchu Puchu, original",
  },
];

// ---- 3. Reasons you're loved (film credits) ------------------------
export const reasonsTitle = { roman: "Wajah", urdu: "وجوہات", english: "Reasons you're loved" };
export const reasons: { text: string; urduWord?: string }[] = [
  { text: "Tumhari hasi meri bad mood ki sabse badi dushman hai.", urduWord: "ہنسی" },
  { text: "Tum khaana share karte ho… kabhi kabhi.", urduWord: "کھانا" },
  { text: "Tumhare saath chup rehna bhi boring nahi lagta.", urduWord: "خاموشی" },
  { text: "Tum meri har bakwaas ko seriously sunte ho.", urduWord: "بکواس" },
  { text: "Aur sabse bada reason: tum Shayan ho. Bas.", urduWord: "بس" },
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
  prompt: "Phoonk maaro. Tap, ya hold karo.",
  after: "Ab wish maango…",
  afterEnglish: "(make a wish)",
};

// ---- 6. Letter -------------------------------------------------------
export const letter = {
  envelopeHint: "Ek chitthi. Sirf tumhare liye. Tap to open.",
  body: `Shayan,
Happy Birthday, meri jaan.
Tum meri zindagi ke sabse achhe plot twist ho.
Tumhare saath har din thoda zyada khoobsurat lagta hai, aur thoda zyada pagal bhi.
Yeh website banane mein 3 raatein lagi, shukar karo. 😌
Hamesha tumhari,
Kuchu Puchu`,
  urduEnd: "تم میرے ہو، یہی کافی ہے",
  urduEndEnglish: "You're mine; that's enough.",
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