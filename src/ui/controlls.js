'use strict'

import { selectedCell } from "./board.js";

const controls = document.getElementById('controls');
const controlsHTML = new Array(9).fill('');


// Numeric buttons
export const createNumberButtons = (solution) => {
  controlsHTML.forEach((_, i) => {
    let button = document.createElement('button');
    button.textContent = i + 1;
    button.classList.add('number-button');
    button.id = `button-${i}`;
    button.value = i + 1;
    // numberButtonsListeners(button);
    button.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });
    button.addEventListener('click', (e) => {addNumberToCell(e, solution)});
    controls.appendChild(button);
    controlsHTML[i] = button;
  });
}

const addNumberToCell = (e, solution) => {
  if (!selectedCell) return; // If there's no selected cell, do nothing.
    if (selectedCell.textContent == e.target.value){
      selectedCell.textContent = '';
    } else {
      selectedCell.textContent = e.target.value;
      if (check(selectedCell, solution)) {
        selectedCell.style.color = 'green';
        selectedCell.removeAttribute('tabIndex')
      } else {
        selectedCell.style.color = 'red';
      }
    }
}

const check = (selectedCell, solution) => {
  let [row, col] = selectedCell.id.split('-');
  if (selectedCell.textContent == solution[row][col]) {
    return true;
  } else {
    return false;
  }
}

// Difficulty buttons
/**
 * Listener that has to change the difficulty
 *
 * @param {function} changeDificulty - This function has to clean de board and bring a new puzzle and solution
 *
 */
export const createModeButtons = (changeDificulty) => {
  for (let i = 0; i < 3; i++) {
    let modeButton = document.createElement('button');
    let difficulty = i == 0 ? 'Easy' : i == 1 ? 'Medium' : 'Hard';
    modeButton.innerText = difficulty;
    modeButton.dataset.difficulty = difficulty.toLowerCase();
    modeButton.classList.add('mode-button');
    modeButton.id = `mode-button-${difficulty}`;
    modeButton.addEventListener('click', changeDificulty)
    mode.appendChild(modeButton);
  }
}

// Resset button // no funciona
export const createResetButton = (cleanBoard, printBoard, board) => {
  let resetButton = document.createElement('button');
  resetButton.innerText = 'Reset';
  resetButton.id = 'reset-button';
  reset.appendChild(resetButton);
  resetButton.addEventListener('click', () => {
    cleanBoard()
    printBoard(board);
  });
}
export const deleteResetButton = () => {
  let resetButton = document.getElementById('reset-button');
  resetButton.remove();
}