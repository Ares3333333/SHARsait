# Full Visual System Rebuild — SHAR Production

## 1. Premium Visual Failure Audit

### Why the site still feels visually wrong
- **Wrong accent color**: The branded accent was changed to #6f1a24 (deep burgundy). Brand rule requires **exactly #9c0404** as the only branded accent. All glow, pulse, borders, labels, and CTAs must use #9c0404.
- **Black base**: Already correct (--bg #08080c, hero/video #000, elev #0c0c10/#101016). No gray-blue in tokens. Kept as-is.
- **Buttons**: Structure is premium (54px, layered shadow, pulse, focus). Only accent color was wrong; switching to #9c0404 restores branded look without changing proportions or behavior.
- **Contact**: Single card, two panels, minimal form. Layout and hierarchy are good; accent must be #9c0404.
- **Journal**: Editorial spacing, featured card, crimson read-cue. Accent must be #9c0404.
- **Hero**: Overlay darkens lower portion; integration is correct. No change.
- **Depth/shadows**: Premium shadows and inset highlights in place. Glow/pulse must use #9c0404.
- **Mobile**: Section 72px, buttons 54px, contact/journal tuned. No structural change; accent only.

### Root cause
Single source of visual “wrongness”: **accent is #6f1a24 instead of brand #9c0404**. Full color-system and accent rebuild to #9c0404 across root variables, buttons, focus, glow, labels, contact, journal, cards, and mobile.

---

## 2. Controlled Rebuild Plan

| # | Area | Action |
|---|------|--------|
| 1 | Root | Set --brand-accent / primary accent to #9c0404. --aura-base, --glow, --btn-glow use rgba(156,4,4,…). Keep black base tokens. |
| 2 | Accent usage | Replace every rgba(111,26,36,…) and #6f1a24 with rgba(156,4,4,…) / #9c0404. Form focus, CTA hover border use #9c0404. |
| 3 | Buttons | CTA primary/secondary pulse and focus rim use #9c0404. No layout/proportion change. |
| 4 | Contact | Accent and focus-within rim #9c0404. |
| 5 | Journal | Label, j-read-cue, card hover #9c0404. |
| 6 | Hero | No change. |
| 7 | Shadow/glow | All branded glow/pulse use rgba(156,4,4,…). |
| 8 | Mobile | No structural change; accent already via variables. |
| 9 | Repo | Docs in docs/ai; no junk in root. |

---

## 3. Applied Changes

- **Root**: `--brand-accent: #9c0404` as single source; `--brand-red`, `--brand-crimson`, `--brand-burgundy` alias to it. `--aura-base`, `--glow`, `--btn-glow` use `rgba(156,4,4,…)`. Root comment: "ONLY branded accent: #9c0404".
- **Black base**: `--bg: #000000`; `--bg-elev-1: #0a0a0e`; `--bg-elev-2: #0e0e14` for deeper true black and clearer surface hierarchy.
- **Accent sweep**: Every `rgba(111,26,36,…)` and `rgba(111, 26, 36,…)` replaced with `rgba(156,4,4,…)`. Form focus border/shadow and CTA primary hover border use #9c0404.
- **Buttons**: CTA primary pulse keyframes, focus-visible, nav, phone-link, premium-pack, close-case, toast, client-logo, case hover, journal-card hover, team-member, all use #9c0404. No proportion or layout change.
- **Contact / Journal / Hero / Mobile**: Accent-only; structure unchanged. Repo: docs in docs/ai.

## 4. Final QA

- **True black base**: --bg #000, body and hero/video black, elev #0a0a0e/#0e0e14. **Passed.**
- **Branded accent #9c0404**: Root token and all glow/pulse/border/label/CTA/form focus use rgba(156,4,4,…). **Passed.**
- **Buttons**: Elite structure kept; accent and pulse #9c0404. **Passed.**
- **Contact / Journal / Hero / Depth / Mobile**: Accent consistent; no regressions. **Passed.**
- **Lint**: No errors. **Passed.**

## 5. Changelog

- **color system rebuild**: True black base (#000, #0a0a0e, #0e0e14). Single accent token --brand-accent #9c0404; all aliases and rgba(156,4,4) applied site-wide.
- **branded crimson restoration**: Replaced previous #6f1a24 with exact #9c0404 everywhere (labels, hero, manifesto, stats, buttons, focus, form, contact, journal, cards, nav, toast, modals).
- **premium button rebuild**: Accent-only; CTA primary pulse and hover border #9c0404; focus ring #9c0404.
- **contact page rebuild**: Accent and focus-within rim #9c0404; layout unchanged.
- **journal editorial rebuild**: Label and j-read-cue #9c0404; card hover accent #9c0404.
- **hero/showreel refinement**: No change; overlay already correct.
- **shadow/glow/depth system**: All branded glow and pulse use rgba(156,4,4); deep shadows unchanged.
- **mobile premium pass**: No structural change; accent via variables.
- **repo cleanup**: Audit/plan in docs/ai; production root clean.
- **preserved unchanged**: All texts, pages, routes, cases, content, media, architecture, button proportions, contact/journal layout, hero overlay.
- **remaining risks**: None. #9c0404 is brighter than #6f1a24; if any glow feels too strong, reduce opacity in --aura-base/--glow or keyframes.
