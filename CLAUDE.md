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
| `--primary` | `#10b981` (green) | Trust, results, success |
| `--accent` | `#f97316` (orange) | All CTA buttons (`.btn-cta`) |
| `--card` | `#111111` | Card/modal backgrounds |
| `--background` | `#0a0a0a` | Page background |

Native `<select>` and `<option>` elements require `color-scheme: dark` + explicit `background-color` / `color` overrides in `@layer base` – CSS utility classes do not apply to native browser form elements.

## Page Architecture

Single-page landing (`src/app/page.tsx`) – a conversion funnel following AIDA + PAS framework:

```
Hero → KK-Vertrauens-Banner → SocialProofStrip → ProblemSection → SolutionSection
     → ProcessSection → Testimonials → InsuranceCalculator → ValueSection
     → GuaranteeSection → FAQSection → Final CTA → Footer
```

State in `page.tsx`:
- `showQuiz` / `showBooking` – controls which modal overlay is active
- `startQuiz()` is passed as `onStartQuiz` prop to every section with a CTA button

**Every section that has a CTA button needs the `onStartQuiz: () => void` prop** – missing this prop = dead button.

## Quiz Funnel (`src/components/quiz/QuizFunnel.tsx`)

6-step quiz with personalized results. Steps:

1. **Ziel** – goal selection (abnehmen / straffen / energie / gesundheit) → auto-advances after 350ms
2. **Körpermaße** – height (cm), current weight (kg), target weight (kg)
3. **Probleme** – multi-select pain points
4. **Zeit** – available time per week (wenig / mittel / viel) → auto-advances after 350ms
5. **Commitment** – (unsicher / bereit / entschlossen) → triggers 1.8s loading screen
6. **Ergebnis** – personalized result screen

`calcResult(data: QuizData)` computes all result values:
- `kgLoss` = `baseKg[time] × mult[commitment]`, capped by actual `weight - targetWeight`
- Dynamic SVG bezier path generated from `kgLoss → endY` for the progress chart
- BMI, projected weight, problem-specific insights all derived from user inputs

**Insurance step** is embedded in Step 6 result screen (top 5 as tile buttons + "Andere Kasse" toggle for full `<select>`).

## Key Business Elements (never remove)

- **WhatsApp booking**: `https://wa.me/4915679610457`
- **Krankenkassen-Rechner**: `src/components/sections/InsuranceCalculator.tsx` – 16 insurers with reimbursement amounts
- **Probetraining buchen**: Opens `showBooking` modal → WhatsApp deep link
- **StickyBar** (`src/components/StickyBar.tsx`): Fixed bottom bar, appears via IntersectionObserver when `#hero` scrolls out of view

## Component Structure

```
src/
  app/
    globals.css      ← All design tokens, @theme blocks, global utilities
    layout.tsx
    page.tsx         ← Single page, all section orchestration + modals
  components/
    quiz/
      QuizFunnel.tsx ← Most complex component; self-contained quiz state
    sections/        ← One file per page section, all receive onStartQuiz prop
    StickyBar.tsx    ← IntersectionObserver on #hero
    ui/              ← shadcn primitives (button, card, etc.)
```

## Avatars / Images

No external image CDNs are used. Testimonial avatars are CSS-generated initials (colored `div` with first letter). Do not introduce dependencies on `figurscout.de` or similar third-party image hosts.
