/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from "react";

import rooms from "../config/exploration";
import { RoomConfig } from "../shared/types";

export type ExplorationContext = {
  isExploring: boolean;
  progress: number;
  rooms: Record<string, RoomConfig>;
  selectedRoom: RoomConfig | null;
  startExploring: () => void;
  updateProgress: (progress: number) => void;
  stopExploring: (room: RoomConfig) => void;
  setSelectedRoom: (room: RoomConfig) => void;
};

const defaultContext: ExplorationContext = {
  isExploring: false,
  progress: 0,
  rooms: {},
  selectedRoom: null,
  startExploring: () => {},
  updateProgress: (progress: number) => {},
  stopExploring: (room: RoomConfig) => {},
  setSelectedRoom: (room: RoomConfig) => {},
};
export const ExplorationContext = createContext(defaultContext);

export function ExplorationProvider(props: Record<string, any>) {
  const [isExploring, setIsExploring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomConfig | null>(null);

  function startExploring() {
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
