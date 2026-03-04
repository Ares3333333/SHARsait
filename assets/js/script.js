document.addEventListener("DOMContentLoaded", function() {

    // Бургер меню
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const closers = document.querySelectorAll('.nav-closer');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        closers.forEach(closer => {
            closer.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Анимация при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section, .stagger-item').forEach(el => observer.observe(el));

    // Умные модалки (Видео не грузят Мак в фоне) + фасады
    function lockBodyScroll() {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
    }

    function unlockBodyScroll() {
        document.body.style.overflow = 'auto';
        document.body.style.touchAction = 'auto';
    }

    // Подготовка data-src для Vimeo по наведению (video facade)
    const caseCards = document.querySelectorAll('.case[data-video]');
    caseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const id = card.getAttribute('onclick')?.match(/\d+/)?.[0];
            const videoUrl = card.getAttribute('data-video');
            if (!id || !videoUrl) return;
            const modal = document.getElementById('case-' + id);
            if (!modal) return;
            const iframe = modal.querySelector('iframe');
            if (iframe && !iframe.getAttribute('data-src')) {
                iframe.setAttribute('data-src', videoUrl);
            }
        }, { once: true });
    });

    window.openCase = function(id) {
        const modal = document.getElementById('case-' + id);
        if (modal) {
            modal.classList.add('active');
            lockBodyScroll();
            const iframe = modal.querySelector('iframe');
            // Fallback: если data-src ещё не задан через hover (например, на тач-устройствах)
            if (iframe && !iframe.getAttribute('data-src')) {
                const relatedCard = document.querySelector('.case[onclick*="openCase(' + id + ')"][data-video]');
                if (relatedCard && relatedCard.getAttribute('data-video')) {
                    iframe.setAttribute('data-src', relatedCard.getAttribute('data-video'));
                }
            }
            if (iframe && iframe.getAttribute('data-src')) {
                iframe.src = iframe.getAttribute('data-src');
            }
        }
    };

    window.closeCase = function(id) {
        const modal = document.getElementById('case-' + id);
        if (modal) {
            modal.classList.remove('active');
            unlockBodyScroll();
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                iframe.src = ''; // Уничтожаем видео при закрытии (строгий lifecycle)
            }
        }
    };

    // Счетчики
    function animateCounter(el, target) {
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

    const countObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target, parseInt(e.target.dataset.count, 10));
                countObs.unobserve(e.target);
            }
        });
    });
    document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

    // Имитация отправки формы
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (!btn) return;
            btn.textContent = 'ОТПРАВКА...';
            setTimeout(() => {
                const toast = document.getElementById('toast');
                if (toast) {
                    toast.textContent = 'Заявка отправлена!';
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 3000);
                }
                form.reset();
                btn.textContent = 'ОТПРАВИТЬ ЗАЯВКУ';
            }, 1000);
        });
    }

    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, { passive: false });
    });

    // Пассивные слушатели для скролла и тач-событий
    window.addEventListener('scroll', () => {}, { passive: true });
    window.addEventListener('touchmove', () => {}, { passive: true });
});

