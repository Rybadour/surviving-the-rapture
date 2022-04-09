import { createContext, useState } from "react";
import { ItemType, Recipe } from "../shared/types";

export type WorkbenchContext = {
  isCrafting: boolean,
  startCraft: (recipe: Recipe) => void,
  endCraft: (recipe: Recipe) => void,
};

const defaultContext: WorkbenchContext  = {
  isCrafting: false,
  startCraft: (recipe: Recipe) => {},
  endCraft: (recipe: Recipe) => {},
};
export const WorkbenchContext = createContext(defaultContext);

export function WorkbenchProvider(props: Record<string, any>) {
  const [isCrafting, setIsCrafting] = useState(false);

  function startCraft(recipe: Recipe) {
    setIsCrafting(true);
  }

  function endCraft(recipe: Recipe) {
    setIsCrafting(false);
  }

  return <WorkbenchContext.Provider value={{
    isCrafting,
    startCraft, endCraft
  }} {...props} />;
}
