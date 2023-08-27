import Node from "./Node/Node";

export default function Row({ breadth, id, width, height, thisRowStates }) {
  const nodesInCurRow = Array.from({ length: breadth }, (_, i) => (
    <Node
      key={`node-${id.replace("row-", "")}-${i}`}
      id={`node-${id.replace("row-", "")}-${i}`}
      width={width}
      height={height}
      nodeStateProp={thisRowStates[i]}
    />
  ));

  return (
    <main id={id} className="-mb-1.5">
      {nodesInCurRow}
    </main>
  );
}
