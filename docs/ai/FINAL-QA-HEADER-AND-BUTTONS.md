# Final QA — Global Header & Button Polish

## Checklist

| # | Criterion | Evidence | Result |
|---|-----------|----------|--------|
| **1** | Global site header is visible above cases | `nav` has `z-index: 1000010` (line 88); `.modal` has `z-index: 1000002` (line 350). Nav stacks above modal, so the global header stays visible when a case is open. | **PASS** |
| **2** | Global site header is clickable | Same stacking: nav is above the modal overlay. No `pointer-events: none` on nav; nav and its links/buttons remain interactive. | **PASS** |
| **3** | Sticky internal case label/title no longer overlaps or suppresses the global header | `.modal .m-hero { top: var(--nav-height); }` (line 359) with `--nav-height: 72px` (line 33). The case sticky bar sticks at 72px from the top, i.e. below the global header, so it never overlaps or suppresses it. | **PASS** |
| **4** | Buttons no longer look like cheap dark placeholders | `.btn-minimal` and `.watch-case-btn` use lighter shadows (`0 1px 3px rgba(0,0,0,0.16)`, `0 4px 12px rgba(0,0,0,0.08)`), a lighter gradient (`rgba(255,255,255,0.06) → 0.02 → transparent`), and a subtle top edge (`inset 0 1px 0 rgba(255,255,255,0.08)`) instead of heavy black backing. Header buttons (`.btn-nav-premium`, `.phone-link`) were not changed. | **PASS** |
| **5** | Buttons feel lighter, cleaner, more premium and more expensive | Same as #4: reduced opacity on dark shadows, added light gradient and soft inset so the non-header buttons read as lighter and more refined without redesign. | **PASS** |
| **6** | No performance regression | Only CSS changes (z-index, one variable, button shadows/gradient). No new JS, no new listeners, no heavy filters or animations. | **PASS** |
| **7** | No design regression | No layout, structure, or copy changes. Same border-radius, colors, and typography; only stacking and button surface treatment were adjusted. | **PASS** |

---

## Summary

All 7 criteria are **PASS**. The global site header is visible and clickable above cases; the sticky case bar sits below it and no longer overlaps or suppresses the header; non-header buttons are lighter and more premium with no performance or design regression.
