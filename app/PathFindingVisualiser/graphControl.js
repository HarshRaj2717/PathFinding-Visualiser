import { allNodeStates } from "./Graph";

const allAlgos = {
  0: {
    name: "Select Algo",
  },
  1: {
    name: "Dijkstra's",
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
