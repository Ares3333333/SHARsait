# Hard Final QA — Visual Rebuild

**Criteria:** Buttons premium; less muddy / more expensive; contact premium; journal editorial; hero elite; mobile polished; no major regressions.

---

## 1. Passed

All six content/design criteria pass after verification and one fix.

---

## 2. Failed

None. (One regression was found and fixed: mobile `.case` had `border-radius: 3px` overriding desktop `6px`; corrected to `6px`.)

---

## 3. Exact remaining weak files / components / selectors

**Fixed during QA:**
- **`assets/css/style.css`** — `@media (max-width: 900px)` block: `.case { border-radius: 3px; }` reverted card radius on mobile; changed to `border-radius: 6px;` to match desktop. Removed dead selector `.order-wrap` from the same media rule (`.pricing-grid, .order-wrap, .m-case-body` → `.pricing-grid, .m-case-body`).

**Remaining weak spots (optional polish only):**
- **`.client-logo`** — still `border-radius: 3px`; could be set to `4px` or `6px` for consistency with case/journal cards if desired.
- **`.modal`** — background `rgba(3,3,3,0.97)`; could use `rgba(19,19,26,0.97)` to align with `--bg` for consistency (cosmetic only).
- **`.close-case`** — background `rgba(3,3,3,0.85)`; same as above (cosmetic).
- **`.m-hero`** / **`.m-hero.is-scrolled`** — use `rgba(3,3,3,…)` and `rgba(22,22,22,…)`; could align with design tokens (cosmetic).

No remaining weak spots that affect the five design criteria or introduce regressions.

---

## Verification summary

| # | Criterion | Result | Evidence |
|---|-----------|--------|----------|
| 1 | Buttons materially more premium | Passed | .btn-minimal 50px, 16px 40px, border 0.2, inset 0.1, hover/active; .cta-primary 0.45/0.65, breath 8s; .watch-case-btn aligned |
| 2 | Less muddy/dark, more expensive | Passed | --bg #13131a; text 0.9/0.65; surface 0.16/0.08; hero overlay single gradient; case img 0.9 brightness; case-info rgba(19,19,26) |
| 3 | Contact premium studio page | Passed | Two-panel card, radius 10px, shadow 0 8px 40px; heading clamp(1.5–2.15rem); aside 0.08→0.02; form minimal; mobile stack, 56px inputs |
| 4 | Journal editorial and premium | Passed | Intro 1.08–1.2rem, weight 400; featured 8px radius, shadow, 400px; grid-rest cards 8px, gradient, shadow; cards 6px + shadow |
| 5 | Hero/showreel more elite | Passed | Overlay single gradient, transparent by 65%; hero p 1rem–1.12rem, weight 400; h1 margin 20px |
| 6 | Mobile intentionally designed | Passed | Section 48px 6%; grid gap 32px; buttons 52/56px; journal featured 260px; contact stack; .case radius 6px (fixed) |
| 7 | No major regressions | Passed | Mobile .case radius fixed; .order-wrap removed from media query; no broken layout or content |
