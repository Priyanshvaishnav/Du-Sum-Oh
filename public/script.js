const generateButton = document.getElementById('generatePuzzle');
const solveButton = document.getElementById('solvePuzzle');
const sudokuBoard = document.getElementById('sudokuBoard');
let puzzle = [];

generateButton.addEventListener('click', async () => {
    const response = await fetch('/generate-puzzle');
    puzzle = await response.json();
    renderBoard(puzzle);
});

solveButton.addEventListener('click', async () => {
    const response = await fetch('/solve-puzzle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ puzzle })
    });
    const solvedPuzzle = await response.json();
    renderBoard(solvedPuzzle);
});

function renderBoard(board) {
    sudokuBoard.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.value = cell === 0 ? '' : cell;
            input.disabled = cell !== 0; // Disable pre-filled cells
            input.dataset.row = rowIndex;
            input.dataset.col = colIndex;

            input.addEventListener('input', (e) => {
                board[rowIndex][colIndex] = parseInt(e.target.value) || 0;
            });

            sudokuBoard.appendChild(input);
        });
    });
}
