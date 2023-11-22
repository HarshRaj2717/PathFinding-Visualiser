import { allNodeStates } from "./Graph";
import dijkstra from "./Algos/dijkstra";
import a_star from "./Algos/a_star";
import * as helpers from "./Algos/helpers";

const allAlgos = {
  0: {
    name: "Select Algo",
  },
  1: {
    name: "Dijkstra's",
    func: dijkstra,
  },
  2: {
    name: "A*",
    func: a_star,
  }
};
var curAlgo = 0;

export function selectAlgo(choice) {
  curAlgo = choice;
  document.getElementById("Select-Algo").innerText = allAlgos[choice].name;
}

export default function resetAllNodeStates(i) {
  selectAlgo(0);
  for (var i = 0; i < allNodeStates.length; i++) {
    for (var j = 0; j < allNodeStates[i].length; j++) {
      allNodeStates[i][j][1](1);
    }
  }
}

export async function runAlgo() {
  if (curAlgo == 0) return;
  document.getElementById("graph-main").classList.add("pointer-events-none")
  document.getElementById("visualise-btn").classList.add("btn-disabled")
  document.getElementById("reset-all-btn").classList.add("btn-disabled")
  helpers.clearAllPaths();
  await allAlgos[curAlgo].func();
  document.getElementById("graph-main").classList.remove("pointer-events-none")
  document.getElementById("visualise-btn").classList.remove("btn-disabled")
  document.getElementById("reset-all-btn").classList.remove("btn-disabled")
}
