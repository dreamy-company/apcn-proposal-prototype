function buildIndex(book){
  const items = [];
  const add = (kind, title, pageId, extra={}) => items.push({ kind, title, pageId, ...extra });

  for(const p of book.pages){
    if(p.type === "day")
      p.sessions.forEach(s => add("Session", s.titleText, p.id, { time: `${p.title} · ${s.time}` }));
    if(p.type === "speakers")
      p.speakers.forEach(s => add("Speaker", s.name, p.id, { speaker: s.id, sub: s.affil }));
    if(p.type === "faculty")
      p.members.forEach(m => add("Faculty", m.name, p.id, { sub: m.country }));
    if(p.type === "exhibition-directory")
      p.exhibitors.forEach(e => add("Exhibitor", e.name, p.id, { sub: `Booth ${e.booth}` }));
    if(p.type === "sponsors")
      p.tiers.forEach(t => t.sponsors.forEach(s => add("Sponsor", s.name, s.page || p.id, { sub: t.name })));
    if(p.type === "symposium")
      p.items.forEach(s => add("Symposium", s.titleText, p.id, { sub: s.host }));
    if(p.type === "venue-map")
      Object.entries(p.rooms).forEach(([k,r]) => add("Room", r.name, p.id, { room: k, sub: r.use }));
    if(["about","glance","info","useful","emergency","social","thankyou"].includes(p.type))
      add("Page", p.title, p.id);
  }
  return q => {
    q = q.trim().toLowerCase();
    if(!q) return [];
    return items
      .filter(it => (it.title + " " + (it.sub||"")).toLowerCase().includes(q))
      .slice(0, 40);
  };
}

