import { useCallback, useContext, useEffect } from "react";
import classNames from "classnames";

import { ExplorationContext } from "../../contexts/exploration";
import { InventoryContext } from "../../contexts/inventory";
import { startExploring } from "../../game-logic/exploration";
import { Room, RoomConfig } from "../../shared/types";
import { range } from "../../shared/utils";
import "./exploration.css";
import rooms from "../../config/exploration";

export function Exploration() {
  const exploration = useContext(ExplorationContext);
  const inventory = useContext(InventoryContext);

  const onExplore = useCallback(
    async (room: Room | null) => {
      if (!room) return;
      await startExploring(inventory, exploration, room);
    },
    [exploration, inventory],
  );

  const onSelectRoom = useCallback(
    (room: Room) => {
      exploration.setSelectedRoom(room.id);
    },
    [exploration],
  );

  return (
    <div className="exploration">
      <h2>Exploration</h2>
      <div className="exploration-container">
        <div className="map">
          {Object.entries(exploration.rooms)
            .filter(([r, room]) => room.isDiscovered)
            .map(([r, room]) => (
              <div
                className={classNames("room", {
                  selected: exploration.selectedRoom == room.id,
                  explored: room.isExplored,
                  known: room.isKnown,
                  unlit: !room.hasLighting,
                  "small-room": room.width < 30 || room.height < 30,
                })}
                key={r}
                onClick={() => onSelectRoom(room)}
                style={{
                  left: room.x,
                  top: room.y,
                  width: room.width,
                  height: room.height,
                }}
              >
                <div className="label">{room.name}</div>
                {room.hasLighting ? null : <i className="fa-solid fa-eye-slash unlit-icon"></i>}
              </div>
            ))}
        </div>

        {exploration.selectedRoom != "" ? (
          <RoomDetails
            room={exploration.rooms[exploration.selectedRoom]}
            exploration={exploration}
            onExplore={() => onExplore(exploration.rooms[exploration.selectedRoom])}
          />
        ) : null}
      </div>
    </div>
  );
}

function RoomDetails(props: { room: Room; exploration: ExplorationContext; onExplore: () => void }) {
  return (
    <div className="room-details">
      <h3>Room: {props.room.name}</h3>
      <div>
        <span>Has {props.room.hasLighting ? "Lighting" : "No Lighting"}</span>
        <i
          className={classNames({
            fas: true,
            "fa-eye-slash": !props.room.hasLighting,
            "fa-eye": props.room.hasLighting,
          })}
        ></i>
      </div>
      {props.room.isExplored ? (
        <div>Explored!</div>
      ) : (
        <button className="explore-button" onClick={() => props.onExplore()}>
          Explore
        </button>
      )}
      {props.exploration.isExploring ? (
        <>
          <p>Exploring!</p>
          <div className="progress">
            <div className="progress-bar" style={{ width: props.exploration.progress * 100 + "%" }}></div>
          </div>
        </>
      ) : null}
    </div>
  );
}