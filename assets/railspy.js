/* Learn AI by Building - the contents rail follows the reader (Adi, 28 Oct 2026: "the highlighted section on the
   left-side index remains on the top chapter only"). The rail link of the section being read gets class "on";
   unit.css already styles .rail a.on. Used by the blog posts; the unit pages have stepper.js for this. */
(function () {
  var links = [].slice.call(document.querySelectorAll('.rail a[href^="#"]'));
  var pairs = links.map(function (a) { return [a, document.getElementById(a.getAttribute('href').slice(1))]; })
                   .filter(function (p) { return p[1]; });
  if (!pairs.length) return;
  var current = null, queued = false;
  function update() {
    queued = false;
    var line = Math.min(window.innerHeight * 0.25, 140), pick = pairs[0];   // near the top, so a short section still gets its turn
    for (var i = 0; i < pairs.length; i++) {
      if (pairs[i][1].getBoundingClientRect().top <= line) pick = pairs[i]; else break;
    }
    // at the very bottom the last short sections can never reach the line: mark the last one
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) pick = pairs[pairs.length - 1];
    if (pick[0] === current) return;
    links.forEach(function (a) { a.classList.toggle('on', a === pick[0]); });
    current = pick[0];
  }
  window.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
