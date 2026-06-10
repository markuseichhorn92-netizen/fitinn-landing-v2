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

In sandboxed environments the Google-Fonts fetch during build may fail with a TLS error — prefix the build with `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1`.

## Stack

- **Next.js 16.1.6** (App Router, Turbopack), **React 19**, **TypeScript 5**
- **Tailwind CSS 4** – no `tailwind.config.js`; config lives inside `globals.css` via `@theme` blocks
- **shadcn/ui** (style: `base-nova`, `cssVariables: true`) – `components.json` configures aliases
- **lucide-react** for all icons; no external image CDNs
- Font: **Plus Jakarta Sans** via `next/font/google` (`--font-jakarta`)

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

## Design Tokens (Sommer-Theme: Creme · Teal · Sonnengelb)

Defined in `:root` in `globals.css`. Light, summery look inspired by the figurscout "Bauchweg Projekt" landing page:

| Token | Value | Usage |
|---|---|---|
| `--background` | `hsl(38 60% 96%)` | Cream page background |
| `--foreground` | `hsl(200 30% 14%)` | Ink text |
| `--primary` | `hsl(180 68% 38%)` | Teal — buttons, headlines, badges |
| `--primary-dark` | `hsl(180 72% 28%)` | Dark teal — headline accents, gradients |
| `--secondary` | `hsl(180 45% 96%)` | Teal-tinted section backgrounds |
| `--accent` | `hsl(45 92% 58%)` | Sun yellow — stickers, stars, highlights |
| `--accent-deep` | `hsl(35 85% 50%)` | Orange — gradient partner for yellow |
| `--destructive` | `#ef4444` | **Errors only** – API failures, form validation |
| `--border` | `hsl(38 55% 90%)` / `--border-teal` `hsl(180 40% 90%)` | Cream / teal-tinted borders |

**Key utilities** (`globals.css`): `.btn-pill` (teal pill CTA, `--white` variant), `.card-soft` (white rounded card with teal-tinted soft shadow + hover lift), `.badge-pill` (uppercase tracking pill), `.gradient-number` (+`--alt`, giant gradient digits), `.marquee-track` + `@keyframes marquee` (infinite banner, content rendered 3×, shifts -33.333%), `.blur-circle` (soft decorative color blobs).

Native `<select>` and `<option>` elements require `color-scheme` + explicit `background-color` / `color` overrides in `@layer base` – CSS utility classes do not apply to native browser form elements.

## Page Architecture

Single-page landing (`src/app/page.tsx`) for the **30 Tage Bauchweg Projekt** (69€¹, kostenloses Probetraining):

```
Navbar (slim sticky header) → HeroSection → MarqueeBanner → ProblemSection (viszerales Fett)
→ FahrplanSection (4 Wochen) → PaketSection (6 features) → KochbuchSection
→ Testimonials → PreisSection (69€) → BookingSection (#booking) → FAQSection
→ Footer (Disclaimer ¹²³⁴ + WhatsApp) → StickyBar
```

State in `page.tsx`: `scrollToBooking()` smooth-scrolls to `#booking` and is passed as `onCta` prop to Navbar, HeroSection, PaketSection, KochbuchSection, PreisSection and StickyBar.

**Every section that has a CTA button needs the `onCta: () => void` prop** – missing this prop = dead button. All CTAs scroll to the booking section; there is no separate quiz route anymore.

## BookingSection (`src/components/sections/BookingSection.tsx`)

The conversion core: inline Probetraining booking with a local phase machine `'slot' | 'contact' | 'done'`.

- **Phase slot**: on mount, fetches real Magicline slots for the next 28 days via `GET /api/trialsession?startDate=…&endDate=…`; Calendly-style month calendar (days without slots disabled) + time-slot grid.
- **Phase contact**: floating-label fields (`FloatField` peer trick), gender toggle, date of birth as three custom `<select>`s (`DateOfBirthInput`), address, marketing-consent checkbox. Submit `POST /api/trialsession` with contact data + `startDateTime` + a plain `note` (no quizData). Error path shows `tel:+49651308524` fallback.
- **Phase done**: confirmation with date/time + Google-Calendar link (`buildCalendarLink`).

Date/calendar helpers live in `src/lib/quizResult.ts` (`getMonthGrid`, `toLocalDateKey`, `formatTime`, `formatDateLong`, `formatDateShort`, `buildCalendarLink`).

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
- Der Proxy-Route liegt in `src/app/api/trialsession/route.ts`; `quizData` im POST-Body ist optional (Fallback: `note`)

