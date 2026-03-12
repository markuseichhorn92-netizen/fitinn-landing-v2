# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build + TypeScript check
npm run lint     # ESLint
npm run start    # Production server
```

No test suite is configured. Always run `npm run build` after significant changes to catch TypeScript errors.

## Stack

- **Next.js 16.1.6** (App Router, Turbopack), **React 19**, **TypeScript 5**
- **Tailwind CSS 4** – no `tailwind.config.js`; config lives inside `globals.css` via `@theme` blocks
- **shadcn/ui** (style: `base-nova`, `cssVariables: true`) – `components.json` configures aliases
- **lucide-react** for all icons; no external image CDNs

## Tailwind 4 CSS Variable Bridging

Tailwind 4 generates utilities like `bg-card` as `background-color: var(--color-card)`, but shadcn defines variables as `--card`. The `@theme inline` block in `globals.css` bridges them:

```css
@theme inline {
  --color-card: var(--card);
  --color-primary: var(--primary);
  /* etc. */
}
```

**Without this block, all `bg-*` / `text-*` / `border-*` utilities that reference shadcn tokens resolve to nothing (transparent).** When adding new shadcn CSS variables to `:root`, always add the corresponding `--color-*` mapping in `@theme inline`.

## Design Tokens (Dark Fitness Theme)

Defined in `:root` in `globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#cfe5ea` (light teal) | Trust, results, highlights; `#0a4958` (dark teal) used as foreground/gradient |
| `--accent` | `#ffb54f` (warm gold) | All CTA buttons (`.btn-cta`) |
| `--card` | `#111111` | Card/modal backgrounds |
| `--background` | `#0a0a0a` | Page background |

Native `<select>` and `<option>` elements require `color-scheme: dark` + explicit `background-color` / `color` overrides in `@layer base` – CSS utility classes do not apply to native browser form elements.

## Page Architecture

Single-page landing (`src/app/page.tsx`) – a conversion funnel following AIDA + PAS framework:

```
Navbar → Hero → KK-Vertrauens-Banner → SocialProofStrip → ProblemSection → SolutionSection
       → ProcessSection → Testimonials → InsuranceCalculator (includes value breakdown)
       → GuaranteeSection → FAQSection → Final CTA → Footer
```

**Section IDs** for nav scroll targets: `#hero`, `#programm` (SolutionSection), `#ablauf` (ProcessSection), `#erfahrungen` (Testimonials), `#krankenkasse` (InsuranceCalculator), `#faq` (FAQSection).

State in `page.tsx`:
- `showQuiz` / `showBooking` – controls which modal overlay is active
- `startQuiz()` is passed as `onStartQuiz` prop to every section with a CTA button

**Every section that has a CTA button needs the `onStartQuiz: () => void` prop** – missing this prop = dead button.

## Quiz Funnel (`src/components/quiz/QuizFunnel.tsx`)

9-step quiz ending with a confirmed Probetraining booking. Steps:

1. **Ziel** – goal selection (abnehmen / straffen / energie / gesundheit) → auto-advances after 350ms
2. **Körpermaße** – height (cm), current weight (kg), target weight (kg)
3. **Probleme** – multi-select pain points
4. **Transformation** – showcase screen
5. **Zeit** – available time per week (wenig / mittel / viel) → auto-advances after 350ms
6. **Commitment** – (unsicher / bereit / entschlossen) → triggers 1.8s loading screen
7. **Kalender** – Terminauswahl (lädt Slots via `/api/trialsession` GET)
8. **Kontaktdaten** – Formular + API-Buchung → Ladescreen
9. **Ergebnis** – personalisiertes Ergebnis + Buchungsbestätigung

`calcResult(data: QuizData)` computes all result values:
- `kgLoss` = `baseKg[time] × mult[commitment]`, capped by actual `weight - targetWeight`
- Dynamic SVG bezier path generated from `kgLoss → endY` for the progress chart
- BMI, projected weight, problem-specific insights all derived from user inputs

**Insurance step** is embedded in Step 9 result screen (top 5 as tile buttons + "Andere Kasse" toggle for full `<select>`).

## Magicline Connect API

Base URL: `https://fit-inn-trier.api.magicline.com/connect/v1` — kein Auth-Token nötig.

