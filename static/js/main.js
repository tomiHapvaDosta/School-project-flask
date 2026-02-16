// VibrantSchool Global JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // Animate Elements on Scroll
    // ==========================================
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    cards.forEach(card => observer.observe(card));

    // ==========================================
    // Custom Cursor Effect
    // ==========================================
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(255, 209, 102, 0.2);
        border: 2px solid #ffd166;
        pointer-events: none;
        z-index: 9999;
        transition: background 0.2s, border 0.2s, transform 0.1s;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = (e.clientX - 12) + 'px';
        cursor.style.top = (e.clientY - 12) + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    // ==========================================
    // Interactive Button Effects
    // ==========================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            cursor.style.background = 'rgba(255, 209, 102, 0.4)';
            cursor.style.border = '2px solid #ffd166';
            cursor.style.transform = 'scale(1.3)';
        });
        btn.addEventListener('mouseleave', () => {
            cursor.style.background = 'rgba(255, 209, 102, 0.2)';
            cursor.style.border = '2px solid #ffd166';
            cursor.style.transform = 'scale(1)';
        });
    });

    // ==========================================
    // Download Card Cursor Effects
    // ==========================================
    const downloadCards = document.querySelectorAll('.download-card');
    downloadCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cursor.style.background = 'rgba(6, 214, 160, 0.4)';
            cursor.style.border = '2px solid #06d6a0';
            cursor.style.transform = 'scale(1.4)';
        });
        card.addEventListener('mouseleave', () => {
            cursor.style.background = 'rgba(255, 209, 102, 0.2)';
            cursor.style.border = '2px solid #ffd166';
            cursor.style.transform = 'scale(1)';
        });
    });

    // ==========================================
    // Card Tilt Effect on Hover (if supported)
    // ==========================================
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 5;
            const rotateY = ((x - centerX) / centerX) * -5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ==========================================
    // Navbar Active State on Scroll
    // ==========================================
    window.addEventListener('scroll', () => {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));

        // Simple detection - can be expanded
        if (window.scrollY < 100) {
            const homeLink = document.querySelector('a.nav-link[href="/"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });

    // ==========================================
    // Smooth Scroll for Anchors
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const element = document.querySelector(href);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // Form Focus Effects
    // ==========================================
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.addEventListener('focus', function () {
            this.style.boxShadow = '0 0 0 0.3rem rgba(255, 209, 102, 0.15)';
        });
        control.addEventListener('blur', function () {
            this.style.boxShadow = '';
        });
    });

    console.log('VibrantSchool initialized successfully!');
});
