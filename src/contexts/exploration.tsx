import { createContext, useState } from "react";

export type ExplorationContext = {
  isExploring: boolean;
  progress: number;
  startExploring: () => void,
  updateProgress: (progress: number) => void,
  stopExploring: () => void,
};

const defaultContext: ExplorationContext = {
  isExploring: false,
  progress: 0,
  startExploring: () => {},
  updateProgress: (progress: number) => {},
  stopExploring: () => {},
};
export const ExplorationContext = createContext(defaultContext);

export function ExplorationProvider(props: Record<string, any>) {
  const [isExploring, setIsExploring] = useState(false);
  const [progress, setProgress] = useState(0);

  function startExploring() {
    setProgress(0);
    setIsExploring(true);
  }

  function stopExploring() {
    setIsExploring(false);
  }

  return <ExplorationContext.Provider value={{
    isExploring, progress,
    startExploring, updateProgress: setProgress, stopExploring
  }} {...props} />;
}
