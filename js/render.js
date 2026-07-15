const S = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
const ICON = {
  home:      `<svg viewBox="0 0 24 24" ${S}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>`,
  program:   `<svg viewBox="0 0 24 24" ${S}><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/></svg>`,
  speakers:  `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/></svg>`,
  exhibition:`<svg viewBox="0 0 24 24" ${S}><path d="M4 8h16v12H4z"/><path d="M4 8l2-4h12l2 4M9 12h6"/></svg>`,
  sponsors:  `<svg viewBox="0 0 24 24" ${S}><path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 20l-5 2.1 1-5.5-4-3.9 5.5-.8z"/></svg>`,
  map:       `<svg viewBox="0 0 24 24" ${S}><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>`,
  prev:      `<svg viewBox="0 0 24 24" ${S}><path d="M15 5l-7 7 7 7"/></svg>`,
  next:      `<svg viewBox="0 0 24 24" ${S}><path d="M9 5l7 7-7 7"/></svg>`,
  search:    `<svg viewBox="0 0 24 24" ${S}><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/></svg>`,
  zoom:      `<svg viewBox="0 0 24 24" ${S}><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg>`,
  fullscreen:`<svg viewBox="0 0 24 24" ${S}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>`,
  share:     `<svg viewBox="0 0 24 24" ${S}><circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="M8 11l7-4M8 13l7 4"/></svg>`,
  sound:     `<svg viewBox="0 0 24 24" ${S}><path d="M5 9v6h4l5 4V5L9 9z"/><path d="M17 9a4 4 0 010 6"/></svg>`,
  soundoff:  `<svg viewBox="0 0 24 24" ${S}><path d="M5 9v6h4l5 4V5L9 9z"/><path d="M22 9l-5 6M17 9l5 6"/></svg>`,
  phone:     `<svg viewBox="0 0 24 24" ${S}><path d="M5 4h4l2 5-2 1a11 11 0 005 5l1-2 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>`,
  whatsapp:  `<svg viewBox="0 0 24 24" ${S}><path d="M4 20l1.5-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9c0 4 2 6 6 6"/></svg>`,
  pin:       `<svg viewBox="0 0 24 24" ${S}><path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>`,
  clock:     `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/></svg>`,
  badge:     `<svg viewBox="0 0 24 24" ${S}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="2.4"/><path d="M8 17h8"/></svg>`,
  certificate:`<svg viewBox="0 0 24 24" ${S}><rect x="4" y="4" width="16" height="12" rx="1"/><path d="M9 20l3-2 3 2v-4"/></svg>`,
  coffee:    `<svg viewBox="0 0 24 24" ${S}><path d="M5 8h11v5a4 4 0 01-4 4H9a4 4 0 01-4-4z"/><path d="M16 9h2a2 2 0 010 4h-2M7 3v2M11 3v2"/></svg>`,
  camera:    `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="12" cy="13" r="3"/><path d="M8 7l1.5-2h5L16 7"/></svg>`,
  language:  `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.5 3 2.5 13 0 16M12 4c-2.5 3-2.5 13 0 16"/></svg>`,
  plane:     `<svg viewBox="0 0 24 24" ${S}><path d="M10 13L3 15l1-3 6-2-4-6h2l7 5 4-1a1.5 1.5 0 010 3l-4 1-2 8H9z"/></svg>`,
  bus:       `<svg viewBox="0 0 24 24" ${S}><rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M8 20v-3M16 20v-3"/><circle cx="8" cy="17" r="0.6"/><circle cx="16" cy="17" r="0.6"/></svg>`,
  route:     `<svg viewBox="0 0 24 24" ${S}><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M6 8v6a4 4 0 004 4h6"/></svg>`,
  car:       `<svg viewBox="0 0 24 24" ${S}><path d="M4 14l2-6h12l2 6M3 14h18v4H3z"/><circle cx="7" cy="18" r="1"/><circle cx="17" cy="18" r="1"/></svg>`,
  parking:   `<svg viewBox="0 0 24 24" ${S}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 17V8h4a3 3 0 010 6H9"/></svg>`,
  prayer:    `<svg viewBox="0 0 24 24" ${S}><path d="M12 3l6 6H6l6-6z"/><path d="M6 9v11h12V9M10 20v-4a2 2 0 014 0v4"/></svg>`,
  medical:   `<svg viewBox="0 0 24 24" ${S}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/></svg>`,
  lost:      `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="8"/><path d="M9.5 10a2.5 2.5 0 013.5-1.5c1.2.6 1.2 2 0 2.8-.7.5-1 1-1 1.7M12 16v.5"/></svg>`,
  atm:       `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/></svg>`,
  accessible:`<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="5" r="1.6"/><path d="M8 9h8M12 9v5l3 4M12 14l-3 4"/></svg>`,
  water:     `<svg viewBox="0 0 24 24" ${S}><path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" ${S}><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.4"/><circle cx="17" cy="7" r="0.6"/></svg>`,
  x:         `<svg viewBox="0 0 24 24" ${S}><path d="M5 5l14 14M19 5L5 19"/></svg>`,
  linkedin:  `<svg viewBox="0 0 24 24" ${S}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 10v7M8 7v.2M12 17v-4a2 2 0 014 0v4"/></svg>`,
  globe:     `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4a13 13 0 000 16M12 4a13 13 0 010 16"/></svg>`
};

