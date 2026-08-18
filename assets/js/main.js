/* =============================================================
   OWEBYENKULAKULANA — Oscar Mutebi Francisco
   Shared JavaScript · Vanilla ES
   ============================================================= */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initMobileNav();
    initReveal();
    initCounters();
    initFooterYear();
    initFaq();
    initFilters();
    initForm();
    initPrefill();
    initLightbox();
  });

  /* ---------- Sticky header elevation on scroll ---------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Mobile navigation ---------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("primaryNav");
    if (!toggle || !nav) return;

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    function openNav() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }
    toggle.addEventListener("click", function () {
      nav.classList.contains("is-open") ? closeNav() : openNav();
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeNav(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeNav(); toggle.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 820) closeNav(); });
  }

  /* ---------- Intersection Observer reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Animated metric counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      counters.forEach(function (el) {
        el.textContent = format(parseInt(el.getAttribute("data-count"), 10)) + suffixOf(el);
      });
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { observer.observe(el); });
  }
  function animate(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = suffixOf(el), duration = 1800, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(Math.floor(eased * target)) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
      else el.textContent = format(target) + suffix;
    }
    window.requestAnimationFrame(step);
  }
  function suffixOf(el) { return el.getAttribute("data-suffix") || ""; }
  function format(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

  /* Active navigation state is set in the markup (class="nav-link is-active" +
     aria-current="page") because every nav link is a full page path, not an
     in-page anchor. A scroll-spy initialiser previously lived here; its selector
     (".nav-link[href*='#']") matched nothing on any page, so it was removed. */

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;
    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var panel = item.querySelector(".faq-a");
      if (!btn || !panel) return;
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        // Close others in the same group
        items.forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            var op = other.querySelector(".faq-a");
            var ob = other.querySelector(".faq-q");
            if (op) op.style.maxHeight = null;
            if (ob) ob.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = !isOpen ? panel.scrollHeight + "px" : null;
      });
    });
  }

  /* ---------- Category filter + search (Media / galleries) ---------- */
  function initFilters() {
    var groups = document.querySelectorAll("[data-filter-group]");
    groups.forEach(function (group) {
      var chips = group.querySelectorAll(".chip");
      var searchInput = group.querySelector("[data-search]");
      var targetSel = group.getAttribute("data-target");
      var items = document.querySelectorAll(targetSel);
      var noResults = document.querySelector(group.getAttribute("data-empty") || ".no-results");
      var activeCat = "all";

      function apply() {
        var q = searchInput ? searchInput.value.trim().toLowerCase() : "";
        var shown = 0;
        items.forEach(function (item) {
          var cat = item.getAttribute("data-category") || "";
          var text = (item.getAttribute("data-keywords") || item.textContent || "").toLowerCase();
          var catOk = activeCat === "all" || cat === activeCat;
          var searchOk = !q || text.indexOf(q) !== -1;
          var show = catOk && searchOk;
          item.style.display = show ? "" : "none";
          if (show) shown++;
        });
        if (noResults) noResults.classList.toggle("show", shown === 0);
      }

      chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
          chips.forEach(function (c) { c.classList.remove("is-active"); });
          chip.classList.add("is-active");
          activeCat = chip.getAttribute("data-cat") || "all";
          apply();
        });
      });
      if (searchInput) searchInput.addEventListener("input", apply);
      apply();
    });
  }

  /* ---------- Contact / request form validation ---------- */
  function initForm() {
    var forms = document.querySelectorAll("[data-validate]");
    forms.forEach(function (form) {
      var success = form.querySelector(".form-success");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var valid = true;
        form.querySelectorAll("[required]").forEach(function (input) {
          var field = input.closest(".field");
          var ok = input.value.trim() !== "";
          if (ok && input.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
          if (field) field.classList.toggle("invalid", !ok);
          if (!ok && valid) input.focus();
          if (!ok) valid = false;
        });
        if (valid) {
          form.reset();
          if (success) {
            success.classList.add("show");
            success.setAttribute("role", "status");
            success.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
            window.setTimeout(function () { success.classList.remove("show"); }, 6000);
          }
        }
      });
      // Clear invalid state as the user types
      form.querySelectorAll("input, select, textarea").forEach(function (input) {
        input.addEventListener("input", function () {
          var field = input.closest(".field");
          if (field) field.classList.remove("invalid");
        });
      });
    });
  }

  /* ---------- Prefill request type from request cards ---------- */
  function initPrefill() {
    var links = document.querySelectorAll("[data-prefill]");
    var select = document.getElementById("requestType");
    if (!links.length || !select) return;
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        var value = link.getAttribute("data-prefill");
        for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].text === value) { select.selectedIndex = i; break; }
        }
        var field = select.closest(".field");
        if (field) field.classList.remove("invalid");
      });
    });
  }

  /* ---------- Lightbox (gallery images + videos) ---------- */
  function initLightbox() {
    var triggers = document.querySelectorAll("[data-lightbox]");
    if (!triggers.length) return;

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = '<button class="lightbox-close" aria-label="Close">✕</button><div class="lightbox-stage"></div>';
    document.body.appendChild(box);

    var stage = box.querySelector(".lightbox-stage");
    var closeBtn = box.querySelector(".lightbox-close");
    var lastFocus = null;

    function open(trigger) {
      var type = trigger.getAttribute("data-lightbox");
      var src = trigger.getAttribute("data-src");
      if (type === "video") {
        stage.innerHTML = '<iframe src="' + src + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      } else {
        var alt = trigger.getAttribute("data-alt") || "";
        stage.innerHTML = '<img src="' + src + '" alt="' + alt + '" />';
      }
      lastFocus = trigger;
      box.classList.add("open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }
    function close() {
      box.classList.remove("open");
      stage.innerHTML = "";
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }

    triggers.forEach(function (t) {
      t.addEventListener("click", function (e) { e.preventDefault(); open(t); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(t); }
      });
    });
    closeBtn.addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("open")) close();
    });
  }
})();
