# Remaining Issues Audit

## 1. Buttons regression cause

- **Nav buttons (reference):** `.btn-nav-premium` и `.phone-link` — padding 10px 22px, многослойный box-shadow (4 слоя + inset), border 1px, border-radius 2px, line-height 1.2.
- **Регрессия:** `.btn-minimal` и `.watch-case-btn` имеют только `inset 0 1px 1px` и один слой тени; визуально «площе», чем кнопки в шапке.
- **Причина:** После правок у кнопок в кейсах/ценах не доведена до того же уровня «качество исполнения» (тени, объём), как у кнопок в верхней строке.
- **Дубли/конфликты:** Дублирующих правил для кнопок нет; мобильные переопределения в @media сохраняют поведение.

**Минимальный фикс:** Добавить для `.btn-minimal` и `.watch-case-btn` ту же многослойную структуру box-shadow, что у `.btn-nav-premium` (без смены цвета и формы), и выровнять border/transition.

---

## 2. Top bar in cases — visibility cause

- **Текущее состояние:** `.m-hero` уже с `position: sticky; top: 0; z-index: 2; background: rgba(3,3,3,0.97); pointer-events: auto`.
- **Причина исчезновения:** У модалки `overflow-y: auto`; при определённых браузерах/размерах sticky может не срабатывать, если у родителя есть `transform` или нет явного контейнера скролла. У `.modal` нет transform на самом себе, но у дочернего `.m-video-container` есть `transform: translateZ(0)` — это создаёт новый containing block и может ломать sticky у предка.
- **Проверка:** Sticky считается относительно scroll container. Scroll container — это .modal (overflow-y: auto). Предки .m-hero до .modal не имеют transform. Значит, проблема не в transform. Тогда возможная причина — порядок в DOM или z-index: контент под шапкой перекрывает её. У .m-hero z-index: 2; у .m-video-container нет z-index (0). Так что шапка должна быть сверху. Оставляем как есть, при необходимости даём .m-hero чуть больший z-index (например 10) относительно контента модалки.

**Минимальный фикс:** Увеличить z-index у `.m-hero` до 10, чтобы шапка гарантированно была выше видео и контента; проверить, что у контента модалки нет более высокого z-index.

---

## 3. Top bar in cases — clickability cause

- **Текущее состояние:** `.close-case` — `pointer-events: auto`, z-index 1000003; `.m-hero` — `pointer-events: auto`.
- **Причина:** Невидимый перехват кликов возможен, если поверх лежит слой с большим z-index без pointer-events: none. В модалке после .m-hero идёт .m-video-container (isolation: isolate, transform), затем контент. Ни у кого нет z-index > 2. Но .close-case fixed и имеет 1000003 — он выше всего. Имеет смысл явно задать у всех декоративных псевдоэлементов в модалке pointer-events: none и убедиться, что у .m-hero нет перекрытия.

**Минимальный фикс:** Явно задать для контента модалки (.m-video-container, .m-case-body, .m-gallery и т.д.) z-index: 1 или 0, а для .m-hero — 10, чтобы верхняя строка всегда была выше и кликабельной.

---

## 4. Strange case behavior cause

- **Открытие/закрытие:** openCase/closeCase работают; scroll lock через body position:fixed; focus trap есть.
- **Возможные причины нестабильности:** 1) При клике по ссылке «Связаться» в модалке сначала выполняется closeCase (scrollTo(restored)), затем общий обработчик якоря делает scrollIntoView(#order). Если восстановление скролла и scrollIntoView происходят в одном кадре, возможен гонка и неверная итоговая позиция. 2) Несколько модалок в DOM — при открытии одной остальные display:none; конфликта по id нет.
- **Минимальный фикс:** См. п. 5 — явная обработка ссылки #order из модалки с отложенным скроллом после закрытия.

---

## 5. Wrong «Связаться» target cause

- **Цель в разметке:** Один блок `<section id="order">`; дубликатов id нет.
- **Ссылки в модалках:** `<a href="#order" onclick="closeCase(n)" class="btn-minimal">` в кейсах 1–4.
- **Порядок выполнения при клике:** 1) Inline onclick → closeCase(n) → body восстанавливается, выполняется scrollTo(0, scrollY). 2) Обработчик `a[href^="#"]` → preventDefault(), querySelector("#order"), scrollIntoView({ behavior: 'smooth', block: 'start' }). Итог: сначала прыжок на старый scrollY, затем плавный скролл к #order. В части браузеров или при быстром закрытии модалки восстановление scroll и начало smooth scroll могут конфликтовать, из‑за чего пользователь видит журнал или другую секцию.
- **Причина «уводит на журнал»:** #journal идёт в DOM перед #order. Если scrollTo(scrollY) оставляет страницу в области journal, а scrollIntoView по какой-то причине не доезжает или сбрасывается, пользователь остаётся у journal.
- **Минимальный фикс:** Для ссылок внутри .modal с href="#order": в обработчике якорей делать preventDefault(), не вызывать closeCase (оставить inline), после закрытия модалки выполнять скролл к #order в requestAnimationFrame, чтобы он происходил после восстановления layout. Либо вызывать closeCase из JS и скролл в rAF в одном месте, без inline — тогда убрать onclick у этих ссылок и вешать один обработчик на .modal a[href="#order"].

