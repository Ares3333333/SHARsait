# Audit: Premium Buttons, Surfaces, Contact Form (Priority)

**Date:** 2026-03-08  
**Scope:** Buttons (non-header), global surfaces/overlays, contact form. Observation only — no edits.

---

## 1. Premium buttons (current state)

**Selectors:** `.watch-case-btn`, `.btn-minimal`, `.cta-primary`, `.cta-secondary`, `.cta-ghost` (and combinations).

**Current values:**
- Border: 1px solid rgba(255,255,255,0.18) (watch-case, btn-minimal, secondary); primary 0.24; ghost 0.12.
- Background: linear-gradient 0.04→0.015→transparent (btn-minimal); watch-case 0.045→0.015→transparent; primary 0.035→0.01; secondary same as btn-minimal.
- Box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.025) to 0.03; hover adds 0 0 0 1px and 20–28px glow (0.02–0.032).
- Transition: 0.4s border/box-shadow/background, 0.32s transform.
- Primary has `button-breath-soft` 18s (border 0.26→0.32, inset 0.07→0.08).

**Gaps:**
- Default state can still read a bit flat; the bottom inset (0,0,0,0.025) is very subtle. Slightly stronger top highlight or a hair more transparency could make buttons feel more “optical” and premium.
- Hover glow at 0.028–0.032 is fine; no neon. Border at 0.32 on hover could be 0.28 for a more restrained look.
- Form submit button uses same .btn-minimal.cta-primary; contact form wrap could use a slightly lighter surface so the CTA reads more clearly.

---

## 2. Lighter premium surfaces (current state)

**Tokens:**
- `--bg: #07070c`; `--surface-border: 0.13`; `--surface-fill: 0.035`; `--line: 0.065`.

**Hero overlay:**
- Bottom: rgba(3,3,3,0.44)→0.08→transparent 80%; side: 0.22→transparent 74%; brand radial 0.06.
- Already lighter than earlier; could nudge 0.44→0.40 for a bit more breathability.

**Case cards (homepage / cases index):**
- `.case`: `background: #050505` — darker than `--bg` (#07070c). Inconsistent.
- `.case img` default: `grayscale(0.5) brightness(0.60)`; hover 0.92.
- `.case-info`: gradient 0.54→0.08→transparent 76%. Slightly lighter than old 0.68; could go 0.48→0.06 for more air.

**Other surfaces:**
- `.contact-form-wrap`: gradient 0.018→0.004; border var(--surface-border). Could be 0.022→0.006 for a bit more presence without heaviness.
- `.price-card`: 0.04→0.015; `.journal-card`: 0.042→0.018. Acceptable.
- `.video-poster img`: brightness(0.97). OK.

**Summary:** Main gains: align .case background with --bg; optionally lighten overlay 0.44→0.40 and case-info 0.54→0.48; optionally lighten contact-form-wrap slightly.

---

## 3. Minimal contact form (current state)

**Markup (contact.html):**
- Form has two fields only: **Name** (required), **Contact** (required). No message field.
- Labels: "ИМЯ", "КОНТАКТ"; placeholders "Как к вам обращаться", "Телефон, Telegram или email".
- Title "ЗАПРОС"; note "Оставьте имя и контакт — мы ответим в ближайшее время."
- Submit "ОТПРАВИТЬ"; form-legal with link to /privacy.

**CSS:**
- `.contact-form--minimal .contact-form-fields .contact-field { margin-bottom: var(--space-xl); }`; last-of-type margin-bottom var(--space-xl). Submit full width; form-legal below.
- Form wrap padding var(--space-2xl); border var(--surface-border); background 0.018→0.004.

**Gaps:**
- Form is already minimal (name + contact only). Only refinement: slightly lighter form-wrap surface so the block feels more premium and the primary CTA stands out a bit more.
- Optional: reduce note margin or form-title margin for a tighter block (optional).

---

## 4. Priority order for implementation

1. **Premium buttons** — small refinements: default border/highlight clarity, hover border 0.32→0.28, keep glow ≤0.03.
2. **Lighter surfaces** — .case background → var(--bg); overlay 0.44→0.40; case-info 0.54→0.48; contact-form-wrap 0.018→0.022, 0.004→0.006.
3. **Minimal contact form** — already two-field; only form-wrap surface and possibly spacing (no field removal).

No other changes. No copy changes. No route or structure changes.
