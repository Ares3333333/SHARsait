# Plan: Premium Buttons, Lighter Surfaces, Minimal Contact Form

**Prerequisite:** Audit done — `AUDIT-PRIORITY-BUTTONS-SURFACES-FORM.md`.  
**Order:** Implement only in this sequence. No random edits.

---

## Step 1 — Premium buttons (CSS only)

**File:** `assets/css/style.css`

1.1 **.watch-case-btn**
- Default: increase top inset highlight 0.07→0.08 so the edge reads clearer; keep bottom inset.
- Hover: border 0.32→0.28; glow 0.025→0.022.

1.2 **.btn-minimal**
- Default: top inset 0.07→0.08.
- Hover: border 0.32→0.28; glow 0.028→0.024.

1.3 **.cta-primary (.btn-minimal / .watch-case-btn)**
- Hover: border 0.36→0.32; glow 0.032→0.028.

1.4 **.cta-secondary**
- Hover: border 0.32→0.28; glow 0.02→0.018.

1.5 **.cta-ghost**
- Hover border 0.24→0.22 (optional; keep if already restrained).

Do not change: header buttons, nav, logo. Do not add neon or heavy shadows.

---

## Step 2 — Lighter premium surfaces (CSS only)

**File:** `assets/css/style.css`

2.1 **.case**
- `background: #050505` → `background: var(--bg);`

2.2 **.overlay** (hero)
- Bottom gradient: rgba(3,3,3,0.44) → 0.40; keep 0.08 and 80%.

2.3 **.case-info**
- Gradient: 0.54→0.48, 0.08→0.06, transparent 76% unchanged.

2.4 **.contact-form-wrap**
- Background: 0.018→0.022, 0.004→0.006.

Do not change: --bg, --surface-border, --surface-fill, or section structure.

---

## Step 3 — Minimal contact form (already minimal)

**Contact form:** Already two fields (name, contact). No HTML change.

3.1 **Form wrap surface** — done in Step 2.4.

3.2 **Optional:** In `contact.html`, if form-note margin is large, leave as-is unless a single small reduction (e.g. margin-bottom var(--space-xl)→var(--space-lg)) is clearly better. **Decision:** leave form note and title spacing unchanged to avoid layout shift; wrap surface lightening is enough.

No removal of fields. No change to labels or placeholders. Privacy link stays.

---

## Implementation checklist

- [x] 1. Buttons: watch-case, btn-minimal, cta-primary, cta-secondary, cta-ghost — CSS only (top inset 0.08, hover border 0.28/0.32, glow 0.022–0.028).
- [x] 2. Surfaces: .case bg var(--bg), .overlay 0.40, .case-info 0.48/0.06, .contact-form-wrap 0.022/0.006 — CSS only.
- [x] 3. Contact: no HTML change; wrap lightened in 2.4.

No edits to: index.html, case pages, journal, routes, locales (unless a locale string is wrong; currently not).
