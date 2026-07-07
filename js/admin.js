/* ============================================================
   Campus Event Manager - Admin Dashboard Logic
   ============================================================ */

(function () {
  // ---------- DOM References ----------
  var tableBody = document.getElementById('adminTableBody');
  var emptyState = document.getElementById('adminEmpty');
  var searchInput = document.getElementById('adminSearchInput');
  var modalOverlay = document.getElementById('viewModal');
  var modalBody = document.getElementById('modalBody');
  var modalClose = document.getElementById('modalClose');

  // ---------- Format a date string for display ----------
  function formatDate(isoString) {
    var d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  // ---------- Check if a date string is from today ----------
  function isToday(isoString) {
    var d = new Date(isoString);
    var now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  }

  // ---------- Update statistics cards ----------
  function updateStatistics(registrations) {
    var totalEl = document.getElementById('totalRegistrations');
    var uniqueEl = document.getElementById('uniqueEvents');
    var todayEl = document.getElementById('todayRegistrations');

    if (totalEl) totalEl.textContent = registrations.length;

    // Count unique events
    var eventNames = [];
    for (var i = 0; i < registrations.length; i++) {
      var ev = registrations[i].event;
      if (eventNames.indexOf(ev) === -1) {
        eventNames.push(ev);
      }
    }
    if (uniqueEl) uniqueEl.textContent = eventNames.length;

    // Count today's registrations
    var todayCount = 0;
    for (var j = 0; j < registrations.length; j++) {
      if (isToday(registrations[j].registeredAt)) {
        todayCount++;
      }
    }
    if (todayEl) todayEl.textContent = todayCount;
  }

  // ---------- Delete a registration by id ----------
  function deleteRegistration(id) {
    if (!confirm('Are you sure you want to delete this registration?')) return;

    var registrations = App.getRegistrations();
    var updated = [];
    for (var i = 0; i < registrations.length; i++) {
      if (registrations[i].id !== id) {
        updated.push(registrations[i]);
      }
    }
    localStorage.setItem(App.STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));
    loadAndRender();
  }

  // ---------- Show view modal with registration details ----------
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
      '<div class="detail-row"><span class="detail-label">Full Name</span><span class="detail-value">' + escapeHtml(reg.fullName) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">USN</span><span class="detail-value">' + escapeHtml(reg.usn) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Department</span><span class="detail-value">' + escapeHtml(reg.department) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">' + escapeHtml(reg.email) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">' + escapeHtml(reg.phone) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Event</span><span class="detail-value">' + escapeHtml(reg.event) + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Registered On</span><span class="detail-value">' + formatDate(reg.registeredAt) + '</span></div>';

    modalOverlay.classList.add('active');
  }

  // ---------- Simple escape ----------
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  // ---------- Search registrations by name, USN, or event ----------
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

  // ---------- Render the dashboard table ----------
  function renderDashboard(registrations) {
    // Update stats with full (unfiltered) data
    var allRegs = App.getRegistrations();
    updateStatistics(allRegs);

    // Show / hide empty state
    if (registrations.length === 0) {
      tableBody.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';

    // Build table rows (newest first)
    var sorted = registrations.slice().sort(function (a, b) {
      return new Date(b.registeredAt) - new Date(a.registeredAt);
    });

    var html = '';
    for (var i = 0; i < sorted.length; i++) {
      var r = sorted[i];
      var serial = i + 1;
      html +=
        '<tr>' +
          '<td>' + serial + '</td>' +
          '<td>' + escapeHtml(r.fullName) + '</td>' +
          '<td>' + escapeHtml(r.usn) + '</td>' +
          '<td>' + escapeHtml(r.department) + '</td>' +
          '<td>' + escapeHtml(r.email) + '</td>' +
          '<td>' + escapeHtml(r.phone) + '</td>' +
          '<td class="cell-event">' + escapeHtml(r.event) + '</td>' +
          '<td>' + formatDate(r.registeredAt) + '</td>' +
          '<td class="cell-actions">' +
            '<button class="btn-action btn-view" data-id="' + r.id + '">View</button>' +
            '<button class="btn-action btn-delete" data-id="' + r.id + '">Delete</button>' +
          '</td>' +
        '</tr>';
    }
    tableBody.innerHTML = html;

    // Attach event listeners to action buttons
    var viewBtns = tableBody.querySelectorAll('.btn-view');
    for (var j = 0; j < viewBtns.length; j++) {
      viewBtns[j].addEventListener('click', function () {
        viewRegistration(this.getAttribute('data-id'));
      });
    }

    var deleteBtns = tableBody.querySelectorAll('.btn-delete');
    for (var k = 0; k < deleteBtns.length; k++) {
      deleteBtns[k].addEventListener('click', function () {
        deleteRegistration(this.getAttribute('data-id'));
      });
    }
  }

  // ---------- Load registrations, apply search, render ----------
  function loadAndRender() {
    var allRegs = App.getRegistrations();
    var query = searchInput ? searchInput.value : '';
    var filtered = searchRegistrations(allRegs, query);
    renderDashboard(filtered);
  }

  // ---------- Initialise everything ----------
  (function init() {
    // Initial render
    loadAndRender();

    // Real-time search
    if (searchInput) {
      searchInput.addEventListener('input', loadAndRender);
    }

    // Modal close on X button
    if (modalClose) {
      modalClose.addEventListener('click', function () {
        modalOverlay.classList.remove('active');
      });
    }

    // Modal close on overlay click (click outside card)
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
        }
      });
    }
  })();

})();
