// Home Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function () {
    console.log('Home page JS loaded');

    // Animate statistics numbers on scroll
    const statNumbers = document.querySelectorAll('h3[style*="color"]');
    const statisticsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                statisticsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statNumbers.forEach(stat => statisticsObserver.observe(stat));

    // Add hover effects to CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-section .btn, .glass.rounded-4 .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 12px 32px rgba(255, 209, 102, 0.15)';
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Parallax effect on hero section (subtle)
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && window.scrollY < 600) {
            heroSection.style.transform = `translateY(${window.scrollY * 0.5}px)`;
        }
    });
});

// Interactive card tilt effect
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * -8;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Custom cursor effect
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);
    cursor.style.position = 'fixed';
    cursor.style.width = '32px';
    cursor.style.height = '32px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'rgba(255,209,102,0.15)';
    cursor.style.border = '2px solid #ffd166';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'background 0.2s, border 0.2s, transform 0.1s';
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = (e.clientX - 16) + 'px';
        cursor.style.top = (e.clientY - 16) + 'px';
    });
    document.querySelectorAll('a, .btn, .interactive-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.background = 'rgba(255,209,102,0.35)';
            cursor.style.border = '2px solid #ffd166';
            cursor.style.transform = 'scale(1.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.background = 'rgba(255,209,102,0.15)';
            cursor.style.border = '2px solid #ffd166';
            cursor.style.transform = 'scale(1)';
        });
    });
});
