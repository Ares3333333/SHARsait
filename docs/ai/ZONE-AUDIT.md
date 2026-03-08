# Проверка зон: причина проблемы → точечное исправление

## 1) Производительность (idle, scroll, hover)

| Состояние | Что проверено | Причина проблемы | Исправление |
|-----------|----------------|------------------|-------------|
| **Idle** | Курсор | ~~Вечный rAF~~ | Уже исправлено: обновление только по mousemove, один rAF за кадр. |
| **Idle** | CSS-анимации | `.video-loader`: после 3s opacity:0, но `videoPulse` остаётся **infinite** → пересчёт opacity/transform каждый кадр без пользы | ✅ Заменено на одну анимацию `videoLoaderIdle` 4s forwards (пульс + fade-out), убран will-change. |
| **Idle** | Лого, телефон | `.logo` (shimmer 8s infinite), `.phone-link` (premium-pulse 6s infinite) | Оставлено: визуально нужны, одна анимация на элемент. |
| **Scroll** | Обработчик | Один scroll listener, passive + rAF-throttle | Без изменений. |
| **Hover** | Кейсы | `.case::after` (card-ray) только при hover (paused → running) | Уже сделано. |

**Исправление по пункту 1:** В `style.css` заменить у `.video-loader` две анимации (videoPulse infinite + videoLoaderFadeOut) на одну с `animation-fill-mode: forwards` и без infinite.

---

## 2) Кейсы и все клики внутри кейсов

| Элемент | Причина | Статус |
|---------|---------|--------|
| Открытие кейса | `.case` имеет `onclick="openCase(n)"`; клик по карточке или по `.watch-case-btn` (span) всплывает до `.case` | Работает. |
| Закрытие по кнопке | `.close-case` — `onclick="closeCase(n)"`, z-index 1000003 выше контента модалки | Исправлено ранее. |
| Закрытие по клику в фон | `modal.addEventListener('click', e => { if (e.target === modal) closeCase(...) })` — клик по padding модалки | Работает. |
| Кнопки в модалке | `<a href="#order" onclick="closeCase(n)" class="btn-minimal">` — и переход, и закрытие | Работает. |
| Фокус и Tab | focusTrap на modal, close-case в списке focusables (tabindex, role) | Работает. |

**Исправлений не требуется.**

---

## 3) Верхняя строка / top bar / fixed

| Элемент | z-index | Причина проблемы | Статус |
|---------|---------|------------------|--------|
| nav | 1000000 | — | Ок. |
| .logo, .hamburger | 1000001 | Выше nav | Ок. |
| .modal | 1000002 | При открытой модалке выше nav → верхняя строка модалки и кнопка «ЗАКРЫТЬ» не перекрываются навбаром | Исправлено ранее. |
| .close-case | 1000003 | Выше контента модалки | Ок. |
| Мобильное меню | .nav-right 9001, .hamburger 9002 | Меню под навбаром, гамбургер сверху для закрытия | Ок. |

**Исправлений не требуется.**

---

## 4) Overlays, modals, z-index, pointer-events

| Элемент | Проверка | Причина проблемы | Статус |
|---------|----------|------------------|--------|
| .modal | z-index 1000002, display:none → block | Модалка поверх навбара | Ок. |
| .close-case | pointer-events: auto, z-index 1000003 | Клики доходят | Ок. |
| .overlay (hero) | z-index 3, под .hero-content (10) | Не перекрывает контент героя | Ок. |
| .video-loader, .custom-cursor | pointer-events: none | Не перехватывают клики | Ок. |

**Исправлений не требуется.**

---

## 5) Визуально активные кнопки без реакции на клик

| Кнопка | Как обрабатывается | Причина проблемы | Статус |
|--------|---------------------|------------------|--------|
| .watch-case-btn | `<span>` внутри `.case`; клик всплывает → `openCase` | — | Работает. |
| .close-case | `onclick="closeCase(n)"`, ранее перекрывался nav | z-index исправлен | Ок. |
| .lang-btn | addEventListener('click') | — | Работает. |
| .btn-nav-premium, .phone-link | `<a href="...">` | — | Работает. |
| #show-more-btn | getElementById + addEventListener | — | Работает. |
| .btn-minimal в модалках | `<a href="#order" onclick="closeCase(n)">` | — | Работает. |

**Исправлений не требуется.**

---

## 6) Listeners, intervals, observers, animation loops

| Тип | Где | Нагрузка | Причина проблемы | Исправление |
|-----|-----|----------|------------------|-------------|
| DOMContentLoaded | 1 раз | — | — | Нет. |
| mousemove | document, passive | Только при движении мыши, rAF-троттлинг | — | Нет. |
| scroll | window, passive, rAF | При скролле | — | Нет. |
| click | lang, hamburger, nav-closer, modal backdrop, anchors | По действию пользователя | — | Нет. |
| keydown | .case, .close-case, document (Escape), focusTrap на modal | По действию | — | Нет. |
| submit | form | По отправке | — | Нет. |
| IntersectionObserver | fade-in (1), counters (1) | Срабатывают при появлении в viewport | — | Нет. |
| setInterval | animateCounter | clearInterval по достижении target | — | Нет. |
| setTimeout | show more (50ms), toast (1000, 3000) | Ограничены по времени | — | Нет. |
| requestAnimationFrame | курсор (1 за кадр при mousemove), nav scroll, focus в modal | Не бесконечный цикл | — | Нет. |
| CSS animation infinite | .logo shimmer, .phone-link premium-pulse | 2 элемента | Приемлемо. | Нет. |
| CSS animation infinite | .video-loader videoPulse | После 3s элемент невидим, анимация всё равно крутится | Лишняя нагрузка в idle | Заменить на одну анимацию без infinite (см. п.1). |

**Исправление по пункту 6:** То же, что в п.1 — убрать бесконечную анимацию у `.video-loader`. ✅ Выполнено: одна анимация `videoLoaderIdle` 4s forwards (пульс + fade-out), без infinite и без will-change.
