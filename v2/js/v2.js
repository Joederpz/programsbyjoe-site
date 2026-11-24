// Featured carousel
(function () {
  var slides = document.querySelector('.slides');
  if (!slides) return;
  var cards = slides.children, dotsEl = document.querySelector('.dots');
  var idx = 0, timer;
  function perView() { return window.innerWidth <= 800 ? 1 : window.innerWidth <= 1100 ? 2 : 4; }
  function pages() { return Math.max(1, cards.length - perView() + 1); }
  function buildDots() {
    dotsEl.innerHTML = '';
    for (var i = 0; i < pages(); i++) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      (function (n) { b.onclick = function () { go(n); }; })(i);
      dotsEl.appendChild(b);
    }
  }
  function go(n) {
    var p = pages();
    idx = (n + p) % p;
    var step = cards[0].getBoundingClientRect().width + 20;
    slides.style.transform = 'translateX(' + (-idx * step) + 'px)';
    [].forEach.call(dotsEl.children, function (d, i) { d.classList.toggle('on', i === idx); });
  }
  function auto() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6000); }
  document.querySelector('.arrow.prev').onclick = function () { go(idx - 1); auto(); };
  document.querySelector('.arrow.next').onclick = function () { go(idx + 1); auto(); };
  window.addEventListener('resize', function () { buildDots(); go(0); });
  // swipe on touch screens (arrows are hidden on phones)
  var sx = null;
  slides.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  slides.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) { go(idx + (dx < 0 ? 1 : -1)); auto(); }
  });
  buildDots(); go(0); auto();
})();

// Project filters
(function () {
  var bar = document.querySelector('.filters');
  if (!bar) return;
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    [].forEach.call(bar.children, function (x) { x.classList.toggle('on', x === b); });
    var f = b.dataset.filter;
    [].forEach.call(document.querySelectorAll('.grid .card'), function (c) {
      c.hidden = f !== 'all' && c.dataset.cat.split(' ').indexOf(f) < 0;
    });
  });
})();

// Click-to-load YouTube players (nothing loads until clicked)
(function () {
  document.querySelectorAll('.video[data-yt]').forEach(function (v) {
    function load() {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + v.dataset.yt + '?autoplay=1';
      f.allow = 'autoplay; encrypted-media; fullscreen'; f.allowFullscreen = true;
      f.style.cssText = 'display:block;width:100%;aspect-ratio:16/9;border:0';
      v.innerHTML = ''; v.appendChild(f);
    }
    v.addEventListener('click', load);
    v.addEventListener('keydown', function (e) { if (e.key === 'Enter') load(); });
  });
})();
