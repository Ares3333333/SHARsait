# Remaining narrow audit

## 1. Кнопки (кроме верхней панели)

**Какие кнопки:** `.btn-minimal` (Заказать, Обсудить проект, РАЗВЕРНУТЬ ПОРТФОЛИО, ОБСУДИТЬ ПРОЕКТ в модалках), `.watch-case-btn` (СМОТРЕТЬ КЕЙС на карточках).

**Почему могут ощущаться дешево:**
- Нет явного `:focus-visible` в стиле сайта — при фокусе виден системный outline.
- Padding 14px 24px может казаться тесным; чуть больший «воздух» усиливает премиальность.
- Переход только по border/box-shadow/transform; фон не участвует в transition — состояние может казаться резким.
- Визуальная плотность: один и тот же стиль для всех контекстов; небольшое усиление внутреннего ритма (padding, line-height) без смены формы улучшит восприятие.

**Не трогаем:** `.btn-nav-premium`, `.phone-link`, `.lang-switcher`, любые кнопки/ссылки в `nav`.

---

## 2. Верхняя панель в кейсах — появление и кликабельность

**Текущее:** `.m-hero` — sticky, z-index 10, pointer-events auto; `.close-case` — fixed, 1000003; контент модалки z-index 1.

**Возможные причины сбоев:**
- При повторном открытии модалки не сбрасывается `modal.scrollTop` — панель может открываться уже проскролленной и казаться «не появившейся».
- Sticky считается относительно scroll container (.modal); при scrollTop > 0 шапка уже в «прилипшем» состоянии — логика корректна, но начальное состояние должно быть «сверху».

**Минимальный фикс:** В `openCase` при открытии выполнять `modal.scrollTop = 0`, чтобы верхняя панель всегда была видна при открытии.

---

## 3. Верхняя панель — светлее при скролле/активации

**Сейчас:** Один фон `.m-hero { background: rgba(3,3,3,0.97) }` без состояния «активности».

**Нужно:** При скролле контента модалки панель чуть светлее и чище, без кричащего контраста, в рамках текущего дизайна.

**Способ:** Класс `.m-hero.is-scrolled` при `modal.scrollTop > 30`, фон чуть светлее (например `rgba(22,22,22,0.98)`), плавный transition по background. Один scroll‑ listener на модалке, вешается при openCase, снимается при closeCase — без лишних глобальных слушателей.

---

# Minimal safe patch plan

1. **Кнопки (только .btn-minimal и .watch-case-btn):**
   - Добавить `:focus-visible` в стиле сайта (outline/box-shadow), без изменения формы.
   - Увеличить padding до 16px 28px у .btn-minimal; у .watch-case-btn оставить 12px 22px или сделать 14px 26px для согласованности.
   - Добавить `transition` для `background` (например 0.35s), чтобы hover не был резким.
   - Не менять цвет, форму, border-radius, общий стиль.

2. **Верхняя панель в кейсах:**
   - В `openCase`: после `modal.classList.add('active')` выполнять `modal.scrollTop = 0`.
   - Оставить текущие sticky/z-index/pointer-events без изменений.

3. **Светлее при скролле:**
   - В `openCase`: добавить обработчик scroll на modal; при `scrollTop > 30` добавлять класс `is-scrolled` у `.m-hero`, иначе удалять.
   - В `closeCase`: снять обработчик, удалить класс `is-scrolled` у `.m-hero`.
   - В CSS: `.m-hero.is-scrolled { background: rgba(22,22,22,0.98); }`, у `.m-hero` добавить `transition: background 0.35s var(--ease-luxe)`.

4. **Верхнюю глобальную панель и её кнопки не трогать.**

---

# Changes applied

**CSS (style.css):**
- `.btn-minimal`: padding 16px 28px, line-height 1.25, transition добавлен для background 0.35s, добавлен `:focus-visible` (outline + box-shadow в стиле сайта). Верхняя панель не трогалась.
- `.watch-case-btn`: padding 14px 26px, line-height 1.25, transition для background, добавлен `:focus-visible`.
- `.m-hero`: transition background 0.35s; добавлен `.m-hero.is-scrolled { background: rgba(22,22,22,0.98); }`.

**JS (script.js):**
- В `openCase`: после добавления класса active — `modal.scrollTop = 0`; снятие `is-scrolled` с `.m-hero`; подписка на `scroll` (passive), сохранение ссылки в `modal._onModalScroll`.
- В `closeCase`: снятие обработчика scroll, удаление класса `is-scrolled` у `.m-hero`.

---

# Final QA

| Критерий | Статус |
|----------|--------|
| Исправлены только нужные кнопки (.btn-minimal, .watch-case-btn) | ✅ Nav не трогались. |
| Верхняя глобальная панель и её кнопки не тронуты | ✅ .btn-nav-premium, .phone-link, .nav-link без изменений. |
| Верхняя панель в кейсах появляется и кликабельна | ✅ scrollTop = 0 при открытии; sticky, z-index, pointer-events без изменений. |
| При скролле панель светлее, премиально | ✅ .m-hero.is-scrolled, passive scroll listener, transition по background. |
| Стабильность и производительность не ухудшены | ✅ Один scroll listener на модалку при открытии, снимается при закрытии; без blur/тяжёлых эффектов. |
| Общий дизайн не изменён | ✅ Форма, палитра, border-radius, общий стиль сохранены. |

---

# Changelog

**Fixed**
- Кнопки (не из шапки): более премиальный вид за счёт padding 16px 28px / 14px 26px, line-height 1.25, плавного перехода по background и единого :focus-visible.
- Верхняя панель в кейсах: при открытии модалки сброс `modal.scrollTop = 0`, чтобы панель всегда видна; при скролле контента — класс `is-scrolled` и чуть более светлый фон с плавным переходом.

**Preserved unchanged**
- Верхняя глобальная панель, .btn-nav-premium, .phone-link, .nav-link, структура, тексты, медиа, общий дизайн, логика openCase/closeCase (кроме scroll reset и scroll-listener).

**Intentionally not touched**
- Навбар, футер, секции, контент, изображения, видео, тяжёлые эффекты, глобальные слушатели.

**Why this was the safest fix**
- Кнопки: только плотность, ритм и focus/hover без смены формы и палитры.
- Панель в кейсах: минимальный JS (scroll reset + один passive listener на модалку) и одно новое состояние в CSS; без изменения разметки и без лишней нагрузки.
