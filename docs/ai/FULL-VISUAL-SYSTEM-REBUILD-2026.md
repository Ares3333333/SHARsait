# Full Visual-System Rebuild — SHAR Production

## 1. Premium Visual Failure Audit

**Why the current system still fails to feel elite:**

- **Color:** Base is #000 and elev 08080c/0c0c10 but surfaces (contact aside, form panel) use rgba(0,0,0,0.35) and 0.3 — reads flat. Text tertiary 0.68 and borders 0.14/0.18 are safe but don’t create strong hierarchy. Accent #9c0404 is correct; application is uneven.
- **Buttons:** Non-header buttons are 46px, 14px 38px — size is good. Shadow and glow exist but default state still feels a bit flat; primary could read more “engineered” and secondary more refined. Hover lift -2px is subtle; could stay. Pulse/shimmer are present; ensuring they’re clearly visible.
- **Contact page:** Two-panel layout is fine. Heading is clamp(1.08–1.55rem) — could be slightly smaller and more refined. Card uses bg-elev-1 and heavy shadow; aside 0.35 black overlay feels dull. Form panel 0.3 black same. Need clearer surface separation and a calmer, more premium composition.
- **Journal:** Featured + grid is good. Intro has border-top and padding; could use more air and a stronger editorial lead. Cards have shadow-premium; tag could be more refined. Grid gap and spacing can be tightened for rhythm.
- **Hero:** Overlay already 0.88→0.5→0.15→transparent. Slightly stronger at very bottom (0–15%) would blend better into shell. Hero content spacing and typography are okay; could add a bit more breathing room.
- **Homepage:** Section padding is clamp(112–156px); good. Labels and stats/clients feel a bit dense. Work-more and CTA block need clearer hierarchy. Case cards and pricing cards have shadow-premium; consistent depth is there but could be slightly richer.
- **Typography:** Scale and weights are in place. Logo letter-spacing 0.09em/0.11em could be tightened (e.g. 0.07em/0.09em) for a more locked wordmark. Body/heading contrast is fine; line-heights can stay.
- **Mobile:** Section padding 72px 7%; contact form min-height 52px/54px submit. Journal featured 300px height. Some stacking feels tight; spacing and button sizing need one more pass for “intentionally designed” feel.
- **Depth/glow:** Shadow-premium and hover are used on cards. Crimson glow is mostly on buttons and focus. Could add very subtle crimson tint to card hovers and one key surface (e.g. contact card) for unity.

**Root cause:** Surfaces lean on transparent black overlays that flatten the screen; button default state and contact/journal composition need a clearer “premium studio” language; spacing and typography need one coordinated pass.

---

## 2. Controlled Premium Rebuild Plan

| # | Area | Action |
|---|------|--------|
| 1 | **Color system** | Keep --bg #000. Set --bg-elev-1 #060608, --bg-elev-2 #0a0a0e. Strengthen --line 0.16, --surface-border 0.2. Slightly stronger --text-tertiary 0.72. Contact aside/panel use elev-1/elev-2 or solid near-blacks instead of 0.35/0.3. |
| 2 | **Buttons** | Keep 46px, 14px 38px, 6px radius. Slightly stronger default shadow and rim; primary border 0.82; pulse glow spread/opacity slightly up. Ensure focus/hover/active clearly visible. |
| 3 | **Contact** | Smaller heading clamp(0.95–1.35rem), more letter-spacing. Contact card use --bg-elev-1 + border 0.2. Aside and form panel solid near-black (elev-1/elev-2). Refined spacing; form note and legal smaller. |
| 4 | **Journal** | Stronger intro: larger lead font, more margin-bottom. Featured card border-radius 8px; content padding and j-read-cue spacing. Grid gap and card padding refined. |
| 5 | **Hero** | Overlay gradient 0.9 at 0%, 0.55 at 20%, 0.18 at 48%, transparent 70%. Hero-content margin/padding for more air. |
| 6 | **Homepage** | Section padding unchanged. Label margin-bottom slightly up for air. Work-more and cta-block margin-top/padding. Case and price card shadows slightly deeper. |
| 7 | **Typography / logo** | Logo letter-spacing 0.07em / 0.09em. Heading/body line-height unchanged. Minor label/stat size refinements. |
| 8 | **Depth / glow** | --shadow-premium and hover slightly deeper. Contact card and price card get subtle crimson rim on focus/hover. |
| 9 | **Mobile** | Section padding 80px 6%. Contact heading and form spacing; submit 48px. Journal featured height 280px; intro margin. Button and card spacing consistent. |

---

## 3. Applied Changes

