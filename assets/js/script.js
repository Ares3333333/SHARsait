document.addEventListener("DOMContentLoaded", () => {
    let lastFocusedElement = null;

    // 0. ЛОКАЛИЗАЦИЯ (default: ru, EN — отдельный набор строк)
    const LOCALE_STORAGE_KEY = 'shar_locale';
    const DEFAULT_LOCALE = 'ru';

    function getNested(obj, path) {
        if (!obj || !path) return undefined;
        return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
    }

    function getCurrentLocale() {
        const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
        return (stored === 'en' || stored === 'ru') ? stored : DEFAULT_LOCALE;
    }

    function applyLocale(locale) {
        const L = window.SHAR_LOCALES && window.SHAR_LOCALES[locale];
        if (!L) return;
        window.SHAR_CURRENT_LOCALE = locale;
        document.documentElement.lang = locale === 'en' ? 'en' : 'ru';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && L.meta) metaDesc.setAttribute('content', L.meta.description || '');
        if (document.title !== undefined && L.meta) document.title = L.meta.title || document.title;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = getNested(L, key);
            if (val != null) el.textContent = val;
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            const val = getNested(L, key);
            if (val != null) el.innerHTML = val;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = getNested(L, key);
            if (val != null) el.placeholder = val;
        });

        const switcher = document.getElementById('lang-switcher');
        if (switcher) {
            switcher.querySelectorAll('.lang-btn').forEach(btn => {
                const lang = btn.getAttribute('data-lang');
                btn.classList.toggle('active', lang === locale);
                btn.setAttribute('aria-pressed', lang === locale ? 'true' : 'false');
            });
        }
    }

    const currentLocale = getCurrentLocale();
    applyLocale(currentLocale);

    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                if (lang !== getCurrentLocale()) {
                    localStorage.setItem(LOCALE_STORAGE_KEY, lang);
                    applyLocale(lang);
                }
            });
        });
    }

    // 1. КУРСОР (GPU: translate3d, без вечного rAF-цикла — обновление только по mousemove)
    const cursor = document.querySelector('.custom-cursor');
    if (window.innerWidth > 900 && cursor) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let rafScheduled = false;

        function updateCursorPosition() {
            rafScheduled = false;
            cursor.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
        }

        document.addEventListener('mousemove', (e) => {
            if (!cursor.classList.contains('active')) cursor.classList.add('active');
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!rafScheduled) {
                rafScheduled = true;
                requestAnimationFrame(updateCursorPosition);
            }
        }, { passive: true });
        updateCursorPosition();
        
        const interactives = document.querySelectorAll('a, button, .case, .journal-card, .close-case, input, textarea, .logo, .client-logo, .watch-case-btn, .btn-nav-premium');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // 2. NAV GLASS ON SCROLL (scrolled при scrollY > 50)
    const nav = document.querySelector('nav');
    if (nav) {
        const updateNavState = () => {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        };
        updateNavState();
        let navTicking = false;
        window.addEventListener('scroll', () => {
            if (navTicking) return;
            navTicking = true;
            requestAnimationFrame(() => {
                updateNavState();
                navTicking = false;
            });
        }, { passive: true });
    }

    // 2.1 HERO SHOWREEL READY STATE — плавный переход по load, fallback по таймауту
    const heroShowreel = document.getElementById('hero-showreel');
    if (heroShowreel) {
        const heroVideoWrap = heroShowreel.closest('.video-bg');
        const markReady = () => {
            if (heroVideoWrap) heroVideoWrap.classList.add('video-ready');
        };
        heroShowreel.addEventListener('load', markReady, { once: true });
        setTimeout(() => {
            if (heroVideoWrap && !heroVideoWrap.classList.contains('video-ready')) {
                heroVideoWrap.classList.add('video-timeout');
            }
        }, 2800);
    }

    // 3. МОБИЛЬНОЕ МЕНЮ
    const hamburger = document.getElementById('hamburger');
    const navRight = document.getElementById('nav-links');
    
    if (hamburger && navRight) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navRight.classList.toggle('active');
        });
        
        document.querySelectorAll('.smart-close, .nav-closer').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navRight.classList.remove('active');
            });
        });
    }

    // 4. АНИМАЦИИ ПОЯВЛЕНИЯ
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-section, .stagger-item').forEach(el => observer.observe(el));
    } else {
        document.querySelectorAll('.fade-in-section, .stagger-item').forEach((el) => el.classList.add('is-visible'));
    }

    // 5. СЧЕТЧИКИ — статические значения (без анимации от 0, чтобы не показывать нули)
    document.querySelectorAll('[data-count]').forEach((el) => {
        const raw = el.dataset.count;
        const num = parseInt(raw, 10);
        if (isNaN(num) || num < 0) return;
        el.textContent = num === 99 ? '99%' : String(num);
    });

    document.querySelectorAll('.case').forEach((card) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            card.click();
        });
    });

    document.querySelectorAll('.close-case').forEach((button) => {
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            button.click();
        });
    });

    document.querySelectorAll('.modal').forEach((modal) => {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-hidden', 'true');
    });

    // 6. РАЗВЕРНУТЬ ПОРТФОЛИО
    const showMoreBtn = document.getElementById('show-more-btn');
    if(showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            document.querySelectorAll('.hidden-case').forEach(el => {
                el.style.display = 'block';
                setTimeout(() => el.classList.add('show'), 50);
            });
            this.style.display = 'none';
        });
    }

    // 7. УМНЫЕ МОДАЛКИ С ВИДЕО (iframe создается только по клику и удаляется при закрытии)
    function mountVideo(container) {
        if (!container) return;
        const dataSrc = container.dataset.src;
        container.innerHTML = "";
        if (!dataSrc) return;

        const iframe = document.createElement('iframe');
        iframe.src = dataSrc;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('title', 'Видео проекта');
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        container.appendChild(iframe);
    }

    window.openCase = function(id) {
        const modal = document.getElementById(`case-${id}`);
        if (!modal) return;

        const container = modal.querySelector('.m-video-container');
        if (!container) return;

        mountVideo(container);

        lastFocusedElement = document.activeElement && document.body.contains(document.activeElement) ? document.activeElement : null;
        modal.classList.add('active');
        modal.scrollTop = 0;
        const navEl = document.querySelector('nav');
        if (navEl) navEl.classList.add('scrolled');
        modal.setAttribute('aria-hidden', 'false');
        const scrollY = window.scrollY || window.pageYOffset;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.dataset.scrollY = String(scrollY);

        requestAnimationFrame(() => {
            const closeBtn = modal.querySelector('.close-case');
            if (closeBtn && typeof closeBtn.focus === 'function') closeBtn.focus();
        });

        function focusTrap(e) {
            if (e.key !== 'Tab') return;
            const focusables = modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
            const list = Array.from(focusables).filter(el => el.offsetParent !== null && !el.disabled);
            if (list.length === 0) return;
            const first = list[0];
            const last = list[list.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        }
        modal.addEventListener('keydown', focusTrap);
        modal._focusTrap = focusTrap;
    };


    document.querySelectorAll('.modal').forEach((modal) => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                const id = modal.id.replace('case-', '');
                closeCase(id);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        const activeModal = document.querySelector('.modal.active');
        if (!activeModal) return;
        const id = activeModal.id.replace('case-', '');
        closeCase(id);
    });

    window.closeCase = function(id) {
        const modal = document.getElementById(`case-${id}`);
        if (modal) {
            const container = modal.querySelector('.m-video-container');
            if (container) container.innerHTML = '';
            if (modal._focusTrap) {
                modal.removeEventListener('keydown', modal._focusTrap);
                delete modal._focusTrap;
            }
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            const scrollY = document.body.dataset.scrollY ? parseInt(document.body.dataset.scrollY, 10) : 0;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            delete document.body.dataset.scrollY;
            if (!isNaN(scrollY)) window.scrollTo(0, scrollY);
            requestAnimationFrame(() => {
                const navEl = document.querySelector('nav');
                if (navEl) {
                    if (window.scrollY > 50) navEl.classList.add('scrolled');
                    else navEl.classList.remove('scrolled');
                }
                if (lastFocusedElement && document.body.contains(lastFocusedElement) && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
            });
        }
    };

    // 8. TOAST (ФОРМА) — текст из текущей локали
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (!btn) return;
            const loc = window.SHAR_LOCALES && window.SHAR_LOCALES[getCurrentLocale()];
            const sending = (loc && loc.toast && loc.toast.sending) ? loc.toast.sending : 'ОТПРАВКА...';
            const success = (loc && loc.toast && loc.toast.success) ? loc.toast.success : 'Заявка успешно отправлена!';
            const submitLabel = (loc && loc.toast && loc.toast.submit) ? loc.toast.submit : 'ОТПРАВИТЬ ЗАЯВКУ';
            btn.textContent = sending;
            setTimeout(() => {
                const toast = document.getElementById('toast');
                if(toast) {
                    toast.textContent = success;
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 3000);
                }
                form.reset();
                btn.textContent = submitLabel;
            }, 1000);
        });
    }

    // 9. ПЛАВНЫЙ СКРОЛЛ (из модалки — скролл к якорю после закрытия, чтобы не уводило не туда)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            if (this.closest('.modal')) {
                e.preventDefault();
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        const target = document.querySelector(href);
                        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                });
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
