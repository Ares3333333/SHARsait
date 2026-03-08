# Cases System Plan — SHAR Production

**No code. Structure and content mapping only.**  
One premium case system; all cases exist, all links work, no 404. Case CTA routes to proper contact flow (contact page or modal), not homepage footer.

---

## 1. Standard Case Page Template

Every case page uses the **same structure**. Same blocks, same order. Slots may be filled or minimal (e.g. gallery with 0 images, metrics with “—” when not applicable). Presentation is unified; content preserves each case’s identity.

**Block order:**

| # | Block | Purpose | Required | Notes |
|---|--------|---------|----------|--------|
| 0 | **Back** | “← Все кейсы” → `/cases/`. Ghost style. | Yes | Orientation. |
| 1 | **Hero / title** | Category tag (e.g. “ИИ, производство. Гастрономия”) + case title (e.g. “Видеопроизводство с ИИ для Pinskiy & Co”). | Yes | Premium hero area; one tag, one title. |
| 2 | **Video** | One video player (iframe or lazy-loaded). Same aspect ratio and chrome for all. | Yes | Primary media. |
| 3 | **Metadata (sidebar)** | Category/service metadata: 2–3 items (e.g. Client / Project, Service, Deadline / Duration / Goal). Same component; labels and values per case. | Yes | Sidebar + content sit in one grid. |
| 4 | **Business challenge** | First content block: heading (e.g. “Бизнес-задача” / “Творческая задача” / “О проекте”) + paragraph(s). | Yes | Challenge or context. |
| 5 | **Solution** | Second block: heading “Решение” + paragraph(s). | Yes* | *For “light” cases (5–8), can be merged into one “О проекте” block; template still has the slot (heading + text). |
| 6 | **Process / creative approach** | Optional third narrative block. Can be part of Solution (e.g. “Решение” describes approach) or separate (e.g. “Подход” / “Процесс”). | No | If absent, omit or fold into Solution. |
| 7 | **Result** | Third block (or second if only two blocks): heading “Результат” + paragraph(s). | Yes* | *For light cases, “О проекте” is the single block; no separate Result. |
| 8 | **Metrics / proof** | Three metric items (value + label). Same layout for all. If a case has no metrics: use “—” or one line (“По запросу” / “Индивидуально”) so the block exists but is minimal. | Yes | Block always present; content can be minimal. |
| 9 | **Media gallery** | 0–N images. Same markup (e.g. grid); 0 images = empty block or omit wrapper. | No | Always same block; 0 images allowed. |
| 10 | **Next-case navigation** | “Следующий кейс” / “Предыдущий” or “Кейс N из 8” + link to next (and optional previous). Linear order: 1→2→…→8→1. | Yes | Keeps user in case system; premium storytelling. |
| 11 | **CTA** | One heading (case-specific CTA line from locales) + one primary button “ОБСУДИТЬ ПРОЕКТ” (or “СВЯЗАТЬСЯ С РЕЖИССЕРОМ” for case 3). Button → **contact flow** (contact page or contact modal), **not** `index.html#order`. | Yes | Primary CTA; destination is contact. |

**Template summary (DOM order):**

1. Back link  
2. Hero (tag + title)  
3. Video container  
4. Case body (sidebar + content): metadata, challenge, solution, result (and optional process)  
5. Metrics  
6. Gallery  
7. Next-case nav  
8. CTA wrap (heading + button)  

**Unified presentation:** Same classes, same spacing, same typography. Sidebar: same number of stat rows (e.g. 3); labels can be Client/Service/Deadline or Project/Service/Duration or Service/Deadline. Content: always up to three h2+paragraph blocks (challenge, solution, result); for light cases, one “О проекте” block fills the narrative. Metrics: always three items (value + label). Gallery: same grid; 0–N images. Next-case: same component. CTA: same style; only destination changes (contact, not homepage).

---

## 2. Missing / Broken Case Inventory

**Existing pages (no 404):**

