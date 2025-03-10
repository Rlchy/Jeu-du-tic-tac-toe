// script.js

// Sélection des éléments HTML nécessaires
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X"; // Commence avec le joueur X
let gameBoard = Array(9).fill(null); // Tableau représentant l'état des cases
let gameActive = true; // Indique si le jeu est toujours actif

// Fonction pour créer dynamiquement les cases
function createBoard() {
    board.innerHTML = ""; // Vide le plateau avant de recréer les cases
    gameBoard.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index; // Identifie la case par son index
        board.appendChild(cell);
    });
}

// Gère les clics sur une case
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.dataset.index, 10);

    // Ignore le clic si la case est occupée ou si le jeu est terminé
    if (cell.textContent || !gameActive) return;

    // Met à jour le tableau et le contenu de la case
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Vérifie si le joueur actuel a gagné
    if (checkWinner()) {
        statusText.textContent = `Le joueur ${currentPlayer} a gagné ! 🎉`;
        gameActive = false;
        return;
    }

    // Vérifie s'il y a un match nul
    if (gameBoard.every(cell => cell)) {
        statusText.textContent = "Match nul !";
        gameActive = false;
        return;
    }

    // Change de joueur
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `C’est au tour du joueur ${currentPlayer}`;
}

// Vérifie les combinaisons gagnantes
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            // Ajoute une classe aux cases gagnantes
            document.querySelectorAll(".cell").forEach((cell, index) => {
                if ([a, b, c].includes(index)) {
                    cell.classList.add("winning");
                }
            });
            return true;
        }
    }
    return false;
}

// Réinitialise le jeu
function resetGame() {
    gameBoard = Array(9).fill(null); // Vide le tableau
    currentPlayer = "X"; // Réinitialise le joueur
    gameActive = true; // Réactive le jeu
    statusText.textContent = `C’est au tour du joueur X`; // Message initial
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning");
    });
}

// Ajoute les gestionnaires d'événements
board.addEventListener("click", handleCellClick); // Gère les clics sur le plateau
restartButton.addEventListener("click", resetGame); // Gère le clic sur le bouton "Recommencer"

// Initialise le jeu
createBoard();
