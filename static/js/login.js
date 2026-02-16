// Login Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function () {
    console.log('Login page JS loaded');

    // Form submission feedback
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = '🔄 Signing in...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        });
    }

    // Focus effects on inputs
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.boxShadow = '0 8px 32px rgba(255, 209, 102, 0.2)';
        });
        input.addEventListener('blur', function () {
            this.parentElement.style.boxShadow = '';
        });
    });

    // Email validation on blur
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            const email = this.value.trim();
            if (email && !email.includes('@')) {
                this.parentElement.style.borderColor = '#ef476f';
                this.style.backgroundColor = 'rgba(239, 71, 111, 0.05)';
            } else {
                this.parentElement.style.borderColor = '';
                this.style.backgroundColor = '';
            }
        });
    }

    // Remember me checkbox visual feedback
    const rememberCheckbox = document.querySelector('input[type="checkbox"]');
    if (rememberCheckbox) {
        rememberCheckbox.addEventListener('change', function () {
            const checkboxLabel = this.nextElementSibling;
            if (this.checked) {
                checkboxLabel.style.color = '#ffd166';
            } else {
                checkboxLabel.style.color = '';
            }
        });
    }
});
