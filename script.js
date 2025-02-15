document.addEventListener("DOMContentLoaded", () => {
    // Animation du message de bienvenue
    const welcomeMessage = document.getElementById("welcomeMessage");
    const point = document.getElementById("point");
    const roulette = document.getElementById("roulette");
    const gameName = document.getElementById("gameName");
    const playButton = document.getElementById("playButton");

    // Liste des jeux
    const games = [
        "Snake",
        "Démineur",
        "Trouve le nombre",
        "Cookie Clicker",
        "Memory",
        "Simon",
        "Sudoku"
    ];

    // Délai pour afficher la roulette après l'animation du point
    setTimeout(() => {
        // Roulette de jeux aléatoires
        const randomGame = games[Math.floor(Math.random() * games.length)];
        gameName.textContent = randomGame;

        // Affichage du bouton pour jouer
        playButton.style.display = "inline-block";

        // Ajouter un événement pour rediriger vers le jeu
        playButton.addEventListener("click", () => {
            window.location.href = `${randomGame.toLowerCase().replace(/ /g, '-')}.html`;
        });
    }, 3000); // Attendre 3 secondes après la chute du point

    // Animer le point
    setTimeout(() => {
        point.style.opacity = 1;
    }, 500);

    // Animation pour la roulette (déclenchement après la chute du point)
    setTimeout(() => {
        roulette.style.opacity = 1;
    }, 3500);
});
