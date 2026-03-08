# Final Premium Finishing Pass — Changelog & QA

**Date:** 2026-03-08  
**Scope:** Premium finishing only (no redesign, no copy rewrite, no IA change).

---

## 1. Remaining Problems Audit

- **Buttons:** Felt low-end, generic; needed lighter surfaces, refined borders, subtle luminous edge, no heavy block.
- **Dark/muddy:** Overlay and filters too strong; needed more perceived brightness and clarity while keeping dark-luxury mood.
- **Contact form:** Too many fields (name, phone/Telegram, company, message); felt CRM-like; needed radical simplification.
- **Case media:** Iframes used `autoplay=0`; no autoplay muted for premium entry.
- **Homepage/showreel:** Overlay and section air could be refined for more “expensive studio” feel.
- **Repo:** Root already clean; `.gitignore` in place for `.DS_Store` and `.cursor/`.

---

## 2. Minimal Safe Fix Plan (Applied)

| Area | Action |
|------|--------|
| Buttons | CSS: lighter gradients, border 0.22, refined hover (soft edge + glow), more padding/air, precise motion |
| Dark/muddy | CSS: `--bg` #07070c, overlay opacities reduced, poster brightness 0.97, case-info and journal img lighter |
| Contact form | HTML: name + contact (one field) + optional message (one line); locales + toast labels updated |
| Case media | HTML: all 8 case iframes `autoplay=1&muted=1&loop=0`; CSS: `.m-video-container` softer shadow, border |
| Homepage | Overlay/poster/tokens as above; `--section-pad-y` slightly increased |
| Repo | Verified root clean; no code change |

---

## 3. Applied Changes

### Button system upgrades
- **Tokens:** `--btn-border`, `--btn-glow`, `--btn-inset` unchanged; button rules refined.
- **.watch-case-btn:** Lighter background (0.04→0.01), border 0.22; hover: soft luminous edge (0 0 0 1px + 0 0 24px glow), no heavy fill; min-height 40px, padding 12px 24px; letter-spacing 0.16em.
- **.btn-minimal:** Same treatment; min-height 44px, padding 13px 28px; letter-spacing 0.15em; default background 0.035→0.01; hover 0.055 + 0.015 brand, subtle edge + 28px glow.
- **.cta-primary:** Default border 0.26, background 0.04→0.01; hover border 0.38, background 0.065→0.02, edge + 32px glow.
- **.cta-secondary:** Lighter default/hover; hover edge + 24px glow.
- **.cta-ghost:** Border 0.14 default, 0.26 hover.
- All: transitions 0.45s/0.35s; no neon, no heavy block.

### Visual atmosphere / lightness fixes
- **:root:** `--bg` #050508 → #07070c; `--grey` 0.45 → 0.48; `--text-secondary` 0.72 → 0.76; `--text-tertiary` 0.48 → 0.52; `--line` 0.058 → 0.065; `--surface-border` 0.12 → 0.13; `--surface-fill` 0.032 → 0.035.
- **.overlay:** Bottom gradient 0.62→0.50, 0.14→0.10; side 0.34→0.26; brand radial 0.1→0.08.
- **.video-poster img:** brightness 0.94→0.97, saturate 1.05→1.04.
- **.case-info:** Gradient 0.68→0.56, 0.12→0.10.
- **.j-img-wrap img:** brightness 0.78→0.84, grayscale 0.5→0.4; hover brightness 0.9→0.92.
- **.m-video-container:** Background #0a0a0e; border 1px rgba(255,255,255,0.06); box-shadow softened (24px 64px, 0 0 40px brand 0.12).

### Contact form simplification
- **contact.html:** Form reduced to: Name (required), Contact (required — phone/Telegram/email), Message (optional, single line). Removed company field and 4-row textarea. Form title "ЗАПРОС", note shortened. Class `contact-form--minimal`, structure `contact-form-fields` + `contact-field--optional`, `form-input--message-single`.
- **locales.js (RU/EN):** formTitle "ЗАПРОС"/"REQUEST", formNote shortened; fieldContact, placeholderContact; fieldMessageOptional, placeholderMessageOptional; submit "ОТПРАВИТЬ"/"SEND". Removed fieldCompany, placeholderCompany, placeholderMsg (replaced by optional message). toast.submit updated to "ОТПРАВИТЬ"/"SEND".
- **script.js:** Fallback submit label "ОТПРАВИТЬ".
- **style.css:** .contact-form-fields, .contact-form--minimal spacing, .contact-field--optional, .form-input--message-single.

### Case media / case flow fixes
- **Case pages (1–8):** iframe `src` updated from `autoplay=0` to `autoplay=1&muted=1&loop=0` so video autoplays muted where policy allows.
- **.m-video-container:** Softer shadow and light border (see Visual atmosphere).

### Homepage / showreel refinement
- Hero: overlay and poster changes (see Visual atmosphere).
- Sections: `--section-pad-y` clamp(92px, 9.5vw, 124px) → clamp(96px, 10vw, 128px).

### Repo cleanup
- No .md in root; planning/audit docs in `docs/ai/` and `docs/planning/`. `.gitignore` includes `.DS_Store` and `.cursor/`. No file moves this pass.

---

## 4. Final QA

| Check | Result |
|-------|--------|
| Buttons (non-header) feel premium, minimal, no heavy block | Pass |
| Site feels less dark/muddy, more luminous, premium dark | Pass |
| Contact form: name + contact + optional message only | Pass |
| Privacy policy link present and correct | Pass |
| Case iframes autoplay muted where allowed | Pass |
| Case CTA still routes to /contact | Pass |
| Homepage hero/showreel and sections refined | Pass |
| No text/copy rewrite beyond contact labels | Pass |
| No IA or route changes | Pass |
| No flashy/neon/SaaS effects | Pass |
| Repo root clean, .gitignore in place | Pass |

---

## 5. Changelog Summary

- **Button system:** Lighter surfaces, refined borders and hover (subtle edge + glow), more air and precise motion; primary/secondary/ghost and watch-case-btn aligned to premium minimal studio.
- **Visual atmosphere:** Background and tokens lifted; overlay and poster lighter; case and journal media brighter; case video container softer.
- **Contact form:** Simplified to name, one contact field, optional one-line message; copy and labels shortened; privacy link kept.
- **Case media:** Autoplay muted on all case pages; container styling refined.
- **Homepage/showreel:** Overlay, poster, section padding tuned.
- **Repo:** Verified clean; no new junk.
- **Preserved:** All routes, all content, all case/journal/contact flows; header nav unchanged; no redesign.
- **Remaining risks:** Autoplay may be blocked by browser policy (fallback: user clicks play); form submit remains client-side toast only until backend is connected.
