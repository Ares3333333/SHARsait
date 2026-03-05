document.addEventListener("DOMContentLoaded", function() {

    // Логика кастомного курсора
    const cursor = document.querySelector('.custom-cursor');
    if (window.innerWidth > 900 && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        const interactives = document.querySelectorAll('a, button, .case, .journal-card, .close-case, input, textarea');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Бургер меню
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const closers = document.querySelectorAll('.nav-closer');

    if(hamburger) {
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

    // Анимация появления блоков
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section, .case, .journal-card, .price-card, .client-logo').forEach(el => observer.observe(el));

    // Анимация счетчиков
    function animateCounter(el, target) {
        let start = 0; const inc = target / 30; 
        const timer = setInterval(() => {
            start += inc;
            if (start >= target) { start = target; clearInterval(timer); }
            if (el.parentElement.classList.contains('stat-item')) el.textContent = Math.floor(start) + (target === 99 ? '%' : '+');
        }, 30);
    }
    const countObs = new IntersectionObserver((entries) => { 
        entries.forEach(e => { if(e.isIntersecting) { animateCounter(e.target, parseInt(e.target.dataset.count)); countObs.unobserve(e.target); } }); 
    });
    document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

    // Умные модалки (видео уничтожается при закрытии)
    window.openCase = function(id) {
        const modal = document.getElementById('case-' + id);
        if(modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const container = modal.querySelector('.m-video-container');
            const videoUrl = container.getAttribute('data-url');
            
            if (videoUrl && !container.querySelector('iframe')) {
                container.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
            }
        }
    }

    window.closeCase = function(id) {
        const modal = document.getElementById('case-' + id);
        if(modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const container = modal.querySelector('.m-video-container');
            if (container) {
                container.innerHTML = '';
            }
        }
    }

    // Имитация отправки формы
    const form = document.getElementById('contactForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            btn.textContent = 'ОТПРАВКА...';
            setTimeout(() => {
                const toast = document.getElementById('toast');
                toast.textContent = 'Заявка успешно отправлена!';
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
                form.reset();
                btn.textContent = 'ОТПРАВИТЬ ЗАЯВКУ';
            }, 1000);
        });
    }
});