| Case | File | Status |
|------|------|--------|
| 1 | cases/case-1.html | Exists. Full structure. CTA target wrong (index#order); CTA missing cta-primary class. |
| 2 | cases/case-2.html | Exists. Full structure. CTA target wrong. |
| 3 | cases/case-3.html | Exists. Full structure, no gallery. CTA target wrong; CTA missing cta-primary. |
| 4 | cases/case-4.html | Exists. Full structure, no gallery. CTA target wrong; CTA missing cta-primary. |
| 5 | cases/case-5.html | Exists. Thin: no metrics, no gallery, one “О проекте” block. CTA target wrong. |
| 6 | cases/case-6.html | Exists. Thin. CTA target wrong. |
| 7 | cases/case-7.html | Exists. Thin. CTA target wrong. |
| 8 | cases/case-8.html | Exists. Thin. CTA target wrong. |

**Links:** Homepage and cases index link to case-1 … case-8. No broken case links; no 404.

**Gaps to fix (no new pages):**

- **CTA destination:** All 8 case pages link CTA to `../index.html#order`. Change to contact flow: `contact.html` or open contact modal.
- **CTA class:** Case 1, 3, 4: CTA button has no `cta-primary`; add for consistency.
- **Structure:** Cases 5–8 lack metrics block, gallery block, and full three-block body. Add template blocks; fill with existing copy or minimal placeholders (see Content Mapping).
- **Next-case nav:** Not present on any case. Add to template and implement on all 8 (e.g. case 1 → next case 2; case 8 → next case 1).

---

## 3. Content Mapping for Each Existing Case

**Slots:** Hero tag, Hero title, Video URL, Sidebar (2–3 stats), Challenge (h2+p), Solution (h2+p), Result (h2+p), Metrics (3 items), Gallery (0–N images), Next-case (prev/next), CTA heading, CTA button.

**Case 1 — Pinskiy & Co**  
| Slot | Source / value |
|------|-----------------|
| Tag | work.case1Tag (ИИ, производство. Гастрономия) |
| Title | modal.case1Title |
| Video | 1169962484 |
| Sidebar | Client: Pinskiy & Co; Service: modal.case1Service; Deadline: 72 часа |
| Challenge | modal.case1H1 + modal.case1P1 |
| Solution | modal.case1H2 + modal.case1P2 |
| Result | modal.case1H3 + modal.case1P3 |
| Metrics | 3 дня, 100% читаемость бренда, 40% экономия бюджета |
| Gallery | 3 images (current) |
| Next | → case-2 |
| CTA heading | modal.case1Cta |
| CTA button | modal.case1Btn → contact |

**Case 2 — Click City**  
| Slot | Source / value |
|------|-----------------|
| Tag | modal.case2Tag |
| Title | modal.case2Title |
| Video | 1169962544 |
| Sidebar | Client: Click Uzbekistan; Service: modal.case2Service; Deadline: 14 дней |
| Challenge | modal.case2H1 + P1 |
| Solution | modal.case2H2 + P2 |
| Result | modal.case2H3 + P3 |
| Metrics | 14 дней, 1M+ просмотров, 95% позитивные отзывы |
| Gallery | 1 image (current) |
| Next | → case-3 |
| CTA heading | modal.case2Cta |
| CTA button | modal.case2Btn → contact |

**Case 3 — Илюхин Гроб**  
| Slot | Source / value |
|------|-----------------|
| Tag | modal.case3Tag |
| Title | Илюхин Гроб (no i18n) |
| Video | 1169951312 |
| Sidebar | Project: modal.case3SidebarProject; Service: modal.case3SidebarService; Duration: modal.case3SidebarDuration |
| Challenge | modal.case3H1 + P1 |
| Solution | modal.case3H2 + P2 |
| Result | modal.case3H3 + P3 |
| Metrics | 5 фестивалей, 2 награды, 100% кинематограф |
| Gallery | 0 images (keep) |
| Next | → case-4 |
| CTA heading | modal.case3Cta |
| CTA button | modal.case3Btn → contact |

**Case 4 — M-Techno**  
| Slot | Source / value |
|------|-----------------|
| Tag | modal.case4Tag |
| Title | Имиджевый фильм M-Techno |
| Video | 1169951312 |
| Sidebar | Client: Завод M-Techno; Service: modal.case4SidebarService; Goal: modal.case4SidebarGoal |
| Challenge | modal.case4H1 + P1 |
| Solution | modal.case4H2 + P2 |
| Result | modal.case4H3 + P3 |
| Metrics | 10 выставок, 50+ лидов, 3x окупаемость |
| Gallery | 0 images (keep) |
| Next | → case-5 |
| CTA heading | modal.case4Cta |
| CTA button | modal.case4Btn → contact |

**Case 5 — Революция ИИ**  
| Slot | Source / value |
|------|-----------------|
| Tag | work.case5Tag |
| Title | modal.case5Title |
| Video | 1169951312 |
| Sidebar | Service: work.case5Tag; Deadline: Индивидуально |
| Challenge / single block | “О проекте” + modal.case5Body (one block for challenge/solution/result) |
| Solution | — (merged) |
| Result | — (merged) |
| Metrics | Minimal: e.g. “—”, “—”, “По запросу” or one line “Индивидуальные сроки” |
| Gallery | 0 images |
| Next | → case-6 |
| CTA heading | modal.case5Cta |
| CTA button | modal.case1Btn → contact |

**Case 6 — Эра киберпанка**  
| Slot | Source / value |
|------|-----------------|
| Tag | work.case6Tag |
| Title | modal.case6Title |
| Video | 1169962544 |
| Sidebar | Service: VFX, компьютерная графика; Deadline: От 14 дней |
| Challenge / single block | “О проекте” + modal.case6Body |
| Solution | — |
| Result | — |
| Metrics | Minimal (e.g. “—”, “—”, “От 14 дней”) |
| Gallery | 0 or 1 image |
| Next | → case-7 |
| CTA heading | modal.case6Cta |
| CTA button | modal.case1Btn → contact |

**Case 7 — Виртуальный шоурум**  
| Slot | Source / value |
|------|-----------------|
| Tag | work.case7Tag |
| Title | modal.case7Title |
| Video | 1169962484 |
| Sidebar | Service: Метавселенная, Web3; Deadline: Индивидуально |
| Challenge / single block | “О проекте” + modal.case7Body |
| Solution | — |
| Result | — |
| Metrics | Minimal |
| Gallery | 0 or 1 image |
| Next | → case-8 |
| CTA heading | modal.case7Cta |
| CTA button | modal.case1Btn → contact |

**Case 8 — Будущее ритейла**  
| Slot | Source / value |
|------|-----------------|
| Tag | work.case8Tag |
| Title | modal.case8Title |
| Video | 1169951312 |
| Sidebar | Service: Корпоративный уровень; Deadline: Индивидуально |
| Challenge / single block | “О проекте” + modal.case8Body |
| Solution | — |
| Result | — |
| Metrics | Minimal |
| Gallery | 0 or 1 image |
| Next | → case-1 (loop) |
| CTA heading | modal.case8Cta |
| CTA button | modal.case1Btn → contact |

**Summary:** Cases 1–4 keep current full content; add next-case nav; fix CTA target and class. Cases 5–8: add metrics block (minimal), gallery block (0 or 1 image), keep single “О проекте” body block; add next-case nav; fix CTA target.

---

## 4. CTA Behavior for Case Pages

**Current (wrong):** Every case CTA links to `../index.html#order`. User leaves the case and lands on the homepage, then must scroll to the footer form. This is not a proper contact flow.

**Target (right):**

- **Primary:** Case CTA button (“ОБСУДИТЬ ПРОЕКТ” / “СВЯЗАТЬСЯ С РЕЖИССЕРОМ”) goes to **contact flow**, not homepage.
- **Contact flow** = either:
  - **A)** Dedicated contact page: `contact.html` (or `/contact/`). CTA href = `../contact.html` (or `../contact/`).  
  - **B)** Contact modal/drawer: CTA opens modal/drawer with form, phone, Telegram, email. No navigation; user stays on case page.  
  - **C)** A + B: contact page exists; CTA can either go to page or open modal (e.g. “Связаться” in nav opens modal, case CTA goes to page, or vice versa).

