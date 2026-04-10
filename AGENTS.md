# AGENTS.md

## Cursor Cloud specific instructions

This is a React + Vite frontend project for the Luz Astrology website, located in `frontend/`.

### Quick reference

| Action | Command | Working directory |
|--------|---------|-------------------|
| Install deps | `npm install` | `frontend/` |
| Dev server | `npx vite --host 0.0.0.0 --port 5173` | `frontend/` |
| Build | `npx vite build` | `frontend/` |

- No backend service or database is required. The calendar booking is handled by an embedded Cal.com widget.
- The Cal.com calendar embed code goes in `App.jsx` inside the `CalendarModal` component, replacing the placeholder `<div>`.
- Google Fonts (Cormorant Garamond, Inter) are loaded via CDN in `index.css`.
