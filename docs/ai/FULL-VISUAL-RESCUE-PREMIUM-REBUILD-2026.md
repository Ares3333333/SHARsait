# Full Visual Rescue + Premium Rebuild — SHAR Production

**Date:** 2026-03  
**Reference:** SGAER (visual source of truth for premium feel).  
**Constraint:** No architecture redesign; no text/route/content removal. Visual system and front-end styling only.

---

## 1. Premium Visual Failure Audit

### What was wrong vs. premium reference

| Area | Failure | Impact |
|------|--------|--------|
| **Color / accent** | Crimson (#9c0404) was underused; sections felt neutral, not branded. | Site felt generic, not studio-owned. |
| **Case cards** | Used elevated gray (`--bg-elev-1`) behind media; overlay too light. | Lost “black cinema screen” depth; cards felt flat. |
| **Contact** | Card padding and panel spacing were tight; left accent thin. | Felt clumped and cheap, not premium. |
| **Labels / sections** | Section dividers and labels had no red accent. | No visual thread tying sections to brand. |
| **Hero** | Lower showreel gradient could be stronger for blend into black. | Slight loss of cinematic continuity. |
| **Journal** | Intro block and featured card could use more air and clearer accent. | Less editorial, more generic. |
| **Footer / CTA** | No crimson accent detail. | Missed opportunity for consistency. |

### Root cause

- Accent usage was conservative (buttons/contact only).
- Case cards were treated as “surfaces” (elev-1) instead of “screens” (pure black).
- Contact and journal compositions were space-tight.
- Section-level accents (lines, labels) were not wired to #9c0404.

---

## 2. Controlled Rebuild Plan

1. **Color + accent system**  
   Restore #9c0404 across: section top gradient, label lines (::before/::after), footer top line, CTA block lead line. Keep base black; no gray/bluish drift.

2. **Case cards**  
   Case background → `#000`; darker case-info overlay; stronger hover shadow + crimson rim; image filter slightly darker at rest for “screen” feel.

3. **Buttons**  
   Already rebuilt (pulse, glow, light-shift). No structural change; keep as-is.

4. **Contact page**  
   Increase card padding (aside + form panel); 6px crimson left border; larger gaps; form panel max-width 400px; focus-within glow stronger; mobile 6px left border and relaxed gap.

5. **Homepage / hero**  
   Slightly stronger hero overlay on lower area; CTA block text ::before crimson line; section ::before top gradient (crimson fade).

6. **Journal**  
   Intro lead 6px left border; more padding and margin (intro + featured); featured 6px left; hover glow stronger; mobile 6px and more content padding.

7. **Mobile**  
   Contact/journal left border 6px; contact aside gap `--space-xl`; journal featured content padding increased.

8. **Shadow / glow / depth**  
   Case hover: deeper shadow + crimson 56px glow; contact focus-within 72px glow; journal featured hover 64px; all stay minimal, no neon.

9. **Repo hygiene**  
   Planning/audit docs already in `docs/ai/` and `docs/planning/`. `.gitignore` already excludes `.DS_Store`. No structural change.

---

## 3. Applied Changes

### CSS (`assets/css/style.css`)

- **Section / labels**  
  - `.section::before`: top-edge gradient `rgba(156,4,4,0.35)` → transparent.  
  - `.label::before`: 24px crimson gradient line; `.label::after`: line gradient includes `rgba(156,4,4,0.12)`.

- **Case cards**  
  - `.case` background `#000`; inner shadow + dark rim; hover shadow with `0 0 56px rgba(156,4,4,0.12)` and crimson 1px ring.  
  - `.case img` filter slightly darker at rest (brightness 0.9, contrast 1.04).  
  - `.case-info` overlay gradient deepened (0.92 → 0.5 → 0.12 → transparent).

- **Contact**  
  - `.contact-card`: grid `0.9fr / 1.1fr`; `border-left: 6px solid #9c0404`.  
  - `.contact-aside` padding and gap increased; `.contact-form-panel` padding increased; `.contact-form-wrap` max-width 400px.  
  - `.contact-card:focus-within` glow `72px rgba(156,4,4,0.16)`.  
  - `.contact-page .contact-inner` max-width 1180px; `.contact-direct` margin-top and grid gap adjusted.  
  - Mobile: `border-left-width: 6px`, aside gap `--space-xl`.

- **Journal**  
  - `.journal-intro-lead`: 6px left border; more padding/margin.  
  - `.journal-intro`: larger margin-bottom and font.  
  - `.journal-featured`: 6px left border; hover glow 64px; mobile 6px and content padding up.  
  - `.journal-intro-lead` mobile `border-left-width: 6px`.

- **Hero**  
  - `.overlay`: gradient slightly stronger at bottom (0.9 → 0.52 → 0.14 → transparent).

- **Footer / CTA**  
  - `.site-footer::before`: 120px crimson gradient line at top.  
  - `.cta-block-text::before`: 32px crimson gradient line above text.

- **Mobile**  
  - Contact card and journal featured/intro: 6px left border; contact aside gap; journal featured content padding.

No HTML or route changes. No content or copy changes.

---

## 4. Final QA

| Criterion | Status |
|-----------|--------|
| True black dominant base | Pass — body/sections/case bg #000; elev-1/2 for cards only. |
| #9c0404 only accent | Pass — all red is 156,4,4; no other reds. |
| Crimson visible in UI | Pass — labels, section top, footer, CTA line, contact/journal left bar, case hover ring/glow, buttons. |
| Case cards: black cinematic depth | Pass — case bg #000; darker overlay and image at rest; hover crimson rim + glow. |
| Buttons: premium, pulse, glow | Pass — existing system kept; no regressions. |
| Contact: premium composition | Pass — more padding, 6px accent, stronger focus glow, not cramped. |
| Journal: editorial, air, hierarchy | Pass — intro/featured 6px accent; more spacing; stronger hover. |
| Homepage: flagship feel | Pass — section/label/footer/CTA accents; hero overlay strengthened. |
| Mobile: premium, no cramping | Pass — 6px accents; contact/journal spacing; no overflow. |
| No architecture/text/routes changed | Pass — CSS-only. |
| Repo hygiene | Pass — docs in docs/ai and docs/planning; .DS_Store in .gitignore. |

**Result: Pass.**

---

## 5. Changelog

- **Crimson accent restoration** — Section top gradient; label ::before/::after crimson; footer and CTA block lead line; contact/journal 6px left border; case hover ring/glow; buttons unchanged but verified.
- **Case card cinematic rebuild** — Background #000; darker overlay and image at rest; hover shadow + 56px crimson glow + 1px crimson ring.
- **Premium button system** — No change; existing pulse/glow/shimmer retained and checked.
- **Contact card/page rebuild** — Larger padding and gaps; 6px left border; stronger focus-within glow; 1180px inner max-width; mobile 6px and aside gap.
- **Homepage atmosphere** — Section/label/footer/CTA crimson details; hero overlay slightly stronger.
- **Journal polish** — Intro and featured 6px accent; more padding/margin; stronger hover glow; mobile alignment.
- **Mobile premium pass** — Contact and journal 6px left; contact aside gap; journal content padding.
- **Shadow/glow/depth** — Case 56px; contact 72px; journal featured 64px; all restrained.
- **Repo cleanup** — Confirmed docs location and .gitignore; no file moves.
- **Preserved** — All pages, routes, texts, content, cases, media, structure; header/nav unchanged.
- **Remaining risks** — None identified. If any browser shows section ::before too strong, reduce opacity (e.g. 0.85 → 0.6) in one place.

---

**Final criterion:** SHAR Production keeps content and structure and reads as a premium black luxury-minimal studio site with black base, #9c0404 restored across accents, cinematic case cards, premium buttons, premium contact composition, richer shadows and crimson glow, and flagship-level feel. **Met.**
