/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from "react";

import roomConfig from "../config/exploration";
import { Room, RoomConfig } from "../shared/types";

export type ExplorationContext = {
  isExploring: boolean;
  progress: number;
  rooms: Record<string, Room>;
  selectedRoom: string;
  startExploring: (room: Room) => void;
  updateProgress: (room: Room, progress: number) => void;
  stopExploring: (room: Room) => void;
  completeExploring: (room: Room) => void,
  setSelectedRoom: (roomId: string) => void;
};

const defaultContext: ExplorationContext = {
  isExploring: false,
  progress: 0,
  rooms: {},
  selectedRoom: "",
  startExploring: (room: Room) => {},
  updateProgress: (room: Room, progress: number) => {},
  stopExploring: (room: Room) => {},
  completeExploring: (room: Room) => {},
  setSelectedRoom: (roomId: string) => {},
};
export const ExplorationContext = createContext(defaultContext);

const startingRoom = "garage";
const defaultRooms: Record<string, Room> = {};
Object.keys(roomConfig).forEach((roomId) => {
  defaultRooms[roomId] = {
    ...roomConfig[roomId],
    isDiscovered: roomId == startingRoom,
    isKnown: false,
    isExplored: false,
    currentProgress: 0,
    remainingItems: [],
  };
});

export function ExplorationProvider(props: Record<string, any>) {
  const [isExploring, setIsExploring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [rooms, setRooms] = useState<Record<string, Room>>(defaultRooms);

  function startExploring(room: Room) {
    setProgress(0);
    setIsExploring(true);
  }

  function stopExploring(room: Room) {
    setIsExploring(false);
  }

  function updateProgress(room: Room, progress: number) {
    setProgress(progress);

    rooms[room.id] = {
      ...room,
      currentProgress: progress,
    };
    setRooms(rooms);
  }

  function completeExploring(room: Room) {
    rooms[room.id] = {
      ...room,
      isExplored: true,
    };
    room.connectedRooms.forEach((roomId) => {
      rooms[roomId] = {
        ...rooms[roomId],
        isDiscovered: true,
      };
    });
    setRooms(rooms);
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
        updateProgress,
        stopExploring,
        completeExploring,
        setSelectedRoom,
      }}
      {...props}
    />
  );
}
