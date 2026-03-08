# Plan: Next Steps (After Audit)

**Date:** 2026-03-08  
**Prerequisite:** Audit completed — see `AUDIT-CURRENT-STATE.md`.  
**Rule:** No implementation in this document; this is the plan only. Implementation follows only after plan is approved or requested.

---

## 1. Scope

The audit shows the site is already in a good state: routes correct, contact form simplified, buttons and atmosphere updated, case media with muted autoplay. The plan below covers **optional** refinements only. No mandatory changes.

---

## 2. Optional refinements (in order)

### 2.1 Case card default state (low priority)

**Problem (audit):** `.case img` uses `grayscale(0.58) brightness(0.54)`; cards read very dark until hover.

**Plan:**
- In `assets/css/style.css`, adjust `.case img` filter: e.g. `brightness(0.58)` → `0.62` and/or `grayscale(0.58)` → `0.48` so cards feel slightly lighter at rest while keeping hover pop.
- Keep hover as-is (`grayscale(0) brightness(0.92)`).

**Risk:** Low. Visual only.

---

### 2.2 Case-info gradient (low priority)

**Problem (audit):** `.case-info` uses `rgba(3,3,3,0.68)` → 0.12; hero overlay uses 0.50 → 0.10. Case cards feel a bit heavier.

**Plan:**
- In `assets/css/style.css`, change `.case-info` gradient to `0.56` → `0.10` and transparent at 76% to align with hero overlay language.

**Risk:** Low. Visual only.

---

### 2.3 Case card background (cosmetic)

**Problem (audit):** `.case` has `background: #050505`; body uses `--bg: #07070c`.

**Plan:**
- In `assets/css/style.css`, set `.case { background: var(--bg); }` or `#07070c` so card background matches global bg.

**Risk:** Very low.

---

### 2.4 Locale cleanup (optional)

**Problem (audit):** `order.fieldReach`, `order.fieldCompany`, `order.placeholderCompany`, etc. may be unused after form simplification.

**Plan:**
- In `assets/js/locales.js`, remove or comment unused `order.*` keys if no other code references them (e.g. no `data-i18n="order.fieldCompany"` anywhere). Keep EN in sync.

**Risk:** Low. Verify no references before removing.

---

## 3. Out of scope (do not do unless explicitly requested)

- No copy/rewrite of existing texts.
- No information architecture or route changes.
- No new features (e.g. form backend, new pages).
- No redesign of header or global nav.
- No removal of content or media.

---

## 4. Implementation order (when implementing)

1. CSS-only: case card img filter (2.1), case-info gradient (2.2), case background (2.3).
2. Locales: audit references to `order.*`, then remove unused keys (2.4).
3. Quick check: homepage cases grid, one case page, contact form, journal — confirm no regressions.

---

## 5. When to implement

- Implement **only** after you approve this plan or ask to "implement the plan."
- If no changes are desired, leave the codebase as-is; the audit still serves as the current state reference.
