/* ============================================================
   Campus Event Manager - Shared Application Logic
   ============================================================ */

// ---------- Namespace ----------
var App = App || {};

// ---------- Local Storage Keys ----------
App.STORAGE_KEYS = {
  REGISTRATIONS: 'campusEventRegistrations',
};

// ---------- Get all registrations from Local Storage ----------
// Returns an array. If data is missing or corrupted, returns a fresh array.
App.getRegistrations = function () {
  try {
    var data = localStorage.getItem(App.STORAGE_KEYS.REGISTRATIONS);
    if (!data) return [];
    var parsed = JSON.parse(data);
    // Ensure it's an array
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (e) {
    // Corrupted data — start fresh
    return [];
  }
};

// ---------- Save a single registration to Local Storage ----------
// Appends to existing array, never overwrites previous entries.
App.saveRegistration = function (registration) {
  var registrations = App.getRegistrations();
  registrations.push(registration);
  localStorage.setItem(App.STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
};

// ---------- Highlight current page in navigation ----------
(function highlightNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-links a');
  for (var i = 0; i < navLinks.length; i++) {
    var href = navLinks[i].getAttribute('href');
    if (href === currentPage) {
      navLinks[i].classList.add('active');
      navLinks[i].setAttribute('aria-current', 'page');
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
