import { StoreApi } from "zustand";
import { createLens } from "@dhmk/zustand-lens";
import { create } from "zustand";
import createExplorationSlice, { ExplorationSlice } from "./exploration";
import createInventorySlice, { InventorySlice } from "./inventory";
import createWorkbenchSlice, { WorkbenchSlice } from "./workbench";
import createStorySlice, { StorySlice } from "./story";

export type FullStore = {
  exploration: ExplorationSlice,
  inventory: InventorySlice,
  workbench: WorkbenchSlice,
  story: StorySlice,
}

const useStore = create<FullStore>((set, get) => {
  const exploration = createLens(set, get, 'exploration');
  const inventory = createLens(set, get, 'inventory');
  const workbench = createLens(set, get, 'workbench');
  const story = createLens(set, get, 'story');

  return {
    exploration: createExplorationSlice(...exploration, inventory[1], story[1]),
    inventory: createInventorySlice(...inventory),
    workbench: createWorkbenchSlice(...workbench),
    story: createStorySlice(...story),
  }
});

export default useStore;

export type Lens<T> = [set: StoreApi<T>['setState'], get: StoreApi<T>['getState']];

export type MyCreateSlice<T, A extends (() => any)[]> =
  (set: StoreApi<T>['setState'], get: StoreApi<T>['getState'], ...args: A) => T