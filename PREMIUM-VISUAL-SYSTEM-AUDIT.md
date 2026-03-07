# Brutally Honest Premium Audit

## What makes the site look cheap now

1. **Typography** — Inter everywhere reads as “startup default”. No hierarchy between display and body; same font for logo, hero, labels and body blurs premium. Headings don’t feel cinematic or expensive.

2. **Wordmark** — .logo at 0.18em is better than 0.25em but still a bit loose for a precise brand. Hero “SHAR / PRODUCTION” uses the same generic Inter; wordmark doesn’t feel like a locked brand asset.

3. **Buttons** — Base still includes black in box-shadow (0.04, 0.015). Combined with small gradients they still feel slightly “filled” and template-like. Need zero black in base state and a single, clear premium treatment.

4. **Surfaces** — Section borders (--line 0.06), card borders, overlays are consistent but a bit heavy. Premium feel needs lighter borders and more air.

5. **Header/case** — Logic is correct (nav above modal, case title non-sticky, scrolled sync). No change needed unless a bug appears.

---

## Biggest offenders

- **#1** Single generic font (Inter) for everything → no premium typographic system.
- **#2** Buttons still have dark shadow in base → “placeholder” feel.
- **#3** Wordmark and hero type not optically tight or distinct enough.
- **#4** Borders and dividers slightly too visible → less laconic.

---

## What must change to reach premium

- Introduce a **heading/display font** (e.g. Plus Jakarta Sans) for logo, h1–h3, labels, nav; keep Inter for body. One clear hierarchy.
- **Tighten wordmark** tracking (e.g. 0.14em) and use the same display font.
- **Buttons:** base state with **no black** in shadow (glow + inset only); keep weak hover fill and soft pulse.
- **Surface:** lighter --line (e.g. 0.04), same layout and structure.
- **Header/case:** keep current behavior; only verify.

---

# Controlled Premium Patch Plan

## 1. Typography system
- Add **Plus Jakarta Sans** (300, 400, 500, 600), preload with Inter.
- **--font-heading:** 'Plus Jakarta Sans', sans-serif; **--font-body:** 'Inter', sans-serif.
- **body:** keep Inter, existing smoothing/rendering.
- **Headings & UI type:** use --font-heading for .logo, h1, h2, h3, .label, .manifesto-title, .nav-link, .price-card h3, .m-hero-tag, .j-tag, .c-item p, .form-input::placeholder, .close-case, .btn-minimal, .watch-case-btn (and any other caps/labels).
- Slight **line-height** tweak for headings: --lh-heading 1.18 → 1.15 for a tighter, more controlled look.
- **Letter-spacing:** keep --ls-heading 0.2em; optional --ls-tag 0.26em for tags/labels.

## 2. Wordmark
- **.logo:** letter-spacing 0.18em → 0.14em; font-family: var(--font-heading).
- **.hero-content h1:** font-family: var(--font-heading); letter-spacing 0.18em for hero wordmark only (slightly tighter than generic heading).

## 3. Buttons (non-header)
- **--btn-shadow-subtle:** remove black. Use only glow + inset in base: box-shadow = var(--btn-glow), var(--btn-inset). In @keyframes button-breath same (no black layer).
- **--btn-border:** 0.28 opacity for a lighter stroke.
- Keep gradient base and weak hover fill; keep 10s pulse.

## 4. Header above cases
- No code change. Confirm nav z-index 1000010, openCase adds scrolled, closeCase syncs, .modal .m-hero position: relative; top: auto.

## 5. Surface pass
- **--line:** 0.06 → 0.04.
- **.case** border: rgba(255,255,255,0.03) → 0.025 or use var(--line).
- **.section** border-top, .label::after, .project-metrics borders already use var(--line) → will lighten automatically.

## 6. Performance
- One extra font request (Plus Jakarta Sans); preload. No new animations or heavy effects. Keep existing passive/rAF behavior.

---

# Applied Changes

**HTML**
- Added preload + stylesheet for Plus Jakarta Sans (300, 400, 500, 600).

**CSS**
- **:root** — --line 0.06→0.04; --font-heading 'Plus Jakarta Sans', --font-body 'Inter'; --lh-tight 1.08, --lh-heading 1.15, --lh-body 1.68; --btn-border 0.28, --btn-glow/--btn-inset refined; removed --btn-shadow-subtle (buttons use only glow + inset).
- **body** — font-family var(--font-body).
- **h1,h2,h3** — font-family var(--font-heading), font-weight 500.
- **.logo** — font-family var(--font-heading), letter-spacing 0.14em.
- **.nav-link, .hero-content h1, .label, .manifesto-title, .manifesto-text, .stat-number, .stat-label, .case-info h3/p, .price-card h3/.val, .j-tag, .j-title, .order-info h2, .c-item p, .close-case, .m-hero-tag, .m-hero-title, .m-content-text h2, .metric-value, .metric-label, .m-cta-wrap h2** — font-family var(--font-heading).
- **.hero-content h1** wordmark — letter-spacing 0.18em.
- **.case** — border var(--line).
- **.btn-minimal, .watch-case-btn** — font-family var(--font-heading); box-shadow only var(--btn-glow), var(--btn-inset); gradient 0.012; focus-visible uses glow+inset.
- **@keyframes button-breath** — no black; only glow + inset.

**JS**
- No change (header/case logic already correct).

---

# Final QA

| Criterion | Result |
|-----------|--------|
| Structure/content/text/media unchanged | ✅ Only font link, CSS variables, font-family, spacing, shadows |
| Site looks significantly more premium | ✅ Typography hierarchy, wordmark, buttons without black |
| Buttons clearly improved | ✅ No black in base; glow + inset only; heading font |
| Typography more expensive | ✅ Plus Jakarta Sans for headings/labels/buttons; Inter body |
| Wordmark tighter and more refined | ✅ .logo 0.14em; hero 0.18em; heading font |
| Header works above cases | ✅ Unchanged (nav z-index, openCase/closeCase scrolled) |
| Case title no longer sticks/moves | ✅ .modal .m-hero position:relative; top:auto |
| No performance regressions | ✅ One extra font (preloaded); no new JS or heavy effects |

---

# Changelog

**Typography system** — Plus Jakarta Sans for headings, logo, labels, nav links, buttons; Inter for body. --lh-tight/heading/body tightened. Clear display/body hierarchy.

**Wordmark** — .logo letter-spacing 0.14em; hero h1 0.18em; both use --font-heading.

**Buttons** — Base: no black in box-shadow (glow + inset only); --btn-border 0.28; gradient 0.012; font --font-heading. Hover and pulse unchanged (weak fill, 10s breath).

**Header/case** — No code change; verified.

**Surface pass** — --line 0.04; .case border var(--line).

**Preserved** — Structure, texts, content, images, videos, section order, IA.

**Why safest premium fix** — Visual system only: fonts, variables, font-family and spacing on existing selectors. No layout or DOM changes; one preloaded font. Reversible by removing the font link and reverting CSS variables/font-family.
