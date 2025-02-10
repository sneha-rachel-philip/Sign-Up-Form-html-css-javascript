document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const terms = document.getElementById('terms').checked;

    // Username validation
    const usernamePattern = /^[a-zA-Z0-9]{4,}$/;
    if (!usernamePattern.test(username)) {
        showError('usernameError');
        isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showError('emailError');
        isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        showError('passwordError');
        isValid = false;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
        showError('confirmPasswordError');
        isValid = false;
    }

    // Date of Birth validation (must be at least 18)
    if (!dob || new Date(dob) > new Date(new Date().setFullYear(new Date().getFullYear() - 18))) {
        showError('dobError');
        isValid = false;
    }

    // Gender validation
    if (!gender) {
        showError('genderError');
        isValid = false;
    }

    // Terms validation
    if (!terms) {
        showError('termsError');
        isValid = false;
    }

    // If valid, store in local storage & show success message
    if (isValid) {
        const userData = { username, email, dob, gender: gender.value };
        localStorage.setItem('userDetails', JSON.stringify(userData));
        document.getElementById('successMessage').style.display = 'block';
        setTimeout(() => { document.getElementById('signupForm').reset(); }, 2000);
    }
});

// Function to show error message
function showError(errorId) {
    document.getElementById(errorId).style.display = 'block';
}

// Real-time validation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('invalid');
        this.classList.add('valid');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.classList.remove('valid');
            this.classList.add('invalid');
        }
    });
});