let BOOK = null;
function setBook(b){ BOOK = b; }
const meta = () => BOOK.meta;
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const esc = (s="") => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const paras = (arr=[]) => arr.map(p => `<p>${esc(p)}</p>`).join("");

/* default ground per page type (navy vs paper) — creates the book's rhythm */
const GROUND = {
  cover:"navy", welcome:"navy", about:"paper", committee:"navy", glance:"navy",
  day:"paper", speakers:"paper", faculty:"navy", "exhibition-map":"paper",
  "exhibition-directory":"paper", sponsors:"paper", "sponsor-platinum":"navy",
  symposium:"paper", social:"paper", "venue-map":"paper", info:"paper",
  emergency:"navy", useful:"paper", thankyou:"navy"
};

function head(p){
  return `${p.eyebrow ? `<p class="eyebrow">${esc(p.eyebrow)}</p>`:""}
          ${p.title ? `<h2 class="page__title">${esc(p.title)}</h2>`:""}
          ${p.lead ? `<p class="lead">${esc(p.lead)}</p>`:""}`;
}
function sponsorBand(fs){
  if(!fs) return "";
  if(fs.state === "available")
    return `<div class="sponsor-band is-available">Sponsorship available — this space can carry your brand. Contact the secretariat.</div>`;
  return `<div class="sponsor-band">${esc(fs.label)} <b>${esc(fs.name)}</b></div>`;
}

