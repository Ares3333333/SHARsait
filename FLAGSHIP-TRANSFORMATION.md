# Flagship transformation — SHAR Production

Controlled transformation of the existing site into a top-tier flagship. Not a random redesign.

---

## PHASE A — Brutally Honest Audit

### Current state (after latest polish)

- **Homepage:** Single long page (index.html) with hero, manifesto, social-proof (stats + clients), work (8 case cards), team, pricing, journal, order, footer. **All 8 full case studies live in the same DOM as modals** (~330 lines of modal markup). Case cards open modals with video, body copy, metrics, gallery, CTA.
- **Journal:** news-1.html, news-2.html, news-3.html (standalone article pages).
- **Other:** 404.html, privacy.html. Locales (RU/EN) via locales.js + data-i18n.
- **Visual:** Section-inner (1200px), site-footer class, unified button grammar (no black), no infinite breath/shimmer on buttons, wordmark 0.12em, stagger on reveal, surface tokens. Nav buttons aligned with body.

### What still makes it not flagship

| Issue | Why it hurts |
|-------|--------------|
| **Full cases on homepage** | Homepage is a storefront. It should be short and fast. Eight full case modals in the DOM = heavy page, slow perception, “everything at once”. Flagship = one strong message, then paths out (cases, contact). |
| **No dedicated cases layer** | Cases are buried inside the homepage as modals. There is no “portfolio” or “work” section as a first-class place. No deep-linkable case URLs, no SEO per case, no clear “see all work” flow. |
| **Structural weakness** | One giant HTML file. No separation of “landing” vs “case study”. Navigation mixes anchor scroll (#work, #order) with no real “Cases” entry point. |
| **Homepage length** | Manifesto + stats + clients + 8 cases + team + pricing + journal + order = long scroll. Feels comprehensive but not curated or premium. |
| **Case presentation** | Modals work but are not “cinematic” case pages. No dedicated URL per project, no immersive full-page case experience. |
| **Typography** | Plus Jakarta + Inter applied; scale and roles exist but could be tighter (one canonical scale, clearer display vs body contrast). |
| **Contact flow** | One section (#order) at bottom. No persistent or repeated CTA for “talk to us”. Could be stronger and more intentional. |

### What to keep

- Brand (SHAR Production), color (#9c0404), positioning (AI/cinema production).
- All case **content** (copy, video URLs, metrics, gallery, client names).
- Journal direction and article pages.
- Team, pricing, contact info, form.
- RU/EN localization approach.
- Design tokens, section-inner, footer, button grammar, motion restraint.

### What must move off the homepage

- **Full case content** → dedicated case pages. Homepage keeps only a **featured cases** block (3–4 preview cards + “Все кейсы” → /cases/).
- **Modal markup** → removed from index; case studies become standalone pages under /cases/.

### What should remain on the homepage

- Hero (positioning, wordmark, one line).
- Short trust (stats + clients, compact).
- **Featured cases** (preview only: image, title, tag, link to case page).
- Short service/positioning (manifesto in one block).
- Team/credibility (compact).
- Pricing/engagement teaser.
- Strong contact CTA (section + optional sticky or repeated CTA).

### Performance and premium perception

- **DOM:** Removing 8 modals significantly reduces initial HTML. Lazy-loading case content by routing to case pages improves perceived speed.
- **Perception:** Short, focused homepage reads as “premium”. Long scroll with everything reads as “template”.
- **Interaction:** No modal scroll/focus/iframe logic on homepage for cases. Case pages are simple, one video per page.

---

## PHASE B — Flagship Architecture Plan

### Sitemap

```
/ (index.html)           — Homepage: hero, trust, featured cases, manifesto, team, pricing, contact CTA
/cases/ (cases/index.html) — Cases index: all 8 projects as cards, link to each case page
/cases/pinskiy/           — Case 1 (or /cases/case-1.html)
/cases/click-city/        — Case 2
/cases/ilyukhin-grob/     — Case 3
/cases/m-techno/          — Case 4
/cases/ai-revolution/     — Case 5
/cases/cyberpunk-era/     — Case 6
/cases/virtual-showroom/  — Case 7
/cases/future-retail/     — Case 8
/news-1.html, news-2.html, news-3.html — Journal (keep as is or move to /journal/ later)
/contact.html             — Optional: dedicated contact page; or keep #order on homepage
/privacy.html
/404.html
```

**EN:** Same structure. Option A: subpaths (/en/, /en/cases/). Option B: separate EN build with same paths, lang attribute and locales. Current approach (data-i18n + locales.js) stays; EN is already supported. No mixed-language UI.

### Homepage block order

1. **Hero** — Full viewport, video, wordmark, one subtitle. No stats in hero.
2. **Trust** — Stats + clients (one compact section, section-inner).
3. **Featured cases** — 3–4 case preview cards (image, title, tag, “Смотреть” → case page). + Link “Все кейсы” → /cases/.
4. **Manifesto** — One block (title + headline + sub). Tight.
5. **Team** — Compact (horizontal scroll or grid).
6. **Pricing** — Three packs, teaser. CTA to contact.
7. **Contact** — Order section: heading, contacts, form. Strong CTA.
8. **Footer** — One line, token-based.

No journal on homepage (or one line “Журнал” + link to first article or journal index). No 8 case cards with “expand portfolio”.

### Cases index (/cases/)

- **Structure:** Same header/footer as homepage. Title: “Кейсы” or “Проекты”. Grid of 8 case cards (same card component as featured on homepage). Each card links to the corresponding case page. No modals.
- **Content:** Reuse existing case titles, tags, images. Same visual language (surface, typography).

### Individual case page

- **Structure:** Same global header and footer. No sticky case title; no modal. One column: case hero (tag + title), then video (iframe, one per page), then case body (sidebar + content), metrics, gallery, CTA (“Обсудить проект” → contact or #order on homepage with back link).
- **URLs:** cases/pinskiy.html, cases/click-city.html, … (or case-1 … case-8 for simplicity).
- **Behavior:** Header works as on homepage (transparent → scrolled). No overlay conflicts. Video loads in page (can be above fold or lazy per need).

### Journal

- Keep news-1, news-2, news-3. Optionally add journal/index.html listing articles. Same header/footer and design system. Feel: premium studio journal, not mixed into sales flow.

### Contact flow

- **Homepage:** One clear #order section with heading, contacts, form. Nav “СВЯЗАТЬСЯ” → #order.
- **Case pages:** CTA “Обсудить проект” → index.html#order (or contact.html if created). Clear path to reach studio from every case.
- **Cases index:** Optional CTA strip “Обсудить проект” → contact.

### EN-ready localization

- Current: locales.js + data-i18n, lang switcher. Keep. Ensure all new copy (case pages, cases index) uses data-i18n and keys in locales.js. No mixed RU/EN in one string. Case page titles and meta should come from locales or a small per-case config.

---

## PHASE C — Premium Visual System Plan

### Typography

- **Scale:** One modular scale (e.g. 1.25). Map all sizes to steps. Display (hero wordmark), H1, H2, H3, body, caption, label — each has one size and weight.
- **Fonts:** Plus Jakarta Sans (headings, labels, buttons), Inter (body). No third font.
- **Contrast:** Display = 600, tight tracking (0.12em). Body = 300, relaxed line-height. Labels = 600, 9px, brand or tertiary by hierarchy. Section labels slightly larger than card tags.

### Buttons

- **Grammar:** One system. Primary (filled, brand gradient), secondary (outline, glow + inset), ghost (minimal). No black in shadows. Lighter, more transparent, subtle hover fill. Soft motion (transition only, no infinite).
- **Use:** Nav = secondary + primary. Case cards = “Смотреть” = secondary. Price cards = primary/secondary. Modal/case page CTA = primary.

### Spacing and layout

- **Content width:** 1200px (section-inner). Gutter 4%. Apply everywhere: homepage, cases index, case pages, journal.
- **Section rhythm:** Hero 100vh. Manifesto space-2xl. Sections space-3xl. Footer space-xl. Cases index: same.

### Header / navigation

- **Links:** Главная (or logo only), Кейсы (/cases/), Команда (#team or /#team), Стоимость (#pricing), Журнал (news-1 or /journal/), СВЯЗАТЬСЯ (#order), ТЕЛЕФОН (tel:). Same on all pages. On case pages “Кейсы” can stay or add “Все кейсы” back to /cases/.
- **Behavior:** Transparent by default, scrolled = backdrop + border. Same on case pages. Z-index above content.

### Cards and previews

- **Case card:** Image, overlay with title + tag + “Смотреть” button. Border surface-border, hover = subtle glow. Link to case page (full <a> or click handler that navigates).
- **Featured (homepage):** Same card, 3–4 items. “Все кейсы” = text link or small button to /cases/.

### Motion

- Rest by default. Reveal on scroll (opacity + translateY), stagger 60–80ms. Hover/focus = transition only. No infinite animations. Case page: optional subtle fade-in for sections.

### Color and surfaces

- One accent #9c0404. Text primary/secondary/tertiary. Line (divider), surface-border (cards). Surfaces: visible but subtle (fill 0.02–0.03, border 0.06).

### Wordmark / logo

- 0.12em tracking everywhere. Plus Jakarta 600. Hero = largest; nav = smaller; footer = caption size. No infinite shimmer; optional hover-only shimmer.

---

## PHASE D — Implementation Plan

### Files to create

| File | Purpose |
|------|---------|
| cases/index.html | Cases index: header, title “Кейсы”, grid of 8 case cards linking to case pages, footer. |
| cases/pinskiy.html | Case 1 full page (content from current modal #case-1). |
| cases/click-city.html | Case 2. |
| cases/ilyukhin-grob.html | Case 3. |
| cases/m-techno.html | Case 4. |
| cases/ai-revolution.html | Case 5. |
| cases/cyberpunk-era.html | Case 6. |
| cases/virtual-showroom.html | Case 7. |
| cases/future-retail.html | Case 8. |

Each case page: same head (title, meta, fonts, style.css), same nav and footer as index, body = case hero + video container + case body + metrics + gallery + CTA. No modal wrapper. Video iframe can be in page (src or data-src + JS on case page).

### Files to modify

| File | Changes |
|------|---------|
| index.html | Remove all 8 modal divs. Replace #work section with “Featured cases” (3–4 cards, link to case pages). Add “Все кейсы” → /cases/. Update nav: “Проекты” or “Кейсы” → href="/cases/". Keep hero, manifesto, trust, team, pricing, journal (compact or link), order, footer. |
| assets/js/script.js | Modal logic: only run when .modal elements exist (e.g. on homepage). On case pages, no openCase/closeCase. Optional: detect path, skip modal init on /cases/*. |
| assets/css/style.css | Ensure case page layout uses same tokens. Add .case-page class if needed for full-width video. No structural change to design system. |
| assets/js/locales.js | Add keys for “Кейсы”, “Все кейсы”, case page titles/meta if not already present. |

### Content migration

- **From modals to case pages:** Copy hero (tag, title), video data-src → src or keep data-src and inject on load, m-case-body (sidebar + content), project-metrics, m-gallery, m-cta-wrap. Paste into each case page. Remove from index.
- **Featured cases (homepage):** Pick 3–4 cases (e.g. 1–4). Reuse case card markup; replace onclick="openCase(N)" with href="cases/pinskiy.html" etc. Remove “Развернуть портфель”; add “Все кейсы” link.

### Navigation updates

- Nav link “Проекты” or “Кейсы”: href="/cases/" (cases index). On homepage, anchor links #team, #pricing, #order stay. On case pages, “Главная” → index.html, “Кейсы” → /cases/, “Связаться” → index.html#order.

### Performance

- **Homepage:** Lighter DOM (no modals). Same or fewer images (featured only). Faster first load.
- **Case pages:** One video per page. Lazy or eager per decision. Same CSS/JS. No modal iframe create/destroy.
- **Cases index:** One page, 8 cards, same assets as before (images). No modal logic.

### Regression avoidance

- Keep all case copy and media URLs. Keep form, toast, locales. Test: homepage (featured → case page), cases index (all cards → case pages), case page (CTA → index.html#order), nav on every page, mobile menu, RU/EN switch on all templates.

---

## PHASE E — Implementation (done)

- **cases/index.html** — Cases index: same header/footer as homepage, grid of 8 case cards linking to case-1.html … case-8.html. No modals.
- **cases/case-1.html … case-8.html** — Standalone case pages: nav, back link “← Все кейсы”, m-hero, video iframe, m-case-body, metrics (1–4), gallery (1–2), m-cta-wrap → index.html#order. Same design tokens and layout as former modal content.
- **index.html** — Nav “Кейсы” → cases/index.html. Section #work: 4 featured case cards as `<a href="cases/case-N.html" class="case">`. Button “Все кейсы →” → cases/index.html. All 8 modal divs removed.
- **assets/css/style.css** — .case-page-wrap, .case-back, .case-page-wrap .m-hero; .case { display: block } for link cards.
- **assets/js/locales.js** — work.allCases, work.viewAllCases (RU/EN).
- **script.js** — No change: modal logic runs only when .modal exists (none on homepage/case pages); show-more-btn guarded with if(showMoreBtn).

---

## PHASE F — Final QA

- Homepage: shorter, 4 featured cases, “Все кейсы →”, no modals in DOM.
- /cases/: lists all 8, each card links to case page.
- Case pages: load, video (iframe), CTA → index.html#order, back → cases/index.html.
- Header/nav consistent on index, cases index, case pages; “Кейсы” / “СВЯЗАТЬСЯ” / “ТЕЛЕФОН” correct.
- Buttons and typography unchanged (existing premium system).
- Performance: lighter index HTML; case content on separate pages.
- EN: work.viewAllCases / work.allCases in locales; switcher works where script runs.

---

## Changelog

- **Architecture:** Cases moved to dedicated pages (cases/index.html + cases/case-1 … case-8.html). Homepage is storefront: hero, trust, 4 featured cases, manifesto, team, pricing, journal, order, footer. No full case markup on index.
- **Visual:** No redesign. Same tokens, typography, buttons. Added .case-page-wrap and .case-back for case pages.
- **Case system:** Cases index + 8 case pages; homepage featured block with “Все кейсы →”.
- **Performance:** Lighter homepage DOM (no modal markup); case content loaded only on case pages.
- **Preserved:** Brand, all case copy/media, team, pricing, journal, contact, form, RU/EN locales, design constraints.
- **Postponed:** /journal/ index page, dedicated contact page, EN subpaths, further typography/scale refinements.
