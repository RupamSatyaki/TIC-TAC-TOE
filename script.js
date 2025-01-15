const themeToggleButton = document.getElementById('theme-toggle');
let isDarkTheme = false;

const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentTheme = 'light';


let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    if (clickedCell.textContent !== '' || !gameActive) {
        return;
    }
    clickedCell.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = cells[condition[0]].textContent;
        const b = cells[condition[1]].textContent;
        const c = cells[condition[2]].textContent;
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if ([...cells].every(cell => cell.textContent)) {
        statusDisplay.textContent = 'It\'s a tie!';
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark', isDarkTheme);
    themeToggleButton.textContent = isDarkTheme ? '☀️' : '🌙';

    cells.forEach(cell => cell.classList.toggle('dark'));
    statusDisplay.classList.toggle('dark');
    resetButton.classList.toggle('dark');
}

themeToggleButton.addEventListener('click', toggleTheme);

function resetGame() {

    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
