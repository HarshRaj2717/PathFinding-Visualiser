// Reference: https://en.wikipedia.org/wiki/A*_search_algorithm
import PriorityQueue from "js-priority-queue";
import { allNodeStates } from "../Graph";
import * as helpers from "./helpers";

export default async function a_star() {
  // Priority queue which will dequeue the numerically smallest f_score first
  const pq = new PriorityQueue({
    comparator: (a, b) => a.f_Score - b.f_Score,
  });

  const width = allNodeStates[0].length;
  const startingNode = [9, 10];
  const endingNode = [9, 40];
  const startingNodeNumber = helpers.toNodeNumber(
    startingNode[0],
    startingNode[1],
    width
  );
  const endingNodeNumber = helpers.toNodeNumber(
    endingNode[0],
    endingNode[1],
    width
  );

  function h_score(curNode) {
    // h_score is the heuristics
    // It estimates the cost to reach goal from curNode
    return (
      Math.abs(curNode[0] - endingNode[0]) +
      Math.abs(curNode[1] - endingNode[1])
    );
  }

  // This is the distance from the starting node to cur_node
  let g_score = new Array(allNodeStates.length * width);
  for (let i = 0; i < allNodeStates.length * width; i++) {
    // `Infinity` denotes that the distance to reach any node is initially 0, later on it will be replaced by the minimum distance from starting node
    g_score[i] = Infinity;
  }
  // Setting f_score of starting node as 0
  g_score[startingNodeNumber] = 0;

  // stroing parent node for every node that has ever been reached by some path
  let parent = new Array(allNodeStates.length * width);
  for (let i = 0; i < allNodeStates.length * width; i++) {
    parent[i] = null;
  }
  parent[startingNodeNumber] = startingNode;

  // Adding starting node to pq with its f_score
  pq.queue({
    f_Score: 0 + h_score(startingNode),
    indexes: startingNode,
  });

  let pathFound = false;

  while (pq.length != 0) {
    const curNode = pq.dequeue();
    const [i, j] = curNode.indexes;
    const curNodeNumber = helpers.toNodeNumber(i, j, width);

    // set curNode state as current node
    if (allNodeStates[i][j][0] != 2 || allNodeStates[i][j][0] != 3)
      allNodeStates[i][j][1](6);
    if (i === endingNode[0] && j === endingNode[1]) {
      pathFound = true;
      break;
    }

    // up
    if (i > 0 && allNodeStates[i - 1][j][0] != 4) {
      const nextNodeWeight = allNodeStates[i - 1][j][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i - 1, j, width);
      if (g_score[curNodeNumber] + nextNodeWeight < g_score[nextNodeNumber]) {
        g_score[nextNodeNumber] = g_score[curNodeNumber] + nextNodeWeight;
        parent[nextNodeNumber] = [i, j];
        pq.queue({
          f_Score: g_score[nextNodeNumber] + h_score([i - 1, j]),
          indexes: [i - 1, j],
        });
      }
    }

    // down
    if (i < allNodeStates.length - 1 && allNodeStates[i + 1][j][0] != 4) {
      const nextNodeWeight = allNodeStates[i + 1][j][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i + 1, j, width);
      if (g_score[curNodeNumber] + nextNodeWeight < g_score[nextNodeNumber]) {
        g_score[nextNodeNumber] = g_score[curNodeNumber] + nextNodeWeight;
        parent[nextNodeNumber] = [i, j];
        pq.queue({
          f_Score: g_score[nextNodeNumber] + h_score([i + 1, j]),
          indexes: [i + 1, j],
        });
      }
    }

    // left
    if (j > 0 && allNodeStates[i][j - 1][0] != 4) {
      const nextNodeWeight = allNodeStates[i][j - 1][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i, j - 1, width);
      if (g_score[curNodeNumber] + nextNodeWeight < g_score[nextNodeNumber]) {
        g_score[nextNodeNumber] = g_score[curNodeNumber] + nextNodeWeight;
        parent[nextNodeNumber] = [i, j];
        pq.queue({
          f_Score: g_score[nextNodeNumber] + h_score([i, j - 1]),
          indexes: [i, j - 1],
        });
      }
    }

    // right
    if (j < allNodeStates[0].length - 1 && allNodeStates[i][j + 1][0] != 4) {
      const nextNodeWeight = allNodeStates[i][j + 1][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i, j + 1, width);
      if (g_score[curNodeNumber] + nextNodeWeight < g_score[nextNodeNumber]) {
        g_score[nextNodeNumber] = g_score[curNodeNumber] + nextNodeWeight;
        parent[nextNodeNumber] = [i, j];
        pq.queue({
          f_Score: g_score[nextNodeNumber] + h_score([i, j + 1]),
          indexes: [i, j + 1],
        });
      }
    }

    // set curNode state as visited node & also making an animation by delaying the changing of node states
    if (allNodeStates[i][j][0] != 2 || allNodeStates[i][j][0] != 3) {
      await new Promise((resolve) => {
        setTimeout(() => {
          allNodeStates[i][j][1](5);
          resolve();
        }, 1);
      });
    }
  }

  if (!pathFound) return;

  // Drawing the shortest path nodes (exclusive of starting & ending nodes)
  let shortestPathNodes = [];
  let curNode = endingNode;
  curNode = parent[helpers.toNodeNumber(curNode[0], curNode[1], width)];
  while (curNode != startingNode) {
    shortestPathNodes.push(curNode);
    curNode = parent[helpers.toNodeNumber(curNode[0], curNode[1], width)];
  }
  shortestPathNodes.reverse();
  for (let i = 0; i < shortestPathNodes.length; i++) {
    curNode = shortestPathNodes[i];
    await new Promise((resolve) => {
      setTimeout(() => {
        allNodeStates[curNode[0]][curNode[1]][1](7);
        resolve();
      }, 1);
    });
  }
}
