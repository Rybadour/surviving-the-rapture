import { StoreApi } from "zustand";
import { createLens } from "@dhmk/zustand-lens";
import { create } from "zustand";
import createExplorationSlice, { ExplorationSlice } from "./exploration";
import createInventorySlice, { InventorySlice } from "./inventory";
import createWorkbenchSlice, { WorkbenchSlice } from "./workbench";

export type FullStore = {
  exploration: ExplorationSlice,
  inventory: InventorySlice,
  workbench: WorkbenchSlice,
}

const useStore = create<FullStore>((set, get) => {
  const exploration = createLens(set, get, 'exploration');
  const inventory = createLens(set, get, 'inventory');
  const workbench = createLens(set, get, 'workbench');

  return {
    exploration: createExplorationSlice(...exploration, inventory[1]),
    inventory: createInventorySlice(...inventory),
    workbench: createWorkbenchSlice(...workbench),
  }
});

export default useStore;

export type Lens<T> = [set: StoreApi<T>['setState'], get: StoreApi<T>['getState']];

export type MyCreateSlice<T, A extends (() => any)[]> =
  (set: StoreApi<T>['setState'], get: StoreApi<T>['getState'], ...args: A) => T