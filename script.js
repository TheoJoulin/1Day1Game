document.addEventListener("DOMContentLoaded", () => {
    const gameButtons = document.querySelectorAll('.game-button');

    // Ajouter un effet d'animation au clic
    gameButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const gameName = event.target.getAttribute('data-game');

            // Ajout de l'animation d'agrandissement au bouton actif
            button.classList.add('clicked');

            // Simuler une transition fluide vers une autre page
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

    // Fonction pour changer les couleurs de fond
    let colorIndex = 0;
    const colors = [
        '#ff7e5f', '#feb47b', '#6a11cb', '#2575fc', '#8e2de2', '#4facfe', '#ff6a00'
    ];

    setInterval(() => {
        document.body.style.background = linear-gradient(135deg, ${colors[colorIndex]}, #fff);
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000); // Change toutes les 5 secondes
});
