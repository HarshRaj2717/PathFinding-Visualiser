import React, { useState, useEffect } from "react";
import Row from "./Row/Row";

const allNodeStates = new Array(18);

function createAllNodeStates() {
  for (var i = 0; i < 18; i++) {
    allNodeStates[i] = new Array(50);
    for (var j = 0; j < 50; j++) {
      allNodeStates[i][j] = useState(1);
    }
  }
}

export default function Graph() {
  const [eachNodeHeight, setEachNodeHeight] = useState(0);
  const [eachNodeWidth, setEachNodeWidht] = useState(0);
  const maxEachNodeHeight = 4;
  const maxEachNodeWidth = 4;

  const setDimensions = () => {
    // Set eachNodeHeight & eachNodeWidth based on the current window sizes
    const padding = 0.5 * 16;
    const newEachNodeHeight =
      Math.min(
        (window.innerHeight - 2 * padding) / (18 * 16),
        maxEachNodeHeight
      ) - 0.25;
    const newEachNodeWidth = Math.min(
      (window.innerWidth - 2 * padding) / (50 * 16),
      maxEachNodeWidth
    );

    setEachNodeHeight(newEachNodeHeight);
    setEachNodeWidht(newEachNodeWidth);
  };

  useEffect(() => {
    // Update the each Node's dimensions if user changes window size
    setDimensions();
    window.addEventListener("resize", setDimensions);
    return () => {
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  createAllNodeStates();

  const allRows = Array.from({ length: 18 }, (_, i) => (
    <Row
      breadth={50}
      key={`row-${i}`}
      id={`row-${i}`}
      width={eachNodeWidth}
      height={eachNodeHeight}
      thisRowStates={allNodeStates[i]}
    />
  ));

  return (
    <main className="select-none p-1 grid place-items-center">{allRows}</main>
  );
}

export { allNodeStates };
