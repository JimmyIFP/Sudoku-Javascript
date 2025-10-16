import { createBoard, printBoard, cleanBoard, selectedCell, boardHTML } from "../../../src/ui/board.js";
import { createNumberButtons, createModeButtons, createResetButton, deleteResetButton } from "../../../src/ui/controlls.js";
import { getPuzzle } from "../../../src/controllers/puzzleController.js";

let board;
let solution;

const getGame = async (difficulty = 'easy') => {
  const getBoard = await getPuzzle(difficulty);
  board = getBoard.puzzle;
  solution = getBoard.solution;
  return [board, solution]
}
const changeDificulty = async (e) => {
  let difficulty = e.target.dataset.difficulty;
  [board, solution] = await getGame(difficulty);
  console.log(e.target.dataset.difficulty)
  console.log(board);
  console.log(solution);
  cleanBoard();
  printBoard(board);
  const controls = document.getElementById('controls');
  while (controls.hasChildNodes()) { controls.removeChild(controls.firstChild); }
  createNumberButtons(solution);
  deleteResetButton();
  createResetButton(cleanBoard, printBoard, board);
}

const init = async () => {
  [board, solution] = await getGame();
  createBoard();
  printBoard(board);
  createNumberButtons(solution);
  createModeButtons(changeDificulty);
  createResetButton(cleanBoard, printBoard, board);
}
window.onload = () => {
  init();
}