**Feldnamen-Besonderheiten der Magicline API** (nicht ändern!):
- Lead-Felder: `firstname`/`lastname` (lowercase), aber `dateOfBirth` (camelCase), `houseNumber` (camelCase)
- Kein separater `POST /lead`-Schritt — alles in einem Booking-Request

Note: `src/lib/insurance.ts` is still imported by `route.ts` (`INSURANCE_LABEL`) — keep it even though the KK-Rechner UI was removed.

## Key Business Elements (never remove)

- **WhatsApp fallback**: `https://wa.me/4915679610457` (footer)
- **Telefon-Fallback**: `tel:+49651308524` (header, StickyBar, booking error states)
- **BookingSection**: the only conversion path — all CTAs must scroll to `#booking`
- **StickyBar** (`src/components/StickyBar.tsx`): fixed bottom bar; appears when `#hero-cta` scrolls out of view, hides while `#booking` is in view (two IntersectionObservers)
- **Navbar** (`src/components/Navbar.tsx`): slim sticky header (logo + phone + "Platz sichern" pill). Needs `onCta` prop.

## Component Structure

```
src/
  app/
    globals.css               ← All design tokens, @theme blocks, global utilities
    layout.tsx                ← Plus Jakarta Sans, metadata/JSON-LD (69€ offer), ScrollProgress
    page.tsx                  ← Single page, section orchestration + footer + disclaimers
    api/trialsession/
      route.ts                ← GET (slots proxy) + POST (booking proxy) für Magicline
  components/
    Navbar.tsx                ← Slim sticky header
    ScrollProgress.tsx        ← Fixed top scroll progress bar (rAF-based)
    StickyBar.tsx             ← IntersectionObserver on #hero-cta / #booking
    LegalPage.tsx             ← Shared layout for legal routes
    sections/                 ← One file per page section
    ui/                       ← shadcn primitives (button, card, etc.)
  hooks/
    useScrollReveal.ts        ← IntersectionObserver hook + useCountUp
  lib/
    quizResult.ts             ← Calendar/date helpers (getMonthGrid, formatTime, …)
    insurance.ts              ← INSURANCE_LABEL (imported by route.ts)
```

## Scroll Animation System

Scroll-triggered animations use the `useScrollReveal` hook (callback-ref IntersectionObserver). **SSR-safe pattern:**

1. Elements render visible by default (no JS = content visible)
2. `isReady` adds `.anim-ready` class → hides elements (JS is loaded)
3. `isVisible` adds `.animate` class → triggers CSS animation

```tsx
const section = useScrollReveal(0.1)
// ...
<div ref={section.ref} className={`fade-up ${section.isReady ? 'anim-ready' : ''} ${section.isVisible ? 'animate' : ''}`}>
```

**Critical rules for new animations:**
- `.anim-ready` must set `opacity: 0` — never the base class
- Use `animation-fill-mode: both` (not `forwards`) when elements use `animationDelay` via inline styles
- Every `@keyframes` must explicitly set `opacity: 1` in the 100% frame if it starts at `opacity: 0`

## Legal Disclaimer & Footnote System

The footer in `page.tsx` carries four disclaimers; superscript references are placed at every price, availability and results claim:

| Ref | Topic | Where to use |
|-----|-------|-------------|
| ¹ | Preis & Zahlung (69€ einmalig, keine Mitgliedschaft) | Any price mention |
| ² | Probetraining (kostenlos & unverbindlich) | "kostenlos", trial claims |
| ³ | Verfügbarkeit (limitierte Plätze) | Scarcity claims |
| ⁴ | Ergebnisse & Hinweis (Erfahrungswerte, kein Arzt-Ersatz) | Weight-loss/results claims, testimonials |

## Copy & Legal Constraints

- **Keine Heilversprechen** (German UWG): No guaranteed weight loss numbers. The hero claim is hedged as "**bis zu** 5–10 kg weniger⁴"; testimonials carry "Individuelle Ergebnisse können variieren.⁴"
- Stats: `4.9★` / 127 Google-Rezensionen. Don't invent new statistics.

## Avatars / Images

No external image CDNs. Testimonial avatars are CSS-generated initials (colored circle with initials). Local assets in `public/`: `hero-bg.avif` (hero), `Gemini_Generated_Image_opjcz0…` (coaching, ProblemSection), `Gemini_Generated_Image_eoal4…` (Paket-Mockup), `dooken-magic-edit-…` (PreisSection), `food-*.jpg` (Kochbuch mockup). Do **not** use `78f9c0…-1920x2000 (1).avif` (likely sourced from the reference site — unclear image rights).
