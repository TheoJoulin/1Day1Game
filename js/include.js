document.addEventListener("DOMContentLoaded", function () {
    const headerHTML = `
        <header>
            <div class="top-bar">
                <div class="logo">1Day1Game</div>
                <div class="user-info">
                    <span id="user-email">Non connecté</span>
                </div>
                <div class="auth-buttons">
                    <a href="login.html" class="btn gray">Connexion</a>
                    <a href="register.html" class="btn orange">Inscription</a>
                </div>
            </div>
        </header>
    `;

    const footerHTML = `
        <footer>
            <p>&copy; 2025 1Day1Game. Tous droits réservés.</p>
        </footer>
    `;

    document.getElementById("header-container").innerHTML = headerHTML;
    document.getElementById("footer-container").innerHTML = footerHTML;
});
