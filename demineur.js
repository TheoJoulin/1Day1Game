const boardSize = 10;
const mineCount = 20;
let board = [];
let gameOver = false;
let timerInterval;
let elapsedTime = 0;
let remainingMines = mineCount;

function startGame() {
    board = [];
    gameOver = false;
    remainingMines = mineCount;
    elapsedTime = 0;
    document.getElementById("gameMessage").textContent = "Bonne chance !";
    document.getElementById("mineCount").textContent = `Mines restantes: ${remainingMines}`;
    document.getElementById("timer").textContent = `Temps: 0s`;

    const boardElement = document.getElementById("gameBoard");
    boardElement.innerHTML = ''; // Réinitialiser le tableau

    // Créer la grille de jeu
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push({ isMine: false, opened: false, flagged: false, surroundingMines: 0 });
        }
        board.push(row);
    }

    // Placer les mines aléatoirement
    for (let i = 0; i < mineCount; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * boardSize);
            y = Math.floor(Math.random() * boardSize);
        } while (board[x][y].isMine);
        board[x][y].isMine = true;
    }

    // Calculer les mines adjacentes
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            if (!board[x][y].isMine) {
                let surroundingMines = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (x + dx >= 0 && x + dx < boardSize && y + dy >= 0 && y + dy < boardSize) {
                            if (board[x + dx][y + dy].isMine) {
                                surroundingMines++;
                            }
                        }
                    }
                }
                board[x][y].surroundingMines = surroundingMines;
            }
        }
    }

    // Créer les cellules de la grille
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.addEventListener("click", () => openCell(x, y));
            cell.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                toggleFlag(x, y);
            });
            boardElement.appendChild(cell);
        }
    }

    // Lancer le chronomètre
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Fonction pour mettre à jour le chronomètre
function updateTimer() {
    if (!gameOver) {
        elapsedTime++;
        document.getElementById("timer").textContent = `Temps: ${elapsedTime}s`;
    }
}

// Ouvrir une cellule
function openCell(x, y) {
    if (gameOver || board[x][y].opened || board[x][y].flagged) return;

    const cell = document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
    board[x][y].opened = true;

    if (board[x][y].isMine) {
        cell.classList.add("mine");
        document.getElementById("gameMessage").textContent = "Game Over ! Vous avez touché une mine.";
        gameOver = true;
        clearInterval(timerInterval); // Arrêter le chronomètre
        return;
    }

    cell.classList.add("opened");
    if (board[x][y].surroundingMines > 0) {
        cell.textContent = board[x][y].surroundingMines;
    } else {
        // Ouvrir les cases adjacentes si aucune mine autour
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && !board[nx][ny].opened) {
                    openCell(nx, ny);
                }
            }
        }
    }

    checkWin();
}

// Marquer ou retirer un flag
function toggleFlag(x, y) {
    if (gameOver || board[x][y].opened) return;

    const cell = document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
    if (board[x][y].flagged) {
        board[x][y].flagged = false;
        remainingMines++;
        cell.classList.remove("flag");
    } else {
        board[x][y].flagged = true;
        remainingMines--;
        cell.classList.add("flag");
    }
    document.getElementById("mineCount").textContent = `Mines restantes: ${remainingMines}`;
}

// Vérifier si le joueur a gagné
function checkWin() {
    let won = true;
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            if ((!board[x][y].isMine && !board[x][y].opened) || (board[x][y].isMine && !board[x][y].flagged)) {
                won = false;
            }
        }
    }
    if (won) {
        document.getElementById("gameMessage").textContent = "Félicitations ! Vous avez gagné.";
        gameOver = true;
        clearInterval(timerInterval); // Arrêter le chronomètre
    }
}

// Lancer le jeu initial
startGame();
