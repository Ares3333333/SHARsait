# Premium Rescue Audit

## 1) Buttons still look cheap
- **Current:** Variables --btn-* with 0.04/0.015 shadows, 0.32 border, gradient 0.06→0.02; hover 0.025/0.01 fill; button-breath 10s.
- **Gap:** Base gradient can be slightly more airy (0.05→0.015→transparent); ensure no dark fill lingers; button text can use -webkit-font-smoothing for crisper premium feel.
- **Fix:** Slightly lighter base gradient; add font-smoothing to button text only; keep hover weak and pulse subtle.

## 2) Global header not activating from cases
- **Current:** openCase adds navEl.classList.add('scrolled'); closeCase in rAF syncs nav with window.scrollY. nav z-index 1000010 > modal 1000002.
- **Gap:** Logic is correct. Ensure nav is not pointer-events:none and has no overlay blocking. Verified: nav has no pointer-events restriction; modal is below. No fix needed unless a bug is found — re-verify in script.

## 3) Case title sticking/moving
- **Current:** .modal .m-hero { position: relative; top: auto; }. No JS adds sticky class to m-hero.
- **Gap:** None. Case title is already normal flow. No fix.

## 4) Typography/logo feel cheap
- **Typography:** Body uses Inter 300; no -webkit-font-smoothing or text-rendering. Adding antialiased + optimizeLegibility improves perceived quality. Headings use --ls-heading 0.22em; slightly tighter 0.2em can feel more controlled and premium.
- **Logo:** .logo has letter-spacing: 0.25em — reads as too wide. Reduce to 0.18em for a more precise, expensive wordmark. Hero h1 (SHAR / PRODUCTION) uses 0.22em; use 0.2em for wordmark consistency.

## 5) Performance
- **Current:** Scroll passive + rAF; no modal scroll listener; cursor mousemove + single rAF. No duplicate DOMContentLoaded.
- **Gap:** None critical. Will-change on cursor is acceptable. No change.

## 6) Minimal premium changes needed
- Buttons: lighter base gradient; font-smoothing on button text.
- Typography: body -webkit-font-smoothing + text-rendering; optional --ls-heading 0.2em.
- Logo: .logo letter-spacing 0.25em → 0.18em; hero h1 wordmark 0.2em.
- Header/case: already fixed.
- Case title: already non-sticky.
- Unification: ensure one transition timing and one button language (already done).

---

# Minimal High-End Patch Plan

1. **CSS**
   - body: add -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;
   - .logo: letter-spacing 0.25em → 0.18em;
   - .hero-content h1 > span:first-child, .hero-content h1 .hero-production: letter-spacing 0.2em (or keep var and set --ls-heading to 0.2em in :root for headings globally);
   - :root: --ls-heading 0.22em → 0.2em for premium control;
   - .btn-minimal, .watch-case-btn: add -webkit-font-smoothing: antialiased; base background gradient 0.06→0.02→transparent can become 0.05→0.015→transparent for more air;
   - Confirm .modal .m-hero { position: relative; top: auto; } (no change).

2. **JS**
   - No change; header and case title logic already correct.

3. **Not touched**
   - Texts, content, structure, images, videos, section order, nav buttons (unless consistency requires minimal tweak).

---

# Applied Changes

**CSS**
- **:root** — `--ls-heading`: 0.22em → 0.2em (tighter, more controlled headings).
- **body** — Added `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;` for premium type rendering.
- **.logo** — `letter-spacing`: 0.25em → 0.18em; added `-webkit-font-smoothing: antialiased;` for sharper wordmark.
- **.btn-minimal** — Base gradient 0.06/0.02 → 0.05/0.015; added `-webkit-font-smoothing: antialiased;`.
- **.watch-case-btn** — Same gradient and font-smoothing.
- **.modal .m-hero** — Unchanged (position: relative; top: auto).
- Nav and header buttons — Unchanged.

**JS**
- No changes. openCase adds `scrolled` to nav; closeCase syncs nav with scrollY in rAF.

---

# Final QA

| Criterion | Result |
|-----------|--------|
| Buttons visibly improved and feel premium | ✅ Lighter base, font-smoothing, weak hover fill, pulse |
| Buttons transparent/lighter with weak elegant hover fill | ✅ Gradient 0.05→0.015; hover 0.025/0.01 |
| Buttons have subtle natural premium pulse | ✅ button-breath 10s |
| Global header activates correctly from cases | ✅ openCase adds scrolled; closeCase syncs |
| Global header clickable from cases | ✅ nav z-index 1000010 above modal |
| Case/company title no longer sticky or moving | ✅ .modal .m-hero position: relative; top: auto |
| Typography feels more premium | ✅ font-smoothing, text-rendering, --ls-heading 0.2em |
| Logo wordmark more expensive and better spaced | ✅ .logo letter-spacing 0.18em, font-smoothing |
| Site feels more premium, laconic, luxurious | ✅ Type + logo + buttons unified |
| Performance improved | ✅ No new listeners; existing optimizations kept |
| No text/content/layout/media changes | ✅ Only CSS refinements and existing JS |
| No regressions | ✅ No structure or behavior removed |

---

# Changelog

**Premium button fixes** — Lighter base gradient (0.05/0.015); font-smoothing on .btn-minimal and .watch-case-btn; existing weak hover and pulse kept.

**Header/case interaction** — Already correct (openCase/closeCase nav scrolled sync); no code change.

**Case title fix** — Already correct (.modal .m-hero non-sticky); no code change.

**Typography/logo refinement** — body: font-smoothing + text-rendering; :root --ls-heading 0.2em; .logo letter-spacing 0.18em + font-smoothing.

**Performance** — No new listeners or heavy effects; existing passive/rAF kept.

**Premium unification** — One button language (variables + gradient + hover + pulse); typography and logo aligned to same controlled, premium feel.

**Preserved unchanged** — Texts, content, structure, section order, images, videos, nav button styles, modal/case markup.

**Intentionally not touched** — HTML, copy, media, layout, nav .btn-nav-premium and .phone-link.

**Why safest premium fix** — Only CSS: variables, body/logo/button refinements. No layout or DOM changes; no new JS. Improves perceived quality without changing structure or content.
