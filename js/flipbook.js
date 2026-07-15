const easeInOut = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

class Flipbook {
  constructor(book, root){
    this.book = book;
    this.root = root;                 // .book element
    this.pages = book.pages;
    this.N = this.pages.length;
    this.flipped = 0;                 // desktop: number of turned leaves
    this.mIndex = 0;                  // mobile: current single page
    this.animating = false;
    this.onChange = () => {};
    setBook(book);
    this.prep();
    this.mount();
    window.APCN = this.api();
    addEventListener("resize", () => this.onResize());
  }

  /* ---- derived indexes -------------------------------------------- */
  prep(){
    const b = this.book;
    b._spk = {}; b._rooms = {}; b._svg = window.INLINE_SVG || {};
    for(const p of this.pages){
      if(p.type === "speakers") p.speakers.forEach(s => b._spk[s.id] = s);
      if(p.type === "venue-map") Object.assign(b._rooms, p.rooms);
    }
  }
  async prepSvg(){
    const paths = new Set();
    for(const p of this.pages) if(p.map) paths.add(p.map);
    for(const path of paths){
      if(this.book._svg[path]) continue;
      try { this.book._svg[path] = await (await fetch(path)).text(); }
      catch { this.book._svg[path] = `<div style="color:#C6A253;padding:20px">Map: ${path}</div>`; }
    }
  }

  get isDesktop(){ return matchMedia("(min-width: 768px)").matches; }

  /* ---- build DOM for current mode --------------------------------- */
  mount(){
    this.pagesLayer = this.root.querySelector(".book__pages");
    this.gutter = this.root.parentElement.querySelector(".book__gutter-shadow")
              || this.root.querySelector(".book__gutter-shadow");
    this.mtrack = this.root.querySelector(".mtrack");
    this.buildDesktop();
    this.buildMobile();
    this.bindPointer();
    this.layout(false);
  }

  buildDesktop(){
    this.pagesLayer.innerHTML = "";
    this.papers = [];
    this.Np = Math.ceil(this.N / 2);
    for(let j = 0; j < this.Np; j++){
      const paper = document.createElement("div");
      paper.className = "paper"; paper.dataset.paper = j;
      const front = document.createElement("div"); front.className = "paper__face paper__face--front";
      const back  = document.createElement("div"); back.className  = "paper__face paper__face--back";
      const fi = 2*j, bi = 2*j+1;
      front.appendChild(renderPage(this.pages[fi], fi+1));
      front.insertAdjacentHTML("beforeend", `<div class="turn-shadow"></div>`);
      if(bi < this.N){
        back.appendChild(renderPage(this.pages[bi], bi+1));
      } else { back.classList.add("is-empty"); }
      back.insertAdjacentHTML("beforeend", `<div class="turn-shadow"></div>`);
      paper.append(front, back);
      this.pagesLayer.appendChild(paper);
      this.papers.push(paper);
    }
  }

  buildMobile(){
    if(!this.mtrack) return;
    this.mtrack.innerHTML = `<div class="mtrack__row"></div>`;
    this.mrow = this.mtrack.querySelector(".mtrack__row");
    for(let i = 0; i < this.N; i++){
      const slide = document.createElement("div"); slide.className = "mslide";
      slide.appendChild(renderPage(this.pages[i], i+1));
      slide.insertAdjacentHTML("beforeend", `<div class="mslide__shade"></div>`);
      this.mrow.appendChild(slide);
    }
    this.mrow.style.width = `${this.N*100}%`;
    this.mrow.querySelectorAll(".mslide").forEach(s => s.style.width = `${100/this.N}%`);
  }

  /* ---- resting layout --------------------------------------------- */
  layout(animate){
    if(this.isDesktop){
      for(let j = 0; j < this.Np; j++){
        const p = this.papers[j];
        const isFlipped = j < this.flipped;
        p.style.transition = "none";
        p.style.transform = `rotateY(${isFlipped ? -180 : 0}deg)`;
        p.style.zIndex = isFlipped ? j : (2*this.Np - j);
        p.querySelectorAll(".turn-shadow").forEach(s => s.style.opacity = 0);
      }
      this.gutter && (this.gutter.style.opacity = 0);
    } else {
      this.setMobile(this.mIndex, false);
    }
    this.onChange(this.currentId());
  }

  /* ---- angle + shading for one turning paper ---------------------- */
  setAngle(paper, angle){
    paper.style.transform = `rotateY(${angle}deg)`;
    const t = Math.min(1, Math.abs(angle)/180);
    const fs = paper.querySelector(".paper__face--front .turn-shadow");
    const bs = paper.querySelector(".paper__face--back .turn-shadow");
    if(fs) fs.style.opacity = (t*0.5).toFixed(3);
    if(bs) bs.style.opacity = ((1-t)*0.35).toFixed(3);
    if(this.gutter) this.gutter.style.opacity = (Math.sin(t*Math.PI)*0.55).toFixed(3);
  }

