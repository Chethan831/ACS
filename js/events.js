/* ============================================================
   Campus Event Manager - Events Page Logic
   ============================================================ */

var eventsData = [
  {
    id: 1,
    title: 'AI Workshop',
    description: 'Hands-on session covering machine learning, neural networks, and real-world AI applications using Python.',
    category: 'Workshop',
    date: 'August 20, 2026',
    time: '10:00 AM - 4:00 PM',
    venue: 'Seminar Hall A',
    icon: '🤖',
    gradient: 'grad-1',
    seats: 45,
  },
  {
    id: 2,
    title: 'Web Development Bootcamp',
    description: 'Intensive bootcamp on modern web development with HTML, CSS, JavaScript, React and Node.js.',
    category: 'Workshop',
    date: 'September 2, 2026',
    time: '9:00 AM - 5:00 PM',
    venue: 'Computer Lab 3',
    icon: '🌐',
    gradient: 'grad-2',
    seats: 30,
  },
  {
    id: 3,
    title: 'Hackathon 2026',
    description: '24-hour coding marathon to build innovative solutions for real-world problems. Teams of 3-4 members.',
    category: 'Hackathon',
    date: 'September 15, 2026',
    time: '8:00 AM (starts)',
    venue: 'Innovation Lab',
    icon: '💻',
    gradient: 'grad-3',
    seats: 120,
  },
  {
    id: 4,
    title: 'Career Guidance Seminar',
    description: 'Industry experts share insights on career paths, resume building, and interview preparation strategies.',
    category: 'Seminar',
    date: 'October 5, 2026',
    time: '11:00 AM - 1:00 PM',
    venue: 'Main Auditorium',
    icon: '🎯',
    gradient: 'grad-4',
    seats: 200,
  },
  {
    id: 5,
    title: 'Cyber Security Summit',
    description: 'Learn about ethical hacking, network security, cryptography and cyber threat prevention from experts.',
    category: 'Technology',
    date: 'October 18, 2026',
    time: '10:00 AM - 3:00 PM',
    venue: 'Conference Hall',
    icon: '🔒',
    gradient: 'grad-5',
    seats: 60,
  },
  {
    id: 6,
    title: 'Cultural Fest',
    description: 'Annual cultural extravaganza featuring dance, music, drama, fashion show and art competitions.',
    category: 'Cultural',
    date: 'November 1, 2026',
    time: '10:00 AM onwards',
    venue: 'Open Air Theatre',
    icon: '🎭',
    gradient: 'grad-6',
    seats: 500,
  },
  {
    id: 7,
    title: 'Sports Meet',
    description: 'Inter-department sports competition with cricket, football, basketball, athletics and indoor games.',
    category: 'Sports',
    date: 'November 15, 2026',
    time: '7:00 AM - 5:00 PM',
    venue: 'Sports Complex',
    icon: '🏆',
    gradient: 'grad-7',
    seats: 300,
  },
  {
    id: 8,
    title: 'Startup Pitch Day',
    description: 'Pitch your startup idea to a panel of investors and entrepreneurs. Win incubation support and funding.',
    category: 'Startup',
    date: 'December 3, 2026',
    time: '9:00 AM - 2:00 PM',
    venue: 'Incubation Center',
    icon: '🚀',
    gradient: 'grad-8',
    seats: 25,
  },
];

(function () {
  var searchInput = document.getElementById('searchInput');
  var categorySelect = document.getElementById('categorySelect');
  var resetBtn = document.getElementById('resetBtn');
  var container = document.getElementById('eventsContainer');

  function getSeatsInfo(seats) {
    if (seats <= 30) return { cls: 'limited', label: 'Only ' + seats + ' seats left' };
    return { cls: 'available', label: seats + ' seats available' };
  }

  function buildEventCard(ev) {
    var seatsInfo = getSeatsInfo(ev.seats);

    return (
      '<div class="event-card">' +
        '<div class="event-card-image ' + ev.gradient + '">' +
          '<span class="event-icon" aria-hidden="true">' + ev.icon + '</span>' +
        '</div>' +
        '<div class="event-card-body">' +
          '<span class="event-card-category">' + ev.category + '</span>' +
          '<h3>' + ev.title + '</h3>' +
          '<p>' + ev.description + '</p>' +
          '<span class="seats-badge ' + seatsInfo.cls + '">' +
            '👤 ' + seatsInfo.label +
          '</span>' +
          '<div class="event-card-meta">' +
            '<span><span class="meta-icon">📅</span> ' + ev.date + '</span>' +
            '<span><span class="meta-icon">⏰</span> ' + ev.time + '</span>' +
            '<span><span class="meta-icon">📍</span> ' + ev.venue + '</span>' +
          '</div>' +
          '<a href="register.html" class="btn btn-primary btn-sm">Register Now</a>' +
        '</div>' +
      '</div>'
    );
  }

  function renderEvents(events) {
    if (!container) return;

    if (events.length === 0) {
      container.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-icon">🔍</div>' +
          '<h3>No events found.</h3>' +
          '<p>Try another search or category.</p>' +
        '</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < events.length; i++) {
      html += buildEventCard(events[i]);
    }
    container.innerHTML = html;
  }

  function filterEvents() {
    var query = searchInput.value.trim().toLowerCase();
    var category = categorySelect.value;

    var filtered = eventsData.filter(function (ev) {
      if (category !== 'all' && ev.category !== category) return false;
      if (query === '') return true;
      return (
        ev.title.toLowerCase().indexOf(query) !== -1 ||
        ev.category.toLowerCase().indexOf(query) !== -1 ||
        ev.venue.toLowerCase().indexOf(query) !== -1
      );
    });

    renderEvents(filtered);
  }

  function resetFilters() {
    searchInput.value = '';
    categorySelect.value = 'all';
    filterEvents();
  }

  // Render on page load
  if (container) {
    filterEvents();
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterEvents);
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', filterEvents);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }
})();
