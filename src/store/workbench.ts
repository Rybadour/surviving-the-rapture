import { MyCreateSlice } from ".";
import { RecipeId, Recipe } from "../config/recipes";

export interface WorkbenchSlice {
  isCrafting: boolean,
  progress: number,
  numCrafts: Partial<Record<RecipeId, number>>,

  startCraft: (recipe: Recipe) => void,
  endCraft: (recipe: Recipe) => void,
  setProgress: (progress: number) => void,
}

const createWorkbenchSlice: MyCreateSlice<WorkbenchSlice, []> = (set, get) => {
  return {
    isCrafting: false,
    progress: 0,
    numCrafts: {},

    startCraft: (recipe: Recipe) => {
      set({ isCrafting: true });
    },

    endCraft: (recipe: Recipe) => {
      const numCrafts = get().numCrafts;
      const id = recipe.id;
      if (numCrafts[id]) {
        numCrafts[id] += 1;
      } else {
        numCrafts[id] = 1
      }
      set({ isCrafting: false, numCrafts });
    },

    setProgress: (progress: number) => {
      set({ progress });
    },
  };
};

export default createWorkbenchSlice;