**Slots laden:** `GET /trialsession?studioId=1210005460&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- Gibt `{ slots: [{ startDateTime: "2026-03-13T10:00:00.000Z", endDateTime: "..." }] }` zurück
- `startDateTime` ist UTC mit `.000Z`-Suffix

**Buchung:** `POST /trialsession/book` — **ein einziger Schritt**, `leadCustomer` inline:
```json
{
  "studioId": 1210005460,
  "startDateTime": "2026-03-13T10:00:00.000Z",
  "trainerRequired": false,
  "note": "...",
  "leadCustomer": {
    "firstname": "...", "lastname": "...", "email": "...", "phone": "...",
    "gender": "MALE|FEMALE", "dateOfBirth": "YYYY-MM-DD",
    "address": { "street": "...", "houseNumber": "...", "zip": "...", "city": "...", "country": "DE" },
    "privacyConfiguration": { "email": bool, "phone": bool, "letter": false, "textMessage": bool, "mySportsMessage": false }
  }
}
```
- `startDateTime` muss **exakt** als UTC-String aus der Slots-API weitergegeben werden (kein Konvertieren, kein Entfernen des `.000Z`)
- `trainerRequired: false` — mit `true` schlägt die Buchung fehl wenn kein Trainer verfügbar
- Fehlermeldung `"There are not enough resources"` = Slot bereits voll (CONFLICT)
- Der Proxy-Route liegt in `src/app/api/trialsession/route.ts`

**Feldnamen-Besonderheiten der Magicline API** (nicht ändern!):
- Lead-Felder: `firstname`/`lastname` (lowercase), aber `dateOfBirth` (camelCase), `houseNumber` (camelCase)
- Kein separater `POST /lead`-Schritt — alles in einem Booking-Request

## Key Business Elements (never remove)

- **WhatsApp fallback**: `https://wa.me/4915679610457`
- **Krankenkassen-Rechner**: `src/components/sections/InsuranceCalculator.tsx` – 16 insurers with reimbursement amounts, combined with value breakdown (2-column layout)
- **StickyBar** (`src/components/StickyBar.tsx`): Fixed bottom bar, appears via IntersectionObserver when `#hero` scrolls out of view
- **Navbar** (`src/components/Navbar.tsx`): Fixed top bar with logo, section nav links (smooth scroll), mobile hamburger menu, glassmorphism on scroll. Needs `onStartQuiz` prop.

## Component Structure

```
src/
  app/
    globals.css               ← All design tokens, @theme blocks, global utilities
    layout.tsx
    page.tsx                  ← Single page, all section orchestration + modals
    api/trialsession/
      route.ts                ← GET (slots proxy) + POST (booking proxy) für Magicline
  components/
    Navbar.tsx                ← Fixed header with logo + nav + mobile menu
    quiz/
      QuizFunnel.tsx          ← Most complex component; self-contained quiz + booking state
    sections/                 ← One file per page section, all receive onStartQuiz prop
    StickyBar.tsx             ← IntersectionObserver on #hero
    ui/                       ← shadcn primitives (button, card, etc.)
  hooks/
    useScrollReveal.ts        ← IntersectionObserver hook for scroll-triggered animations
```

## Scroll Animation System

All scroll-triggered animations live in `globals.css` and use the `useScrollReveal` hook (callback-ref based IntersectionObserver). **SSR-safe pattern:**

1. Elements render visible by default (no JS = content visible)
2. `isReady` adds `.anim-ready` class → hides elements (JS is loaded)
3. `isVisible` adds `.animate` class → triggers CSS animation

```tsx
const section = useScrollReveal(0.1)
// ...
<div className={`materialize ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
```

**Animation classes:** `materialize`, `number-slam`, `float-in-left`, `float-in-right`, `scan-reveal`, `shield-forge`, `strike-wipe`, `glitch-text`, `heartbeat-line`, `energy-beam`

**Critical rules for new animations:**
- `.anim-ready` must set `opacity: 0` (or clip-path) — never the base class
- Use `animation-fill-mode: both` (not `forwards`) when elements use `animationDelay` via inline styles
- Every `@keyframes` must explicitly set `opacity: 1` in the 100% frame if it starts at `opacity: 0`
- Companion elements (`.impact-ring`, `.forge-ring`) follow the same `.anim-ready`/`.animate` pattern

## Avatars / Images

No external image CDNs are used. Testimonial avatars are CSS-generated initials (colored `div` with first letter). Do not introduce dependencies on `figurscout.de` or similar third-party image hosts.
