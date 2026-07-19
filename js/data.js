/* ============================================================
   APCN & AM InaSN 2027 — e-Pocket Book content.
   Structure follows the committee prototype (13 pages).
   Placeholder blocks are marked [ ... ] — replace with final data.
   ============================================================ */

/* decorative inline SVGs (from the prototype, recoloured via currentColor
   so the stylesheet decides the accent) */
window.BOOK_ART = {
  gapura: `<svg viewBox="0 0 40 60" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
    <path d="M6 58V22l-3 2V14L20 2l17 12v10l-3-2v36"/>
    <path d="M12 58V26h16v32M20 2v8M9 20h22M11 14h18"/>
    <path d="M16 58V38h8v20"/>
  </svg>`,
  dancer: `<svg viewBox="0 0 120 220" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M60 26l-6-8 6-12 6 12z"/>
    <circle cx="60" cy="38" r="10"/>
    <path d="M54 34l-8-6M66 34l8-6"/>
    <path d="M60 48v52"/>
    <path d="M60 56c-14 2-26-4-36-14M24 42l-8-2 4 8"/>
    <path d="M60 56c14 2 26-4 36-14M96 42l8-2-4 8"/>
    <path d="M60 100c-10 24-14 44-10 62M50 162l-8 8M50 162h14"/>
    <path d="M60 100c10 24 14 44 10 62M70 162l8 8"/>
    <path d="M46 84h28M44 118h32"/>
  </svg>`
};

const SPEAKER_COUNTRIES = ["ID","MY","SG","JP","KR","AU","TH","PH","IN","CN"];
const SPEAKER_PHOTOS = ["aw","bc","ep","fa","km","nv","sr","tn"]
  .map(k => `assets/images/speaker-${k}.jpg`);
/* 70 placeholder speakers — replace with the scientific committee's final
   list (name, degrees, institution, photo); sample headshots cycle for now */
const SPEAKERS = Array.from({ length: 70 }, (_, i) => ({
  id: `s-${String(i + 1).padStart(2, "0")}`,
  initials: `S${String(i + 1).padStart(2, "0")}`,
  name: "Speaker Name",
  affil: "Institution",
  country: SPEAKER_COUNTRIES[i % SPEAKER_COUNTRIES.length],
  avatar: SPEAKER_PHOTOS[i % SPEAKER_PHOTOS.length]
}));

