/* ============================================================
   Campus Event Manager - Shared Application Logic (Phase 1)
   ============================================================ */

// ---------- Namespace ----------
var App = App || {};

// ---------- Highlight current page in navigation ----------
(function highlightNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-links a');
  for (var i = 0; i < navLinks.length; i++) {
    var href = navLinks[i].getAttribute('href');
    if (href === currentPage) {
      navLinks[i].classList.add('active');
    }
  }
})();

// ---------- Back to Top button ----------
(function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
