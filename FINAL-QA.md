# Финальный Self-QA

Проверка по коду (script.js, style.css, index.html). Подтверждение по каждому пункту.

---

## 1. Сайт не тормозит

| Проверка | Результат | Подтверждение |
|----------|-----------|----------------|
| Нет вечного rAF | ✅ | Курсор: один rAF за кадр только при mousemove, флаг `rafScheduled` (script.js:74–89). |
| Scroll не блокирует | ✅ | Один scroll listener, `passive: true`, троттлинг через requestAnimationFrame (script.js:107–115). |
| Нет лишних бесконечных анимаций | ✅ | videoLoaderIdle 4s forwards (без infinite); card-ray только при hover (paused → running); lens-ray на кнопках убран; premium-pulse только на .phone-link. |
| setInterval только с очисткой | ✅ | animateCounter: clearInterval при достижении target (script.js:167–176). |

**Вердикт: PASS** — условия для отсутствия тормозов выполнены.

---

## 2. Нет лишней нагрузки на CPU/GPU

| Проверка | Результат | Подтверждение |
|----------|-----------|----------------|
| will-change только где нужно | ✅ | Курсор, .fade-in-section/.stagger-item, .case:hover. Снято с nav, карточек, кнопок, horizontal-scroll. |
| Бесконечные CSS-анимации минимизированы | ✅ | Infinite только: .logo (shimmer), .phone-link (premium-pulse). .video-loader — одна анимация 4s forwards. |
| Backdrop-filter у тяжёлых overlay убран | ✅ | У .modal и .close-case backdrop-filter снят. |
| Transform/opacity для анимаций | ✅ | Курсор — translate3d; переходы на transform/opacity. |

**Вердикт: PASS** — лишняя нагрузка снижена.

---

## 3. Нет подвисаний

| Проверка | Результат | Подтверждение |
|----------|-----------|----------------|
| Passive listeners | ✅ | mousemove, scroll с `{ passive: true }`. |
| Тяжёлая работа только по действию | ✅ | IntersectionObserver срабатывает при появлении в viewport; счётчики — по одному разу с clearInterval. |
| Модалки: iframe только при открытии | ✅ | mountVideo по openCase, innerHTML = '' при closeCase. |

**Вердикт: PASS** — условий для подвисаний не выявлено.

---

## 4. Кейсы работают корректно

| Проверка | Результат | Подтверждение |
|----------|-----------|----------------|
| Открытие по клику на карточку | ✅ | У всех .case есть onclick="openCase(n)" (n 1–8) (index.html). |
| Клик по «СМОТРЕТЬ КЕЙС» | ✅ | .watch-case-btn внутри .case, клик всплывает → openCase. |
| openCase / closeCase глобально | ✅ | window.openCase, window.closeCase (script.js). |
| Закрытие по кнопке «ЗАКРЫТЬ» | ✅ | У каждого .close-case onclick="closeCase(n)", z-index 1000003, pointer-events: auto. |
| Закрытие по клику в фон и Escape | ✅ | modal click (event.target === modal), document keydown Escape (script.js:296–310). |
| Scroll lock при открытой модалке | ✅ | body position:fixed, top:-scrollY, восстановление в closeCase. |
| Focus trap и возврат фокуса | ✅ | focusTrap на keydown Tab, lastFocusedElement при закрытии. |

**Вердикт: PASS** — кейсы и модалки реализованы корректно.

---

## 5. Верхняя строка работает корректно

| Проверка | Результат | Подтверждение |
|----------|-----------|----------------|
| nav фиксирован и виден | ✅ | position: fixed, z-index: 1000000 (style.css). |
| При скролле — класс scrolled | ✅ | scrollY > 50 → nav.classList.add('scrolled'), иначе remove (script.js:102–105). |
| Модалка поверх навбара | ✅ | .modal z-index 1000002 > nav 1000000 → верхняя строка модалки и кнопка «ЗАКРЫТЬ» не перекрыты. |
| Лого и гамбургер поверх | ✅ | .logo, .hamburger z-index 1000001. |

