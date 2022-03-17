import { useCallback, useContext, useEffect } from "react";

import { ExplorationContext } from "../../contexts/exploration";
import { InventoryContext } from "../../contexts/inventory";
import { startExploring } from "../../game-logic/exploration";
import './exploration.css';


export function Exploration() {
  const exploration = useContext(ExplorationContext);
  const inventory = useContext(InventoryContext);

  const onExplore = useCallback(async () => {
    await startExploring(inventory, exploration);
  }, [exploration, inventory]);

  return <div className="exploration">
    <h2>Exploration</h2>
    {(exploration.isExploring ?
      <>
        <p>Exploring!</p>
        <div className="progress">
          <div className="progress-bar" style={{width: exploration.progress*100 + "%"}}></div>
        </div>
      </> :
      <button onClick={onExplore}>Explore</button>
    )}
  </div>;
}