document.addEventListener("DOMContentLoaded", () => {
    let lastFocusedElement = null;

    const heroVideoBg = document.querySelector('.video-bg');
    const heroIframe = document.getElementById('hero-showreel');
    if (heroVideoBg && heroIframe) {
        let heroReady = false;
        const markHeroReady = () => {
            if (heroReady) return;
            heroReady = true;
            heroVideoBg.classList.add('ready');
        };

        heroIframe.addEventListener('load', markHeroReady, { once: true });
        setTimeout(markHeroReady, 3500);
    }
    
    // 1. КУРСОР (GPU: translate3d для аппаратного ускорения)
    const cursor = document.querySelector('.custom-cursor');
    if (window.innerWidth > 900 && cursor) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        
        function renderCursor() {
            cursor.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        let cursorQueued = false;
        document.addEventListener('mousemove', (e) => {
            if (!cursor.classList.contains('active')) cursor.classList.add('active');
            if (cursorQueued) return;
            cursorQueued = true;
            requestAnimationFrame(() => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorQueued = false;
            });
        }, { passive: true });
        
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

    // 5. СЧЕТЧИКИ (Защита от NaN)
    function animateCounter(el, target) {
        if (!target || target === 0) return;
        let start = 0; 
        const inc = target / 30; 
        const timer = setInterval(() => {
            start += inc;
            if (start >= target) { 
                start = target; 
                clearInterval(timer); 
            }
            if (el.parentElement.classList.contains('stat-item')) {
                el.textContent = Math.floor(start) + (target === 99 ? '%' : '+');
            }
        }, 30);
    }
    if ('IntersectionObserver' in window) {
        const countObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateCounter(e.target, parseInt(e.target.dataset.count));
                    countObs.unobserve(e.target);
                }
            });
        });
        document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));
    } else {
        document.querySelectorAll('[data-count]').forEach((el) => animateCounter(el, parseInt(el.dataset.count)));
    }

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

        lastFocusedElement = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const closeBtn = modal.querySelector('.close-case');
        if (closeBtn) closeBtn.focus();
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
            if (container) {
                container.innerHTML = '';
            }
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }
    };

    // 8. TOAST (ФОРМА)
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (!btn) return;
            btn.textContent = 'ОТПРАВКА...';
            setTimeout(() => {
                const toast = document.getElementById('toast');
                if(toast) {
                    toast.textContent = 'Заявка успешно отправлена!';
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 3000);
                }
                form.reset();
                btn.textContent = 'ОТПРАВИТЬ ЗАЯВКУ';
            }, 1000);
        });
    }

    // 9. ПЛАВНЫЙ СКРОЛЛ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
