# Final QA — Button & Case Top Bar Polish

## Confirmation checklist

| # | Criterion | Evidence | Result |
|---|-----------|----------|--------|
| 1 | **Only weak non-header buttons were polished** | `.btn-minimal` (lines 305–327) and `.watch-case-btn` (254–271) have polish: padding 16px 28px / 14px 26px, `line-height: 1.25`, `:focus-visible`, `transition` including `background`. No other button classes were modified. | **PASS** |
| 2 | **Global top panel buttons left unchanged** | `.btn-nav-premium` (116–132) and `.phone-link` (135–151) keep original padding `10px 22px`, no `:focus-visible` added, no structural changes. Mobile overrides (432) for nav only. | **PASS** |
| 3 | **Case top bar is visible** | `.m-hero` (355): `position: sticky; top: 0; z-index: 10`. In `openCase` (script.js 262): `modal.scrollTop = 0` so the bar is at top when case opens. | **PASS** |
| 4 | **Case top bar is clickable** | `.m-hero` has `pointer-events: auto`. `.close-case` (351) is `position: fixed`, `z-index: 1000003`, `pointer-events: auto`. No overlay or parent with `pointer-events: none` blocking the bar. | **PASS** |
| 5 | **Case top bar becomes lighter in active/scroll state** | `.m-hero.is-scrolled` (356): `background: rgba(22,22,22,0.98)`. Scroll handler (297–301) toggles `is-scrolled` when `modal.scrollTop > 30`. `.m-hero` has `transition: background 0.35s var(--ease-luxe)`. | **PASS** |
| 6 | **No performance regression** | Scroll listener is `{ passive: true }`, attached only when modal is open, removed in `closeCase` (331–333). No new intervals, no extra global listeners, no heavy blur/filter. | **PASS** |
| 7 | **No design regression** | No layout or structure changes. Button changes are padding/line-height/focus and one new state (lighter bar). Same border-radius, colors, and visual language. | **PASS** |
| 8 | **No other parts of the site changed** | CSS: only `.btn-minimal`, `.watch-case-btn`, `.m-hero` / `.m-hero.is-scrolled`. JS: only `openCase` (scroll reset + scroll listener) and `closeCase` (listener removal + class cleanup). Nav, content, sections, media untouched. | **PASS** |

---

## Summary

- **Polished:** `.btn-minimal`, `.watch-case-btn` (premium padding, line-height, focus, transitions).
- **Unchanged:** Global top panel and its buttons (`.btn-nav-premium`, `.phone-link`), all other site areas.
- **Case top bar:** Visible on open (`scrollTop = 0`), sticky and clickable (`pointer-events: auto`, z-index), lighter when scrolled (`.m-hero.is-scrolled` via passive scroll listener).
- **Stability:** No new regressions; listener is modal-scoped and removed on close.

**All 8 criteria confirmed PASS.**
