import { fetchPuzzle } from "./services/dataService.js";

async function getPuzzle(difficulty){
  const allPuzzle = await fetchPuzzle();
  const selectedPuzzles = new Array();
  for (const puzzle of allPuzzle) {
    if (puzzle.difficulty == difficulty) {
      selectedPuzzles.push(puzzle);
    }
  }
  return selectedPuzzles;
}


console.log(getPuzzle('easy'));