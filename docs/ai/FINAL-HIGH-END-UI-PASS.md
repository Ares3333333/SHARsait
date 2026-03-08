# Final High-End UI Pass — Audit & Plan

## 1. Remaining Premium Problems Audit

- **Contact page:** Heading is hero-scale (3.2–6.5rem), vertical stack separates contacts and form; no single “one screen” composition. Rhythm broken.
- **Buttons:** Still slightly heavy; default border 0.16 and gradients read flat; need lighter face, clearer optical depth, more refined hover (no dead fill).
- **Muddy darkness:** `--bg` #07070c very deep; case/journal filters and overlays can be nudged for more separation and perceived brightness.
- **Journal:** Featured + grid exist but intro is short, section rhythm thin; needs stronger editorial hierarchy and spacing.
- **Mobile:** Section padding and card density are generic; contact remains stacked without tailored spacing; buttons need consistent min-height/tap targets.
- **Repo:** All .md files already in docs/ai and docs/planning; root clean. .DS_Store in .gitignore.

## 2. Minimal Safe Redesign Plan

- **Contact:** One section, two-column desktop (left: compact heading + intro + direct contacts; right: form). Heading clamp ~1.75rem–2.25rem. Single subtle card or border wrap for the block. Mobile: one column, generous spacing, 44px+ tap targets.
- **Buttons:** Lighter base (border 0.12–0.14, background gradient 0.02–0.01), stronger inset highlight, refined hover (border lift + very subtle glow, no solid fill). Active: slight press.
- **Dark:** `--bg` → #0a0a10; `--surface-border` 0.13→0.10; slightly lighter hero overlay; case image brightness 0.74→0.78; journal featured brightness 0.88→0.92.
- **Journal:** Larger intro max-width and margin; label margin; featured margin-bottom increase; card border/background subtle refinement.
- **Mobile:** Increase section padding; contact field/button min-height 44px; journal featured image height 240px; grid gap increase.
- **Repo:** No file moves; confirm .gitignore.

## 3. Applied Changes

- **Contact (contact.html + style.css):** Wrapped content in `.contact-card`; added `.contact-header` (heading + intro) and `.contact-body` (two-column grid: contacts | form). Heading reduced to clamp(1.75rem, 4vw, 2.25rem). Card: border, subtle gradient background, padding. Desktop: contacts left, form right, same visual block. Mobile: single column, card padding reduced, form inputs min-height 44px, submit 48px, legal centered and smaller.
- **Buttons (style.css):** `.btn-minimal` / `.watch-case-btn`: border 0.16→0.12, lighter gradient (0.03→0.008), single inset highlight (0.06). Hover: border 0.22, no solid fill, subtle glow 0 0 20px rgba(156,4,4,0.04). Active: scale(0.985). Primary: default/hover gradients reduced; breath keyframe 50% softened. Secondary: aligned to same light treatment.
- **Dark/surfaces (style.css):** `--bg` #07070c→#0a0a10; `--text-secondary` 0.76→0.80, `--text-tertiary` 0.52→0.55; `--line` 0.08→0.09; `--surface-border` 0.13→0.11; `--surface-fill` 0.035→0.04. Hero overlay: bottom/left gradients lightened (rgba(5,5,8) and lower opacity). Case img: grayscale 0.22→0.18, brightness 0.74→0.78. Journal images: grayscale and brightness refined (0.08, 0.92 featured; 0.08, 0.92 cards).
- **Journal (style.css):** Label margin tuned; section-inner max-width 1100px; intro max-width 56ch, margin-bottom 2xl, font-size clamp; featured margin-bottom 2xl; journal-grid-rest gap lg; grid-rest .j-content padding lg.
- **Mobile (style.css):** Section padding; label margin; grid gaps lg; journal featured height 240px, margin-bottom xl; journal-intro margin xl; btn-minimal min-height 44px, padding 14px lg; price/submit 48px min-height, padding 14px; work-more/journal-teaser-more button padding; contact form-legal center on mobile.
- **Repo:** No file moves; root already clean; .gitignore contains .DS_Store and .cursor/.

## 4. Final QA

- Contact: One card, two-column desktop, single-column mobile; heading no longer hero-scale; contacts and form in same block. ✓
- Buttons: Lighter borders and fills; refined hover (no dead fill); active press. ✓
- Dark: Brighter base and text; lighter overlay and case/journal imagery. ✓
- Journal: Clearer hierarchy, intro and spacing. ✓
- Mobile: Improved padding, gaps, tap targets, contact layout. ✓
- Repo: Root clean; docs in docs/ai and docs/planning. ✓
- No content or architecture changes; texts unchanged. ✓

## 5. Changelog

- **Contact page rebuild:** Single premium card; compact heading; two-column (contacts | form) desktop; one-column mobile; thumb-friendly inputs and submit.
- **Button redesign:** Lighter surfaces, 0.12 border, single inset highlight; hover border lift + subtle glow only; active scale 0.985; primary/secondary/watch-case aligned.
- **Dark surface refinement:** --bg and tokens lightened; hero overlay reduced; case and journal image filters brighter.
- **Journal page refinement:** Editorial hierarchy; intro and spacing; featured and grid-rest spacing.
- **Mobile responsive pass:** Section/label/grid spacing; journal featured height; button min-heights and padding; contact mobile layout and legal.
- **Repo cleanup:** Confirmed; no moves required.
- **Preserved unchanged:** All copy; site architecture; case/journal/article content; nav and header; JS behavior.
- **Remaining risks:** None identified; optional short-message field on contact omitted to keep form minimal.
