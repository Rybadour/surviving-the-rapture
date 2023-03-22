import React, { useCallback, useContext, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import classNames from "classnames";

import { ExplorationContext } from "../../contexts/exploration";
import { InventoryContext } from "../../contexts/inventory";
import { startExploring } from "../../game-logic/exploration";
import { Room, RoomConfig, RoomFeature } from "../../shared/types";
import "./exploration.scss";
import RaptureTooltip from "../../shared/rapture-tooltip";
import { Button } from "@mui/material";
import { Workbench } from "../workbench/workbench";
import { ProgressBar } from "../progress-bar/progress-bar";

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
              <RaptureTooltip
                key={r}
                placement="top"
                title={
                  <React.Fragment>
                    <div className={classNames("room-tooltip", {
                      unlit: !room.hasLighting,
                    })}>
                      <div className="header">
                        <div className="name">{room.name}</div>
                        <i className="fas fa-lightbulb light-status"></i>
                      </div>

                      <div className="progress-details">
                        <div className="number">
                          {(room.isExplored ? 100 : (room.currentProgress * 100).toFixed(0))}
                          % explored
                        </div>
                        {room.isExplored ? null : <ProgressBar progress={room.currentProgress} />}
                      </div>
                    </div>
                  </React.Fragment>
                }
              >
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
                  <div className="label">{room.mapLabel}</div>
                </div>
              </RaptureTooltip>
            ))}
        </div>

        <div className="room-details">
          {exploration.selectedRoom != "" ? (
            <RoomDetails
              room={exploration.rooms[exploration.selectedRoom]}
              exploration={exploration}
              onExplore={() => onExplore(exploration.rooms[exploration.selectedRoom])}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function RoomDetails(props: { room: Room; exploration: ExplorationContext; onExplore: () => void }) {
  return <>
    <h3>Room: {props.room.name}</h3>
    <div>
      <span>Lights: {props.room.hasLighting ? "On" : "Off (4x exploration time)"}</span>
    </div>
    {props.room.isExplored ? <>
      <div>Explored!</div>
      {props.room.feature == RoomFeature.Workbench ? <Workbench /> : null}
    </> : null}
    {!props.room.isExplored && !props.exploration.isExploring ?
      <Button className="explore-button" onClick={() => props.onExplore()} variant="contained" color="success">
        Explore
      </Button> : null
    }
    {props.exploration.isExploring ? (
      <>
        <p>Exploring...</p>
        <ProgressBar progress={props.exploration.progress} />
      </>
    ) : null}
  </>;
}