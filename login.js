document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.querySelector('.custom-button');
    const usernameInput = document.querySelector('#username');
    const passwordInput = document.querySelector('#password');
    const errorMessage = document.querySelector('.error-message');

    // Add event listener for the click event on the sign-in button
    signInBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Retrieve the registered user from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        // Check if the entered credentials match the stored user
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            // Redirect to the dashboard page
            window.location.href = 'dashboard.html';
        } else {
            // Show an error message if the credentials don't match
            errorMessage.textContent = 'Invalid username or password';
        }
    });

    // Add event listener for the keypress event on the password input field
    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            signInBtn.click();
        }
    });
});
