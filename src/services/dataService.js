export async function fetchPuzzle(){
  const res = await fetch('/src/data/puzzle.json', { cache: 'no-store' } );
  if (!res.ok) throw new Error('Failed to fetch puzzle' + res.status);
  return res.json();
}