/* ---- individual renderers --------------------------------------- */
const R = {
  cover(p){
    const m = meta();
    return `<div class="p-cover">
      ${p.art ? `<div class="p-cover__art"><img src="${p.art}" alt=""></div>` : ""}
      <div class="p-cover__kicker">Om Swastyastu</div>
      <div class="p-cover__inner">
        <div class="p-cover__host">${esc(m.host)}</div>
        <div class="p-cover__congress">${esc(m.congress)}</div>
        <div class="p-cover__full">${esc(m.fullName)}</div>
        <div class="p-cover__rule"></div>
        <div class="p-cover__theme">${esc(m.theme)}</div>
      </div>
      <div class="p-cover__meta"><b>${esc(m.dates)}</b> · ${esc(m.city)}<br>${esc(m.venue)}</div>
    </div>`;
  },
  welcome(p){
    return `<div class="page__body p-welcome" style="padding:0">
      <div class="p-welcome__portrait"><img src="${p.avatar}" alt="${esc(p.name)}"></div>
      <div class="p-welcome__text">
        ${head(p)}
        <div class="prose">${paras(p.body)}</div>
        <div class="p-welcome__sig"><div class="n">${esc(p.name)}</div><div class="r">${esc(p.role)}</div></div>
      </div>
    </div>`;
  },
  about(p){
    return `<div class="page__body">
      ${head(p)}
      ${p.img ? `<div class="p-about__photo"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>` : ''}
      <div class="p-about" style="margin-top:14px">
        <div class="prose">${paras(p.body)}</div>
        <div class="p-about__facts">
          ${p.facts.map(f=>`<div class="fact"><span class="k">${esc(f.k)}</span><span class="v">${esc(f.v)}</span></div>`).join("")}
        </div>
      </div>
    </div>`;
  },
  committee(p){
    const grp = g => `<div class="p-committee__group"><h3>${esc(g.heading)}</h3>
      <div class="p-committee__grid">${g.members.map(mm=>`<div class="member"><div class="mn">${esc(mm.name)}</div><div class="mr">${esc(mm.role)}</div></div>`).join("")}</div></div>`;
    return `<div class="page__body">${head(p)}<div style="margin-top:12px">${p.groups.map(grp).join("")}</div></div>`;
  },
  glance(p){
    const thead = `<tr>${p.columns.map(c=>`<th>${esc(c)}</th>`).join("")}</tr>`;
    const rows = p.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("");
    return `<div class="page__body" style="display:flex;flex-direction:column">
      ${head(p)}
      <table class="glance-table" style="margin-top:10px"><thead>${thead}</thead><tbody>${rows}</tbody></table>
      ${sponsorBand(p.footerSponsor)}
    </div>`;
  },
  day(p){
    const s = ss => {
      const room = BOOK._rooms[ss.room];
      const roomLink = room ? `<a class="room-link" data-goto="venue-map-bicc" data-room="${ss.room}">${ICON.pin}${esc(room.name)}</a>` : "";
      const spk = ss.speaker && BOOK._spk[ss.speaker] ? `<a class="speaker-link" data-goto="speaker-directory" data-speaker="${ss.speaker}">${esc(BOOK._spk[ss.speaker].name)}</a>` : "";
      return `<div class="sess">
        <div class="t">${esc(ss.time)}</div>
        <div class="c">
          <div class="ti">${esc(ss.titleText)}</div>
          <div class="meta">
            <span class="kind-pill kind-${ss.kind}">${esc(ss.kind)}</span>
            ${roomLink}${spk?` · ${spk}`:""}
            ${ss.detail?`<span>· ${esc(ss.detail)}</span>`:""}
          </div>
        </div></div>`;
    };
    return `<div class="page__body" style="display:flex;flex-direction:column">
      ${head(p)}
      <div class="p-day__rail" style="margin-top:8px">${p.sessions.map(s).join("")}</div>
      ${sponsorBand(p.footerSponsor)}
    </div>`;
  },
  speakers(p){
    const card = s => `<div class="spk" data-speaker="${s.id}"><img src="${s.avatar}" alt="${esc(s.name)}"><div class="sn">${esc(s.name)}</div><div class="sc">${esc(s.country)}</div></div>`;
    return `<div class="page__body" style="display:flex;flex-direction:column">
      ${head(p)}
      <div class="p-speakers__grid" style="margin-top:12px">${p.speakers.map(card).join("")}</div>
      <div class="bio" data-bio><button class="bio__close" aria-label="Close">✕</button>
        <div class="bio__top"><img data-bio-img alt=""><div><div class="bio__name" data-bio-name></div><div class="bio__affil" data-bio-affil></div></div></div>
        <div class="bio__text" data-bio-text></div>
        <div class="bio__sessions" data-bio-sessions></div>
      </div>
    </div>`;
  },
  faculty(p){
    return `<div class="page__body" style="display:flex;flex-direction:column">
      ${head(p)}
      <div class="p-faculty__grid" style="margin-top:12px">
        ${p.members.map(m=>`<div class="fac"><img src="${m.avatar}" alt="${esc(m.name)}"><div class="fn">${esc(m.name)}</div><div class="fc">${esc(m.country)}</div></div>`).join("")}
      </div></div>`;
  },
  "exhibition-map"(p){
    return `<div class="page__body p-map">
      ${head(p)}
      <div class="p-map__frame" data-mapframe data-zoom="${p.map}">${BOOK._svg[p.map]||""}</div>
      <div class="p-map__legend">${p.legend.map(l=>`<span><i class="sw ${l.swatch}"></i>${esc(l.label)}</span>`).join("")}</div>
    </div>`;
  },
  "exhibition-directory"(p){
    const row = e => `<div class="exh"><span class="b">${esc(e.booth)}</span><div><div class="en">${esc(e.name)}</div><div class="ed">${esc(e.desc)}</div><a href="${e.url}" target="_blank" rel="noopener">Visit website ↗</a></div></div>`;
    return `<div class="page__body" style="display:flex;flex-direction:column">${head(p)}
      <div class="exh-list" style="margin-top:12px">${p.exhibitors.map(row).join("")}</div></div>`;
  },
  sponsors(p){
    const logo = s => {
      const inner = `<img src="${s.logo}" alt="${esc(s.name)}">`;
      if(s.page) return `<a data-goto="${s.page}">${inner}</a>`;
      if(s.url)  return `<a href="${s.url}" target="_blank" rel="noopener">${inner}</a>`;
      return inner;
    };
    const tier = t => `<div class="tier tier--${t.name.toLowerCase()}"><div class="tier__name">${esc(t.name)}</div>
      <div class="tier__logos">${t.sponsors.map(logo).join("")}</div></div>`;
    return `<div class="page__body p-sponsors">${head(p)}${p.tiers.map(tier).join("")}</div>`;
  },
  "sponsor-platinum"(p){
    return `<div class="page__body">
      <p class="eyebrow">${esc(p.eyebrow)}</p>
      <h2 class="page__title" style="color:#fff">${esc(p.name)}</h2>
      <div class="p-plat" style="margin-top:10px">
        <div>
          <div class="p-plat__logo"><img src="${p.logo}" alt="${esc(p.name)}"></div>
          <div class="p-plat__qr">
            <div class="qrcard"><img src="${p.qrWebsite}" alt="QR to website"><span>Website</span></div>
            <div class="qrcard"><img src="${p.qrCatalogue}" alt="QR to catalogue"><span>Digital catalogue</span></div>
          </div>
        </div>
        <div>
          <p class="p-plat__profile">${esc(p.profile)}</p>
          <ul class="p-plat__products">${p.products.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
          <div class="p-plat__booth">${ICON.pin} Visit us at booth <b>&nbsp;${esc(p.booth)}</b></div>
        </div>
      </div>
    </div>`;
  },
  symposium(p){
    const row = s => {
      const room = BOOK._rooms[s.room];
      return `<div class="symp">
        <div class="when"><div class="d">${esc(s.day)}</div><div class="h">${esc(s.time)}</div>${room?`<a class="room-link" data-goto="venue-map-bicc" data-room="${s.room}">${esc(room.name)}</a>`:""}</div>
        <div><div class="ti">${esc(s.titleText)}</div><div class="host">Hosted by ${esc(s.host)}</div></div>
      </div>`;
    };
    return `<div class="page__body">${head(p)}<div style="margin-top:10px">${p.items.map(row).join("")}</div></div>`;
  },
  social(p){
    const card = e => `<div class="sevent"><div class="sevent__img"><img src="${e.img}" alt="${esc(e.name)}"></div>
      <div class="sevent__b"><h3>${esc(e.name)}</h3><div class="sevent__meta">${esc(e.when)} · ${esc(e.where)} · ${esc(e.dress)}</div>
      <div class="sevent__desc">${esc(e.desc)}</div></div></div>`;
    return `<div class="page__body" style="display:flex;flex-direction:column">${head(p)}
      <div class="p-social__grid" style="margin-top:12px">${p.events.map(card).join("")}</div></div>`;
  },
  "venue-map"(p){
    return `<div class="page__body p-map" data-venue>
      ${head(p)}
      <div class="p-map__frame" data-mapframe data-zoom="${p.map}">${BOOK._svg[p.map]||""}</div>
      <div class="room-readout" data-readout><em>Tap a room to see its use and capacity.</em></div>
      ${sponsorBand(p.footerSponsor)}
    </div>`;
  },
  info(p){
    return `<div class="page__body" style="display:flex;flex-direction:column">${head(p)}
      <div style="margin-top:10px">${p.rows.map(r=>`<div class="inforow"><span class="ic">${ICON[r.icon]||ICON.globe}</span><span class="k">${esc(r.k)}</span><span class="v">${esc(r.v)}</span></div>`).join("")}</div>
      ${sponsorBand(p.footerSponsor)}</div>`;
  },
  useful(p){
    const w = p.wifi;
    return `<div class="page__body" style="display:flex;flex-direction:column">${head(p)}
      <div class="wifi-card" style="margin-top:12px">
        <div><div class="lbl">Wi-Fi Network</div><div class="val">${esc(w.network)}</div></div>
        <div><div class="lbl">Password</div><div class="val">${esc(w.password)}</div></div>
      </div>
      <div>${p.rows.map(r=>`<div class="inforow"><span class="ic">${ICON[r.icon]||ICON.globe}</span><span class="k">${esc(r.k)}</span><span class="v">${esc(r.v)}</span></div>`).join("")}</div>
      ${sponsorBand(p.footerSponsor)}</div>`;
  },
  emergency(p){
    const m = meta();
    const c = x => `<a class="emerg ${x.urgent?"urgent":""}" href="tel:${x.tel}"><div class="el">${esc(x.label)}</div><div class="ev">${esc(x.value)}</div></a>`;
    const qr = k => { const q = BOOK.qr[k]; return `<div class="qrcard"><img src="${q.img}" alt="QR: ${esc(q.label)}"><span>${esc(q.label)}</span></div>`; };
    return `<div class="page__body">${head(p)}
      <div class="p-emerg" style="margin-top:12px">
        <div class="emerg-list">${p.contacts.map(c).join("")}
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="cta-btn" href="tel:${m.secretariatPhone.replace(/\s/g,"")}">${ICON.phone} Call Secretariat</a>
            <a class="cta-btn ghost" href="https://wa.me/${m.secretariatWhatsApp}" target="_blank" rel="noopener">${ICON.whatsapp} WhatsApp</a>
          </div>
        </div>
        <div class="p-emerg__qr">${p.qrKeys.map(qr).join("")}</div>
      </div></div>`;
  },
  thankyou(p){
    const m = meta();
    return `<div class="p-thanks">
      <div class="p-thanks__art"><img src="${p.art}" alt=""></div>
      <div class="p-thanks__inner">
        ${p.img ? `<div class="p-thanks__photo"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>` : ''}
        <p class="eyebrow" style="justify-content:center">${esc(p.eyebrow)}</p>
        <h2 class="p-thanks__title">${esc(p.title)}</h2>
        <div class="prose" style="color:#dbe3ee">${paras(p.body)}</div>
        <div class="p-thanks__cta">
          <a class="cta-btn" href="tel:${m.secretariatPhone.replace(/\s/g,"")}">${ICON.phone} Call Secretariat</a>
          <a class="cta-btn ghost" href="https://wa.me/${m.secretariatWhatsApp}" target="_blank" rel="noopener">${ICON.whatsapp} WhatsApp</a>
        </div>
        <div class="p-thanks__social">
          <a href="${m.social.website}" target="_blank" rel="noopener" aria-label="Website">${ICON.globe}</a>
          <a href="${m.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
          <a href="${m.social.x}" target="_blank" rel="noopener" aria-label="X">${ICON.x}</a>
          <a href="${m.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICON.linkedin}</a>
        </div>
        <div class="p-thanks__closer">${esc(p.closer)}</div>
      </div>
    </div>`;
  }
};

