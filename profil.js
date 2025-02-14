/* profil.js */
function saveProfile() {
    const username = document.getElementById("username").value;
    if (username.trim() !== "") {
        localStorage.setItem("username", username);
        displayWelcomeMessage();
    }
}
function displayWelcomeMessage() {
    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("profile-container").style.display = "none";
        document.getElementById("welcome-message").textContent = `Bienvenue, ${username} !`;
    }
}
function logout() {
    localStorage.removeItem("username");
    location.reload();
}
displayWelcomeMessage();
