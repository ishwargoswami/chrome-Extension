const board = document.getElementById('board');
const status = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return gameBoard.includes('') ? null : 'T';
}

function handleCellClick(cellIndex) {
    if (!gameActive || gameBoard[cellIndex] !== '') return;

    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
        gameActive = false;
        if (winner === 'T') {
            status.textContent = "It's a tie!";
        } else {
            status.textContent = `Player ${winner} wins!`;
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;

        // Computer's move (random)
        if (gameActive && currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {
    const emptyCells = gameBoard.reduce((acc, currentValue, index) => {
        if (currentValue === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerChoice = emptyCells[randomIndex];
        handleCellClick(computerChoice);
    }
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    status.textContent = "Player X's turn";

    // Computer starts if it's the first move
    if (currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

board.addEventListener('click', function (e) {
    if (e.target.classList.contains('cell')) {
        const cellIndex = Array.from(cells).indexOf(e.target);
        handleCellClick(cellIndex);
    }
});

resetButton.addEventListener('click', resetBoard);

// Start the game
resetBoard();