/* Build a full .page element for a given page-data object + page number. */
function renderPage(p, pageNumber){
  const ground = GROUND[p.type] || "paper";
  const wrap = el(`<div class="page pat-${ground}"></div>`);
  wrap.innerHTML = (R[p.type] || (()=>`<div class="page__body"><h2 class="page__title">${esc(p.type)}</h2></div>`))(p);
  if(!["cover","thankyou"].includes(p.type)){
    const n = el(`<div class="page__pageno">${pageNumber}</div>`);
    wrap.appendChild(n);
  }
  wrap.dataset.pageId = p.id;
  attachLocal(wrap, p);
  return wrap;
}

/* speaker bio open/close within a speakers page */
function attachLocal(wrap, p){
  if(p.type === "speakers"){
    const bio = wrap.querySelector("[data-bio]");
    const open = id => {
      const s = BOOK._spk[id]; if(!s) return;
      bio.querySelector("[data-bio-img]").src = s.avatar;
      bio.querySelector("[data-bio-name]").textContent = s.name;
      bio.querySelector("[data-bio-affil]").textContent = `${s.affil} · ${s.country}`;
      bio.querySelector("[data-bio-text]").textContent = s.bio;
      bio.querySelector("[data-bio-sessions]").innerHTML = (s.sessions||[]).map(x=>`<span>${esc(x)}</span>`).join("");
      bio.classList.add("open");
    };
    wrap.querySelectorAll(".spk").forEach(c => c.addEventListener("click", ()=>open(c.dataset.speaker)));
    bio.querySelector(".bio__close").addEventListener("click", ()=>bio.classList.remove("open"));
    wrap._openBio = open;
  }
  if(p.type === "venue-map") wireVenue(wrap, p);
  if(p.type === "exhibition-map") wireExhibition(wrap, p);
}

