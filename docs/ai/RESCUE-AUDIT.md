# Rescue Audit — после неудачного merge

## A. Обнаруженные поломки (merge-regressions)

### 1. **Неразрешённые конфликты Git**
- **style.css**: 6 блоков с маркерами `<<<<<<< HEAD`, `=======`, `>>>>>>> e7430068...` — браузер не парсит это как CSS, часть стилей не применяется → сломанный layout и вид.
- **script.js**: 1 блок конфликта — при выборе «incoming» теряется вся локализация (applyLocale, getCurrentLocale, lang switcher); при текущем состоянии в коде остаются маркеры, возможен синтаксический сбой.

### 2. **style.css — по блокам**

| Место | Проблема | Регрессия |
|-------|----------|-----------|
| **:root (стр. 12–38)** | Два варианта переменных: HEAD — spacing/typography/motion (`--space-*`, `--dur`, `--lh-*`); incoming — `--surface-glass`, `--shadow-elevated`. В файле дальше везде используются переменные HEAD. | Оставить HEAD; удалить маркеры и ветку incoming. |
| **body, a, h (стр. 44–68)** | HEAD: body с `line-height: var(--lh-body)`, a с `var(--dur)`. Incoming: body с radial-gradient фоном, другой типографикой, плюс блок `*:focus-visible` после конфликта. | Оставить HEAD (без смены фона body), сохранить блок `*:focus-visible` — он уже есть ниже и не конфликтует. |
| **Hero / video (стр. 171–240)** | Смешаны два варианта .hero, .video-bg, .video-poster, .video-loader и .video-bg iframe. После разрешения остались «висящие» свойства (`will-change`, `transform`, `opacity`, `transition`, `}`) без селектора — битый CSS. | Оставить вариант HEAD; закрыть .video-loader одним `}`; убрать висящие свойства; убрать зависимость от `.video-bg.ready` (в index нет `id="hero-showreel"`). |
| **Stats / clients (стр. 275–291)** | HEAD: сетка и клиенты на переменных. Incoming: другие отступы и оформление .stat-item. | Оставить HEAD (единый ритм). |
| **.journal-card (стр. 357–363)** | HEAD: переходы на `var(--dur)`. Incoming: `--surface-glass`, `--shadow-elevated` (эти переменные в текущем файле не определены из-за конфликта в :root). | Оставить HEAD. |
| **.price-card (стр. 372–390)** | Аналогично: HEAD на переменных, incoming на неопределённых `--surface-glass-strong`, `--shadow-*`. | Оставить HEAD. |

### 3. **script.js**
- Конфликт: HEAD — полный блок локализации (0. ЛОКАЛИЗАЦИЯ + инициализация + switcher); incoming — логика для hero video (heroVideoBg, heroIframe, `#hero-showreel`).
- В **index.html** у hero-iframe **нет** `id="hero-showreel"`, значит код incoming никогда не сработает и класс `.ready` не выставится.
- Форма и тост вызывают `getCurrentLocale()` — они есть только в ветке HEAD. Если оставить incoming, JS падает по `getCurrentLocale is not defined`.
- **Решение**: оставить HEAD (локализация + весь текущий функционал); удалить маркеры и блок incoming.

### 4. **Что не сломано**
- Один `DOMContentLoaded`, нет дублей.
- Модалки, scroll lock, focus trap, openCase/closeCase — без дублирования, логика цельная.
- Счётчики, навигация, курсор, плавный скролл — в одном экземпляре.

---

## B. Patch plan

1. **style.css**
   - Разрешить конфликт 1 (:root): оставить только ветку HEAD (spacing/typography/motion).
   - Разрешить конфликт 2 (body/a/h): оставить HEAD.
   - Разрешить конфликт 3 (hero/video): оставить HEAD; убедиться, что .video-loader корректно закрыт; удалить «висящие» свойства после конфликта.
   - Разрешить конфликт 4 (iframe/keyframes): оставить HEAD.
   - Разрешить конфликт 5 (stats/clients): оставить HEAD.
   - Разрешить конфликт 6 (journal-card): оставить HEAD.
   - Разрешить конфликт 7 (pricing): оставить HEAD.
   - Во всех случаях: удалить маркеры `<<<<<<<`, `=======`, `>>>>>>>` и ветку incoming.

2. **script.js**
   - Разрешить конфликт: оставить блок HEAD (локализация + switcher); удалить блок incoming (hero showreel); удалить маркеры.

3. **index.html**
   - Не менять (конфликтов не найдено, контент и структура сохраняются).

После патча: стили и скрипт без маркеров, один согласованный вариант (текущие улучшения HEAD), без редизайна и без удаления контента.

---

## D. Changelog (что сделано)

| Действие | Файл | Детали |
|----------|------|--------|
| **Restored** | style.css | Удалены все маркеры конфликтов `<<<<<<<` / `=======` / `>>>>>>>`. Оставлена ветка HEAD во всех 6 блоках. |
| **Restored** | style.css | :root — сохранены переменные spacing/typography/motion (`--space-*`, `--dur`, `--lh-*`, `--ls-*`). |
| **Restored** | style.css | body, a, h1–h3 — сохранён вариант с `line-height: var(--lh-body)` и переходами на `var(--dur)`. |
| **Restored** | style.css | Блок hero/video: единый вариант .hero, .video-bg, .video-poster, .video-loader с корректным закрытием `}`; убраны «висящие» свойства после конфликта. .video-bg iframe с анимацией videoFadeIn. |
| **Restored** | style.css | stats-grid, stat-item, clients-grid, client-logo — вариант на переменных (--space-*). |
| **Restored** | style.css | .journal-card и .price-card — вариант HEAD на var(--dur), без неопределённых --surface-glass / --shadow-*. |
| **Restored** | script.js | Удалены маркеры конфликта. Сохранён полный блок локализации (getCurrentLocale, applyLocale, lang switcher). |
| **Reverted** | script.js | Удалён блок incoming: heroVideoBg / heroIframe (#hero-showreel). В index.html нет id="hero-showreel", код не работал бы; плюс без HEAD ломается getCurrentLocale() в форме. |
| **Preserved** | style.css | Блок *:focus-visible, .overlay с градиентами, prefers-reduced-motion — не трогались, остались как в текущем файле. |
| **Preserved** | script.js | Один DOMContentLoaded, модалки, scroll lock, focus trap, счётчики, навигация, тост, плавный скролл — без дублей, логика не менялась. |

**Why:** Конфликты после merge оставили в коде литералы маркеров Git. Браузер не интерпретирует их как CSS, из‑за чего часть стилей не применялась и вёрстка ломалась. В JS при разрешении в пользу incoming пропала бы локализация и вызов getCurrentLocale() в форме привёл бы к ошибке. Восстановлена согласованная рабочая версия на базе HEAD с удалением только маркеров и ветки incoming.
