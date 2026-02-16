// Signup Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function () {
    console.log('Signup page JS loaded');

    // Form submission feedback
    const signupForm = document.querySelector('form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = '⏳ Creating Account...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        });
    }

    // Focus effects on inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
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

    // Password strength indicator on change
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            const password = this.value;
            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^a-zA-Z0-9]/.test(password)) strength++;

            let strengthColor = '#ef476f';
            let strengthText = '';
            if (strength === 0) strengthColor = '#999';
            else if (strength === 1) { strengthColor = '#ef476f'; strengthText = 'Weak'; }
            else if (strength === 2) { strengthColor = '#ffd166'; strengthText = 'Fair'; }
            else if (strength === 3) { strengthColor = '#06d6a0'; strengthText = 'Good'; }
            else { strengthColor = '#118ab2'; strengthText = 'Strong'; }

            // Add visual indicator
            this.style.borderBottomColor = strengthColor;
        });
    }

    // Terms checkbox visual feedback
    const termsCheckbox = document.querySelector('input[type="checkbox"]');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function () {
            const checkboxLabel = this.nextElementSibling;
            if (this.checked) {
                checkboxLabel.style.color = '#06d6a0';
            } else {
                checkboxLabel.style.color = '';
            }
        });
    }
});