**Вердикт: PASS** — верхняя строка и приоритет слоёв в порядке.

---

## 6. Все кнопки нажимаются

| Элемент | Результат | Подтверждение |
|---------|-----------|----------------|
| СВЯЗАТЬСЯ, ТЕЛЕФОН | ✅ | <a href="#order">, <a href="tel:...">, в nav-actions. |
| RU/EN | ✅ | .lang-btn с addEventListener('click'), applyLocale. |
| Проекты, Команда, Стоимость, Журнал | ✅ | .nav-link с href="#work" и т.д., .smart-close для закрытия меню. |
| Карточки кейсов | ✅ | .case onclick="openCase(n)". |
| ЗАКРЫТЬ в модалках | ✅ | .close-case onclick, z-index 1000003, pointer-events: auto. |
| ОБСУДИТЬ ПРОЕКТ в модалках | ✅ | <a href="#order" onclick="closeCase(n)" class="btn-minimal">. |
| Показать ещё / ОТПРАВИТЬ ЗАЯВКУ | ✅ | #show-more-btn click, form submit. |
| Журнал (карточки статей) | ✅ | .journal-card — ссылки в index.html (href на news-1/2/3). |

**Вердикт: PASS** — у всех визуальных кнопок есть обработка клика.

---

## 7. Нет ложных активных элементов

| Проверка | Результат | Подтверждение |
|----------|-----------|----------------|
| Нет элементов «как кнопка» без действия | ✅ | .watch-case-btn — span внутри .case, клик всплывает к .case. Остальные кнопки — a/button с href или onclick. |
| Активное состояние только у реальных переключателей | ✅ | .lang-btn.active по выбранной локали; .hamburger.active при открытом меню; .nav-right.active. |
| Курсор hover только на интерактивах | ✅ | cursor.classList.add('hover') на mouseenter списка .interactives, remove на mouseleave. |

**Вердикт: PASS** — ложных активных элементов не выявлено.

---

## 8. Кнопки стали чуть аккуратнее и премиальнее

| Проверка | Результат | Подтверждение |
|----------|-----------|----------------|
| Единый line-height | ✅ | line-height: 1.2 у .btn-nav-premium, .phone-link, .watch-case-btn, .btn-minimal, .close-case. |
| Унифицированный padding | ✅ | nav-кнопки 10px 22px; .watch-case-btn 12px 22px; .btn-minimal 14px 0; .close-case 12px 20px. |
| Общий стиль сохранён | ✅ | border-radius: 2px, те же цвета и градиенты, без новых декоративных эффектов. |

**Вердикт: PASS** — кнопки унифицированы без смены дизайна.

---

## 9. Дизайн, тексты, структура и контент не изменены

| Проверка | Результат | Подтверждение |
|----------|-----------|----------------|
| HTML: секции, порядок, тексты | ✅ | Изменения только технические (атрибуты data-i18n, размеры img); контент и структура блоков не трогались. |
| Цвета и форма | ✅ | #9c0404, border-radius 2px у кнопок, общая визуальная система без изменений. |
| Состав страницы | ✅ | Hero, manifesto, stats, clients, work, team, pricing, journal, order, footer, модалки — без удаления или перестановки. |

**Вердикт: PASS** — дизайн, тексты, структура и контент сохранены.

---

## Итог

| № | Критерий | Статус |
|---|----------|--------|
| 1 | Сайт не тормозит | ✅ PASS |
| 2 | Нет лишней нагрузки на CPU/GPU | ✅ PASS |
| 3 | Нет подвисаний | ✅ PASS |
| 4 | Кейсы работают корректно | ✅ PASS |
| 5 | Верхняя строка работает корректно | ✅ PASS |
| 6 | Все кнопки нажимаются | ✅ PASS |
| 7 | Нет ложных активных элементов | ✅ PASS |
| 8 | Кнопки чуть аккуратнее и премиальнее | ✅ PASS |
| 9 | Дизайн, тексты, структура и контент не изменены | ✅ PASS |

**Финальный вердикт: все 9 пунктов самопроверки пройдены.**
