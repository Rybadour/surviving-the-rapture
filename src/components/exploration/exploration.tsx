import { useCallback, useContext, useEffect } from "react";

import { ExplorationContext } from "../../contexts/exploration";
import { InventoryContext } from "../../contexts/inventory";
import { startExploring } from "../../game-logic/exploration";
import { range } from "../../shared/utils";
import './exploration.css';

const rooms = [{
  image: 'Basic2x3Room.png',
  x: 1,
  y: 1,
  width: 2,
  height: 3,
}];
const spaceSize = 32;

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

    <div className="map">
      {rooms.map(room =>
        <div className="room" style={{
          backgroundImage: `url(${room.image})`,
          left: room.x * spaceSize,
          top: room.y * spaceSize,
          width: room.width * spaceSize,
          height: room.height * spaceSize,
        }}>
          {range(1, room.width).flatMap(x => 
            range(1, room.height).map(y =>
              <div className="space"></div>
          ))}
        </div>
      )}
    </div>
  </div>;
}