/* ============================================================
   Campus Event Manager - Shared Application Logic
   ============================================================ */

var App = App || {};

App.STORAGE_KEYS = {
  REGISTRATIONS: 'campusEventRegistrations',
};

App.getRegistrations = function () {
  try {
    var data = localStorage.getItem(App.STORAGE_KEYS.REGISTRATIONS);
    if (!data) return [];
    var parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch (e) {
    return [];
  }
};

App.saveRegistration = function (registration) {
  var registrations = App.getRegistrations();
  registrations.push(registration);
  localStorage.setItem(App.STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
};

App.escapeHtml = function (text) {
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(text));
  return d.innerHTML;
};

App.formatDate = function (isoString) {
  var d = new Date(isoString);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

App.isToday = function (isoString) {
  var d = new Date(isoString);
  var now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

(function highlightNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.nav-links a');
  for (var i = 0; i < navLinks.length; i++) {
    if (navLinks[i].getAttribute('href') === currentPage) {
      navLinks[i].classList.add('active');
      navLinks[i].setAttribute('aria-current', 'page');
    }
  }
})();

(function initBackToTop() {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('show', window.scrollY > 300);
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
