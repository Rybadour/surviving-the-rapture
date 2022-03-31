import { createContext, useState } from "react";

import config from '../config/exploration';
import { RoomConfig } from "../shared/types";

export type ExplorationContext = {
  isExploring: boolean;
  progress: number;
  rooms: Record<string, RoomConfig>;
  selectedRoom: RoomConfig | null;
  startExploring: () => void,
  updateProgress: (progress: number) => void,
  stopExploring: () => void,
  setSelectedRoom: (room: RoomConfig) => void,
};

const defaultContext: ExplorationContext = {
  isExploring: false,
  progress: 0,
  rooms: {},
  selectedRoom: null,
  startExploring: () => {},
  updateProgress: (progress: number) => {},
  stopExploring: () => {},
  setSelectedRoom: (room: RoomConfig) => {},
};
export const ExplorationContext = createContext(defaultContext);

export function ExplorationProvider(props: Record<string, any>) {
  const [isExploring, setIsExploring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rooms, setRooms] = useState<Record<string, RoomConfig>>(config);
  const [selectedRoom, setSelectedRoom] = useState<RoomConfig | null>(null);

  function startExploring() {
    setProgress(0);
    setIsExploring(true);
  }

  function stopExploring() {
    setIsExploring(false);
  }

  return <ExplorationContext.Provider value={{
    isExploring, progress, rooms, selectedRoom,
    startExploring, updateProgress: setProgress, stopExploring, setSelectedRoom,
  }} {...props} />;
}
