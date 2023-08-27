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
