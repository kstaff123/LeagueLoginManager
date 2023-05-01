//create account
document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.querySelector('#sign-up-btn');
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#password-confirm');

    signUpBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Register user locally
        const user = { username, password };
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to login page
        window.location.href = 'dashboard.html';
    });
});
