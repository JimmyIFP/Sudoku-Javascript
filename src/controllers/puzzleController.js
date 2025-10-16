import { fetchPuzzle } from "../services/dataService.js";

export async function getPuzzle(difficulty){
  const allPuzzle = await fetchPuzzle();
  const selectedPuzzles = new Array();
  for (const puzzle of allPuzzle) {
    if (puzzle.difficulty == difficulty) {
      selectedPuzzles.push(puzzle);
    }
  }
  let randomIndex = Math.floor(Math.random() * selectedPuzzles.length);
  let selectedPuzzle = selectedPuzzles[randomIndex].board;
  let selectedSolution = selectedPuzzles[randomIndex].solution;
  return { puzzle: selectedPuzzle, solution:selectedSolution };
}
