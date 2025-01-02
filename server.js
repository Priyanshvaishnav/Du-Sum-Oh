const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (frontend files)
app.use(express.static(path.join(__dirname, 'public')));

// Sudoku puzzle generator
app.get('/generate-puzzle', (req, res) => {
    const puzzle = generateSudoku();
    res.json(puzzle);
});

// Sudoku solver and checker
app.post('/solve-puzzle', express.json(), (req, res) => {
    const puzzle = req.body.puzzle;
    const solvedPuzzle = solveSudoku(puzzle);
    res.json(solvedPuzzle);
});

// Function to generate a Sudoku puzzle (with some cells blank)
function generateSudoku() {
    const board = Array(9).fill(null).map(() => Array(9).fill(0));
    fillSudoku(board);
    removeNumbersFromBoard(board);
    return board;
}

// Backtracking function to fill the board
function fillSudoku(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                let num = 0;
                while (num < 9) {
                    num = Math.floor(Math.random() * 9) + 1;
                    if (isSafe(board, i, j, num)) {
                        board[i][j] = num;
                        if (fillSudoku(board)) {
                            return true;
                        } else {
                            board[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Check if it's safe to place a number at position (row, col)
function isSafe(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Remove some numbers from the board to create a puzzle
function removeNumbersFromBoard(board) {
    let removedCount = 0;
    while (removedCount < 40) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            removedCount++;
        }
    }
}

// Sudoku solver using backtracking
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return board;
                        } else {
                            board[row][col] = 0;
                        }
                    }
                }
                return null;
            }
        }
    }
    return board;
}

app.listen(port, () => {
    console.log(`Sudoku server running at http://localhost:${port}`);
});
