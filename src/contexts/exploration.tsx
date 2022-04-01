/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from "react";

import roomConfig from "../config/exploration";
import { Room, RoomConfig } from "../shared/types";

export type ExplorationContext = {
  isExploring: boolean;
  progress: number;
  rooms: Record<string, Room>;
  selectedRoom: Room | null;
  startExploring: (room: Room) => void;
  updateProgress: (progress: number) => void;
  stopExploring: (room: Room) => void;
  setSelectedRoom: (room: Room) => void;
};

const defaultContext: ExplorationContext = {
  isExploring: false,
  progress: 0,
  rooms: {},
  selectedRoom: null,
  startExploring: (room: Room) => {},
  updateProgress: (progress: number) => {},
  stopExploring: (room: Room) => {},
  setSelectedRoom: (room: Room) => {},
};
export const ExplorationContext = createContext(defaultContext);

const startingRoom = "garage";
const defaultRooms: Record<string, Room> = {};
Object.keys(roomConfig)
  .forEach((roomId) => defaultRooms[roomId] = {
    ...roomConfig[roomId],
    isDiscovered: roomId == startingRoom,
    isExplored: false,
    currentProgress: 0,
    remainingItems: [],
  })

export function ExplorationProvider(props: Record<string, any>) {
  const [isExploring, setIsExploring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Record<string, Room>>(defaultRooms);

  function startExploring(room: Room) {
    setProgress(0);
    setIsExploring(true);
  }

  function stopExploring(room: RoomConfig) {
    setIsExploring(false);
  }

  return (
    <ExplorationContext.Provider
      value={{
        isExploring,
        progress,
        rooms,
        selectedRoom,
        startExploring,
        updateProgress: setProgress,
        stopExploring,
        setSelectedRoom,
      }}
      {...props}
    />
  );
}
