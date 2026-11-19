/*
  Everything a family changes lives here. A new invite = a new copy of this file.
  Image names have no extension: the page looks for assets/<name>.webp / .jpg / .jpeg / .png,
  videos for assets/<name>.mp4 / .webm. Anything missing falls back to a drawn version.
*/
const INVITE = {
  couple: {
    initials: ["A", "R"],
    bride: {
      first: "Ahana",
      full: "Ahana Sen",
      parents: "Mitali & Subrata Sen",
      parentsBn: "মিতালি ও সুব্রত সেনের মেয়ে",
      about: "স্কুলে ফিজিক্স পড়ায়, আর রবীন্দ্রসংগীত ধরলে ঘরটা চুপ হয়ে যায়।",
    },
    groom: {
      first: "Ritwik",
      full: "Ritwik Mukherjee",
      parents: "Rupa & Debashis Mukherjee",
      parentsBn: "রূপা ও দেবাশিস মুখার্জির ছেলে",
      about: "পেশায় আর্কিটেক্ট। ইস্টবেঙ্গল হারলে সেদিন আর ফোন ধরে না।",
    },
  },
  houses: "Sen bari · Mukherjee bari",
  families: "সেন ও মুখার্জি পরিবার",

  wedding: {
    startISO: "2027-01-22T19:00:00+05:30",
    endISO: "2027-01-23T00:30:00+05:30",
    weekday: "Friday",
    dateLine: "Friday, 22 January 2027",
    short: "22 · 01 · 2027",
    city: "Kolkata",
    bnDay: "শুক্রবার",
    bnDate: "২২শে জানুয়ারি",
    bnYear: "২০২৭",
    bnLagna: "শুভ লগ্ন রাত ৯টা ১২ মিনিট",
    lagna: "9:12 PM",
    // calendar card
    month: "January",
    year: 2027,
    monthIndex: 0,
    day: 22,
    // the family types the Bangla date themselves (never computed), e.g. "৮ই মাঘ ১৪৩৩"
    banglaDate: "",
  },

  // the printed-card letter that slides out of the envelope
  letter: {
    greeting: "সবিনয় নিবেদন,",
    body: [
      "আগামী ২২শে জানুয়ারি ২০২৭, শুক্রবার, শুভ লগ্নে আমাদের কন্যা কল্যাণীয়া আহানার সহিত শ্রী দেবাশিস মুখার্জি ও শ্রীমতী রূপা মুখার্জির পুত্র কল্যাণীয় ঋত্বিকের শুভ বিবাহ অনুষ্ঠিত হইবে।",
      "উক্ত শুভানুষ্ঠানে আপনার সবান্ধব উপস্থিতি ও আশীর্বাদ একান্ত কাম্য।",
    ],
    sign: "বিনীত",
    from: "সুব্রত ও মিতালি সেন",
    place: "বেহালা, কলকাতা",
  },

  // the printed wedding card that comes out of the envelope and turns its pages on scroll
  card: {
    bride: "আহানা",
    groom: "ঋত্বিক",
    mantra: ["যদেতৎ হৃদয়ং তব", "তদস্তু হৃদয়ং মম।", "যদিদং হৃদয়ং মম", "তদস্তু হৃদয়ং তব॥"],
    mantraMeaning: "তোমার এই হৃদয় আমার হোক,\nআমার এই হৃদয় তোমার।",
    brideSide: {
      title: "কন্যাপক্ষ",
      body: [
        "আগামী ২২শে জানুয়ারি ২০২৭, শুক্রবার, শুভ লগ্নে আমাদের কন্যা কল্যাণীয়া আহানার সহিত শ্রী দেবাশিস মুখার্জি ও শ্রীমতী রূপা মুখার্জির পুত্র কল্যাণীয় ঋত্বিকের শুভ বিবাহ অনুষ্ঠিত হইবে।",
        "উক্ত শুভানুষ্ঠানে আপনার সবান্ধব উপস্থিতি ও আশীর্বাদ একান্ত কাম্য।",
      ],
      from: "সুব্রত ও মিতালি সেন",
      place: "বেহালা, কলকাতা",
    },
    groomSide: {
      title: "বরপক্ষ",
      body: [
        "আগামী ২২শে জানুয়ারি ২০২৭, শুক্রবার, শুভ লগ্নে আমাদের পুত্র কল্যাণীয় ঋত্বিকের সহিত শ্রী সুব্রত সেন ও শ্রীমতী মিতালি সেনের কন্যা কল্যাণীয়া আহানার শুভ বিবাহ অনুষ্ঠিত হইবে।",
        "উক্ত শুভানুষ্ঠানে আপনার সবান্ধব উপস্থিতি ও আশীর্বাদ একান্ত কাম্য।",
      ],
      from: "দেবাশিস ও রূপা মুখার্জি",
      place: "সল্টলেক, কলকাতা",
    },
  },


  // shape: "land" = 4:3 frame, "wide" = 3:2 frame (match the photo)
  gallery: [
    { img: "kolkata-1", shape: "land", place: "Prinsep Ghat", caption: "প্রথম দেখা" },
    { img: "kolkata-2", shape: "wide", place: "College Street", caption: "পুরোনো বইয়ের গন্ধ" },
    { img: "kolkata-3", shape: "wide", place: "Howrah Bridge", caption: "নৌকায়, সূর্য ডোবার আগে" },
    { img: "kolkata-4", shape: "land", place: "Victoria Memorial", caption: "শীতের দুপুর" },
    { img: "kolkata-5", shape: "land", place: "Shobhabazar Rajbari", caption: "যেখানে হ্যাঁ বলা" },
  ],

  eventsRange: "20 – 24 January 2027",
  events: [
    {
      bn: "আশীর্বাদ",
      en: "Ashirbad",
      img: "event-ashirbad",
      icon: "thala",
      when: "Wednesday, 20 January · 11:00 AM",
      where: "Sen bari, Behala",
      mapQuery: "Behala, Kolkata",
      note: "ধান-দুব্বো আর অনেকটা আশীর্বাদ নিয়ে আসবেন।",
    },
    {
      bn: "গায়ে হলুদ",
      en: "Gaye Holud",
      img: "event-holud",
      icon: "haldi",
      when: "Friday, 22 January · 8:00 AM",
      where: "দু'বাড়িতেই",
      mapQuery: "Behala, Kolkata",
      note: "পুরোনো জামা পরে আসাই ভালো, হলুদ লাগবেই।",
    },
    {
      bn: "বিয়ে",
      en: "Biye",
      img: "event-biye",
      icon: "topor",
      when: "Friday, 22 January · 7:00 PM",
      where: "Golap Bagan Banquet, Behala",
      mapQuery: "Behala, Kolkata",
      note: "লগ্ন রাত ৯টা ১২-য়।",
    },
    {
      bn: "বৌভাত",
      en: "Boubhat",
      img: "event-boubhat",
      icon: "kolapata",
      when: "Sunday, 24 January · 7:30 PM",
      where: "Mukherjee bari, Salt Lake",
      mapQuery: "Salt Lake, Kolkata",
      note: "ভাত-কাপড়ের পর জমিয়ে খাওয়াদাওয়া।",
    },
  ],

  night: [
    { time: "7:00 PM", title: "Bor Boron", bn: "বর বরণ", note: "শাঁখ আর উলু দিয়ে বরণ, গেটে সবাই হাজির।" },
    { time: "8:00 PM", title: "Dinner", bn: "খাওয়াদাওয়া", note: "ফিশ ফ্রাই থেকে মিষ্টি দই, পাত পেড়ে।" },
    { time: "9:12 PM", title: "Shubhodrishti", bn: "শুভদৃষ্টি ও মালাবদল", note: "পান পাতা সরবে, তারপর শুভদৃষ্টি।" },
    { time: "11:30 PM", title: "Sindoor Daan", bn: "সিঁদুরদান", note: "বিয়ের সবচেয়ে চুপচাপ মুহূর্ত। ফোনটা একটু নামিয়ে রাখবেন।" },
  ],

  // PLACEHOLDER venue until Arpon sends the real one
  venue: {
    name: "Golap Bagan Banquet",
    address: "Behala, Kolkata",
    mapQuery: "Behala, Kolkata",
    note: "পার্কিং আছে, গেটে বললেই দেখিয়ে দেবে।",
  },

  dress: {
    line: "লাল, সোনালি আর আইভরি। শাড়ি-পাঞ্জাবি হলে তো কথাই নেই।",
    swatches: [
      { name: "Oxblood", hex: "#4a0a12" },
      { name: "Crimson", hex: "#9e1b2b" },
      { name: "Gold", hex: "#c9a24a" },
      { name: "Ivory", hex: "#f3e9d6" },
    ],
  },

  closing: {
    line: "আসবেন কিন্তু",
  },

  // where the chandeliers sit in the stage pictures, as fractions of the picture (r = glow size / picture width)
  glows: {
    wide: [
      { x: 0.5, y: 0.13, r: 0.17 },
      { x: 0.249, y: 0.215, r: 0.12 },
      { x: 0.756, y: 0.215, r: 0.12 },
    ],
    tall: [{ x: 0.5, y: 0.14, r: 0.5 }],
  },
};

if (typeof window !== "undefined") {
  window.INVITE = INVITE;
}

export default INVITE;
