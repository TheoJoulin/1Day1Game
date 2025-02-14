document.addEventListener("DOMContentLoaded", () => {
    const gameButtons = document.querySelectorAll('.game-button');

    gameButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const gameName = event.target.getAttribute('data-game');
            alert(`Vous allez commencer le ${gameName}. Bonne chance !`);
        });
    });
});
