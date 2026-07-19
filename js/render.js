const S = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
const ICON = {
  home:      `<svg viewBox="0 0 24 24" ${S}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>`,
  speakers:  `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/></svg>`,
  agenda:    `<svg viewBox="0 0 24 24" ${S}><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/></svg>`,
  exhibition:`<svg viewBox="0 0 24 24" ${S}><path d="M4 8h16v12H4z"/><path d="M4 8l2-4h12l2 4M9 12h6"/></svg>`,
  shuttle:   `<svg viewBox="0 0 24 24" ${S}><rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 20v-3M16 20v-3"/><circle cx="8" cy="17" r="0.6"/><circle cx="16" cy="17" r="0.6"/></svg>`,
  hotels:    `<svg viewBox="0 0 24 24" ${S}><path d="M3 19V5"/><path d="M3 15h18v4"/><path d="M3 15v-3h18v3"/><circle cx="7" cy="9.5" r="1.8"/><path d="M11 12V8.5h7a3 3 0 013 3"/></svg>`,
  prev:      `<svg viewBox="0 0 24 24" ${S}><path d="M15 5l-7 7 7 7"/></svg>`,
  next:      `<svg viewBox="0 0 24 24" ${S}><path d="M9 5l7 7-7 7"/></svg>`,
  search:    `<svg viewBox="0 0 24 24" ${S}><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/></svg>`,
  zoom:      `<svg viewBox="0 0 24 24" ${S}><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg>`,
  fullscreen:`<svg viewBox="0 0 24 24" ${S}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>`,
  share:     `<svg viewBox="0 0 24 24" ${S}><circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="M8 11l7-4M8 13l7 4"/></svg>`,
  sound:     `<svg viewBox="0 0 24 24" ${S}><path d="M5 9v6h4l5 4V5L9 9z"/><path d="M17 9a4 4 0 010 6"/></svg>`,
  soundoff:  `<svg viewBox="0 0 24 24" ${S}><path d="M5 9v6h4l5 4V5L9 9z"/><path d="M22 9l-5 6M17 9l5 6"/></svg>`,
  globe:     `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4a13 13 0 000 16M12 4a13 13 0 010 16"/></svg>`
};

let BOOK = null;
function setBook(b){ BOOK = b; }
const meta = () => BOOK.meta;
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const esc = (s="") => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const paras = (arr=[]) => arr.map(p => `<p>${esc(p)}</p>`).join("");

/* ground per page type — dark brand pages frame the light content pages */
const GROUND = {
  cover:"dark", toc:"light", "welcome-bali":"dark", speakers:"light",
  day:"light", "exhibition-map":"light", notice:"dark", goodtoknow:"dark",
  shuttle:"light", hotels:"light", thankyou:"dark"
};

function head(p){
  return `${p.eyebrow ? `<p class="eyebrow">${esc(p.eyebrow)}</p>`:""}
          ${p.title ? `<h2 class="page__title">${esc(p.title)}</h2>`:""}
          ${p.lead ? `<p class="lead">${esc(p.lead)}</p>`:""}`;
}

