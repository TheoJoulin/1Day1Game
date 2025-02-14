document.addEventListener("DOMContentLoaded", () => {
    const gameButtons = document.querySelectorAll('.game-button');

    // Ajouter un effet d'animation au clic
    gameButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const gameName = event.target.getAttribute('data-game');

            // Ajout de l'animation d'agrandissement au bouton actif
            button.classList.add('clicked');

            // Afficher une alerte ou toute autre action
            alert(`Vous allez commencer le ${gameName}. Bonne chance !`);

            // Simuler une transition fluide vers une autre page après l'alerte
            setTimeout(() => {
                window.location.href = event.target.href;
            }, 1000); // Attente de 1 seconde avant de rediriger
        });
    });

    // Gestion du bouton actif pour ajouter de l'interactivité
    gameButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.transition = 'transform 0.3s ease';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});
