import { useCallback, useContext, useEffect } from "react";
import classNames from "classnames";

import { ExplorationContext } from "../../contexts/exploration";
import { InventoryContext } from "../../contexts/inventory";
import { startExploring } from "../../game-logic/exploration";
import { RoomConfig } from "../../shared/types";
import { range } from "../../shared/utils";
import './exploration.css';

export function Exploration() {
  const exploration = useContext(ExplorationContext);
  const inventory = useContext(InventoryContext);

  const onExplore = useCallback(async (room: RoomConfig | null) => {
    if (!room) return;
    await startExploring(inventory, exploration, room);
  }, [exploration, inventory]);

  const onSelectRoom = useCallback((room: RoomConfig) => {
    exploration.setSelectedRoom(room);
  }, [exploration]);

  return <div className="exploration">
    <h2>Exploration</h2>
    <div className="exploration-container">
      <div className="map">
          {Object.entries(exploration.rooms).map(([r, room]) => (
            <div
              className={classNames('room', {selected: exploration.selectedRoom == room})}
              key={r}
              onClick={() => onSelectRoom(room)}
              style={{
                left: room.x,
                top: room.y,
                width: room.width,
                height: room.height,
              }}
            >
              {room.width > 30 && room.height > 30 ? <div>{room.name}</div> : null}
            </div>
        ))}
      </div>

      {(exploration.selectedRoom ?
      <div className="room-details">
        <h3>Room: {exploration.selectedRoom.name}</h3>
        <button className="explore-button" onClick={() => onExplore(exploration.selectedRoom)}>Explore</button>
        {(exploration.isExploring ?
          <>
            <p>Exploring!</p>
            <div className="progress">
              <div className="progress-bar" style={{width: exploration.progress*100 + "%"}}></div>
            </div>
          </> : null
        )}
      </div> : null
      )}
    </div>
  </div>;
}