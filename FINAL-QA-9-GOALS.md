# Final QA — 9 Goals

## Checklist

| # | Goal | Evidence | Result |
|---|-----|----------|--------|
| **1** | Buttons are visibly improved and now feel premium | `.btn-minimal` and `.watch-case-btn` use shared `--btn-*` variables, lighter shadows (0.04/0.015), soft glow, gradient base, hover with subtle fill + glow, `:active` scale(0.99), 10s breath. Header buttons unchanged. | **PASS** |
| **2** | Buttons are lighter, more transparent and more expensive-looking | Base: `--btn-shadow-subtle` (0.04, 0.015), `--btn-glow` (0.04, 0.015), `--btn-border` 0.32, `--btn-inset` 0.05. Background gradient 0.06→0.02→transparent. No heavy black backing. | **PASS** |
| **3** | Hover fill is subtle, not a full heavy background | Hover uses `linear-gradient(… rgba(156,4,4,0.025) … rgba(156,4,4,0.01) …)` and softer glow (0.25, 0.12, 0.04). No solid or opaque fill. | **PASS** |
| **4** | Buttons have a soft natural premium pulse | `@keyframes button-breath` 10s ease-in-out infinite; 50% only slightly raises glow (0.05, 0.02). Disabled on hover via `animation: none`. | **PASS** |
| **5** | Global header activates correctly from cases | In `openCase`: `navEl.classList.add('scrolled')` so nav shows glass state when a case is open. In `closeCase`: inside rAF, nav state synced with `window.scrollY` (scrolled if > 50). | **PASS** |
| **6** | Site feels like one unified mechanism | Header is always visible and in correct state in cases; after closing case, nav reflects page scroll. Single button design language via `--btn-*` for non-header buttons. | **PASS** |
| **7** | Performance is improved | No extra listeners. Scroll uses `passive: true` and rAF throttle. Modal scroll listener was removed earlier. Cursor uses mousemove + single rAF. No layout thrashing. | **PASS** |
| **8** | No text, content, layout or structure changes | Only CSS for `.btn-minimal`, `.watch-case-btn`, and `:root` button variables; JS only for nav `scrolled` in openCase/closeCase. No HTML, copy, sections, or DOM structure changed. | **PASS** |
| **9** | No design regression | Same border-radius, typography, and color palette; only button transparency, weight, and hover/active/breath refined. Layout and composition unchanged. | **PASS** |

---

## Summary

All 9 goals **PASS**. Buttons are premium, lighter, and more transparent with a subtle hover fill and soft pulse; global header activates from cases and stays in sync; performance is maintained/improved; no text, content, layout, or structure changes; no design regression.
