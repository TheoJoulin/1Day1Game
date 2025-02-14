/* profil.js */
function registerUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const nickname = document.getElementById("nickname").value;
    if (email && password && nickname) {
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("user", JSON.stringify({ email, password, nickname, verified: false, code: verificationCode }));
        alert("Un code de validation a été envoyé à votre e-mail. Veuillez le saisir pour activer votre compte.");
        sendVerificationEmail(email, verificationCode);
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

function sendVerificationEmail(email, code) {
    console.log(`Simulated email sent to ${email} with code: ${code}`);
    alert(`Code de vérification: ${code}`);
}

function verifyUser() {
    const enteredCode = prompt("Entrez le code de vérification envoyé par e-mail:");
    let storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.code == enteredCode) {
        storedUser.verified = true;
        localStorage.setItem("user", JSON.stringify(storedUser));
        alert("Votre compte est maintenant vérifié ! Vous pouvez vous connecter.");
    } else {
        alert("Code incorrect. Veuillez réessayer.");
    }
}

function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        if (!storedUser.verified) {
            alert("Veuillez vérifier votre compte avant de vous connecter.");
            verifyUser();
            return;
        }
        localStorage.setItem("loggedInUser", storedUser.nickname);
        displayWelcomeMessage();
    } else {
        alert("Identifiants incorrects.");
    }
}

function displayWelcomeMessage() {
    const nickname = localStorage.getItem("loggedInUser");
    if (nickname) {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("welcome-message").textContent = `Bienvenue, ${nickname} !`;
        document.querySelector(".game-links").style.display = "block";
        document.querySelector(".logout-button").style.display = "block";
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

displayWelcomeMessage();
