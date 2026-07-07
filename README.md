# Campus Event Manager

A client-side web application for discovering, registering, and managing campus events. Built entirely with HTML, CSS, and vanilla JavaScript — no frameworks, no backend, no databases.

## Features

- **Home Page** — Hero section, statistics counters, featured event cards
- **Events Page** — Browse 8 events with real-time search and category filter
- **Registration Form** — Validated form with inline errors, saves to Local Storage
- **Admin Dashboard** — Stats cards, searchable table, view details modal, delete with confirmation
- **Responsive Design** — Desktop (4-column), tablet (2-column), mobile (1-column)
- **Accessibility** — Semantic HTML, labelled inputs, keyboard focus indicators, `aria-current` navigation
- **Local Storage** — Persistent data with graceful error handling for corrupted entries

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, flexbox, grid, transitions) |
| Logic | Vanilla JavaScript (ES5 compatible) |
| Storage | Browser Local Storage |
| No frameworks | Zero dependencies |

## Project Structure

```
ACS/
├── index.html           # Home page
├── events.html          # Events listing with search & filter
├── register.html        # Registration form with validation
├── admin.html           # Admin dashboard with CRUD
├── css/
│   └── style.css        # Complete stylesheet (~1200 lines)
├── js/
│   ├── app.js           # Shared: nav, back-to-top, Local Storage helpers
│   ├── events.js        # Events: data, render, search, filter
│   ├── register.js      # Registration: validation, Local Storage save
│   └── admin.js         # Admin: stats, search, delete, view modal
├── assets/              # Reserved for static assets
└── README.md            # This file
```

## How to Run

No build step or server required. Open any HTML file directly in a modern browser:

```bash
open index.html
```

Or double-click the file in your file explorer.

8 sample events are hardcoded in `js/events.js` and displayed on page load. Registration data submitted through the form persists in Local Storage under the key `campusEventRegistrations`.

## Data Model

### Registration Object

```js
{
  id: "REG-1234567890",
  fullName: "John Doe",
  usn: "1AY21CS001",
  department: "Computer Science",
  email: "john@example.com",
  phone: "9876543210",
  event: "AI Workshop",
  registeredAt: "2026-07-07T10:30:00.000Z"
}
```

## Git Workflow

The project was built across 6 incremental milestones:

| Phase | Description |
|-------|-------------|
| 1 | Folder structure, navigation, homepage, README |
| 2 | Events page with 8 event cards |
| 3 | Search bar and category filter |
| 4 | Registration form with validation |
| 5 | Local Storage integration |
| 6 | Admin dashboard with CRUD |
| 7 | Final polish, accessibility, code cleanup |

## Screenshots

> _(Screenshots to be added)_

## Future Enhancements

- Edit registration functionality
- Export registrations to CSV
- Event creation from admin panel
- Dark mode toggle
- Pagination for large datasets

## Learning Outcomes

- Semantic HTML5 structure and accessibility best practices
- CSS custom properties for consistent theming
- CSS Grid and Flexbox for responsive layouts
- Vanilla JavaScript DOM manipulation and event handling
- Client-side form validation with inline error messages
- Local Storage CRUD operations with error handling
- Modular JavaScript architecture using IIFEs and namespacing
- Keyboard accessibility with `:focus-visible` and ARIA attributes
