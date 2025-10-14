// Finds the first empty cell (represented by a 0) on the board.
const findEmpty = (board) => {
  // Iterates through each row.
  for (let i = 0; i < board.length; i++) {
    // Iterates through each column in the current row.
    for (let j = 0; j < board[0].length; j++) {
      // If the cell is empty (contains a 0).
      if (board[i][j] === 0) {
        // Returns its coordinates [row, column].
        return [i, j];
      }
    }
  }
  // If no empty cells are found, returns nothing.
}

// Checks if placing a number in a specific position is valid according to Sudoku rules.
const isValid = (board, num, pos) => {
  // Gets the row (y) and column (x) from the position array.
  const [y, x] = pos;

  // Checks the row and column.
  for (let i = 0; i < board.length; i++) {
    // Checks if the number already exists in the current row.
    if (board[y][i] === num) return false;
    // Checks if the number already exists in the current column.
    if (board[i][x] === num) return false;
  }

  // Determines which 3x3 quadrant the cell is in.
  // Math.floor(y / 3) gives 0 for rows 0-2, 1 for 3-5, and 2 for 6-8.
  const boxY = Math.floor(y / 3);
  const boxX = Math.floor(x / 3);

  // Iterates through the 3x3 quadrant.
  // Starts from the top-left corner of the quadrant (boxY * 3, boxX * 3).
  for (let i = boxY * 3; i < boxY * 3 + 3; i++) {
    for (let j = boxX * 3; j < boxX * 3 + 3; j++) {
      // Checks if the number already exists in the quadrant.
      if (board[i][j] === num) return false;
    }
  }

  // If the number passes all checks, it's a valid move.
  return true;
}

// Solves the Sudoku board using a backtracking algorithm.
const solve = (board) => {
  // Finds the next empty cell.
  const empty = findEmpty(board);
  // If there are no empty cells, the board is solved. This is the base case for the recursion.
  if (!empty) return true;
  // Gets the coordinates of the empty cell.
  const [y, x] = empty;

  // Creates an array with numbers from 1 to 9 and shuffles them.
  // Shuffling them makes each generated Sudoku different.
  const numbers = Array.from({ length: 9 }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);

  // Tries each number in the empty cell.
  for (const num of numbers) {
    // Checks if the number is a valid move in this position.
    if (isValid(board, num, [y, x])) {
      // If it's valid, place the number on the board (forward move).
      board[y][x] = num;
      // Calls solve() again to solve the rest of the board.
      // If the recursive call returns true, it means a solution was found.
      if (solve(board)) return true;
      // If no solution was found, undo the move (backtracking).
      // Sets the cell back to 0 to try the next number.
      board[y][x] = 0;
    }
  }

  // If all numbers have been tried and none work, return false to trigger backtracking in the previous call.
  return false;
}

// Creates a complete and solved Sudoku board.
export const createSudoku = () => {
  // Creates an empty 9x9 board filled with zeros.
  const board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

  // Solves the board and returns it.
  if (solve(board)) return board;
}

// Creates a playable board by removing some cells from a solved board.
export const createPlayable = (board, difficulty) => {
  // Gets a list of all [row, column] positions on the board.
  let positions = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      positions.push([i, j]);
    }
  }

  // Shuffles the positions to remove cells randomly.
  positions.sort(() => Math.random() - 0.5);

  // Removes a number of cells based on the difficulty level.
  for (let i = 0; i < difficulty; i++) {
    let [row, col] = positions[i];
    // Replaces the number with an empty string so the cell appears blank.
    board[row][col] = '';
  }
  return board;
}