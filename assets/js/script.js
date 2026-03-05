document.addEventListener("DOMContentLoaded", () => {
    
    // 1. КАСТОМНЫЙ КУРСОР
    const cursor = document.querySelector('.custom-cursor');
    if (window.innerWidth > 900 && cursor) {
        document.addEventListener('mousemove', (e) => {
            if (!cursor.classList.contains('active')) {
                cursor.classList.add('active');
            }
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        const interactives = document.querySelectorAll('a, button, .case, .journal-card, .close-case, input, textarea, .logo, .client-logo');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // 2. МОБИЛЬНОЕ МЕНЮ
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

    // 3. АНИМАЦИИ ПОЯВЛЕНИЯ
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in-section, .stagger-item').forEach(el => observer.observe(el));

    // 4. СЧЕТЧИКИ
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
            if(e.isIntersecting) { 
                animateCounter(e.target, parseInt(e.target.dataset.count)); 
                countObs.unobserve(e.target); 
            } 
        }); 
    });
    document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

    // 5. РАЗВЕРНУТЬ ПОРТФОЛИО
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

    // 6. УМНЫЕ МОДАЛКИ С ВИДЕО (ПРОБЛЕМА С ЗАВИСАНИЕМ БРАУЗЕРА РЕШЕНА!)
    window.openCase = function(id) {
        const modal = document.getElementById('case-' + id);
        if(modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                const dataSrc = iframe.getAttribute('data-src');
                // Подгружаем видео только тогда, когда открывается модалка
                if (dataSrc && iframe.getAttribute('src') !== dataSrc) {
                    iframe.setAttribute('src', dataSrc);
                }
            }
        }
    }

    window.closeCase = function(id) {
        const modal = document.getElementById('case-' + id);
        if(modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                // Безопасно убиваем видео при закрытии
                iframe.setAttribute('src', 'about:blank');
            }
        }
    }

    // 7. TOAST (ФОРМА)
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
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

    // 8. ПЛАВНЫЙ СКРОЛЛ
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
