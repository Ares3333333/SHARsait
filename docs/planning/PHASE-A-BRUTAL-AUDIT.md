# PHASE A — Brutally Honest Audit

## Executive summary

The site has had multiple polish passes (fonts, buttons, spacing, header logic). It is **functional and coherent**, but it still reads as **“polished template”**, not **“flagship brand”**. The gap is not one big mistake; it is **systemic**: no single source of truth for premium behavior, inconsistent application of “expensive” cues, and several elements that actively undermine the premium claim.

---

## 1. What makes it look cheap

### 1.1 Typography — good ingredients, weak system

- **Plus Jakarta Sans + Inter** is a safe, modern pair. It does not say “high-end cinema” or “AI production”; it says “well-executed SaaS”.
- **No clear typographic scale.** Font sizes are ad hoc (`clamp(2.5rem, 5vw, 4.5rem)` for stats, `clamp(2rem, 4vw, 3.5rem)` for manifesto, `clamp(2.8rem, 4.5vw, 4.5rem)` for order). There is no documented scale (e.g. 1.25 or 1.333) — so rhythm feels arbitrary.
- **Heading weight is flat.** Almost everything is 500 or 600. No deliberate contrast between “hero statement” (could be 300/400) and “section label” (600). Result: same tone everywhere.
- **Body text is underspecified.** One `--lh-body: 1.68` and `font-weight: 300` for all body. Long-form in modals (e.g. `.m-content-text p` at 17px) has no distinct treatment — same as short UI strings. Premium editorial sites differentiate body vs. lead vs. caption.
- **Labels and tags are noisy.** `.label`, `.j-tag`, `.m-hero-tag`, `.c-item p`, `.price-card h3` all use 9px, uppercase, red, high letter-spacing. Visually they merge. A flagship would have a clear label hierarchy (e.g. section label vs. card tag vs. meta).

### 1.2 Wordmark and hero — brand not dominant

- **Logo in nav:** Gradient + shimmer animation is a recognizable trick. On a dark, minimal bar it reads as “effect” rather than “signature”. The wordmark does not feel like the one locked asset that appears everywhere with the same weight and spacing.
- **Hero H1:** “SHAR” in red + “PRODUCTION” in white is correct. But the block is competing with a full-viewport video background, overlay, and paragraph. A flagship hero usually gives the wordmark **maximum space and silence** — fewer elements, more margin, so the name is the event.
- **No wordmark lock.** Logo, hero H1, and footer “SHAR PRODUCTION” are not obviously the same typographic lock (size ratio, tracking, weight). They feel like three separate decisions.

### 1.3 Buttons — three languages, not one

- **Nav:** `.btn-nav-premium` and `.phone-link` use **heavy black shadows** (`0 1px 4px rgba(0,0,0,0.4)`, `0 4px 14px rgba(0,0,0,0.2)`). That is the “cheap placeholder” the brief asked to remove elsewhere — and it is still in the header.
- **Body:** `.btn-minimal` and `.watch-case-btn` use **no black**, only glow + inset. So: header = dark and heavy; body = light and airy. **Two button systems.**
- **Modals:** `.close-case` is yet another style (gray border, dark bg). Form submit and CTA in modals reuse `.btn-minimal`, which is good, but the close control does not feel from the same family.
- **Result:** Buttons do not feel like one product. A flagship has a single button grammar (primary, secondary, ghost) and applies it everywhere.

### 1.4 Color and surface — safe, not bold

- **One accent:** `#9c0404` everywhere (borders, glows, labels, links). Safe and consistent, but there is no secondary layer (e.g. a warmer or cooler tint for states, or a true “surface” color for cards). Everything is “black + white + red”.
- **Surfaces are timid.** Cards (price, journal, client logos) use `rgba(255,255,255,0.01)` or `0.05` borders. They barely exist. A premium site often commits: either **clearly visible panels** (e.g. 0.06–0.08 border, subtle fill) or **truly borderless** (no border, only spacing). Current state is in-between: borders so light they look like rendering bugs.
- **Gradients are repetitive.** Linear gradients for overlays and buttons repeat the same angles and stops. No defined “hero gradient” vs. “card gradient” vs. “modal gradient” — so the eye does not get clear zones.

### 1.5 Layout and rhythm — section soup

