# Integrating Cursor Components into Your Lovable Project

Your Lovable project uses **React + TypeScript + Tailwind CSS + shadcn/ui**.
The components built here use **React + vanilla CSS**. They are fully self-contained
and will work side-by-side with your Lovable code — no conflicts.

---

## Quick Overview: What to Copy

```
YOUR LOVABLE PROJECT (src/)
├── components/
│   └── luz/                     ← CREATE THIS FOLDER
│       ├── Offerings.tsx         ← Pricing cards + Terms + Calendar modals
│       ├── SocialFeed.tsx        ← Instagram/TikTok reel gallery
│       ├── Testimonials.tsx      ← Testimonial cards with carousel
│       └── LeadPopup.tsx         ← Timed popup for free guide
├── config/
│   └── luz/                     ← CREATE THIS FOLDER
│       ├── calConfig.ts          ← Cal.com username + event slugs
│       ├── socialFeedConfig.ts   ← Social media posts
│       └── testimonialsConfig.ts ← Testimonial data
├── styles/
│   └── luz.css                  ← ALL custom CSS (one file)
└── pages/
    └── Index.tsx                ← Your existing Lovable page (add components here)
```

---

## Step-by-Step Integration

### Step 1: Install the Cal.com dependency

In your Lovable project's terminal (or tell Lovable AI to do it):

```bash
npm install @calcom/atoms
```

### Step 2: Copy the CSS file

Copy the entire contents of `frontend/src/App.css` from this repo into a new file
in your Lovable project at:

```
src/styles/luz.css
```

Then import it in your Lovable app's main entry file. Open `src/App.tsx` and add
at the top:

```tsx
import './styles/luz.css'
import '@calcom/atoms/globals.min.css'
```

### Step 3: Copy the config files

Copy these 3 files into `src/config/luz/`:

| Source (this repo)                         | Destination (Lovable)              |
|--------------------------------------------|------------------------------------|
| `frontend/src/calConfig.js`                | `src/config/luz/calConfig.ts`      |
| `frontend/src/socialFeedConfig.js`         | `src/config/luz/socialFeedConfig.ts`|
| `frontend/src/testimonialsConfig.js`       | `src/config/luz/testimonialsConfig.ts`|

For each file, just rename `.js` → `.ts`. The code is already valid TypeScript.

### Step 4: Copy the component files

Copy these 4 files into `src/components/luz/`:

| Source (this repo)                   | Destination (Lovable)                   |
|--------------------------------------|-----------------------------------------|
| `frontend/src/App.jsx` (partial)     | `src/components/luz/Offerings.tsx`       |
| `frontend/src/SocialFeed.jsx`        | `src/components/luz/SocialFeed.tsx`      |
| `frontend/src/Testimonials.jsx`      | `src/components/luz/Testimonials.tsx`    |
| `frontend/src/LeadPopup.jsx`         | `src/components/luz/LeadPopup.tsx`       |

**Important**: Rename `.jsx` → `.tsx` and update the import paths inside each file
from `'./calConfig'` → `'@/config/luz/calConfig'` (matching Lovable's `@/` alias).

For `App.jsx`, extract only the **components and data** (OFFERINGS array, Navbar,
PricingCard, TermsModal, CalendarModal, and Offerings section JSX) — NOT the
full App wrapper. Your Lovable project already has its own App shell and router.

### Step 5: Add components to your Lovable page

In whichever Lovable page you want these sections (likely `src/pages/Index.tsx`),
import and place them:

```tsx
import Offerings from '@/components/luz/Offerings'
import SocialFeed from '@/components/luz/SocialFeed'
import Testimonials from '@/components/luz/Testimonials'
import LeadPopup from '@/components/luz/LeadPopup'

export default function Index() {
  return (
    <>
      {/* Your existing Lovable sections above */}

      <Offerings />
      <SocialFeed />
      <Testimonials />
      <LeadPopup />

      {/* Your existing Lovable sections below */}
    </>
  )
}
```

### Step 6: CSS variables

Add these CSS variables to your Lovable project's `src/index.css` (inside `:root`).
If they conflict with existing Lovable/Tailwind variables, just rename them in
both `luz.css` and the variable definitions:

```css
:root {
  --color-gold: #c8a84e;
  --color-gold-light: #e8d590;
  --color-navy: #2c3e6b;
  --color-navy-dark: #1a2744;
  --color-text: #3a3a3a;
  --color-text-light: #6b6b6b;
  --color-bg: #fafaf8;
  --color-white: #ffffff;
  --color-border: #e8e8e4;
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

Also add the Google Fonts import at the top of `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
```

---

## Alternative: Ask Lovable AI to Do It

You can paste this prompt into Lovable's chat:

> "I have custom React components and CSS I need to integrate. Here are the files:
> [paste each file's contents]. Place the components in `src/components/luz/`,
> the config files in `src/config/luz/`, the CSS in `src/styles/luz.css`,
> and import everything in my main page. Keep my existing Lovable layout intact
> and add these sections below my current content."

---

## File-by-File: What Each Does

| File | Purpose |
|------|---------|
| `Offerings.tsx` | Pricing cards, "Book Now" → Terms & Conditions → Cal.com calendar embed |
| `SocialFeed.tsx` | Horizontal scrollable reel gallery (Instagram + TikTok) with embed modal |
| `Testimonials.tsx` | Dark navy testimonial cards with carousel pagination |
| `LeadPopup.tsx` | Timed popup (30s) offering free spiritual guide in exchange for email |
| `calConfig.ts` | Your Cal.com username and event type slugs |
| `socialFeedConfig.ts` | Your reel thumbnails, embed URLs, captions |
| `testimonialsConfig.ts` | Client testimonials (name, rating, quote) |
| `luz.css` | All styling — uses CSS custom properties, no Tailwind conflicts |

---

## Notes

- The CSS uses **custom properties** (`--color-gold`, etc.) and **class names** prefixed
  by section (`.offerings-`, `.social-`, `.testimonial-`, `.lead-`), so there will be
  **no naming conflicts** with Tailwind or shadcn/ui.
- The `body.modal-open` class is used for scroll locking. If your Lovable project
  already handles this differently, you can remove it from the components.
- The `@calcom/atoms` package is the only external dependency beyond React.
