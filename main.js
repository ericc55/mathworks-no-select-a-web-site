// ==UserScript==
// @name         MathWorks: Remove site selector
// @namespace    mw-site-selector
// @version      1.0
// @match        *://*.mathworks.com/*
// @grant        none
// @description  MathWorks: Remove site selector & its backdrop
// ==/UserScript==


(function () {
  'use strict';

  const SELECTOR_DIALOGS = [
    '[role="dialog"]',
    '[aria-modal="true"]',
    '.modal',
    '.mwa-domain-selector',
    '.domain-selector'
  ];

  const SELECTOR_BACKDROPS = [
    '.modal-backdrop',
    '.backdrop',
    '[class*="backdrop"]',
    '[class*="Backdrop"]'
  ];

  function nuke(el) {
    try { el.remove(); } catch {}
    try { el.style.display = 'none'; } catch {}
  }

  function unlockPage() {
    const html = document.documentElement;
    const body = document.body;
    [html, body].forEach(el => {
      if (!el) return;
      el.style.overflow = 'auto';
      el.style.position = '';
      el.style.height = '';
      el.removeAttribute('inert');
      el.classList.remove('modal-open', 'no-scroll', 'overflow-hidden');
    });
  }

  function fixGray() {
    // Remove any dialog that contains the “Select a Web Site” text.
    document.querySelectorAll(SELECTOR_DIALOGS.join(',')).forEach(el => {
      if (/(Select a Web Site)/i.test(el.textContent || '')) nuke(el);
    });

    // Remove likely backdrops/overlays
    document.querySelectorAll(SELECTOR_BACKDROPS.join(',')).forEach(nuke);

    // Some pages use full-screen overlays
    Array.from(document.querySelectorAll('div,section')).forEach(el => {
      const cs = getComputedStyle(el);
      const looksLikeOverlay =
        (cs.position === 'fixed' || cs.position === 'absolute') &&
        parseFloat(cs.zIndex || '0') >= 1000 &&
        (parseFloat(cs.opacity || '1') < 1 || cs.backdropFilter !== 'none') &&
        (el.offsetWidth >= window.innerWidth * 0.9 && el.offsetHeight >= window.innerHeight * 0.9);
      if (looksLikeOverlay && /(Select a Web Site)/i.test(el.textContent || '')) nuke(el);
    });

    // Restore scrolling / remove gray-out locks
    unlockPage();
  }

  // Run at start and on DOM changes (modal is injected late)
  const run = () => fixGray();
  run();
  const mo = new MutationObserver(run);
  mo.observe(document.documentElement, { childList: true, subtree: true });

  // Safety: also run after load
  window.addEventListener('load', run);
})();