**Case page CTA rules:**

- **Link target:** `../contact.html` (if contact page exists) or `#contact-modal` / `javascript:openContactModal()` (if modal). Never `../index.html#order`.
- **Optional context:** URL param or data attribute (e.g. `contact.html?from=case-3`) so contact page/modal can show “Обсуждение проекта: Илюхин Гроб” or similar. Not required for first version.
- **Button class:** All case CTAs use primary style (e.g. `cta-primary`) for consistency.
- **Nav on case pages:** “Связаться” in header also points to contact flow (same as CTA). “Телефон” → `tel:`.

**Next-case navigation:**

- Does not replace CTA. Next-case = “Следующий кейс: [Title]” or “← Пред. / След. →” so user can move through the portfolio without returning to index. CTA remains the single conversion action (contact).

---

## 5. Implementation Notes

**Scope (cases only):**

- Do not redesign the rest of the site in this step.
- Only: (1) define and apply one case template, (2) fix CTA target and class, (3) add next-case nav, (4) normalize cases 5–8 (add metrics + gallery blocks, keep single body block).

**Template:**

- One HTML structure (or one template/markup pattern) used for all 8 case pages. Same block order: back, hero, video, body (sidebar + challenge, solution, result), metrics, gallery, next-case, CTA.
- For cases 5–8, “challenge / solution / result” is one block “О проекте” + one paragraph; metrics block has minimal content (— or one line); gallery has 0 or 1 image.

**Content:**

- No copy changes beyond what’s needed to fill new slots (e.g. “О проекте” already exists for 5–8). Use existing locale keys. Add locale keys for next-case labels if needed (e.g. “Следующий кейс”, “Предыдущий кейс”).

**CTA:**

- Replace every case CTA `href="../index.html#order"` with `href="../contact.html"` (or contact modal trigger). Add `cta-primary` to case 1, 3, 4 CTA buttons.

**Next-case:**

- On case N (1–7): next = case N+1. On case 8: next = case 1. Optional: previous link (case N−1; case 1 → case 8). Markup: e.g. “Следующий кейс” + link to next case page. Place between gallery and CTA wrap.

**Links and 404:**

- Cases index and homepage already link to case-1 … case-8. Ensure no link points to a case that doesn’t exist. No new case URLs; only normalize existing 8.

**Testing:**

- After implementation: (1) every case page loads, (2) structure is identical (same blocks in same order), (3) case CTA goes to contact (page or modal), not homepage, (4) next-case links work (1→2→…→8→1), (5) no 404 from any case link.
