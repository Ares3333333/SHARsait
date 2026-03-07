# Final QA — 6 Items

## Checklist

| # | Criterion | Evidence | Result |
|---|-----------|----------|--------|
| **1** | Global site header still works | `nav` has `position: fixed`, `z-index: 1000010` (above modal 1000002). Scroll listener adds/removes `scrolled` class with rAF throttle, `passive: true`. No changes to nav structure or buttons. | **PASS** |
| **2** | Case/company title is no longer sticky or moving | `.modal .m-hero { position: relative; top: auto; }` (style.css line 357). No scroll listener on modal; no `_onModalScroll` or `is-scrolled` in script.js. Title scrolls with modal content. | **PASS** |
| **3** | Buttons no longer look like cheap black placeholders | `.btn-minimal` and `.watch-case-btn` use light shadows: `0 1px 2px rgba(0,0,0,0.1)`, `0 4px 10px rgba(0,0,0,0.03)`, plus soft brand glow (0.05/0.02). No heavy black backing. | **PASS** |
| **4** | Buttons feel more natural, premium and expensive | `button-breath` 8s ease-in-out: subtle pulse on brand glow only (0.05→0.07, 0.02→0.03 at 50%). Light gradient background, soft inset edge. Hover turns off animation and uses stronger glow. | **PASS** |
| **5** | Site performance improved | Modal scroll listener removed (no `_onModalScroll`). Nav scroll uses rAF throttle + passive. Cursor uses mousemove + single rAF. No extra listeners or layout thrashing from case title. | **PASS** |
| **6** | No design/text/content/layout regressions | Only changes: `.modal .m-hero` override, button shadows/gradient and `button-breath` on non-header buttons. Nav, copy, structure, sections, media unchanged. | **PASS** |

---

## Summary

All 6 criteria **PASS**. Global header works; case title is non-sticky; buttons are light and premium with soft pulse; performance improved by removing modal scroll logic; no design, text, content or layout regressions.
