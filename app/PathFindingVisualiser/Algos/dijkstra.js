import PriorityQueue from "js-priority-queue";
import { allNodeStates } from "../Graph";
import * as helpers from "./helpers";

export default async function dijkstra() {
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
  for (var i = 0; i < allNodeStates.length * width; i++) {
    // `Infinity` denotes that a path to that node hasn't been found yet or such a path doesn't exist at all, later on it will be replaced by the minimum distance from starting node
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
        distances[nextNodeNumber][1] = [i, j];
        pq.queue({
          distance: distances[nextNodeNumber][0],
          indexes: [i - 1, j],
        });
      }
    }

    // down
    if (i < allNodeStates.length - 1 && allNodeStates[i + 1][j][0] != 4) {
      const nextNodeWeight = allNodeStates[i + 1][j][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i + 1, j, width);
      if (dist + nextNodeWeight < distances[nextNodeNumber][0]) {
        distances[nextNodeNumber][0] = dist + nextNodeWeight;
        distances[nextNodeNumber][1] = [i, j];
        pq.queue({
          distance: distances[nextNodeNumber][0],
          indexes: [i + 1, j],
        });
      }
    }

    // left
    if (j > 0 && allNodeStates[i][j - 1][0] != 4) {
      const nextNodeWeight = allNodeStates[i][j - 1][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i, j - 1, width);
      if (dist + nextNodeWeight < distances[nextNodeNumber][0]) {
        distances[nextNodeNumber][0] = dist + nextNodeWeight;
        distances[nextNodeNumber][1] = [i, j];
        pq.queue({
          distance: distances[nextNodeNumber][0],
          indexes: [i, j - 1],
        });
      }
    }

    // right
    if (j < allNodeStates[0].length - 1 && allNodeStates[i][j + 1][0] != 4) {
      const nextNodeWeight = allNodeStates[i][j + 1][0] === 8 ? 15 : 1;
      const nextNodeNumber = helpers.toNodeNumber(i, j + 1, width);
      if (dist + nextNodeWeight < distances[nextNodeNumber][0]) {
        distances[nextNodeNumber][0] = dist + nextNodeWeight;
        distances[nextNodeNumber][1] = [i, j];
        pq.queue({
          distance: distances[nextNodeNumber][0],
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
  for (var i = 0; i < shortestPathNodes.length; i++) {
    curNode = shortestPathNodes[i];
    await new Promise((resolve) => {
      setTimeout(() => {
        allNodeStates[curNode[0]][curNode[1]][1](7);
        resolve();
      }, 1);
    });
  }
}
