/* Learn AI by Building — visit counter (GoatCounter: no cookies, no personal data).
   Counts (1) page views and (2) one event each time a practice block runs,
   named "practice-run: <page path> <block id>".
   Silent while GOATCOUNTER_CODE is empty, and on local previews (file://, localhost,
   127.x and other private addresses): then nothing is loaded and nothing is sent.
   privacy.html says exactly what is counted: change both together.
   Decision: Website book WE-105 (Adi, 23 Oct 2026). Official docs: goatcounter.com/help/js */
(function () {
  "use strict";

  // Adi: paste your GoatCounter code between the quotes, e.g. "learnaibybuilding"
  // for https://learnaibybuilding.goatcounter.com — and nothing else in this file.
  var GOATCOUNTER_CODE = "learnaibybuilding";

  if (!GOATCOUNTER_CODE) return;

  function isLocal() {
    if (location.protocol === "file:") return true;
    var h = location.hostname;
    return !h || h === "localhost" || h === "[::1]" || /\.local$/.test(h) ||
      /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.0\.0\.0$)/.test(h);
  }
  if (isLocal()) return;

  // the official script, loaded once; it counts the page view by itself
  var gc = document.createElement("script");
  gc.async = true;
  gc.src = "https://gc.zgo.at/count.js";
  gc.setAttribute("data-goatcounter", "https://" + GOATCOUNTER_CODE + ".goatcounter.com/count");

  // practice runs that happen before count.js has loaded wait here, then go;
  // if count.js is blocked (an ad blocker), they are dropped
  var waiting = [];
  function send(name) {
    var g = window.goatcounter;
    if (g && typeof g.count === "function") g.count({ path: name, title: document.title, event: true });
    else if (waiting) waiting.push(name);
  }
  gc.onload = function () { var q = waiting; waiting = null; q.forEach(send); };
  gc.onerror = function () { waiting = null; };
  document.head.appendChild(gc);

  // pyrun.js fires "lwa:pyrun-ran" with detail.id after a practice block runs
  document.addEventListener("lwa:pyrun-ran", function (e) {
    var id = (e && e.detail && e.detail.id) || "unknown";
    send("practice-run: " + location.pathname + " " + id);
  });
})();
