/*
  Everything a family changes lives here. A new invite = a new copy of this file.
  Image names have no extension: the page looks for assets/<name>.webp / .jpg / .jpeg / .png,
  videos for assets/<name>.mp4 / .webm. Anything missing falls back to a drawn version.
*/
const INVITE = {
  couple: {
    initials: ["S", "M"],
    groom: {
      first: "শুভনীল",
      enFirst: "Subhoneel",
      full: "Subhoneel Dalui",
      parents: "Swapna & Anil Dalui",
      parentsBn: "অনিল ও স্বপ্না দলুইয়ের ছেলে",
      fatherBn: "শ্রী অনিল দলুই",
      motherBn: "শ্রীমতী স্বপ্না দলুই",
      about: "",
    },
    bride: {
      first: "মধুমিতা",
      enFirst: "Madhumita",
      full: "Madhumita Bodhak",
      parents: "Baisakhi & Susanta Bodhak",
      parentsBn: "সুশান্ত ও বৈশাখী বোধকের মেয়ে",
      fatherBn: "শ্রী সুশান্ত বোধক",
      motherBn: "শ্রীমতী বৈশাখী বোধক",
      about: "",
    },
  },
  houses: "Dalui bari · Bodhak bari",
  families: "দলুই ও বোধক পরিবার",
  introductoryNote: "দুই পরিবারের ভালোবাসা ও আশীর্বাদে এক নতুন পথচলার শুভ সূচনা…",
  bondingNote: "বিবাহবন্ধনে আবদ্ধ হতে চলেছে দুই হৃদয়, দুই পরিবার",

  wedding: {
    startISO: "2026-12-11T19:00:00+05:30",
    endISO: "2026-12-12T02:30:00+05:30",
    weekday: "Friday",
    dateLine: "Friday, 11 December 2026",
    short: "11 · 12 · 2026",
    city: "Howrah",
    bnDay: "শুক্রবার",
    bnDate: "১১ই ডিসেম্বর",
    bnYear: "২০২৬",
    bnLagna: "শুভ লগ্ন রাতে",
    lagna: "Night",
    // calendar card
    month: "December",
    year: 2026,
    monthIndex: 11,
    day: 11,
    // the family types the Bangla date themselves (never computed), e.g. "২৫শে অগ্রহায়ণ ১৪৩৩"
    banglaDate: "২৫শে অগ্রহায়ণ ১৪৩৩",
  },

  // the printed-card letter that slides out of the envelope
  letter: {
    greeting: "সবিনয় নিবেদন,",
    body: [
      "দুই পরিবারের ভালোবাসা ও আশীর্বাদে এক নতুন পথচলার শুভ সূচনা…",
      "আগামী ১১ই ডিসেম্বর ২০২৬, শুক্রবার, শুভ লগ্নে আমাদের পুত্র কল্যাণীয় শুভনীলের সহিত শ্রী সুশান্ত বোধক ও শ্রীমতী বৈশাখী বোধকের কন্যা কল্যাণীয়া মধুমিতার শুভ বিবাহ এবং আগামী ১৩ই ডিসেম্বর ২০২৬, রবিবার শুভ বৌভাত ও রিসেপশন অনুষ্ঠান অনুষ্ঠিত হইবে।",
      "বিবাহবন্ধনে আবদ্ধ হতে চলেছে দুই হৃদয়, দুই পরিবার। উক্ত শুভানুষ্ঠানগুলিতে আপনার সবান্ধব উপস্থিতি ও আন্তরিক আশীর্বাদ একান্তভাবে কাম্য।",
    ],
    sign: "বিনীত",
    from: "অনিল ও স্বপ্না দলুই",
    place: "বালিটিকুরী, হাওড়া",
  },

  // the printed wedding card that comes out of the envelope and turns its pages on scroll
  card: {
    groom: "শুভনীল",
    bride: "মধুমিতা",
    mantra: ["যদেতৎ হৃদয়ং তব", "তদস্তু হৃদয়ং মম।", "যদিদং হৃদয়ং মম", "তদস্তু হৃদয়ং তব॥"],
    mantraMeaning: "তোমার এই হৃদয় আমার হোক,\nআমার এই হৃদয় তোমার।",
    groomSide: {
      title: "বরপক্ষ",
      body: [
        "দুই পরিবারের ভালোবাসা ও আশীর্বাদে এক নতুন পথচলার শুভ সূচনা…",
        "আগামী ১১ই ডিসেম্বর ২০২৬, শুক্রবার, শুভ লগ্নে আমাদের পুত্র কল্যাণীয় শুভনীলের সহিত শ্রী সুশান্ত বোধক ও শ্রীমতী বৈশাখী বোধকের কন্যা কল্যাণীয়া মধুমিতার শুভ বিবাহ এবং ১৩ই ডিসেম্বর ২০২৬, রবিবার শুভ বৌভাত অনুষ্ঠান অনুষ্ঠিত হইবে।",
        "উক্ত শুভানুষ্ঠানে আপনার সবান্ধব উপস্থিতি ও আশীর্বাদ একান্ত কাম্য।",
      ],
      from: "অনিল ও স্বপ্না দলুই",
      place: "বালিটিকুরী, হাওড়া",
    },
    brideSide: {
      title: "কন্যাপক্ষ",
      body: [
        "দুই পরিবারের ভালোবাসা ও আশীর্বাদে এক নতুন পথচলার শুভ সূচনা…",
        "আগামী ১১ই ডিসেম্বর ২০২৬, শুক্রবার, শুভ লগ্নে আমাদের কন্যা কল্যাণীয়া মধুমিতার সহিত শ্রী অনিল দলুই ও শ্রীমতী স্বপ্না দলুইয়ের পুত্র কল্যাণীয় শুভনীলের শুভ বিবাহ অনুষ্ঠিত হইবে।",
        "উক্ত শুভানুষ্ঠানে আপনার সবান্ধব উপস্থিতি ও আশীর্বাদ একান্ত কাম্য।",
      ],
      from: "সুশান্ত ও বৈশাখী বোধক",
      place: "বালিটিকুরী, হাওড়া",
    },
  },

  // shape: "land" = 4:3 frame, "wide" = 3:2 frame, "port" = 3:4 portrait (match the photo)
  gallery: [
    { img: "kolkata-1", shape: "land", place: "হাঁটতে হাঁটতে", caption: "কে আগে হাঁটবে তাই নিয়ে ঝগড়া, হাত ছাড়েনি কেউ" },
    { img: "kolkata-2", shape: "port", place: "সিঁড়ির আড্ডা", caption: "ফটোগ্রাফার তিনবার ডাকল, গল্প তবু শেষ হয়নি" },
    { img: "kolkata-3", shape: "port", place: "হাসির কারণ", caption: "কী বলেছিল মনে নেই, শুধু মনে আছে খুব হেসেছিলাম" },
    { img: "kolkata-4", shape: "port", place: "লাল দরজার নিচে", caption: "চারপাশে ভিড়, হর্ন, আমরা কিছুই শুনিনি" },
    { img: "kolkata-5", shape: "port", place: "আর ক'টা দিন", caption: "তারপর আর আলাদা বাড়ি ফেরার তাড়া নেই" },
  ],

  eventsRange: "09 – 13 December 2026",
  events: [
    {
      bn: "আশীর্বাদ",
      en: "Ashirbad",
      img: "event-ashirbad",
      icon: "thala",
      when: "Wednesday, 09 December · 11:00 AM",
      where: "দলুই বাড়ি, বালিটিকুরী",
      mapQuery: "Balitikuri, Howrah",
      note: "ধান-দুব্বো আর অনেকটা আশীর্বাদ নিয়ে আসবেন।",
    },
    {
      bn: "গায়ে হলুদ",
      en: "Gaye Holud",
      img: "event-holud",
      icon: "haldi",
      when: "Friday, 11 December · 8:00 AM",
      where: "দু'বাড়িতেই",
      mapQuery: "Balitikuri, Howrah",
      note: "পুরোনো জামা পরে আসাই ভালো, হলুদ লাগবেই।",
    },
    {
      bn: "শুভ বিবাহ ও প্রীতিসম্মিলন",
      en: "Wedding & Pre-Reception",
      img: "event-biye",
      icon: "topor",
      when: "Friday, 11 December · 7:00 PM",
      where: "তনুশ্রী ভবন, বালিটিকুরী, হাওড়া",
      mapQuery: "Tanushree Bhavan, Balitikuri, Howrah",
      note: "দাশনগর স্টেশন থেকে পলিক্লিনিক বাসস্ট্যান্ডে নেমে ২ মিনিটের হাঁটা পথ।",
    },
    {
      bn: "শুভ বৌভাত ও রিসেপশন",
      en: "Boubhat & Reception",
      img: "event-boubhat",
      icon: "kolapata",
      when: "Sunday, 13 December · 7:30 PM",
      where: "নবজাগরণ সংঘ, বালিটিকুরী, হাওড়া",
      mapQuery: "Nabajagaran Sangha, Balitikuri Surkimil, Howrah",
      note: "দাশনগর স্টেশন থেকে সুরকিমিল বাসস্ট্যান্ডে নেমে ২ মিনিটের হাঁটা পথ।",
    },
  ],

  night: [
    { time: "7:00 PM", title: "Bor Boron & Pre-Reception", bn: "বর বরণ ও প্রীতিসম্মিলন", note: "শাঁখ আর উলুধ্বনি দিয়ে বরণ, গেটে সবার আগমন।" },
    { time: "8:00 PM", title: "Dinner", bn: "প্রীতিভোজ ও নৈশভোজ", note: "রসনা তৃপ্তির সুস্বাদু বাঙালি ভূরিভোজ।" },
    { time: "9:30 PM", title: "Shubhodrishti", bn: "শুভদৃষ্টি ও মালাবদল", note: "পান পাতা সরবে, তারপর শুভদৃষ্টি ও মালাবদল।" },
    { time: "11:00 PM", title: "Sindoor Daan", bn: "সিঁদুরদান ও সপ্তপদী", note: "বিবাহবন্ধনের সবচেয়ে পবিত্র ও স্মরণীয় মুহূর্ত।" },
  ],

  venues: [
    {
      kicker: "শুভ বিবাহ ও প্রীতিসম্মিলন",
      enKicker: "Wedding & Pre-Reception",
      name: "তনুশ্রী ভবন",
      address: "বালিটিকুরী পলিক্লিনিক, বালিটিকুরী কালীতলা, হাওড়া",
      when: "শুক্রবার, ১১ই ডিসেম্বর ২০২৬ · সন্ধ্যা ৭টা",
      lagna: "শুভ লগ্ন রাতে",
      note: "দাশনগর স্টেশন থেকে পলিক্লিনিক বাসস্ট্যান্ডে নেমে ২ মিনিটের হাঁটা পথ",
      mapQuery: "Tanushree Bhavan, Balitikuri, Howrah",
    },
    {
      kicker: "শুভ বৌভাত ও রিসেপশন অনুষ্ঠান",
      enKicker: "Boubhat & Reception Ceremony",
      name: "নবজাগরণ সংঘ",
      address: "বালিটিকুরী সুরকিমিল, হাওড়া",
      when: "রবিবার, ১৩ই ডিসেম্বর ২০২৬ · সন্ধ্যা ৭:৩০",
      lagna: "",
      note: "দাশনগর স্টেশন থেকে সুরকিমিল বাসস্ট্যান্ডে নেমে ২ মিনিটের হাঁটা পথ",
      mapQuery: "Nabajagaran Sangha, Balitikuri Surkimil, Howrah",
    },
  ],

  venue: {
    name: "তনুশ্রী ভবন",
    address: "বালিটিকুরী পলিক্লিনিক, বালিটিকুরী কালীতলা, হাওড়া",
    mapQuery: "Tanushree Bhavan, Balitikuri, Howrah",
    note: "দাশনগর স্টেশন থেকে পলিক্লিনিক বাসস্ট্যান্ডে নেমে ২ মিনিটের হাঁটা পথ",
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
    line: "সকলের স্নেহ, ভালোবাসা ও আশীর্বাদ একান্তভাবে কাম্য।",
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