/* label-style table used by agenda + shuttle pages */
function dataTable(columns, rows, noteText){
  return `<table class="dtable">
    <thead><tr>${columns.map(c=>`<th>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td class="${i===0?"is-key":""}">${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table>
  ${noteText ? `<p class="tbl-note">${esc(noteText)}</p>` : ""}`;
}

/* ---- individual renderers --------------------------------------- */
/* full-bleed photo layer for dark pages; the ::after scrim keeps text AA */
const photoBg = p => p.photo
  ? `<div class="page__bg" style="background-image:url('${p.photo}')"></div>` : "";

const R = {
  cover(p){
    const m = meta();
    return `${photoBg(p)}<div class="p-cover">
      <div class="p-cover__kicker">${esc(m.kicker)}</div>
      <h1 class="p-cover__title">${esc(m.congress)}</h1>
      <div class="p-cover__full">${esc(m.fullName)}</div>
      <div class="p-cover__rule"></div>
      <div class="p-cover__tagline">${esc(m.tagline)}</div>
      <div class="p-cover__baseline">${esc(m.baseline)}</div>
    </div>`;
  },

  toc(p){
    const row = it => {
      const n = BOOK.pages.findIndex(x => x.id === it.pageId) + 1;
      return `<button class="toc__row" data-goto="${it.pageId}">
        <span class="toc__label">${esc(it.label)}</span>
        <span class="toc__dots"></span>
        <span class="toc__num">${String(n).padStart(2,"0")}</span>
      </button>`;
    };
    return `<div class="page__body">${head(p)}
      <div class="toc">${p.items.map(row).join("")}</div>
    </div>`;
  },

  "welcome-bali"(p){
    return `<div class="page__body p-bali">
      <div class="p-bali__text">
        ${head(p)}
        <div class="prose">${paras(p.body)}</div>
        <div class="p-bali__sig">
          ${p.avatar ? `<img class="p-bali__face" src="${p.avatar}" alt="" loading="lazy">` : ""}
          <div>
            <div class="n">— ${esc(p.name)}</div>
            <div class="r">${esc(p.role)}</div>
          </div>
        </div>
      </div>
      <div class="p-bali__photo"><img src="${p.photo}" alt="Balinese dancer" loading="lazy"></div>
    </div>`;
  },

  speakers(p){
    const card = s => `<div class="spk">
      ${s.avatar
        ? `<img class="spk__photo" src="${s.avatar}" alt="" loading="lazy">`
        : `<span class="spk__avatar" aria-hidden="true">${esc(s.initials)}</span>`}
      <span class="spk__name">${esc(s.name)}</span>
      <span class="spk__affil">${esc(s.affil)}, ${esc(s.country)}</span>
    </div>`;
    return `<div class="page__body">${head(p)}
      <div class="p-speakers__grid">${p.speakers.map(card).join("")}</div>
    </div>`;
  },

  day(p){
    return `<div class="page__body">${head(p)}
      ${dataTable(["Time","Session","Room"], p.sessions.map(s=>[s.time, s.titleText, s.room]), p.note)}
    </div>`;
  },

  "exhibition-map"(p){
    const tierOf = i => {                       // booth index (0-based) → tier key
      let acc = 0;
      for(const t of p.tiers){ acc += t.count; if(i < acc) return t.key; }
      return "";
    };
    const cells = Array.from({length: p.grid.booths}, (_,i) =>
      `<span class="booth ${tierOf(i)?`booth--${tierOf(i)}`:""}"></span>`).join("");
    return `<div class="page__body">${head(p)}
      <div class="floor">
        <span class="booth booth--stage" style="grid-column: span ${p.grid.stageSpan}">STAGE</span>
        ${cells}
      </div>
      <div class="floor__legend">
        ${p.legend.map(l=>`<span class="lg"><i class="sw sw--${l.key}"></i>${esc(l.label)}</span>`).join("")}
      </div>
      <p class="tbl-note">${esc(p.note)}</p>
    </div>`;
  },

  notice: placeholderPage,
  goodtoknow: placeholderPage,

  shuttle(p){
    return `<div class="page__body">${head(p)}
      <div class="page__banner"><img src="${p.photo}" alt="" loading="lazy"></div>
      ${dataTable(["Route","Pickup Point","Departure"], p.routes.map(r=>[r.route, r.pickup, r.times]), p.note)}
    </div>`;
  },

  hotels(p){
    const card = h => `<div class="hotel">
      <span class="hotel__badge ${h.badge === "Official Venue" ? "is-venue" : ""}">${esc(h.badge)}</span>
      <div class="hotel__name">${esc(h.name)}</div>
      <div class="hotel__dist">${esc(h.distance)}</div>
    </div>`;
    return `<div class="page__body">${head(p)}
      <div class="page__banner"><img src="${p.photo}" alt="" loading="lazy"></div>
      <div class="p-hotels">${p.hotels.map(card).join("")}</div>
    </div>`;
  },

  thankyou(p){
    return `${photoBg(p)}<div class="p-thanks">
      <h2 class="p-thanks__title">${esc(p.title)}</h2>
      <div class="p-thanks__sub">${esc(p.subtitle)}</div>
      <div class="p-cover__rule"></div>
      <div class="p-thanks__contact">${esc(p.contact)}</div>
      <div class="p-thanks__closer">${esc(p.closer)}</div>
    </div>`;
  }
};

/* dark placeholder pages (Notice Board / Good to Know) over a photo ground */
function placeholderPage(p){
  return `${photoBg(p)}<div class="page__body p-open">
    ${head(p)}
    <ul class="p-open__ideas">${p.ideas.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
  </div>`;
}

/* Build a full .page element for a given page-data object + page number. */
function renderPage(p, pageNumber){
  const ground = GROUND[p.type] || "light";
  const wrap = el(`<div class="page pat-${ground}"></div>`);
  wrap.innerHTML = (R[p.type] || (()=>`<div class="page__body"><h2 class="page__title">${esc(p.type)}</h2></div>`))(p);
  if(!["cover","thankyou"].includes(p.type)){
    const n = el(`<div class="page__pageno">${pageNumber}</div>`);
    wrap.appendChild(n);
  }
  wrap.dataset.pageId = p.id;
  return wrap;
}
