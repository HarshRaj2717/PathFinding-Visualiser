import { allNodeStates } from "./Graph";
import dijkstra from "./Algos/dijkstra";
import * as helpers from "./Algos/helpers";

const allAlgos = {
  0: {
    name: "Select Algo",
  },
  1: {
    name: "Dijkstra's",
    func: dijkstra,
  },
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
  document.getElementById("main-body").classList.add("pointer-events-none")
  helpers.clearAllPaths();
  if (curAlgo == 0) return;
  await allAlgos[curAlgo].func();
  document.getElementById("main-body").classList.remove("pointer-events-none")
}
