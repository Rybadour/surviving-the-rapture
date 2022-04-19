import { createContext, useState } from "react";
import { Recipe } from "../shared/types";

export type WorkbenchContext = {
  isCrafting: boolean,
  progress: number,
  startCraft: (recipe: Recipe) => void,
  endCraft: (recipe: Recipe) => void,
  setProgress: (progress: number) => void,
};

const defaultContext: WorkbenchContext  = {
  isCrafting: false,
  progress: 0,
  startCraft: (recipe: Recipe) => {},
  endCraft: (recipe: Recipe) => {},
  setProgress: (progress: number) => {}
};
export const WorkbenchContext = createContext(defaultContext);

export function WorkbenchProvider(props: Record<string, any>) {
  const [isCrafting, setIsCrafting] = useState(false);
  const [progress, setProgress] = useState(0);

  function startCraft(recipe: Recipe) {
    setIsCrafting(true);
  }

  function endCraft(recipe: Recipe) {
    setIsCrafting(false);
  }

  return <WorkbenchContext.Provider value={{
    isCrafting, progress,
    startCraft, endCraft, setProgress
  }} {...props} />;
}
