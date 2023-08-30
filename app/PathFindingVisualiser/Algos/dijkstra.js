import PriorityQueue from "js-priority-queue";
import { allNodeStates } from "../Graph";
import * as helpers from "./helpers";

export default function dijkstra() {
  // Priority queue which will dequeue the numerically smallest distance first
  const pq = new PriorityQueue({
    comparator: (a, b) => a.distance - b.distance,
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

  var distances = new Array(allNodeStates.length * width);
  console.log(distances);
  for (var i = 0; i < allNodeStates.length * width; i++) {
    // `Infinity` denotes that the distance to reach any node is initially 0, later on it will be replaced by the minimum distance from starting node
    // `[-1, -1]` denotes a node with no parents, later on the nodes will store thier parent node's indexes here
    // `false` denotes an un-traversed node, later on traversed nodes will have a `true` here
    distances[i] = [Infinity, [-1, -1], false];
  }

  // Setting distance of starting node as 0 and adding to pq
  distances[startingNodeNumber] = [0, startingNode, true];
  pq.queue({ distance: 0, indexes: startingNode });

  while (pq.length != 0) {
    const curNode = pq.dequeue();
    const dist = curNode.distance;
    const [i, j] = curNode.indexes;
    const curNodeNumber = helpers.toNodeNumber(i, j, width);

    // set curNode state as current node
    distances[curNodeNumber][2] = true;
    if (allNodeStates[i][j][0] != 2 || allNodeStates[i][j][0] != 3)
      allNodeStates[i][j][1](6);
    if (distances[endingNodeNumber][2] === true) break;

    // up
    if (i > 0 && allNodeStates[i - 1][j][0] != 4) {
      const nextNodeWeight = allNodeStates[i - 1][j][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i - 1, j, width);
      if (dist + nextNodeWeight < distances[nextNodeNumber][0]) {
        distances[nextNodeNumber][0] = dist + nextNodeWeight;
        distances[nextNodeNumber][1] = [i - 1, j];
        pq.queue({
          distance: distances[nextNodeNumber][0],
          indexes: distances[nextNodeNumber][1],
        });
      }
    }

    // down
    if (i < allNodeStates.length - 1 && allNodeStates[i + 1][j][0] != 4) {
      const nextNodeWeight = allNodeStates[i + 1][j][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i + 1, j, width);
      if (dist + nextNodeWeight < distances[nextNodeNumber][0]) {
        distances[nextNodeNumber][0] = dist + nextNodeWeight;
        distances[nextNodeNumber][1] = [i + 1, j];
        pq.queue({
          distance: distances[nextNodeNumber][0],
          indexes: distances[nextNodeNumber][1],
        });
      }
    }

    // left
    if (j > 0 && allNodeStates[i][j - 1][0] != 4) {
      const nextNodeWeight = allNodeStates[i][j - 1][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i, j - 1, width);
      if (dist + nextNodeWeight < distances[nextNodeNumber][0]) {
        distances[nextNodeNumber][0] = dist + nextNodeWeight;
        distances[nextNodeNumber][1] = [i, j - 1];
        pq.queue({
          distance: distances[nextNodeNumber][0],
          indexes: distances[nextNodeNumber][1],
        });
      }
    }

    // right
    if (j < allNodeStates[0].length - 1 && allNodeStates[i][j + 1][0] != 4) {
      const nextNodeWeight = allNodeStates[i][j + 1][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i, j + 1, width);
      if (dist + nextNodeWeight < distances[nextNodeNumber][0]) {
        distances[nextNodeNumber][0] = dist + nextNodeWeight;
        distances[nextNodeNumber][1] = [i, j + 1];
        pq.queue({
          distance: distances[nextNodeNumber][0],
          indexes: distances[nextNodeNumber][1],
        });
      }
    }

    // set curNode state as visited node
    if (allNodeStates[i][j][0] != 2 || allNodeStates[i][j][0] != 3)
      allNodeStates[i][j][1](5);
  }

  // Exiting if the endingNode hasn't been reached i.e. there is no posssible path to it
  if (distances[endingNodeNumber][2] === false) return;

  // Drawing the shortest path nodes (exclusive of starting & ending nodes)
  var shortestPathNodes = [];
  var curNode = endingNode;
  curNode = distances[helpers.toNodeNumber(curNode[0], curNode[1], width)][1];
  while (curNode != startingNode) {
    shortestPathNodes.push(curNode);
    curNode = distances[helpers.toNodeNumber(curNode[0], curNode[1], width)][1];
  }
  shortestPathNodes.reverse();
  shortestPathNodes.forEach((curNode) => {
    allNodeStates[curNode][1](7);
  });
}
