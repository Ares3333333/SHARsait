document.addEventListener("DOMContentLoaded", () => {
    // 0. Сообщение после редиректа с send.php (нативная отправка с телефона)
    var contactForm = document.getElementById('contactForm');
    if (contactForm && window.location.search) {
        var params = new URLSearchParams(window.location.search);
        var sent = params.get('sent');
        var toastEl = document.getElementById('toast');
        if (toastEl && (sent === '1' || sent === '0')) {
            toastEl.textContent = sent === '1' ? 'Заявка успешно отправлена!' : 'Ошибка отправки. Попробуйте позже или напишите нам напрямую.';
            toastEl.classList.toggle('toast--error', sent === '0');
            toastEl.classList.add('show');
            setTimeout(function() {
                toastEl.classList.remove('show', 'toast--error');
            }, 4000);
            if (window.history && window.history.replaceState) {
                window.history.replaceState({}, '', window.location.pathname);
            }
        }
    }

    // 1. Hero video — delayed load for faster first paint (poster-first)
    const heroContainer = document.getElementById('hero-video-container');
    if (heroContainer && heroContainer.dataset.src) {
        const loadHeroVideo = () => {
            const src = heroContainer.dataset.src;
            if (!src) return;
            heroContainer.removeAttribute('data-src');
            const iframe = document.createElement('iframe');
            iframe.id = 'hero-showreel';
            iframe.src = src;
            iframe.title = 'Showreel AI - SHAR Production';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share');
            iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
            iframe.setAttribute('loading', 'lazy');
            heroContainer.appendChild(iframe);
        };
        if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(loadHeroVideo, { timeout: 2200 });
        } else {
            setTimeout(loadHeroVideo, 1800);
        }
    }

    // 1. Локализация (RU-only, данные из locales.js при наличии)
    const DEFAULT_LOCALE = 'ru';
    function getNested(obj, path) {
        if (!obj || !path) return undefined;
        return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
    }
    function getCurrentLocale() { return DEFAULT_LOCALE; }
    const L = window.SHAR_LOCALES && window.SHAR_LOCALES[DEFAULT_LOCALE];
    if (L) {
        document.documentElement.lang = 'ru';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && L.meta) metaDesc.setAttribute('content', L.meta.description || '');
        if (L.meta && L.meta.title) document.title = L.meta.title;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const val = getNested(L, el.getAttribute('data-i18n'));
            if (val != null) el.textContent = val;
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const val = getNested(L, el.getAttribute('data-i18n-html'));
            if (val != null) el.innerHTML = val;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const val = getNested(L, el.getAttribute('data-i18n-placeholder'));
            if (val != null) el.placeholder = val;
        });
    }
    document.querySelectorAll('a[data-i18n="nav.pricing"]').forEach(link => link.setAttribute('href', '/pricing/index.html'));

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

    // 4.1 Стрелочки для пролистывания клиентов и наград
    document.querySelectorAll('.section-arrow[data-scroll-target]').forEach((btn) => {
        const selector = btn.getAttribute('data-scroll-target');
        const target = selector ? document.querySelector(selector) : null;
        if (!target) return;
        btn.addEventListener('click', () => {
            target.scrollBy({ left: target.clientWidth * 0.6, behavior: 'smooth' });
        });
    });

    // 5. Отложенная инициализация (не блокирует первый кадр)
    function runDeferred() {
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
    }
    if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(runDeferred, { timeout: 1200 });
    } else {
        setTimeout(runDeferred, 400);
    }

    // 6. ФОРМА КОНТАКТА — отправка на send.php (mail()), тост "Заявка отправлена" / "Ошибка отправки"
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (!btn) return;
            const submitLabel = (window.SHAR_LOCALES && window.SHAR_LOCALES[getCurrentLocale()] && window.SHAR_LOCALES[getCurrentLocale()].toast && window.SHAR_LOCALES[getCurrentLocale()].toast.submit) ? window.SHAR_LOCALES[getCurrentLocale()].toast.submit : 'ОТПРАВИТЬ';

            btn.disabled = true;
            btn.textContent = 'ОТПРАВКА...';

            function showToastAndReset(msg, isError) {
                const toast = document.getElementById('toast');
                if (toast) {
                    toast.textContent = msg;
                    toast.classList.add('show');
                    if (isError) toast.classList.add('toast--error');
                    setTimeout(() => { toast.classList.remove('show', 'toast--error'); }, 4000);
                }
                form.reset();
                btn.textContent = submitLabel;
                btn.disabled = false;
            }

            try {
                const res = await fetch(form.action || '/send.php', { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
                const data = await res.json().catch(() => ({}));
                if (data.success) {
                    showToastAndReset('Заявка отправлена', false);
                } else {
                    showToastAndReset('Ошибка отправки', true);
                }
            } catch (err) {
                showToastAndReset('Ошибка отправки', true);
            }
        });
    }

    // 7. ПЛАВНЫЙ СКРОЛЛ по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});