const BOOK_DATA = {
  meta: {
    congress: "APCN & AM InaSN 2027",
    fullName: "18th Asian Pacific Congress of Nephrology",
    kicker: "Congress Pocket Guide · 2027",
    tagline: "Bali, Indonesia · 9–11 December 2027 · The Westin Resort Nusa Dua & Bali International Convention Centre",
    baseline: "Everything You Need, In One Pocket",
    dates: "9–11 December 2027",
    city: "Nusa Dua, Bali, Indonesia",
    venue: "The Westin Resort Nusa Dua & Bali International Convention Centre",
    host: "Indonesian Society of Nephrology (InaSN)",
    pco: "Journey 4U",
    secretariatPhone: "+62 858-5894-1945",
    secretariatWhatsApp: "6285858941945",
    secretariatEmail: "secretariat@apcnbali2027.com",
    title: "e-Pocket Book"
  },

  notifications: [],

  pages: [
    { type: "cover", id: "cover", photo: "assets/images/hero-shot.jpg" },

    { type: "toc", id: "contents",
      eyebrow: "02 · Daftar Isi",
      title: "Table of Contents",
      items: [
        { label: "Cover", pageId: "cover" },
        { label: "Table of Contents", pageId: "contents" },
        { label: "Welcome to Bali", pageId: "welcome-bali" },
        { label: "Meet Our Speakers", pageId: "speakers-1" },
        { label: "Meet Our Speakers (cont.)", pageId: "speakers-2" },
        { label: "Agenda — Day 1", pageId: "day-1" },
        { label: "Agenda — Day 2", pageId: "day-2" },
        { label: "Exhibition Floor Plan", pageId: "exhibition-floor-plan" },
        { label: "Notice Board", pageId: "notice-board" },
        { label: "Good to Know", pageId: "good-to-know" },
        { label: "Shuttle Service", pageId: "shuttle" },
        { label: "Hotel & Accommodation", pageId: "hotels" },
        { label: "Thank You", pageId: "thank-you" }
      ]
    },

    { type: "welcome-bali", id: "welcome-bali",
      eyebrow: "03 · Welcome",
      title: "Welcome to Bali",
      photo: "assets/images/foto-22.jpg",       /* Balinese dancer */
      avatar: "assets/images/speaker-aw.jpg",   /* placeholder portrait for the signing doctor */
      body: [
        "On behalf of the Organizing Committee, welcome to Bali — the Island of the Gods. We are honored to host you for three days of scientific exchange, connection, and discovery, set against the island's warmth and culture."
      ],
      /* TODO: nama & jabatan dokter yang memberi sambutan (mis. Ketua Panitia / Ketua InaSN) */
      name: "[Nama Dokter]",
      role: "Congress President, APCN & AM InaSN 2027"
    },

    { type: "speakers", id: "speakers-1",
      eyebrow: "04 · Speakers",
      title: "Meet Our Speakers",
      speakers: SPEAKERS.slice(0, 35)
    },
    { type: "speakers", id: "speakers-2",
      eyebrow: "05 · Speakers (cont.)",
      title: "Meet Our Speakers",
      speakers: SPEAKERS.slice(35)
    },

    { type: "day", id: "day-1",
      eyebrow: "06 · Agenda",
      title: "Day 1 — 9 December 2027",
      note: "Schedule indicative — to be confirmed with final scientific program.",
      sessions: [
        { time: "07:30–08:30", titleText: "Registration & Welcome Coffee", room: "Main Foyer" },
        { time: "08:30–09:30", titleText: "Opening Ceremony", room: "Mangupura Hall" },
        { time: "09:30–10:30", titleText: "Keynote Lecture — TBC", room: "Mangupura Hall" },
        { time: "10:30–11:00", titleText: "Coffee Break · Exhibition Visit", room: "Exhibition Hall" },
        { time: "11:00–12:30", titleText: "Parallel Symposium A / B / C", room: "Jakarta A+B / Nusantara 1&2 / 3" },
        { time: "12:30–13:30", titleText: "Lunch Symposium", room: "Mangupura Hall" },
        { time: "13:30–15:00", titleText: "Free Paper & Poster Session", room: "Flower Rooms" },
        { time: "15:00–15:30", titleText: "Afternoon Tea Symposium", room: "Mangupura Hall" },
        { time: "15:30–17:00", titleText: "Plenary Session", room: "Mangupura Hall" }
      ]
    },
    { type: "day", id: "day-2",
      eyebrow: "07 · Agenda",
      title: "Day 2 — 10 December 2027",
      note: "Schedule indicative — to be confirmed with final scientific program.",
      sessions: [
        { time: "08:00–09:00", titleText: "Morning Keynote — TBC", room: "Mangupura Hall" },
        { time: "09:00–10:30", titleText: "Parallel Symposium D / E / F", room: "Jakarta A+B / Nusantara 1&2 / 3" },
        { time: "10:30–11:00", titleText: "Coffee Break · Exhibition Visit", room: "Exhibition Hall" },
        { time: "11:00–12:30", titleText: "Industrial Symposium (Sponsored)", room: "Mangupura Hall" },
        { time: "12:30–13:30", titleText: "Lunch Symposium", room: "Mangupura Hall" },
        { time: "13:30–15:00", titleText: "Workshop Series", room: "Flower Rooms" },
        { time: "15:00–16:30", titleText: "Spotlight Session", room: "Nusantara 3" },
        { time: "19:00–22:00", titleText: "Congress Gala Dinner", room: "TBC" }
      ]
    },

    { type: "exhibition-map", id: "exhibition-floor-plan",
      eyebrow: "08 · Exhibition",
      title: "Exhibition Floor Plan — Level 1, BICC",
      note: "61 booths total, 3×3m each. Final numbered layout per official floor plan.",
      grid: { cols: 12, booths: 60, stageSpan: 3 },
      /* tier → number of booths, assigned from booth 1 upward */
      tiers: [
        { key: "platinum", label: "Platinum Booths", count: 6 },
        { key: "gold",     label: "Gold Booths",     count: 4 },
        { key: "silver",   label: "Silver Booths",   count: 4 },
        { key: "bronze",   label: "Bronze Booths",   count: 1 }
      ],
      legend: [
        { key: "stage",    label: "Main Stage / Entrance" },
        { key: "platinum", label: "Platinum Booths" },
        { key: "gold",     label: "Gold Booths" },
        { key: "silver",   label: "Silver Booths" },
        { key: "bronze",   label: "Bronze Booths" }
      ]
    },

    { type: "notice", id: "notice-board",
      eyebrow: "09 · Notice Board",
      title: "Notice Board",
      photo: "assets/images/foto-28.jpg",
      /* Halaman fleksibel — belum ada konten tetap. */
      lead: "This page is reserved for congress announcements. Commonly used content:",
      ideas: [
        "Congress FAQ (Wi-Fi, badge collection, dress code)",
        "Emergency & medical assistance contacts",
        "Certificate of attendance / CME point info"
      ]
    },

    { type: "goodtoknow", id: "good-to-know",
      eyebrow: "10 · Good to Know",
      title: "Good to Know",
      photo: "assets/images/foto-47.jpg",
      /* Halaman kedua yang masih terbuka. */
      lead: "A second open page. Possible content:",
      ideas: [
        "About Bali — currency, weather, local etiquette",
        "Sponsors & Partners logo wall",
        "City map — restaurants & attractions near Nusa Dua"
      ]
    },

    { type: "shuttle", id: "shuttle",
      eyebrow: "11 · Shuttle Service",
      title: "Getting to the Venue",
      photo: "assets/images/foto-48.jpg",
      note: "Shuttle schedule to be confirmed based on final hotel zoning & delegate count.",
      routes: [
        { route: "Zone A Hotels → BICC", pickup: "Main Lobby",    times: "06:30 / 07:00 / 07:30" },
        { route: "Zone B Hotels → BICC", pickup: "Main Lobby",    times: "06:45 / 07:15 / 07:45" },
        { route: "BICC → Zone A Hotels", pickup: "Main Entrance", times: "17:00 / 17:30 / 18:00" },
        { route: "BICC → Zone B Hotels", pickup: "Main Entrance", times: "17:15 / 17:45 / 18:15" }
      ]
    },

    { type: "hotels", id: "hotels",
      eyebrow: "12 · Accommodation",
      title: "Hotel & Accommodation",
      photo: "assets/images/foto-49.jpg",
      /* TODO: nama hotel partner resmi + jarak tempuh dari BICC sesuai kontrak akomodasi */
      hotels: [
        { name: "The Westin Resort Nusa Dua", badge: "Official Venue", distance: "Adjacent to BICC — 0 min walk" },
        { name: "[Hotel Name]", badge: "Partner Hotel", distance: "≈ [X] min from BICC" },
        { name: "[Hotel Name]", badge: "Partner Hotel", distance: "≈ [X] min from BICC" }
      ]
    },

    { type: "thankyou", id: "thank-you",
      photo: "assets/images/foto-32.jpg",
      title: "Terima Kasih",
      subtitle: "Thank You for Joining Us in Bali",
      contact: "APCN & AM InaSN 2027 · secretariat@apcnbali2027.com · +62 858-5894-1945",
      closer: "Organized by InaSN · PCO: Journey 4U"
    }
  ]
};
