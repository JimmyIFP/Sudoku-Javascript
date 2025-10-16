'use strict'

// Selectors
const board = document.getElementById('board');

// Globals
export const boardHTML = Array.from({ length: 9 }, () => new Array(9).fill(''));
export let selectedCell = null;

// Create cells
export const createBoard = () => {
  boardHTML.forEach((row, i) => {
    row.forEach((_, j) => {
      let cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.id = `${i}-${j}`;
      if (i == 3 || i == 6) cellDiv.style.borderTop = '2px solid black';
      if (j == 3 || j == 6) cellDiv.style.borderLeft = '2px solid black';
      cellDiv.addEventListener('focus', addFocusListener);
      cellDiv.addEventListener('blur', addBlurListener);
      board.appendChild(cellDiv);
      boardHTML[i][j] = cellDiv;
    });
  });
}

// // Listeners logic
const addFocusListener = (e) => {
  selectedCell = e.target;
  let [row, col] = selectedCell.id.split('-');
  console.log(row, col);
  selectedCellRowCol(row, col, '#85AAB644');
  selectedCell.style.backgroundColor = '#2274A599';
}

const addBlurListener = (e) => {
  let [row, col] = selectedCell.id.split('-');
  selectedCellRowCol(row, col);
  selectedCell.style.backgroundColor = '';
  selectedCell = null;
}


// // highlight rows and cols of the selected Cell (internal function)
const selectedCellRowCol = (x, y, color='') => {
  // The parameters x and y are the row and column of the selected cell.
  for (let i = 0; i < 9; i++) {
    // Highlight row
    boardHTML[x][i].style.backgroundColor = color;
    // Highlight column
    boardHTML[i][y].style.backgroundColor = color;
  }
}

/**
 * Prints the puzzle in the array
 *
 * @param {string[]} boardPuzzle - An array of 9 positions and every row has 9 caracters
 *
*/
export const printBoard = (boardPuzzle) => {
  boardHTML.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (boardPuzzle[i][j] === '-') {
        cell.textContent = '';
        cell.setAttribute('tabIndex', 0);
      } else {
        cell.textContent = boardPuzzle[i][j];
        cell.removeAttribute('tabIndex');
      }
    })
  });
}

export const cleanBoard = () => {
  boardHTML.forEach((row, i) => {
    row.forEach((_, j) => {
      boardHTML[i][j].innerText = '';
      boardHTML[i][j].style.color = '';
      boardHTML[i][j].textContent = '';
      boardHTML[i][j].setAttribute('tabIndex', 0);
    });
  });
}

// Testers

// window.onload = () => {
//   createBoard();
//   printBoard(test);
// }