/* ============================================================
   Campus Event Manager - Admin Dashboard Logic
   ============================================================ */

(function () {
  var tableBody = document.getElementById('adminTableBody');
  var emptyState = document.getElementById('adminEmpty');
  var searchInput = document.getElementById('adminSearchInput');
  var modalOverlay = document.getElementById('viewModal');
  var modalBody = document.getElementById('modalBody');
  var modalClose = document.getElementById('modalClose');

  function updateStatistics(registrations) {
    var totalEl = document.getElementById('totalRegistrations');
    var uniqueEl = document.getElementById('uniqueEvents');
    var todayEl = document.getElementById('todayRegistrations');

    if (totalEl) totalEl.textContent = registrations.length;

    var eventNames = [];
    for (var i = 0; i < registrations.length; i++) {
      var ev = registrations[i].event;
      if (eventNames.indexOf(ev) === -1) eventNames.push(ev);
    }
    if (uniqueEl) uniqueEl.textContent = eventNames.length;

    var todayCount = 0;
    for (var j = 0; j < registrations.length; j++) {
      if (App.isToday(registrations[j].registeredAt)) todayCount++;
    }
    if (todayEl) todayEl.textContent = todayCount;
  }

  function deleteRegistration(id) {
    if (!confirm('Are you sure you want to delete this registration?')) return;

    var registrations = App.getRegistrations();
    var updated = [];
    for (var i = 0; i < registrations.length; i++) {
      if (registrations[i].id !== id) updated.push(registrations[i]);
    }
    localStorage.setItem(App.STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));
    loadAndRender();
  }

  function viewRegistration(id) {
    var registrations = App.getRegistrations();
    var reg = null;
    for (var i = 0; i < registrations.length; i++) {
      if (registrations[i].id === id) {
        reg = registrations[i];
        break;
      }
    }
    if (!reg) return;

    modalBody.innerHTML =
      '<div class="detail-row"><span class="detail-label">Full Name</span><span class="detail-value">' + App.escapeHtml(reg.fullName) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">USN</span><span class="detail-value">' + App.escapeHtml(reg.usn) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">' + App.escapeHtml(reg.department) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">' + App.escapeHtml(reg.email) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">' + App.escapeHtml(reg.phone) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Event</span><span class="detail-value">' + App.escapeHtml(reg.event) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Registered On</span><span class="detail-value">' + App.formatDate(reg.registeredAt) + '</span></div>';

    modalOverlay.classList.add('active');
  }

  function searchRegistrations(registrations, query) {
    if (!query.trim()) return registrations;
    var q = query.trim().toLowerCase();
    var result = [];
    for (var i = 0; i < registrations.length; i++) {
      var r = registrations[i];
      if (
        (r.fullName && r.fullName.toLowerCase().indexOf(q) !== -1) ||
        (r.usn && r.usn.toLowerCase().indexOf(q) !== -1) ||
        (r.event && r.event.toLowerCase().indexOf(q) !== -1)
      ) {
        result.push(r);
      }
    }
    return result;
  }

  function renderDashboard(filteredRegs) {
    var allRegs = App.getRegistrations();
    updateStatistics(allRegs);

    if (filteredRegs.length === 0) {
      tableBody.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';

    var sorted = filteredRegs.slice().sort(function (a, b) {
      return new Date(b.registeredAt) - new Date(a.registeredAt);
    });

    var html = '';
    for (var i = 0; i < sorted.length; i++) {
      var r = sorted[i];
      html +=
        '<tr>' +
          '<td>' + (i + 1) + '</td>' +
          '<td>' + App.escapeHtml(r.fullName) + '</td>' +
          '<td>' + App.escapeHtml(r.usn) + '</td>' +
          '<td>' + App.escapeHtml(r.department) + '</td>' +
          '<td>' + App.escapeHtml(r.email) + '</td>' +
          '<td>' + App.escapeHtml(r.phone) + '</td>' +
          '<td class="cell-event">' + App.escapeHtml(r.event) + '</td>' +
          '<td>' + App.formatDate(r.registeredAt) + '</td>' +
          '<td class="cell-actions">' +
            '<button class="btn-action btn-view" data-id="' + r.id + '">View</button>' +
            '<button class="btn-action btn-delete" data-id="' + r.id + '">Delete</button>' +
          '</td>' +
        '</tr>';
    }
    tableBody.innerHTML = html;
  }

  function loadAndRender() {
    var allRegs = App.getRegistrations();
    var query = searchInput ? searchInput.value : '';
    var filtered = searchRegistrations(allRegs, query);
    renderDashboard(filtered);
  }

  (function init() {
    loadAndRender();

    if (searchInput) {
      searchInput.addEventListener('input', loadAndRender);
    }

    if (tableBody) {
      tableBody.addEventListener('click', function (e) {
        var btn = e.target.closest('.btn-action');
        if (!btn) return;
        var id = btn.getAttribute('data-id');
        if (btn.classList.contains('btn-view')) {
          viewRegistration(id);
        } else if (btn.classList.contains('btn-delete')) {
          deleteRegistration(id);
        }
      });
    }

    if (modalClose) {
      modalClose.addEventListener('click', function () {
        modalOverlay.classList.remove('active');
      });
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
        }
      });
    }
  })();
})();