- **Section padding is uniform:** `--space-3xl` (120px) for most sections. Hero is 100vh; then every block has the same vertical breath. Flagship layouts often **vary** (e.g. hero huge, manifesto tight, work grid with different top/bottom).
- **Content width is inconsistent.** Manifesto has a grid with `1fr 1.5fr`. Order has `1fr 1.2fr`. Modals use `max-width: 1200px`; main page sections use `4%` side padding and no max-width. So: some content is constrained (1200px), some is full-bleed. No single “content column” or “reading width” documented.
- **Grids are basic.** Two columns for cases, three for pricing, four for clients. No asymmetry, no featured “hero case”, no clear visual priority. Everything has equal weight — so nothing feels curated.

### 1.6 Motion and interaction — decorative, not purposeful

- **Shimmer on logo:** Infinite 8s animation. It draws attention to the logo but also reads as “we added an effect”. Flagship motion is usually **reactive** (hover, scroll) or **one-off** (page load), not endless decoration.
- **Button breath:** 10s pulse on body buttons. Same point: constant motion competes with content. Premium often uses **rest** by default and **motion on intent**.
- **Card ray (lens flare):** Paused until hover, then 9s run. Good for performance; visually it is a cliché. “Lens flare on hover” does not say “AI production”; it says “template effect”.
- **Fade-in on scroll:** Sections and stagger items fade up. Standard and fine, but there is no **stagger rhythm** (e.g. 80ms between items) or **distance** (e.g. 16px vs 24px) defined. So scroll reveals feel generic.

### 1.7 Content hierarchy and IA (unchanged by design, but visible)

- **Stats (50 projects, 15 countries, 99% return):** Placed early, styled like a dashboard. For a cinema brand, trust could be implied by work and tone rather than numbers. If kept, they should feel more like “editorial fact” and less like “landing widget”.
- **Clients:** Four placeholders (PINSKIY, CLICK, M-TECHNO, YUGA). Same size, same treatment. No “featured” or “spotlight” — so it does not feel like a curated list.
- **Cases:** Eight items, four visible by default. “Expand portfolio” is a disclosure pattern that works, but the grid does not suggest a **lead case**. Premium portfolios often have one hero case and then a grid.
- **Modals:** Cases 1–4 are full case studies (video, body, metrics, gallery, CTA). Cases 5–8 are minimal (title + video only). **Inconsistent depth** — so the product feels uneven.

### 1.8 Technical and production details

- **Case images:** Unsplash URLs. For a production company, even placeholders could be chosen to feel more “film” (e.g. stills, grain, aspect ratio) so the grid does not look like stock.
- **Footer:** One line, inline styles. Not wrong, but it is outside the design system (no classes, no variables). Small signal that “below the fold” was not part of the system.
- **404 / privacy:** `.page-shell` exists but uses different spacing and font sizes (e.g. `letter-spacing: 0.1em` vs. `--ls-heading`). Secondary pages feel like a different site.

---

## 2. Biggest offenders (priority)

| # | Offender | Why it hurts |
|---|----------|--------------|
| 1 | **Two button systems** (nav = black shadows, body = no black) | Direct contradiction to “premium, no placeholder” and breaks unity. |
| 2 | **No typographic scale** (ad hoc sizes, flat weights) | Typography feels arbitrary, not “cinematic” or editorial. |
| 3 | **Wordmark not locked** (logo / hero / footer different) | Brand does not feel like one signature. |
| 4 | **Surfaces too faint** (borders 0.01–0.05) | Cards and panels feel undefined, “template gray”. |
| 5 | **Constant motion** (shimmer, button breath) | Competes with content; feels decorative, not confident. |
| 6 | **Label overload** (all caps, red, 9px everywhere) | No hierarchy; everything shouts. |
| 7 | **Modal depth inconsistency** (4 full cases, 4 minimal) | Product feels incomplete or random. |
| 8 | **No content max-width / rhythm doc** | Layout feels reactive, not designed. |

---

## 3. What “premium” is missing (summary)

- **One design language** for buttons, surfaces, and type — applied everywhere (nav, body, modals, footer, secondary pages).
- **A real type scale** and clear roles: display, heading, body, caption, label — with weights and spacing defined.
- **Wordmark as locked asset:** one treatment (or a small set) used consistently; hero gives it space.
- **Intentional rest:** default = calm; motion on hover/focus/scroll, not infinite decoration.
- **Clear surfaces:** either visible panels (with defined border/fill) or true borderless layout — not in-between.
- **Content hierarchy:** one hero case, clear section roles, consistent modal depth.
- **Documented layout:** content width, section rhythm, grid rules so the site feels like one system, not a collection of sections.

---

*Document: PHASE A — Brutally Honest Audit. No code changes. For PHASE B see FLAGSHIP-ARCHITECTURE-PLAN.md.*
