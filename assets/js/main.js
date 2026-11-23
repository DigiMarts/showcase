(function () {
  "use strict";

  var WA_NUMBER = "2349166250816"; // DigiMarts WhatsApp
  var projects = window.SHOWCASE_PROJECTS || [];
  var grid = document.getElementById("grid");
  var dialog = document.getElementById("detail");
  var lastTrigger = null;

  function waLink(message) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message);
  }

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text) node.textContent = text;
    return node;
  }

  // ----- Logo grid -----
  projects.forEach(function (p) {
    var li = el("li");
    var btn = el("button", { type: "button", class: "tile", "data-id": p.id, "aria-haspopup": "dialog" });
    var img = el("img", { src: p.logo, alt: "", width: "96", height: "96", loading: "lazy" });
    var name = el("span", { class: "tile-name" }, p.name);
    var cat = el("span", { class: "tile-cat" }, p.category);
    var status = el("span", { class: "pill pill-" + p.status.toLowerCase().replace(/\s+/g, "-") }, p.status);
    btn.append(img, name, cat, status);
    btn.setAttribute("aria-label", p.name + ": " + p.tagline + ". Show details");
    li.appendChild(btn);
    grid.appendChild(li);
  });

  // ----- Detail dialog -----
  function open(id, trigger) {
    var p = projects.find(function (x) { return x.id === id; });
    if (!p) return;
    lastTrigger = trigger || null;

    document.getElementById("detail-logo").src = p.logo;
    document.getElementById("detail-logo").alt = p.name + " logo";
    document.getElementById("detail-category").textContent = p.category;
    document.getElementById("detail-name").textContent = p.name;
    document.getElementById("detail-tagline").textContent = p.tagline;
    document.getElementById("detail-desc").textContent = p.description;

    var list = document.getElementById("detail-points");
    list.innerHTML = "";
    (p.points || []).forEach(function (t) { list.appendChild(el("li", null, t)); });

    var status = document.getElementById("detail-status");
    status.textContent = p.status;
    status.className = "pill pill-" + p.status.toLowerCase().replace(/\s+/g, "-");
    document.getElementById("detail-by").textContent = "Built by " + p.by;

    var visit = document.getElementById("detail-visit");
    if (p.url) {
      visit.href = p.url;
      visit.textContent = "Visit " + p.name;
      visit.hidden = false;
    } else {
      visit.hidden = true;
    }

    var wa = document.getElementById("detail-wa");
    wa.href = waLink("Hello DigiMarts, I saw " + p.name + " on your showcase and I'd like to know more.");
    wa.textContent = p.url ? "Ask DigiMarts about it" : "Ask for a demo";
    wa.className = p.url ? "btn btn-ghost" : "btn btn-primary";

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");

    if (history.replaceState) history.replaceState(null, "", "#" + p.id);
  }

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest(".tile");
    if (btn) open(btn.getAttribute("data-id"), btn);
  });

  // Click outside the card closes it
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", function () {
    if (history.replaceState) history.replaceState(null, "", location.pathname);
    if (lastTrigger) lastTrigger.focus();
  });

  // Deep links: showcase.digimartsng.com/#meetbook-pro opens that project
  if (location.hash.length > 1) open(location.hash.slice(1));

  // Prefilled WhatsApp messages on the general buttons
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var msg = a.getAttribute("data-wa") === "build"
      ? "Hello DigiMarts, I'd like a website or app built for my business."
      : "Hello DigiMarts, I'm on your showcase page and have a question.";
    a.href = waLink(msg);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
