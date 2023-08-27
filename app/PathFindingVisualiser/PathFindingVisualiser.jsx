import Graph from "./Graph";
import resetAllNodeStates, { selectAlgo } from "./graphControl";

function NavBar() {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <a
          className="btn btn-ghost normal-case text-2xl hidden md:flex"
          href="/"
        >
          PathFinding Visualiser
        </a>
      </div>
      <div className="navbar-end">
        <a
          className="btn btn-sm p-2 m-1 normal-case"
          href="https://github.com/HarshRaj2717/pathfinding-visualiser"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="btn btn-sm p-2 m-1 btn-outline btn-ghost btn-info normal-case"
          href="https://hraj.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          By: Harsh Raj
        </a>
      </div>
    </div>
  );
}

function OptionsBar() {
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>
              <div className="outline outline-3 outline-blue-200 h-4 w-4 inline-block bg-white"></div>
              Unvisited Node
            </a>
          </li>
          <li>
            <a>
              <div className="outline outline-2 outline-blue-200 h-4 w-4 inline-block bg-red-500"></div>
              Starting Node
            </a>
          </li>
          <li>
            <a>
              <div className="outline outline-2 outline-blue-200 h-4 w-4 inline-block bg-green-500"></div>
              Ending Node
            </a>
          </li>
          <li>
            <a>
              <div className="outline outline-2 outline-blue-200 h-4 w-4 inline-block bg-slate-800"></div>
              Wall Node
            </a>
          </li>
          <li>
            <a>
              <div className="outline outline-2 outline-blue-200 h-4 w-4 inline-block bg-yellow-200"></div>
              Visited Node
            </a>
          </li>
          <li>
            <a>
              <div className="outline outline-2 outline-blue-200 h-4 w-4 inline-block bg-orange-500"></div>
              Current Node
            </a>
          </li>
          <li>
            <a>
              <div className="outline outline-2 outline-blue-200 h-4 w-4 inline-block bg-secondary"></div>
              Shortest-Path Node
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-sm normal-case" onClick={resetAllNodeStates}>
          Reset All
        </button>
        <ul className="menu menu-horizontal px-1">
          <li tabIndex={0}>
            <details>
              <summary id="Select-Algo">Select Algo</summary>
              <ul className="p-2">
                <li>
                  <btn onClick={() => selectAlgo(1)}>Dijkstra's</btn>
                </li>
              </ul>
            </details>
          </li>
        </ul>
        <a className="btn btn-primary">Visualise</a>
      </div>
    </div>
  );
}

export default function PathFindingVisualiser() {
  return (
    <main>
      <NavBar />
      <OptionsBar />
      <Graph />
    </main>
  );
}