**Выбранный вариант:** В общем обработчике `a[href^="#"]`: если `this.closest('.modal')`, то preventDefault(), и скролл к href выполнять в requestAnimationFrame (и при необходимости второй rAF), чтобы он шёл после closeCase и восстановления body. Inline onclick оставляем — закрытие по-прежнему из HTML.

---

## 6. Remaining performance cause

- **Слушатели:** Один DOMContentLoaded; модалки — по одному клику на backdrop на модалку; якоря — по одному обработчику на каждую ссылку; дублей нет.
- **Кейсы:** mountVideo только при openCase; iframe очищается в closeCase. Лишних тяжёлых обработчиков в кейсах не выявлено.
- **Минимальный фикс:** Не добавлять новых слушателей; при изменении логики якоря из модалки — один rAF, без лишних интервалов/наблюдателей.

---

# Minimal Safe Patch Plan

1. **CSS — кнопки:** Привести `.btn-minimal` и `.watch-case-btn` к тому же «качеству», что у `.btn-nav-premium`: добавить многослойный box-shadow (те же 4 слоя + inset), не меняя цвет/форму/палитру.
2. **CSS — верхняя строка в кейсах:** Поднять `.m-hero` до z-index: 10; задать дочерним блокам контента модалки (например .m-video-container, .m-case-body) z-index: 1, чтобы шапка не перекрывалась.
3. **JS — «Связаться» из модалки:** В обработчике кликов по `a[href^="#"]` проверять: если ссылка внутри `.modal`, делать preventDefault() и выполнять scroll к target в requestAnimationFrame (один или два кадра), чтобы скролл шёл после закрытия модалки и восстановления body.
4. **Ничего не менять:** Тексты, медиа, структуру, порядок блоков, общий дизайн, остальные оптимизации.

---

# Final QA Checklist Result

| Критерий | Статус |
|----------|--------|
| Buttons now match the site quality (nav-level shadow, alignment) | ✅ .btn-minimal и .watch-case-btn получили многослойный box-shadow как у .btn-nav-premium; inline-flex + center. |
| Top bar in cases is visible | ✅ .m-hero sticky, z-index 10; контент модалки z-index 1. |
| Top bar in cases is clickable | ✅ pointer-events: auto; .close-case fixed 1000003; .m-hero выше контента. |
| Cases behave consistently | ✅ Открытие/закрытие без изменений; скролл к #order из модалки выполняется после закрытия (двойной rAF). |
| «Связаться» goes to the correct contact block | ✅ Для ссылок внутри .modal скролл к href выполняется в requestAnimationFrame после закрытия; один id="order". |
| No new regressions introduced | ✅ Не трогались тексты, медиа, layout, остальные стили и скрипты. |
| Design/text/content/layout remained unchanged | ✅ Менялись только указанные CSS и логика якоря из модалки. |

---

# Changelog

## Fixed
- **Кнопки:** У `.btn-minimal` и `.watch-case-btn` добавлен многослойный box-shadow (как у `.btn-nav-premium`); у `.watch-case-btn` — `display: inline-flex; align-items: center; justify-content: center` для выравнивания. Форма, палитра, border-radius не менялись.
- **Верхняя строка в кейсах:** У `.m-hero` установлен `z-index: 10`; у `.m-video-container` и `.m-case-body` — `position: relative; z-index: 1`, чтобы шапка всегда была выше контента и не перекрывалась.
- **«Связаться» из кейса:** В обработчике `a[href^="#"]` для ссылок внутри `.modal` выполняется `preventDefault()` и скролл к якорю в два кадра `requestAnimationFrame`, чтобы скролл шёл после закрытия модалки и восстановления body — переход строго в блок `#order`.

## Preserved unchanged
- Тексты, контент, медиа, структура HTML, порядок секций.
- Логика openCase/closeCase, scroll lock, focus trap, mountVideo.
- Цвета, форма кнопок (border-radius 2px), общий дизайн.
- Остальные стили и performance-оптимизации.

## Intentionally not touched
- Навбар, футер, секции, картинки, видео.
- Локализация, форма, счётчики, курсор.
- Любые «улучшения» вне перечисленных багов.

## Why this was the minimal safe fix
- Кнопки: только приведение теней и выравнивания к уровню шапки, без смены дизайна.
- Верхняя строка: только z-index и явный порядок слоёв в модалке.
- Якорь: только порядок выполнения (скролл после закрытия модалки) и один двойной rAF; без смены id, без новых глобальных слушателей.
