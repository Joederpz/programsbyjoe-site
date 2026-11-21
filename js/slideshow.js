document.querySelectorAll(".slideshow").forEach(function (box) {
  var slides = box.querySelectorAll(".slides img");
  var thumbs = box.querySelectorAll(".thumbs button");
  var interval = parseInt(box.dataset.interval, 10) || 3000;
  var current = 0, timer;
  function show(i) {
    slides[current].classList.remove("active");
    thumbs[current].classList.remove("active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("active");
    thumbs[current].classList.add("active");
  }
  function start() { timer = setInterval(function () { show(current + 1); }, interval); }
  thumbs.forEach(function (b, i) {
    b.addEventListener("click", function () { clearInterval(timer); show(i); start(); });
  });
  thumbs[0].classList.add("active");
  start();
});