function initControls(book, fb){
  const $ = s => document.querySelector(s);
  const q = buildIndex(book);

  /* ---------- bottom section nav ---------- */
  const navMap = {
    home: "cover", program: "program-glance", speakers: "speaker-directory",
    exhibition: "exhibition-floor-plan", sponsors: "sponsor-recognition", map: "venue-map-bicc"
  };
  const nav = $(".nav");
  nav.innerHTML = Object.entries({
    home:"Home", program:"Program", speakers:"Speakers", exhibition:"Exhibition", sponsors:"Sponsors", map:"Map"
  }).map(([k,label]) => `<button data-nav="${k}">${ICON[k==="home"?"home":k]||""}<span>${label}</span></button>`).join("");
  nav.querySelectorAll("button").forEach(b =>
    b.addEventListener("click", () => fb.goToId(navMap[b.dataset.nav], { animate: true })));

  /* section membership for active state: walk pages, remember last-seen section */
  const typeToNav = {
    cover:'home', welcome:'home', about:'home', committee:'home', thankyou:'home',
    glance:'program', day:'program', symposium:'program', social:'program',
    speakers:'speakers', faculty:'speakers',
    'exhibition-map':'exhibition', 'exhibition-directory':'exhibition',
    sponsors:'sponsors', 'sponsor-platinum':'sponsors',
    'venue-map':'map', info:'map', emergency:'map', useful:'map'
  };
  const sectionOf = {};
  for(const p of book.pages){
    sectionOf[p.id] = p.nav || typeToNav[p.type] || 'home';
  }
  const setActiveNav = id => {
    const sec = sectionOf[id] || "home";
    nav.querySelectorAll("button").forEach(b => b.classList.toggle("active", b.dataset.nav === sec));
  };

  /* ---------- tools ---------- */
  const tools = $(".tools");
  tools.innerHTML = `
    <button data-t="prev" aria-label="Previous">${ICON.prev}</button>
    <button data-t="next" aria-label="Next">${ICON.next}</button>
    <span class="divider"></span>
    <button data-t="search" aria-label="Search">${ICON.search}</button>
    <button data-t="zoom" aria-label="Zoom">${ICON.zoom}</button>
    <button data-t="fs" aria-label="Fullscreen">${ICON.fullscreen}</button>
    <button data-t="share" aria-label="Share">${ICON.share}</button>
    <button data-t="sound" aria-label="Sound" aria-pressed="false">${ICON.soundoff}</button>`;
  const toolBtn = t => tools.querySelector(`[data-t="${t}"]`);
  toolBtn("prev").onclick = () => fb.prev();
  toolBtn("next").onclick = () => fb.next();
  toolBtn("search").onclick = openSearch;
  toolBtn("zoom").onclick = zoomCurrent;
  toolBtn("fs").onclick = toggleFs;
  toolBtn("share").onclick = share;
  toolBtn("sound").onclick = toggleSound;

  /* ---------- mobile prev/next (shown directly under the slide) ---------- */
  const mnav = $(".mnav");
  if(mnav){
    mnav.innerHTML = `
      <button data-m="prev" aria-label="Previous page">${ICON.prev}</button>
      <button data-m="next" aria-label="Next page">${ICON.next}</button>`;
    mnav.querySelector('[data-m="prev"]').onclick = () => fb.prev();
    mnav.querySelector('[data-m="next"]').onclick = () => fb.next();
  }

  /* ---------- scrub bar ---------- */
  const track = $(".scrub__track"), fill = $(".scrub__fill"), thumb = $(".scrub__thumb"), label = $(".scrub__label");
  const paint = () => {
    const f = fb.progress();
    fill.style.width = (f*100)+"%"; thumb.style.left = (f*100)+"%";
    const id = fb.current(); const idx = fb.indexOfId(id);
    label.textContent = `${idx+1}/${fb.total}`;
  };
  let scrubbing = false;
  const scrubTo = clientX => {
    const r = track.getBoundingClientRect();
    fb.goToProgress(Math.max(0, Math.min(1, (clientX - r.left)/r.width)));
    paint();
  };
  track.addEventListener("pointerdown", e => { scrubbing = true; track.setPointerCapture(e.pointerId); scrubTo(e.clientX); });
  track.addEventListener("pointermove", e => scrubbing && scrubTo(e.clientX));
  track.addEventListener("pointerup", () => scrubbing = false);

  /* ---------- change hook: nav active, scrub, hash, aria ---------- */
  const live = $("#live");
  fb.onChange = id => {
    setActiveNav(id); paint();
    history.replaceState(null, "", `#/page/${id}`);
    const p = book.pages.find(x => x.id === id);
    if(p && live) live.textContent = `Page: ${p.title || p.type}`;
  };

  /* ---------- cross-page links (data-goto) ---------- */
  document.addEventListener("click", e => {
    const g = e.target.closest("[data-goto]");
    if(!g) return;
    e.preventDefault();
    fb.goToId(g.dataset.goto, {
      animate: true,
      after: { room: g.dataset.room, speaker: g.dataset.speaker }
    });
  });

  /* ---------- map frame → zoom overlay ---------- */
  document.addEventListener("click", e => {
    const fr = e.target.closest("[data-mapframe]");
    if(fr) openZoom(fr.innerHTML);
  });

  /* ---------- search overlay ---------- */
  const so = $("#search-overlay"), input = so.querySelector("input"), results = so.querySelector(".search-results");
  function openSearch(){ so.classList.add("open"); input.value = ""; results.innerHTML = ""; input.focus(); }
  function closeSearch(){ so.classList.remove("open"); }
  input.addEventListener("input", () => {
    const rs = q(input.value);
    if(!input.value.trim()){ results.innerHTML = ""; return; }
    results.innerHTML = rs.length
      ? rs.map((r,i) => `<button data-i="${i}"><span class="r-kind">${r.kind}</span><span class="r-title">${r.title}${r.sub?` <em style="color:#8aa0bd">— ${r.sub}</em>`:""}</span></button>`).join("")
      : `<div class="search-empty">No results for “${input.value}”.</div>`;
    results.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
      const r = rs[+btn.dataset.i]; closeSearch();
      fb.goToId(r.pageId, { animate: true, after: { room: r.room, speaker: r.speaker } });
    }));
  });
  so.addEventListener("click", e => { if(e.target === so) closeSearch(); });

  /* ---------- mobile top search field (reuses the search index q) ---------- */
  const ms = $(".msearch");
  if(ms){
    const mi = ms.querySelector("input"), mr = ms.querySelector(".msearch__results");
    mi.addEventListener("input", () => {
      const rs = q(mi.value);
      if(!mi.value.trim()){ mr.innerHTML = ""; return; }
      mr.innerHTML = rs.length
        ? rs.map((r,i) => `<button data-i="${i}"><span class="r-kind">${r.kind}</span><span class="r-title">${r.title}${r.sub?` — ${r.sub}`:""}</span></button>`).join("")
        : `<div class="search-empty">No results for “${mi.value}”.</div>`;
      mr.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
        const r = rs[+btn.dataset.i]; mi.value = ""; mr.innerHTML = ""; mi.blur();
        fb.goToId(r.pageId, { animate: true, after: { room: r.room, speaker: r.speaker } });
      }));
    });
    document.addEventListener("click", e => { if(!ms.contains(e.target)) mr.innerHTML = ""; });
  }

  /* ---------- zoom overlay ---------- */
  const zo = $("#zoom-overlay"), zinner = zo.querySelector(".zoom-view__inner");
  let zscale = 1, zx = 0, zy = 0;
  function openZoom(html){
    zinner.innerHTML = html; zscale = 1; zx = 0; zy = 0; applyZoom();
    zo.classList.add("open");
  }
  function applyZoom(){ zinner.style.transform = `translate(-50%,-50%) translate(${zx}px,${zy}px) scale(${zscale})`; }
  function zoomCurrent(){
    const active = document.querySelector(`.page[data-page-id="${fb.current()}"] [data-mapframe]`);
    if(active) return openZoom(active.innerHTML);
    const page = document.querySelector(`.paper__face--front .page[data-page-id="${fb.current()}"]`)
              || document.querySelector(`.page[data-page-id="${fb.current()}"]`);
    if(page) openZoom(`<div style="width:70vw;max-width:900px">${page.outerHTML}</div>`);
  }
  zo.addEventListener("click", e => { if(e.target === zo) zo.classList.remove("open"); });
  zo.addEventListener("wheel", e => { e.preventDefault(); zscale = Math.max(1, Math.min(4, zscale - e.deltaY*0.002)); applyZoom(); }, { passive:false });
  { let drag=false, sx=0, sy=0;
    zo.addEventListener("pointerdown", e => { drag=true; sx=e.clientX-zx; sy=e.clientY-zy; });
    zo.addEventListener("pointermove", e => { if(drag){ zx=e.clientX-sx; zy=e.clientY-sy; applyZoom(); } });
    zo.addEventListener("pointerup", () => drag=false);
  }

  /* ---------- fullscreen ---------- */
  function toggleFs(){ document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.(); }

  /* ---------- share ---------- */
  async function share(){
    const url = location.href;
    const data = { title: `${book.meta.congress} — ${book.meta.title}`, text: book.meta.fullName, url };
    try { if(navigator.share) { await navigator.share(data); return; } } catch {}
    try { await navigator.clipboard.writeText(url); toast("Link copied to clipboard"); }
    catch { toast(url); }
  }

  /* ---------- sound (synth page rustle, no audio file) ---------- */
  let sound = localStorage.getItem("apcn-sound") === "1";
  let actx = null;
  const reflectSound = () => {
    toolBtn("sound").innerHTML = sound ? ICON.sound : ICON.soundoff;
    toolBtn("sound").setAttribute("aria-pressed", sound);
  };
  reflectSound();
  function toggleSound(){ sound = !sound; localStorage.setItem("apcn-sound", sound?"1":"0"); reflectSound(); if(sound) rustle(); }
  function rustle(){
    if(!sound) return;
    try{
      actx = actx || new (window.AudioContext||window.webkitAudioContext)();
      const dur = .22, sr = actx.sampleRate, n = sr*dur;
      const buf = actx.createBuffer(1, n, sr), d = buf.getChannelData(0);
      for(let i=0;i<n;i++){ const e = Math.pow(1 - i/n, 2.2); d[i] = (Math.random()*2-1)*e*0.28; }
      const src = actx.createBufferSource(); src.buffer = buf;
      const bp = actx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.value=2600; bp.Q.value=.7;
      src.connect(bp).connect(actx.destination); src.start();
    }catch{}
  }
  const _next = fb.next.bind(fb), _prev = fb.prev.bind(fb);
  fb.next = () => { rustle(); _next(); };
  fb.prev = () => { rustle(); _prev(); };

  /* ---------- toast ---------- */
  const toastEl = $("#toast");
  let toastT;
  function toast(msg){ toastEl.textContent = msg; toastEl.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(()=>toastEl.classList.remove("show"), 2600); }

  /* ---------- keyboard ---------- */
  addEventListener("keydown", e => {
    if(so.classList.contains("open")){ if(e.key==="Escape") closeSearch(); return; }
    if(zo.classList.contains("open")){ if(e.key==="Escape") zo.classList.remove("open"); return; }
    if(e.key==="ArrowRight") fb.next();
    else if(e.key==="ArrowLeft") fb.prev();
    else if(e.key==="/"){ e.preventDefault(); openSearch(); }
    else if(e.key==="f") toggleFs();
    else if(e.key==="Home") fb.goToId(book.pages[0].id, { animate:false });
    else if(e.key==="End") fb.goToId(book.pages[book.pages.length-1].id, { animate:false });
  });

  /* ---------- push-notification banner ---------- */
  const notif = $("#notif");
  const active = (book.notifications||[]).find(n => n.state === "sold");
  if(active && notif){
    notif.querySelector(".notif__text").innerHTML = active.text.replace(active.sponsor, `<b>${active.sponsor}</b>`);
    notif.querySelector(".notif__go").onclick = () => { fb.goToId(active.page, { animate:true }); notif.classList.remove("show"); };
    notif.querySelector(".notif__x").onclick = () => notif.classList.remove("show");
    setTimeout(() => notif.classList.add("show"), 2400);
  }

  /* ---------- deep link on load ---------- */
  const m = location.hash.match(/#\/page\/(.+)$/);
  if(m){ const id = decodeURIComponent(m[1]); if(fb.indexOfId(id) >= 0) fb.goToId(id, { animate:false }); }
  paint(); setActiveNav(fb.current());
}

function initScrollHints() {
  document.querySelectorAll('.page__body').forEach(el => {
    const update = () => {
      const more = el.scrollHeight > el.clientHeight + 4
                && (el.scrollTop + el.clientHeight) < (el.scrollHeight - 12);
      el.classList.toggle('has-more', more);
    };
    el.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(update).observe(el);
  });
}

const book = BOOK_DATA;
const fb = new Flipbook(book, document.getElementById("book"));
initControls(book, fb);
initScrollHints();