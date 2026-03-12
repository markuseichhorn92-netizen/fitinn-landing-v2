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
| `--accent` | `#ffb54f` (warm gold) | All CTA buttons (`.btn-cta`), emphasis in problem/vorher sections |
| `--destructive` | `#ef4444` (red) | **Errors only** – API failures, form validation. Never for emphasis or design elements |
| `--card` | `#111111` | Card/modal backgrounds |
| `--background` | `#0a0a0a` | Page background |

Native `<select>` and `<option>` elements require `color-scheme: dark` + explicit `background-color` / `color` overrides in `@layer base` – CSS utility classes do not apply to native browser form elements.

## Page Architecture

Single-page landing (`src/app/page.tsx`) – a conversion funnel following AIDA + PAS framework:

```
Navbar → Hero → KK-Vertrauens-Banner → SocialProofStrip → ProblemSection → SolutionSection
       → ProcessSection → Testimonials → InsuranceCalculator (2-col: value breakdown + KK-Rechner)
       → GuaranteeSection → FAQSection → Final CTA → Footer (numbered disclaimer ¹²³⁴) → StickyBar
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

**Quiz UI** is a fullscreen takeover (not a card modal). Key patterns:
- Modal wrapper in `page.tsx`: `fixed inset-0 z-50 bg-background` with ambient glow div
- Progress bar: `fixed top-0` thin bar (h-1), full viewport width, `quiz-progress-fill` glow class
- Each step: `flex-1 flex flex-col items-center justify-center` with `quiz-step-enter` animation
- Option cards: `quiz-option-card` class for hover glow, `rounded-2xl`, `hover:scale-[1.02]`
- Calendar (Step 7): Calendly-style 2-column layout (calendar left, time slots right)
- Contact form (Step 8): Single card with floating labels (`peer` trick), sections divided by borders
- Date of birth: Three custom `<select>` dropdowns (Tag/Monat/Jahr), not native `<input type="date">`

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
- **Krankenkassen-Rechner**: `src/components/sections/InsuranceCalculator.tsx` – `INSURANCE_DATA` array with 16 insurers + reimbursement amounts (75–179€). 2-column layout: left = included features list + 179€ price box, right = dropdown calculator. Result shows 0€ prominently when KK covers 100%.
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

**Quiz-specific classes:** `animate-funnel-enter` (fullscreen fade-in), `quiz-step-enter` (fade + slide up), `quiz-progress-fill` (progress bar glow), `quiz-option-card` (hover/selected glow)

**Critical rules for new animations:**
- `.anim-ready` must set `opacity: 0` (or clip-path) — never the base class
- Use `animation-fill-mode: both` (not `forwards`) when elements use `animationDelay` via inline styles
- Every `@keyframes` must explicitly set `opacity: 1` in the 100% frame if it starts at `opacity: 0`
- Companion elements (`.impact-ring`, `.forge-ring`) follow the same `.anim-ready`/`.animate` pattern

## Legal Disclaimer & Footnote System

The footer in `page.tsx` contains numbered disclaimer sections (¹²³⁴). Superscript references (`<sup>¹</sup>` etc.) are placed at every pricing, reimbursement, and health claim across all components:

| Ref | Topic | Where to use |
|-----|-------|-------------|
| ¹ | Ablauf & Zahlung (179€, Vorkasse, 3,20€/Tag) | Any price mention or payment reference |
| ² | Erstattung (§ 20 SGB V, Kunde reicht ein) | "kostenlos", "erstattet", reimbursement claims |
| ³ | Erstattungshöhe (75€–100%, ohne Gewähr) | Specific reimbursement amounts |
| ⁴ | Hinweis (Prävention, kein Arzt-Ersatz) | Health/results claims |

When adding new pricing or insurance claims, always include the appropriate `<sup>` references.

## Copy & Legal Constraints

- **Keine Heilversprechen** (German UWG): No guaranteed weight loss numbers, no medical condition promises. Use "können variieren", "erfahrungsgemäß", "viele Teilnehmer berichten" hedges.
- **Stats source**: `-7,2 kg` average, `-8 cm` Bauchumfang, `127.000+` Teilnehmer, `4.9★` / 127 Rezensionen — from happyfigur24.de. Don't invent new statistics.
- **§ 20 SGB V**: The program is certified. KK reimbursement requires no pre-approval (Vorab-Genehmigung) — customer attends, submits Teilnahmebestätigung afterward.
- **Geld-zurück-Garantie**: If KK doesn't reimburse, FIT-INN refunds the full price (referenced as `²` in disclaimers).

## Avatars / Images

No external image CDNs are used. Testimonial avatars are CSS-generated initials (colored `div` with first letter). Do not introduce dependencies on `figurscout.de` or similar third-party image hosts.
