document.addEventListener("DOMContentLoaded", function() {

    // Логика кастомного курсора
    const cursor = document.querySelector('.custom-cursor');
    if (window.innerWidth > 900 && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Эффект увеличения при наведении на кликабельные элементы
        const interactives = document.querySelectorAll('a, button, .case, .journal-card, .close-case, input, textarea');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Анимация появления блоков при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section, .case').forEach(el => observer.observe(el));

    // Умные модалки (Динамическая загрузка видео - без лагов!)
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
            
            // Физически удаляем iframe, чтобы остудить видеокарту Мака
            const container = modal.querySelector('.m-video-container');
            if (container) {
                container.innerHTML = '';
            }
        }
    }
});
