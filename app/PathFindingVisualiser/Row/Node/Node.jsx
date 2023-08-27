var mouseIsDown = false;

const commonNodeClassNames = "outline outline-1 outline-blue-200";

const nodeRoles = {
  1: {
    // normal node
    classNames: "hover:bg-slate-300 hover:cursor-crosshair ",
  },
  2: {
    // starting node
    classNames: "bg-red-500 hover:cursor-not-allowed ",
  },
  3: {
    // ending node
    classNames: "bg-green-500 hover:cursor-not-allowed",
  },
  4: {
    // wall node
    classNames: "bg-slate-800 hover:bg-slate-600 hover:cursor-crosshair",
  },
  5: {
    // visited node
    classNames: "bg-yellow-200",
  },
  6: {
    // current node
    classNames: "bg-orange-500",
  },
  7: {
    // shortest path node
    classNames: "bg-secondary",
  },
};

export default function Node({ id, width, height, nodeStateProp }) {
  if (id === "node-9-9") {
    nodeStateProp[1](2);
  }
  if (id === "node-9-40") {
    nodeStateProp[1](3);
  }

  const handleMouseEnter = () => {
    if (!mouseIsDown) return;
    if (nodeStateProp[0] == 2 || nodeStateProp[0] == 3) return;
    if (nodeStateProp[0] == 1) {
      nodeStateProp[1](4);
    } else if (nodeStateProp[0] == 4) {
      nodeStateProp[1](1);
    }
  };

  const handleMouseClick = () => {
    if (nodeStateProp[0] == 2 || nodeStateProp[0] == 3) return;
    if (nodeStateProp[0] == 1) {
      nodeStateProp[1](4);
    } else if (nodeStateProp[0] == 4) {
      nodeStateProp[1](1);
    }
  };

  return (
    <main className="inline-block">
      <div
        onClick={handleMouseClick}
        onMouseDown={() => {
          mouseIsDown = true;
        }}
        onMouseEnter={handleMouseEnter}
        onMouseUp={() => {
          mouseIsDown = false;
        }}
        id={id}
        className={`${commonNodeClassNames} ${
          nodeRoles[nodeStateProp[0]].classNames
        }`}
        style={{
          width: `${width}rem`,
          height: `${height}rem`,
        }}
      ></div>
    </main>
  );
}
