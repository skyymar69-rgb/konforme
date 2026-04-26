/* Konforme — Overlay UI (FAB + drawer + skip-link + credit) */
(function () {
  'use strict';
  if (window.__kfOverlay) return;
  window.__kfOverlay = true;

  var html = function (s) { var d = document.createElement('div'); d.innerHTML = s.trim(); return d.firstChild; };

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    // ---- Skip link --------------------------------------------------------
    var skip = html('<a id="kf-skip" href="#root">Aller au contenu principal</a>');
    document.body.insertBefore(skip, document.body.firstChild);

    // ---- Sticky credit footer --------------------------------------------
    var credit = html('<a id="kf-credit" href="https://internet.kayzen-lyon.fr" rel="noopener" aria-label="Site réalisé par Kayzen Web">Fièrement réalisé par <strong>Kayzen Web</strong></a>');
    document.body.appendChild(credit);

    // ---- FAB --------------------------------------------------------------
    var fab = html(
      '<button id="kf-fab" type="button" aria-haspopup="dialog" aria-controls="kf-drawer" aria-expanded="false">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<rect x="3" y="4" width="18" height="16" rx="2"/>' +
          '<path d="M7 8h6M7 12h10M7 16h7"/>' +
        '</svg>' +
        '<span class="label">Carte de contact</span>' +
      '</button>'
    );
    document.body.appendChild(fab);

    // ---- Drawer + Backdrop -----------------------------------------------
    var backdrop = html('<div id="kf-drawer-backdrop" hidden></div>');
    var drawer = html(
      '<aside id="kf-drawer" hidden role="dialog" aria-modal="true" aria-labelledby="kf-drawer-title">' +
        '<header>' +
          '<h2 id="kf-drawer-title">Konforme · KAYZEN SASU</h2>' +
          '<button id="kf-drawer-close" type="button" aria-label="Fermer">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
              '<path d="M6 6l12 12M18 6L6 18"/></svg>' +
          '</button>' +
        '</header>' +
        '<div class="scroll">' +
          '<p class="info">' +
            '6 rue Pierre Termier, 69009 Lyon — ' +
            '<a href="tel:+33487776861">+33 (0)4 87 77 68 61</a><br>' +
            '<a href="mailto:contact@kayzen-lyon.fr">contact@kayzen-lyon.fr</a>' +
          '</p>' +
          '<div class="qr-grid">' +
            '<figure class="qr"><img src="/contact/qr-site.svg" alt="QR code vers le site Konforme" loading="lazy" width="180" height="180"><figcaption>Site</figcaption></figure>' +
            '<figure class="qr"><img src="/contact/qr-vcard.svg" alt="QR code de la vCard KAYZEN" loading="lazy" width="180" height="180"><figcaption>vCard</figcaption></figure>' +
            '<figure class="qr"><img src="/contact/qr-maps.svg" alt="QR code vers Google Maps" loading="lazy" width="180" height="180"><figcaption>Maps</figcaption></figure>' +
            '<figure class="qr"><img src="/contact/qr-avis.svg" alt="QR code vers les avis clients" loading="lazy" width="180" height="180"><figcaption>Avis</figcaption></figure>' +
          '</div>' +
          '<div class="actions">' +
            '<a class="btn primary" href="/contact/kayzen-konforme.vcf" download>' +
              '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>' +
              'Télécharger la vCard' +
            '</a>' +
            '<a class="btn ghost" href="/carte-contact.html">Voir la carte de contact</a>' +
            '<a class="btn ghost" href="https://www.google.com/maps/search/?api=1&query=KAYZEN+SASU+6+rue+Pierre+Termier+69009+Lyon" rel="noopener">Itinéraire Maps</a>' +
            '<a class="btn ghost" href="https://www.google.com/search?q=KAYZEN+Lyon+avis" rel="noopener">Voir les avis</a>' +
          '</div>' +
        '</div>' +
      '</aside>'
    );
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    var lastFocus = null;

    function focusables() {
      return drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    }
    function open() {
      lastFocus = document.activeElement;
      backdrop.hidden = false; drawer.hidden = false;
      requestAnimationFrame(function () {
        backdrop.dataset.open = 'true';
        drawer.dataset.open = 'true';
        fab.setAttribute('aria-expanded', 'true');
        var f = focusables(); if (f.length) f[0].focus();
        document.addEventListener('keydown', onKey);
      });
    }
    function close() {
      backdrop.dataset.open = 'false';
      drawer.dataset.open = 'false';
      fab.setAttribute('aria-expanded', 'false');
      setTimeout(function () { backdrop.hidden = true; drawer.hidden = true; }, 280);
      document.removeEventListener('keydown', onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') {
        var f = focusables(); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    fab.addEventListener('click', open);
    backdrop.addEventListener('click', close);
    drawer.querySelector('#kf-drawer-close').addEventListener('click', close);

    // ---- Inject "Carte de contact" button into the SPA header ------------
    // The SPA renders client-side; wait for its <nav> or <header> to appear.
    var injected = false;
    function tryInjectHeader() {
      if (injected) return true;
      var root = document.getElementById('root');
      if (!root) return false;
      var host =
        root.querySelector('header nav') ||
        root.querySelector('header') ||
        root.querySelector('nav');
      if (!host) return false;
      var btn = html(
        '<button id="kf-header-btn" type="button" aria-haspopup="dialog" aria-controls="kf-drawer" aria-label="Ouvrir la carte de contact (vCard et QR codes)">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<rect x="3" y="4" width="18" height="16" rx="2"/>' +
            '<path d="M7 8h6M7 12h10M7 16h7"/>' +
          '</svg>' +
          '<span>Contact</span>' +
        '</button>'
      );
      btn.addEventListener('click', open);
      host.appendChild(btn);
      injected = true;
      // FAB now redundant on this layout: hide on >= 768px
      fab.classList.add('kf-has-header-btn');
      return true;
    }
    if (!tryInjectHeader()) {
      var obs = new MutationObserver(function () {
        if (tryInjectHeader()) obs.disconnect();
      });
      obs.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
      // safety: stop observing after 30s
      setTimeout(function () { obs.disconnect(); }, 30000);
    }
  });
})();
