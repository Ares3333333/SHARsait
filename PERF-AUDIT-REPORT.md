# Technical Audit Report — Performance & Stability

## 1. Critical issues

| Issue | Location | Impact |
|-------|----------|--------|
| **Бесконечный rAF цикл курсора** | script.js: `requestAnimationFrame(renderCursor)` вызывается рекурсивно каждый кадр (60 fps) без остановки | Постоянная нагрузка на CPU/GPU даже при отсутствии движения мыши |
| **Модалка под навбаром** | style.css: `.modal` z-index 90000, `nav` z-index 1000000 | Кнопка «ЗАКРЫТЬ» и верхняя строка модалки перекрыты навбаром → клики не доходят |
| **Много одновременных бесконечных анимаций** | style.css: lens-ray на 3 кнопках, card-ray на 8 кейсах, premium-pulse на 2 элементах, shimmer на лого | Десятки постоянно считающихся keyframes → нагрузка на композитный слой и батарею |

## 2. Major issues

| Issue | Location | Impact |
|-------|----------|--------|
| **Избыточный will-change** | Много блоков: nav, horizontal-scroll, team-member, journal-card, price-card, client-logo, watch-case-btn, btn-minimal | Лишние композитные слои, потребление памяти, без выигрыша для статичных элементов |
| **backdrop-filter на модалке** | .modal blur(12px), .close-case blur(8px) | Дорогой эффект при открытой модалке поверх почти непрозрачного фона |
| **Нет явного pointer-events у кнопки закрытия** | .close-case | В части браузеров/состояний клик может уходить не туда |

## 3. Polish issues

| Issue | Location | Impact |
|-------|----------|--------|
| **Разный вертикальный padding кнопок** | .btn-minimal, .watch-case-btn, .btn-nav-premium | Визуально менее аккуратно |
| **Нет единого line-height у кнопок** | Кнопки | Текст может «прыгать» по высоте |
| **premium-pulse на всех .btn-minimal** | Много кнопок с одной анимацией | Лишние анимации там, где пульс не нужен (например, в модалках) |

---

## Patch plan

### A. Performance
1. **Курсор**: убрать вечный цикл rAF; обновлять позицию один раз за кадр по mousemove (один rAF после события).
2. **will-change**: убрать с nav, .horizontal-scroll, .team-member, .journal-card, .price-card, .client-logo, .watch-case-btn, .btn-minimal; оставить только у .custom-cursor, .fade-in-section/.stagger-item, .case.
3. **Бесконечные анимации**: lens-ray на кнопках отключить (animation: none), оставить только переход по hover; card-ray на .case::after — только при hover (animation-play-state: paused по умолчанию, running на .case:hover::after); premium-pulse оставить только на .phone-link, с .btn-minimal снять.
4. **backdrop-filter**: у .modal убрать (фон почти непрозрачный); у .close-case убрать или оставить лёгкий blur(4px).

### B. Interaction
1. **z-index модалки**: задать .modal z-index выше nav (например 1000002), чтобы при открытой модалке вся её область и «ЗАКРЫТЬ» были поверх навбара.
2. **.close-case**: добавить pointer-events: auto (явно), убедиться в достаточном размере кликабельной области.

### C. Button polish (консервативно)
1. Унифицировать padding: .btn-minimal 14px 0; .watch-case-btn 12px 22px; .btn-nav-premium / .phone-link 10px 22px.
2. Для кнопок задать line-height: 1.2 или 1.25.
3. У .btn-minimal убрать animation: premium-pulse (оставить только на .phone-link).

### D. Что не менять
- Тексты, структура, порядок блоков, контент.
- Цвета и форма кнопок (скругление 2px).
- Логика модалок (openCase/closeCase, scroll lock, focus trap).
- Локализация, навигация, форма.

---

## Changelog (применённые правки)

### Performance fixes
- **Курсор**: убран вечный цикл `requestAnimationFrame(renderCursor)`. Позиция обновляется один раз за кадр по `mousemove` через один rAF — нет нагрузки при неподвижной мыши.
- **will-change**: снят с `nav`, `.horizontal-scroll`, `.team-member`, `.journal-card`, `.price-card`, `.client-logo`, `.watch-case-btn`, `.btn-minimal`. Добавлен только на `.case:hover` для анимации scale.
- **Бесконечные анимации**: отключены `lens-ray` на `.btn-nav-premium::after`, `.watch-case-btn::after`, `.btn-minimal::after`. У `.case::after` (card-ray) по умолчанию `animation-play-state: paused`, запуск только на `.case:hover::after`. С `.btn-minimal` снята `premium-pulse` (оставлена только на `.phone-link`).
- **backdrop-filter**: убран у `.modal` и у `.close-case` (фон модалки и так почти непрозрачный).

### Interaction fixes
- **z-index модалки**: `.modal` задан `z-index: 1000002`, `.close-case` — `1000003`, чтобы при открытой модалке верхняя строка и кнопка «ЗАКРЫТЬ» были поверх навбара (1000000) и клики работали.
- **.close-case**: добавлен `pointer-events: auto`, унифицирован `padding: 12px 20px`.

### Button polish
- Унифицированы отступы и line-height: `.btn-nav-premium` / `.phone-link` — `padding: 10px 22px`, `line-height: 1.2`; `.watch-case-btn` — `padding: 12px 22px`, `line-height: 1.2`; `.btn-minimal` — `padding: 14px 0`, `line-height: 1.2`. Сохранены форма (border-radius: 2px), цвета и стиль.

### Intentionally left unchanged
- Тексты, контент, структура HTML, порядок секций.
- Цвета (#9c0404), форма кнопок, общий визуальный стиль.
- Логика openCase/closeCase, scroll lock, focus trap, локализация, навбар, форма.
- Hero-видео, счётчики, плавный скролл по якорям.