  animateTurn(paper, from, to, done){
    if(reduce){ this.setAngle(paper, to); done(); return; }
    this.animating = true;
    const dur = 640, t0 = performance.now();
    const step = now => {
      const p = clamp((now - t0)/dur, 0, 1);
      this.setAngle(paper, from + (to-from)*easeInOut(p));
      if(p < 1){ requestAnimationFrame(step); }
      else { this.animating = false; done(); }
    };
    requestAnimationFrame(step);
  }

  /* ---- turn API --------------------------------------------------- */
  next(){ this.isDesktop ? this.turnForward() : this.setMobile(this.mIndex+1, true); }
  prev(){ this.isDesktop ? this.turnBack()    : this.setMobile(this.mIndex-1, true); }

  turnForward(){
    if(this.animating || this.flipped >= this.Np) return;
    const paper = this.papers[this.flipped];
    paper.style.transition = "none"; paper.style.zIndex = 3*this.Np;
    this.animateTurn(paper, 0, -180, () => { this.flipped++; this.layout(false); });
  }
  turnBack(){
    if(this.animating || this.flipped <= 0) return;
    const paper = this.papers[this.flipped-1];
    paper.style.transition = "none"; paper.style.zIndex = 3*this.Np;
    this.animateTurn(paper, -180, 0, () => { this.flipped--; this.layout(false); });
  }

  /* ---- mobile slide ---------------------------------------------- */
  setMobile(i, animate){
    i = clamp(i, 0, this.N-1);
    this.mIndex = i;
    if(!this.mrow) return;
    this.mrow.style.transition = animate ? "transform .5s cubic-bezier(.4,0,.2,1)" : "none";
    this.mrow.style.transform = `translateX(${-i*(100/this.N)}%)`;
    this.mrow.querySelectorAll(".mslide__shade").forEach(s => s.style.opacity = 0);
    this.onChange(this.currentId());
  }

  /* ---- pointer drag ---------------------------------------------- */
  bindPointer(){
    const bookEl = this.root;
    const TH = 7;                    // movement threshold before a turn begins
    let mode = null, startX = 0, startY = 0, active = null, pageW = 0, rect = null;
    let pending = false, pointerId = null;

    // record a candidate; do NOT capture or preventDefault yet, so taps on
    // links/cards and vertical scrolls still work.
    const down = e => {
      if(this.animating || this.dragging) return;
      pending = true; pointerId = e.pointerId;
      startX = e.clientX; startY = e.clientY;
      rect = (this.isDesktop ? bookEl : this.mtrack).getBoundingClientRect();
      pageW = this.isDesktop ? rect.width/2 : rect.width;
    };

    const commit = (dx) => {
      if(this.isDesktop){
        if(dx < 0 && this.flipped < this.Np){ mode = "fwd"; active = this.papers[this.flipped]; }
        else if(dx > 0 && this.flipped > 0){ mode = "back"; active = this.papers[this.flipped-1]; }
        else { pending = false; return false; }
        active.style.transition = "none"; active.style.zIndex = 3*this.Np;
      } else { mode = "slide"; }
      this.dragging = true; pending = false;
      bookEl.setPointerCapture?.(pointerId);
      return true;
    };

    const move = e => {
      if(pending){
        const dx = e.clientX - startX, dy = e.clientY - startY;
        if(Math.abs(dx) < TH && Math.abs(dy) < TH) return;      // still a potential tap
        if(Math.abs(dy) > Math.abs(dx)){ pending = false; return; } // vertical → let it scroll
        if(!commit(dx)) return;
      }
      if(!this.dragging) return;
      e.preventDefault();
      const dx = e.clientX - startX;
      if(mode === "slide"){
        const pct = clamp(-dx/pageW, -1, 1);
        const base = -this.mIndex*(100/this.N);
        this.mrow.style.transition = "none";
        this.mrow.style.transform = `translateX(${base - pct*(100/this.N)}%)`;
        const dir = dx < 0 ? this.mIndex+1 : this.mIndex-1;
        const sh = this.mrow.children[clamp(dir,0,this.N-1)]?.querySelector(".mslide__shade");
        if(sh) sh.style.opacity = Math.abs(pct)*0.5;
      } else {
        let prog, angle;
        if(mode === "fwd"){ prog = clamp(-dx/pageW, 0, 1); angle = -180*prog; }
        else { prog = clamp(dx/pageW, 0, 1); angle = -180 + 180*prog; }
        this._prog = prog;
        this.setAngle(active, angle);
      }
    };

    const up = e => {
      if(pending){ pending = false; return; }   // it was a tap → let click handlers run
      if(!this.dragging) return;
      this.dragging = false;
      const dx = e.clientX - startX;
      if(mode === "slide"){
        if(Math.abs(dx) > pageW*0.18) this.setMobile(this.mIndex + (dx<0?1:-1), true);
        else this.setMobile(this.mIndex, true);
      } else {
        const prog = this._prog || 0;
        if(mode === "fwd"){
          if(prog > 0.32) this.animateTurn(active, -180*prog, -180, () => { this.flipped++; this.layout(false); });
          else this.animateTurn(active, -180*prog, 0, () => this.layout(false));
        } else {
          const ang = -180 + 180*prog;
          if(prog > 0.32) this.animateTurn(active, ang, 0, () => { this.flipped--; this.layout(false); });
          else this.animateTurn(active, ang, -180, () => this.layout(false));
        }
      }
      mode = null; active = null; this._prog = 0;
    };

    bookEl.addEventListener("pointerdown", down);
    bookEl.addEventListener("pointermove", move, { passive: false });
    bookEl.addEventListener("pointerup", up);
    bookEl.addEventListener("pointercancel", up);

    // two-finger horizontal trackpad swipe → exactly ONE page turn per gesture.
    // A single swipe emits a long stream of wheel events (with momentum), so we
    // turn immediately on the first significant delta, then lock until the
    // stream goes quiet — otherwise the momentum tail flips through every slide.
    let wheelLock = false, wheelEndTimer = null;
    bookEl.addEventListener("wheel", e => {
      const ax = Math.abs(e.deltaX), ay = Math.abs(e.deltaY);
      if(ax < ay * 0.8 || ax < 8) return;   // vertical-dominant → let inner scroll handle it
      e.preventDefault();
      clearTimeout(wheelEndTimer);
      wheelEndTimer = setTimeout(() => { wheelLock = false; }, 260);
      if(wheelLock || this.animating) return;
      wheelLock = true;                      // one turn now; re-armed only after the swipe settles
      // follow the finger like the drag does: swipe right → go right (previous),
      // swipe left → go left (next).
      if(e.deltaX > 0) this.prev(); else this.next();
    }, { passive: false });
  }

