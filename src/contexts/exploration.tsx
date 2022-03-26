import { createContext, useState } from "react";

import config from '../config/exploration';
import { RoomConfig } from "../shared/types";

export type ExplorationContext = {
  isExploring: boolean;
  progress: number;
  rooms: Record<string, RoomConfig>;
  startExploring: () => void,
  updateProgress: (progress: number) => void,
  stopExploring: () => void,
};

const defaultContext: ExplorationContext = {
  isExploring: false,
  progress: 0,
  rooms: {},
  startExploring: () => {},
  updateProgress: (progress: number) => {},
  stopExploring: () => {},
};
export const ExplorationContext = createContext(defaultContext);

export function ExplorationProvider(props: Record<string, any>) {
  const [isExploring, setIsExploring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rooms, setRooms] = useState<Record<string, RoomConfig>>(config);

  function startExploring() {
    setProgress(0);
    setIsExploring(true);
  }

  function stopExploring() {
    setIsExploring(false);
  }

  return <ExplorationContext.Provider value={{
    isExploring, progress, rooms,
    startExploring, updateProgress: setProgress, stopExploring
  }} {...props} />;
}