function wireVenue(wrap, p){
  const readout = wrap.querySelector("[data-readout]");
  wrap.querySelectorAll(".room").forEach(g=>{
    g.addEventListener("click", e=>{
      e.stopPropagation();
      wrap.querySelectorAll(".rm").forEach(r=>r.classList.remove("active"));
      const rm = g.querySelector(".rm"); if(rm) rm.classList.add("active");
      const info = p.rooms[g.dataset.room];
      if(info) readout.innerHTML = `<b>${esc(info.name)}</b> <span class="cap">${esc(info.cap)}</span> <em>${esc(info.use)}</em>`;
    });
  });
  wrap._highlightRoom = id => {
    const g = wrap.querySelector(`.room[data-room="${id}"]`);
    if(g) g.dispatchEvent(new Event("click"));
  };
}
function wireExhibition(wrap, p){
  wrap.querySelectorAll(".bth").forEach(g=>{
    g.addEventListener("click", e=>{
      e.stopPropagation();
      const booth = g.dataset.booth;
      window.APCN?.gotoBooth?.(booth);
    });
    g.addEventListener("mouseenter", ()=>{ const rm=g.querySelector(".booth"); if(rm) rm.classList.add("active"); });
    g.addEventListener("mouseleave", ()=>{ const rm=g.querySelector(".booth"); if(rm) rm.classList.remove("active"); });
  });
}

