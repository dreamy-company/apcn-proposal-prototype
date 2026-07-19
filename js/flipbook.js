const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FLIP_MS = 700;                       // keep in sync with settings.flippingTime

/* Thin wrapper around StPageFlip (js/vendor/page-flip.browser.js, global St)
   that preserves the original Flipbook public API used by controls.js:
   next/prev/goToId/currentId/current/indexOfId/progress/goToProgress/total/
   onChange/api()/runAfter. StPageFlip provides the soft page-curl rendering,
   drag/touch handling and the portrait (single page) / landscape (spread)
   orientation switch. */
class Flipbook {
  constructor(book, root){
    this.book = book;
    this.root = root;                 // .book element
    this.pages = book.pages;
    this.N = this.pages.length;
    this.onChange = () => {};
    setBook(book);
    this.prep();
    this.mount();
    window.APCN = this.api();
  }

  /* ---- derived indexes -------------------------------------------- */
  prep(){
    const b = this.book;
    b._spk = {};
    for(const p of this.pages)
      if(p.type === "speakers") p.speakers.forEach(s => b._spk[s.id] = s);
  }

  /* ---- build sheets + StPageFlip ----------------------------------- */
  mount(){
    for(let i = 0; i < this.N; i++){
      const sheet = document.createElement("div");
      sheet.className = "sheet";
      if(i === 0) sheet.dataset.density = "hard";   // cover flips as a rigid board
      sheet.appendChild(renderPage(this.pages[i], i+1));
      this.root.appendChild(sheet);
    }

    this.pf = new St.PageFlip(this.root, {
      width: 800, height: 600,                // base page size at --ar 1.333
      size: "stretch",
      minWidth: 365, maxWidth: 1400,
      minHeight: 274, maxHeight: 1050,
      showCover: true,
      usePortrait: true,                      // single-page curl on narrow screens
      autoSize: true,
      flippingTime: FLIP_MS,
      maxShadowOpacity: 0.4,
      mobileScrollSupport: true,              // inner .page__body keeps touch scroll
      clickEventForward: true,
      disableFlipByClick: true,               // page taps stay interactions; corners still flip
      showPageCorners: true,
      swipeDistance: 30,
      startPage: 0,
    });
    this.pf.loadFromHTML(this.root.querySelectorAll(".sheet"));

    this.pf.on("flip", () => { this._syncShift(); this.onChange(this.currentId()); });
    this.pf.on("changeOrientation", () => this._syncShift());
    this._syncShift();
    this.bindWheel();
  }

  /* ---- half-page centring shift ------------------------------------
     StPageFlip always draws single pages (cover / lone back page) in one
     half of the block; slide the book so they sit centred, animated by
     the CSS transition on .book. */
  _shiftFor(leftIdx){
    if(this.pf.getOrientation() !== "landscape") return "";
    if(leftIdx <= 0) return "translateX(-25%)";
    if(this.N % 2 === 0 && leftIdx >= this.N-1) return "translateX(25%)";
    return "";
  }
  _syncShift(leftIdx = this.pf.getCurrentPageIndex()){
    this.root.style.transform = this._shiftFor(leftIdx);
  }
  /* left index of the spread that contains page idx */
  _spreadLeft(idx){
    if(this.pf.getOrientation() !== "landscape" || idx <= 0) return idx;
    return (idx % 2 === 1) ? idx : idx-1;
  }

  /* ---- turn API --------------------------------------------------- */
  next(){
    const idx = this.pf.getCurrentPageIndex();
    this._syncShift(idx === 0 ? 1 : idx+2);           // slide while the page turns
    reduce ? this.pf.turnToNextPage() : this.pf.flipNext();
  }
  prev(){
    const idx = this.pf.getCurrentPageIndex();
    this._syncShift(clamp(idx-2, 0, this.N-1));
    reduce ? this.pf.turnToPrevPage() : this.pf.flipPrev();
  }

  /* ---- navigation ------------------------------------------------- */
  indexOfId(id){ return this.pages.findIndex(p => p.id === id); }

  /* report the RIGHT page of the spread (matches the pre-library ids used
     by the scrub label, hash deep links and nav highlighting) */
  currentId(){
    let idx = this.pf.getCurrentPageIndex();
    if(this.pf.getOrientation() === "landscape" && idx % 2 === 1)
      idx = Math.min(idx+1, this.N-1);
    return this.pages[clamp(idx, 0, this.N-1)].id;
  }
  current(){ return this.currentId(); }
  get total(){ return this.N; }
  progress(){
    const id = this.currentId();
    return clamp(this.indexOfId(id), 0, this.N-1)/(this.N-1);
  }
  goToProgress(f){
    const idx = Math.round(f*(this.N-1));
    this.goToId(this.pages[idx].id, { animate: false });
  }

  goToId(id, opts = {}){
    const idx = this.indexOfId(id);
    if(idx < 0) return;
    const animate = opts.animate && !reduce;
    this._syncShift(this._spreadLeft(idx));
    if(animate) this.pf.flip(idx);
    else this.pf.turnToPage(idx);
    if(opts.after) setTimeout(() => this.runAfter(id, opts.after), animate ? FLIP_MS + 80 : 30);
  }

  runAfter(pageId, after){
    this.root.querySelectorAll(`.page[data-page-id="${pageId}"]`).forEach(w => {
      if(after.room && w._highlightRoom) w._highlightRoom(after.room);
      if(after.speaker && w._openBio) w._openBio(after.speaker);
    });
  }

  /* ---- trackpad: two-finger horizontal swipe → ONE page turn -------
     A single swipe emits a long stream of wheel events (with momentum). We sum
     deltaX across the gesture and turn once it becomes decisive, then lock until
     the stream goes quiet — so both directions fire symmetrically and the
     momentum tail can't flip through every page. */
  bindWheel(){
    let wheelAcc = 0, wheelLock = false, wheelEndTimer = null;
    this.root.addEventListener("wheel", e => {
      if(Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;   // vertical-dominant → let inner scroll handle it
      e.preventDefault();
      clearTimeout(wheelEndTimer);
      wheelEndTimer = setTimeout(() => { wheelLock = false; wheelAcc = 0; }, 200);
      if(wheelLock) return;
      wheelAcc += e.deltaX;
      if(Math.abs(wheelAcc) < 30) return;    // wait until the swipe is decisive
      wheelLock = true;                      // one turn per swipe; re-armed after it settles
      // inverted swipe: swipe right → next, swipe left → previous.
      if(wheelAcc > 0) this.next(); else this.prev();
      wheelAcc = 0;
    }, { passive: false });
  }

  api(){
    return {
      next: () => this.next(),
      prev: () => this.prev(),
      goToId: (id, opts) => this.goToId(id, opts),
      current: () => this.currentId(),
      total: this.N,
      indexOfId: id => this.indexOfId(id),
      progress: () => this.progress(),
      goToProgress: f => this.goToProgress(f)
    };
  }
}
