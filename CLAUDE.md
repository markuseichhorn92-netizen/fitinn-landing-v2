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

## Design Tokens (Athletic Dark Fitness Theme)

Defined in `:root` in `globals.css`. The color system uses **Grün (Training) + Gold (Ernährung)** as the two thematic pillars:

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#7dd87d` (vital green) | Training, health, results — the "fitness" pillar |
| `--primary-foreground` | `#0a2e0a` (dark green) | Text on primary backgrounds |
| `--accent` | `#f5a623` (warm gold) | Ernährung, CTA buttons (`.btn-cta`), nutrition-related UI |
| `--accent-foreground` | `#1a0f00` | Text on accent backgrounds |
| `--destructive` | `#ef4444` (red) | **Errors only** – API failures, form validation. Never for emphasis or design elements |
| `--card` | `#131613` (green-tinted dark) | Card/modal backgrounds — subtle green undertone |
| `--background` | `#0a0a0a` | Page background |

**Two-pillar color system:** Training content uses `--primary` (green), Ernährung content uses `--accent` (gold). Feature cards have a `.feature-card--nutrition` variant with gold left-border instead of green.

**Card design:** Cards use a clean left-border accent (3px) instead of glassmorphism. No corner decorators — those were removed as "too tech/SaaS."

**Background patterns:** `.bg-fitness` (green dot pattern for training sections), `.bg-nutrition` (gold dot pattern for nutrition sections). Body overlay uses diagonal athletic stripes instead of grain noise.

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
- `startQuiz()` calls `router.push('/quiz')` — the quiz lives at `/quiz`, not as a modal overlay
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

**Quiz UI** is a fullscreen page at `/quiz` (not a modal). Key patterns:
- Page wrapper in `src/app/quiz/page.tsx`: `fixed inset-0 z-50 bg-background` with ambient glow div
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
- **StickyBar** (`src/components/StickyBar.tsx`): Fixed bottom bar, appears via IntersectionObserver when the `#hero-cta` button scrolls out of view (not the whole `#hero` section)
- **Navbar** (`src/components/Navbar.tsx`): Fixed top bar with logo, section nav links (smooth scroll), mobile hamburger menu, glassmorphism on scroll. Needs `onStartQuiz` prop.

## Component Structure

```
src/
  app/
    globals.css               ← All design tokens, @theme blocks, global utilities
    layout.tsx                ← Imports ScrollProgress
    page.tsx                  ← Single page, all section orchestration
    quiz/
      page.tsx                ← /quiz route — renders QuizFunnel fullscreen
    api/trialsession/
      route.ts                ← GET (slots proxy) + POST (booking proxy) für Magicline
  components/
    Navbar.tsx                ← Fixed header with logo + nav + mobile menu
    ScrollProgress.tsx        ← Fixed top scroll progress bar (rAF-based)
    quiz/
      QuizFunnel.tsx          ← Most complex component; self-contained quiz + booking state
    sections/                 ← One file per page section, all receive onStartQuiz prop
    StickyBar.tsx             ← IntersectionObserver on #hero-cta button
    ui/                       ← shadcn primitives (button, card, etc.)
  hooks/
    useScrollReveal.ts        ← IntersectionObserver hook + useCountUp for counter animations
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

**Animation classes:** `materialize` (blur+scale reveal), `lift-in` (weight-lift overshoot), `number-slam` (stats impact), `float-in-left`/`float-in-right` (remapped to lift-in), `pulse-alive` (gentle breathing loop), `progress-fill` (scaleX bar fill), `strike-wipe` (line-through), `heartbeat-line` (SVG pulse), `hero-ken-burns` (hero bg zoom), `cta-pulse` (gold glow pulse on CTA buttons), `checklist-item` (slide-in-right), `price-shimmer` (gradient sweep on price text)

**Removed tech animations:** `glitch-text`, `scan-reveal`, `energy-beam`, `shield-forge`, `forge-ring` — these had sci-fi/cyberpunk aesthetics incompatible with the fitness theme. Legacy CSS aliases exist so old class names still work (they map to `lift-in`).

**Quiz-specific classes:** `animate-funnel-enter` (fullscreen fade-in), `quiz-step-enter` (fade + slide up), `quiz-progress-fill` (progress bar glow), `quiz-option-card` (hover/selected glow)

**Critical rules for new animations:**
- `.anim-ready` must set `opacity: 0` (or clip-path) — never the base class
- Use `animation-fill-mode: both` (not `forwards`) when elements use `animationDelay` via inline styles
- Every `@keyframes` must explicitly set `opacity: 1` in the 100% frame if it starts at `opacity: 0`

## Legal Disclaimer & Footnote System

There are two disclaimer areas in `page.tsx`: a **short footnote block** (4 lines, ¹²³⁴) directly above the `<footer>`, and a **full legal text block** inside the footer (`pb-20` div). Both must stay in sync when copy changes. Superscript references (`<sup>¹</sup>` etc.) are placed at every pricing, reimbursement, and health claim across all components:

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
- **Trainer-Formulierung**: Ein Trainer/Coach ist immer **vor Ort ansprechbar** für Fragen und Korrekturen — aber nicht bei jedem Training persönlich dabei. Keine Formulierungen wie "Trainer an deiner Seite bei jedem Training".

## Avatars / Images

No external image CDNs are used. Testimonial avatars are CSS-generated initials (colored `div` with first letter). Do not introduce dependencies on `figurscout.de` or similar third-party image hosts.
