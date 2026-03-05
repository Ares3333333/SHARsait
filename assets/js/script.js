document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ОПТИМИЗИРОВАННЫЙ КУРСОР (Работает через GPU, не вешает браузер)
    const cursor = document.querySelector('.custom-cursor');
    if (window.innerWidth > 900 && cursor) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        
        function renderCursor() {
            cursor.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        document.addEventListener('mousemove', (e) => {
            if (!cursor.classList.contains('active')) cursor.classList.add('active');
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });
        
        const interactives = document.querySelectorAll('a, button, .case, .journal-card, .close-case, input, textarea, .logo, .client-logo, .watch-case-btn');
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

    // 4. СЧЕТЧИКИ (Защита от NaN)
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

    // 6. УМНЫЕ МОДАЛКИ С ВИДЕО (ЗАЩИТА ОТ ИФРЕЙМ-БОМБЫ)
    window.openCase = function(id) {
        const modal = document.getElementById('case-' + id);
        if(modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const container = modal.querySelector('.m-video-container');
            const dataSrc = container.getAttribute('data-src');
            
            // Вставляем iframe ТОЛЬКО при клике
            if (dataSrc && !container.innerHTML.includes('iframe')) {
                container.innerHTML = `<iframe src="${dataSrc}" frameborder="0" allow="autoplay; fullscreen" style="width:100%; height:100%;"></iframe>`;
            }
        }
    }

    window.closeCase = function(id) {
        const modal = document.getElementById('case-' + id);
        if(modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            const container = modal.querySelector('.m-video-container');
            if (container) {
                // Жестко удаляем плеер из памяти при закрытии
                container.innerHTML = ''; 
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
