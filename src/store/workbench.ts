import { MyCreateSlice } from ".";
import { Recipe } from "../shared/types";

export interface WorkbenchSlice {
  isCrafting: boolean,
  progress: number,

  startCraft: (recipe: Recipe) => void,
  endCraft: (recipe: Recipe) => void,
  setProgress: (progress: number) => void,
}

const createWorkbenchSlice: MyCreateSlice<WorkbenchSlice, []> = (set, get) => {
  return {
    isCrafting: false,
    progress: 0,

    startCraft: (recipe: Recipe) => {
      set({ isCrafting: true });
    },

    endCraft: (recipe: Recipe) => {
      set({ isCrafting: false });
    },

    setProgress: (progress: number) => {
      set({ progress });
    },
  };
};

export default createWorkbenchSlice;