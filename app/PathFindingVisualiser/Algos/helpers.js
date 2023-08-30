import { allNodeStates } from "../Graph";

export function toNodeNumber(i, j, width) {
  // Computes the numbering of a node based on its indexes (i,j) in `allNodeStates` matrix
  // This is implementing Row Major method (for finding address) to calculate the numbering
  return i * width + j;
}

export function toNodeIndexes(n, width) {
  // Computes the indexes (i,j) of a node in `allNodeStates` matrix based on its numbering
  // This is implementing reverse of Row Major method (for finding address) to calculate the indexes
  return [Math.floor(n / width), n % width];
}

export function clearAllPaths() {
  for (var i = 0; i < 18; i++) {
    for (var j = 0; j < 49; j++) {
      if (
        allNodeStates[i][j][0] === 2 ||
        allNodeStates[i][j][0] === 5 ||
        allNodeStates[i][j][0] === 7
      ) {
        allNodeStates[i][j][1](1);
      }
    }
  }
}
