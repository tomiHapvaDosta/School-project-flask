// Indicators Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function () {
    console.log('Indicators page JS loaded');

    // Animate progress bars when page loads or when they come into view
    const progressBars = document.querySelectorAll('.animated-bar');

    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => {
        bar.style.width = '0%';
        progressObserver.observe(bar);
    });

    // Add click to zoom effect on cards
    const indicatorCards = document.querySelectorAll('.card.glass');
    indicatorCards.forEach(card => {
        card.addEventListener('click', function () {
            if (this.classList.contains('zoomed')) {
                this.classList.remove('zoomed');
                this.style.position = '';
                this.style.zIndex = '';
            } else {
                // Remove zoom from others
                indicatorCards.forEach(c => {
                    c.classList.remove('zoomed');
                    c.style.position = '';
                    c.style.zIndex = '';
                });
                this.classList.add('zoomed');
                this.style.position = 'relative';
                this.style.zIndex = '100';
            }
        });
    });

    // Hover animation for stat cards
    const statCards = document.querySelectorAll('.card.glass.text-center');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.08) translateY(-15px)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
});