  /* ---- navigation ------------------------------------------------- */
  indexOfId(id){ return this.pages.findIndex(p => p.id === id); }
  currentId(){
    if(this.isDesktop){
      const idx = clamp(2*this.flipped, 0, this.N-1);
      return this.pages[idx].id;
    }
    return this.pages[this.mIndex].id;
  }

  goToId(id, opts = {}){
    const idx = this.indexOfId(id);
    if(idx < 0) return;
    if(this.isDesktop){
      const target = (idx % 2 === 0) ? idx/2 : (idx+1)/2;
      this.jumpDesktop(target, opts.animate);
    } else {
      this.setMobile(idx, opts.animate);
    }
    if(opts.after) setTimeout(() => this.runAfter(id, opts.after), opts.animate ? 350 : 30);
  }

  jumpDesktop(target, animate){
    target = clamp(target, 0, this.Np);
    if(!animate || Math.abs(target - this.flipped) > 1 || this.animating){
      this.flipped = target; this.layout(false); return;
    }
    if(target > this.flipped) this.turnForward();
    else if(target < this.flipped) this.turnBack();
  }

  runAfter(pageId, after){
    const wrap = [...this.pagesLayer.querySelectorAll(`.page[data-page-id="${pageId}"]`)]
      .concat([...(this.mrow?.querySelectorAll(`.page[data-page-id="${pageId}"]`)||[])]);
    wrap.forEach(w => {
      if(after.room && w._highlightRoom) w._highlightRoom(after.room);
      if(after.speaker && w._openBio) w._openBio(after.speaker);
    });
  }

  onResize(){
    const nowDesktop = this.isDesktop;
    if(this._wasDesktop === undefined) this._wasDesktop = nowDesktop;
    if(nowDesktop !== this._wasDesktop){
      this._wasDesktop = nowDesktop;
      // keep position roughly in sync across modes
      if(nowDesktop) this.flipped = clamp(Math.round(this.mIndex/2), 0, this.Np);
      else this.mIndex = clamp(this.flipped*2, 0, this.N-1);
      this.layout(false);
    }
  }

  api(){
    return {
      next: () => this.next(),
      prev: () => this.prev(),
      goToId: (id, opts) => this.goToId(id, opts),
      current: () => this.currentId(),
      total: this.N,
      indexOfId: id => this.indexOfId(id),
      gotoBooth: booth => {
        this.goToId("exhibition-directory", { animate: true });
        setTimeout(() => {
          const rows = document.querySelectorAll(`.page[data-page-id="exhibition-directory"] .exh`);
          rows.forEach(r => {
            const b = r.querySelector(".b");
            if(b && b.textContent.trim() === booth){
              r.style.background = "rgba(198,162,83,.18)";
              r.scrollIntoView({ block: "center", behavior: "smooth" });
              setTimeout(() => r.style.background = "", 1600);
            }
          });
        }, 380);
      },
      progress: () => this.isDesktop
        ? clamp(2*this.flipped, 0, this.N-1)/(this.N-1)
        : this.mIndex/(this.N-1),
      goToProgress: f => {
        const idx = Math.round(f*(this.N-1));
        this.goToId(this.pages[idx].id, { animate: false });
      }
    };
  }
}


