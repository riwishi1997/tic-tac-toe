const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
const xScoreDisplay = document.getElementById('x-score');
const oScoreDisplay = document.getElementById('o-score');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let xScore = 0;
let oScore = 0;
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (board[index] || isGameOver) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        gameStatus.textContent = `Player ${currentPlayer} Wins!`;
        updateScore(currentPlayer);
        isGameOver = true;
    } else if (board.every(cell => cell)) {
        gameStatus.textContent = 'It\'s a Tie!';
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function updateScore(winner) {
    if (winner === 'X') {
        xScore++;
        xScoreDisplay.textContent = xScore;
    } else if (winner === 'O') {
        oScore++;
        oScoreDisplay.textContent = oScore;
    }
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    isGameOver = false;
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
}