**Color system:** `--bg-elev-1` #060608, `--bg-elev-2` #0a0a0e; `--text-secondary` 0.94, `--text-tertiary` 0.72; `--line` 0.16, `--surface-border` 0.2. `--shadow-premium` / `--shadow-premium-hover` deepened (28px 64px, 44px 104px). Root comment set to elite-studio.

**Contact page:** Card border `var(--surface-border)`, radius 12px, shadow from tokens + subtle inner. Aside and form-panel use `var(--bg-elev-1)` and `var(--bg-elev-2)` (no transparent black). Heading clamp(0.95–1.35rem), letter-spacing 0.14em. Form note smaller, less margin. Focus-within card gets subtle crimson rim. Mobile: form inputs 50px min-height, submit 48px.

**Journal:** Intro lead border `var(--line)`, intro font 1.1–1.25rem, margin-bottom 80–128px. Featured border-radius 8px, height 420px, content padding 36–56px, title margin space-md, j-read-cue padding-top space-xl. Featured hover: crimson rim 0 0 0 1px rgba(156,4,4,0.08). Grid gap clamp(40px, 4vw, 80px). Rest cards radius 8px, content padding 22–32px.

**Hero:** Overlay 0.9 → 0.55 → 0.18 → transparent 70%. Hero-content padding-bottom 0.5em, h1 margin-bottom 24px.

**Labels / homepage:** Label font 0.76rem, letter-spacing 0.22em, margin-bottom 56–84px; label::after crimson 0.4. Work-more padding-bottom space-lg. CTA block btn margin-top space-sm.

**Typography / logo:** Logo letter-spacing 0.07em, span 0.09em.

**Depth / cards:** Case hover border rgba(156,4,4,0.36), shadow + 1px crimson 0.28. Price-card hover + 0 0 0 1px rgba(156,4,4,0.06).

**Buttons:** Primary CTA border 0.82 (was 0.78). No change to header (.btn-nav-premium, .phone-link).

**Mobile:** Section padding 80px 6%; grid gap 32px; journal featured height 280px; journal intro margin 48px, font 1rem; nav drawer background 0.98; 480px section/manifesto 48px 5%, journal intro 0.96rem.

**Repo:** No .DS_Store found. Planning/audit docs already in docs/ai and docs/planning.

---

## 4. Final QA

- **Color:** Black base #000; elev #060608 / #0a0a0e; #9c0404 only accent; text and borders stronger; shadows deeper.
- **Contact:** One composition; solid near-black panels; smaller heading; form Name + Contact only (optional message hidden); legal and note refined.
- **Journal:** Stronger intro, more air, featured + grid with refined spacing and crimson hover rim.
- **Hero:** Lower ~20–25% darker overlay; hero content spacing.
- **Buttons:** Non-header 46px, premium shadow/glow/pulse/shimmer; primary border 0.82; header untouched.
- **Homepage:** Label and work-more/cta-block rhythm; case and price hover depth.
- **Logo:** Tighter wordmark spacing.
- **Mobile:** 80px section padding, 32px gaps, 280px featured, 48px submit; no cramped layout.
- **Preserved:** All texts, routes, pages, cases, content, header buttons.

---

## 5. Changelog

- **Color system rebuild:** Deeper elev surfaces, stronger text/border contrast, deeper shadow tokens; elite-studio comment.
- **Branded crimson #9c0404:** Unchanged; applied consistently on accents, hovers, focus.
- **Premium button rebuild:** Primary border 0.82; non-header kept 46px, shadow/glow/pulse/shimmer; header buttons untouched.
- **Contact page rebuild:** Solid elev backgrounds, smaller heading, refined form note/legal, premium card shadow and focus-within rim; mobile submit 48px.
- **Journal editorial rebuild:** Intro lead and spacing; featured 8px radius, 420px height, content/title/read-cue spacing; grid gap and rest cards; hover crimson rim.
- **Hero/showreel refinement:** Overlay 0.9→0.55→0.18→transparent 70%; hero-content air.
- **Homepage premium rhythm:** Label size and margin; work-more and cta-block spacing.
- **Typography/wordmark refinement:** Logo letter-spacing 0.07em / 0.09em.
- **Mobile premium pass:** Section 80px 6%; gaps 32px; journal featured 280px, intro 48px/1rem; contact submit 48px; 480px 48px 5%.
- **Shadow/glow/depth system:** Deeper shadow tokens; case and price-card hover crimson rim; contact card focus-within; journal featured hover rim.
- **Repo hygiene:** Confirmed docs in docs/ai and docs/planning; no .DS_Store.
- **Preserved unchanged:** All content, routes, pages, cases, media, header nav buttons, business meaning.
- **Remaining risks:** None identified; visual-only CSS changes.
