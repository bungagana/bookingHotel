// home.js

document.addEventListener('DOMContentLoaded', function() {
    // Read username from local storage
    const userData = JSON.parse(localStorage.getItem('registrationData'));

    if (userData && userData.name) {
        // Showing username from local storage in the home navbar
        const userNameElement = document.getElementById('userName');
        userNameElement.textContent = userData.username;
    }
});