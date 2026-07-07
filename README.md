# Campus Event Manager

A fully client-side web application for discovering, registering, and managing campus events. Built with HTML5, CSS3, and vanilla JavaScript — no frameworks, no backend, no databases. All data persists in the browser's Local Storage.

---

## Project Overview

The Campus Event Manager streamlines the entire event lifecycle for college campuses:

- **Students** can browse upcoming events, filter by category, search by keyword, and register with validated forms.
- **Administrators** can view all registrations in a searchable dashboard, inspect individual records, and remove entries when needed.
- **No server required** — the application runs entirely in the browser, making it ideal for academic projects, hackathon demos, or small-scale campus use.

The project was developed incrementally across seven phases as part of a Source Code Management (SCM) lab, demonstrating professional Git workflow practices.

---

## Features

| Feature | Description |
|---------|-------------|
| **Home Page** | Hero section with call-to-action, live statistics counters, three featured event cards |
| **Events Page** | Responsive grid of 8 events with real-time search (by name, category, venue) and category dropdown filter |
| **Registration Form** | Six-field validated form with inline error messages; saves data to Local Storage on success |
| **Admin Dashboard** | Statistics cards (total, unique events, today's count), searchable table, View modal with full details, Delete with confirmation |
| **Responsive Design** | 4-column grid on desktop, 2-column on tablet, single column on mobile |
| **Local Storage** | Persistent data using `campusEventRegistrations` key; handles corrupted data gracefully |
| **Accessibility** | Semantic HTML, labelled inputs, `:focus-visible` keyboard indicators, `aria-current` navigation, `aria-modal` dialog |

---

## Technologies Used

| Category | Technology |
|----------|------------|
| **Markup** | HTML5 — semantic elements (`<nav>`, `<section>`, `<footer>`, `<form>`, `<table>`) |
| **Styling** | CSS3 — custom properties (variables), CSS Grid, Flexbox, transitions, media queries, `:focus-visible` |
| **Language** | Vanilla JavaScript (ES5-compatible) — no frameworks, no libraries, no dependencies |
| **Storage** | Web Local Storage API — `localStorage.getItem` / `setItem` with JSON serialization |
| **Tooling** | Git for version control; no build tools, no package managers, no transpilers |

### What was NOT used

- No React, Vue, Angular, or any front-end framework
- No Node.js, Express, or any server-side technology
- No databases (SQL or NoSQL)
- No CSS preprocessors (Sass, Less)
- No bundlers (Webpack, Vite)
- No authentication or user management

---

## Project Structure

```
ACS/                                # Root project directory
│
├── index.html                      # Home page — hero, stats, featured events
├── events.html                     # Events listing — search, filter, card grid
├── register.html                   # Registration — validated form, success screen
├── admin.html                      # Admin dashboard — stats, table, view modal
│
├── css/
│   └── style.css                   # Complete stylesheet (~1220 lines)
│                                   #   - CSS variables, reset, utility classes
│                                   #   - Navigation, hero, stat cards, event cards
│                                   #   - Filter bar, form elements, admin table
│                                   #   - Modal, empty states, footer, back-to-top
│                                   #   - Responsive breakpoints (1100px, 900px, 768px, 480px)
│
├── js/
│   ├── app.js                      # Shared logic (72 lines)
│   │   ├── Local Storage helpers (getRegistrations, saveRegistration)
│   │   ├── Navigation highlighting with aria-current
│   │   └── Back-to-top button
│   │
│   ├── events.js                   # Events page logic (215 lines)
│   │   ├── 8 event objects with title, category, date, venue, seats
│   │   ├── Render, search, category filter functions
│   │   └── Real-time input listeners
│   │
│   ├── register.js                 # Registration logic (178 lines)
│   │   ├── 6 field validators with inline error display
│   │   ├── Local Storage save on success
│   │   └── Reset and "Register Another" handlers
│   │
│   └── admin.js                    # Admin dashboard logic (219 lines)
│       ├── Statistics calculation (total, unique, today)
│       ├── Searchable table rendering (newest first)
│       ├── Delete with confirm() and auto-refresh
│       └── View modal with detail rows
│
├── assets/                         # Reserved for static assets (images, icons)
│
└── README.md                       # Project documentation (this file)
```

---

## Installation

No installation, build step, or server is required. The application runs entirely in the browser.

### Prerequisites

- A modern web browser (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+)
- Git (optional — only if you want to clone the repository)

### Steps

#### Option A: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/Chethan831/ACS.git

# Navigate into the project directory
cd ACS

# Open the homepage
open index.html            # macOS
start index.html           # Windows
xdg-open index.html        # Linux
```

#### Option B: Download ZIP

1. Download the repository as a ZIP file from GitHub
2. Extract the ZIP to a folder on your computer
3. Double-click `index.html` to open it in your default browser

#### Option C: Run from VS Code

1. Open the project folder in VS Code
2. Right-click `index.html` in the Explorer panel
3. Select **"Open with Live Server"** (if you have the Live Server extension) or **"Reveal in File Explorer"** and double-click the file

### Verify it works

1. The homepage should load with a gradient hero section, statistics cards, and three featured event cards
2. Navigate to **Events** — you should see 8 event cards in a responsive grid
3. Navigate to **Register** — you will see a registration form (selecting an event requires going through the flow)
4. Navigate to **Admin** — initially shows "No registrations found." After registering through the form, data appears here

---

## How to Use

### Browsing Events

1. Click **Events** in the navigation bar
2. Browse the 8 event cards showing category, date, time, venue, and seats available
3. Use the **search bar** to filter by event name, category, or venue (results update as you type)
4. Use the **category dropdown** to filter by Workshop, Hackathon, Seminar, Technology, Cultural, Sports, or Startup
5. Click **Reset Filters** to clear all filters and show all events

### Registering for an Event

1. Click **Register Now** on any event card (or navigate to Register via the nav bar)
2. Select the event from the **Select Event** dropdown
3. Fill in **Full Name**, **USN**, **Department**, **Email**, and **Phone Number**
4. Click **Register Now** — inline validation errors appear if any field is invalid
5. On success, the form is replaced by a success message
6. Click **Register Another Event** to submit another registration

### Managing Registrations (Admin)

1. Click **Admin** in the navigation bar
2. View the three statistics cards showing total registrations, unique events, and today's count
3. Use the search bar to filter registrations by name, USN, or event
4. Click **View** on any row to see full registration details in a modal popup
5. Click **Delete** to remove a registration (a confirmation dialog appears)

---

## Screenshots

> Screenshots are not included in this repository. Below is a description of each page for reference.

| Page | Description |
|------|-------------|
| **Home** | Gradient hero with "Campus Event Manager" title, subtitle, and "Explore Events" button. Three statistics cards (24+ Events, 1,200+ Students, 6 Categories). Three featured event cards with gradient image placeholders, dates, venues, and category badges. |
| **Events** | Page hero with "Upcoming Events" title. Filter bar with search input, category dropdown, and reset button. 8 event cards in a responsive 4-column grid showing gradient images, category badges, dates, times, venues, seat counts, and "Register Now" buttons. |
| **Register** | Page hero with "Event Registration" title. Centered form card with 6 input fields, dropdown for event selection, and Register/Reset buttons. Success card replaces form after valid submission. |
| **Admin** | Page hero with "Admin Dashboard" title. Three statistics cards. Search bar. Full-width table with 9 columns (serial, name, USN, department, email, phone, event, date, actions). View modal with detail rows. Empty state when no registrations exist. |

---

## Data Model

### Registration Object (Local Storage)

Each registration is stored as an object in the `campusEventRegistrations` array within the browser's Local Storage.

```json
{
  "id": "REG-1720329600000",
  "fullName": "John Doe",
  "usn": "1AY21CS001",
  "department": "Computer Science",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "event": "AI Workshop",
  "registeredAt": "2026-07-07T10:30:00.000Z"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (timestamp-based) |
| `fullName` | string | Student's full name |
| `usn` | string | University Serial Number |
| `department` | string | Academic department |
| `email` | string | Email address |
| `phone` | string | 10-digit phone number |
| `event` | string | Selected event title |
| `registeredAt` | string | ISO 8601 timestamp of registration |

---

## Git Workflow

The project was built incrementally across 7 phases, with each phase adding a discrete set of features and committed separately to demonstrate professional Git workflow.

| Phase | Description | Key Files Changed |
|-------|-------------|-------------------|
| 1 | Project scaffold, navigation bar, homepage, README | `index.html`, `css/style.css`, `js/app.js`, `README.md` |
| 2 | Events page with 8 hardcoded event cards | `events.html`, `js/events.js` |
| 3 | Real-time search and category filter | `events.html`, `js/events.js`, `css/style.css` |
| 4 | Registration form with inline validation | `register.html`, `js/register.js`, `css/style.css` |
| 5 | Local Storage integration for registration data | `js/app.js`, `js/register.js` |
| 6 | Admin dashboard with stats, table, view modal, delete | `admin.html`, `js/admin.js`, `css/style.css` |
| 7 | UI polish, accessibility, code cleanup, README | All files |

### Commit History Example

```
7e3a2d1 Fix minor issues and improve project documentation
4f8b2c9 Polish UI, improve accessibility and update documentation
1a2b3c4 Build admin dashboard with registration management
5d6e7f8 Add Local Storage integration
9a0b1c2 Create registration form with validation
3c4d5e6 Add search and category filtering
7f8a9b0 Build professional events page
2c3d4e5 Initialize Campus Event Manager project
```

---

## Future Enhancements

- **Edit Registration** — Allow admins to modify existing registration records
- **Export to CSV** — Download registrations as a spreadsheet file
- **Event Creation** — Admin panel to create, edit, and delete events dynamically
- **Real-time Seat Count** — Decrement available seats as students register
- **Dark Mode** — Toggle between light and dark themes using CSS custom properties
- **Pagination** — Split large registration lists into paginated pages
- **Search Debouncing** — Optimize real-time search with a debounce utility
- **Confirmation Email** — Simulate email confirmation after registration
- **Statistics Charts** — Visualize registration data with CSS-only charts
- **Multi-language Support** — Add locale switching for form labels and messages

---

## Learning Outcomes

- **Semantic HTML5** — Proper use of `<nav>`, `<section>`, `<footer>`, `<form>`, `<table>`, and ARIA attributes for accessible web pages
- **CSS Custom Properties** — Centralized theming with `:root` variables for consistent spacing, colors, typography, and shadows
- **CSS Grid & Flexbox** — Building responsive layouts without frameworks (4-column grid, sticky headers, centered cards)
- **Responsive Design** — Mobile-first media query strategy with breakpoints at 1100px, 900px, 768px, and 480px
- **DOM Manipulation** — Creating, reading, updating, and deleting DOM elements with vanilla JavaScript
- **Form Validation** — Client-side validation with real-time feedback, inline error messages, and no `alert()` dialogs
- **Local Storage API** — Persisting structured data as JSON, handling corrupted entries with try/catch
- **Modular JavaScript** — IIFE pattern for encapsulation, namespaced helpers (`App.*`), separation of concerns across files
- **Event Handling** — `input`, `change`, `click`, `submit`, `scroll`, `keydown`, and `focus` event listeners
- **Keyboard Accessibility** — `:focus-visible` outlines, `aria-current` for active navigation, `aria-modal` for dialogs, `sr-only` labels
- **Git Workflow** — Incremental feature development with meaningful commits, push to remote, and milestone-based progress tracking

---

*Built for the Source Code Management Lab as an academic project. July 2026.*
