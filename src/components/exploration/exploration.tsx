import { useCallback, useContext, useEffect } from "react";

import { ExplorationContext } from "../../contexts/exploration";
import { InventoryContext } from "../../contexts/inventory";
import { startExploring } from "../../game-logic/exploration";
import { RoomConfig } from "../../shared/types";
import { range } from "../../shared/utils";
import './exploration.css';

export function Exploration() {
  const exploration = useContext(ExplorationContext);
  const inventory = useContext(InventoryContext);

  const onExplore = useCallback(async (room: RoomConfig) => {
    await startExploring(inventory, exploration, room);
  }, [exploration, inventory]);

  return <div className="exploration">
    <h2>Exploration</h2>
    {(exploration.isExploring ?
      <>
        <p>Exploring!</p>
        <div className="progress">
          <div className="progress-bar" style={{width: exploration.progress*100 + "%"}}></div>
        </div>
      </> : null
    )}

    <img src="icons/wire-coil.png" />

    <div className="map">
      {Object.entries(exploration.rooms).map(([r, room]) =>
        <div className="room" key={r}
          onClick={() => onExplore(room)}
          style={{
            backgroundImage: `url(${room.image})`,
            left: room.x,
            top: room.y,
            width: room.width,
            height: room.height,
          }}
        >
        </div>
      )}
    </div>
  </div>;
}