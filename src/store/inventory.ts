import { MyCreateSlice } from ".";
import { ItemType, Recipe } from "../shared/types";

export type ItemsByType = Map<ItemType, number>;

export interface InventorySlice {
  items: ItemsByType,
  flashlight: {
    found: boolean,
    battery: number,
  },

  addItems: (newItems: ItemsByType) => void,
  canAffordItem: (item: ItemType, quantity: number) => boolean,
  canAffordItems: (items: Map<ItemType, number>) => boolean,
  craftRecipe: (recipe: Recipe) => void,
}

const createInventorySlice: MyCreateSlice<InventorySlice, []> = (set, get) => {
  function canAffordItem(item: ItemType, quantity: number) {
    const contains = get().items.get(item) ?? 0;
    return contains >= quantity;
  }

  return {
    items: new Map(),
    flashlight: {
      found: false,
      battery: 0,
    },

    addItems: (newItems: ItemsByType) => {
      const itemsCopy = new Map(get().items);
      newItems.forEach((quantity, type) => 
        addItem(itemsCopy, type, quantity)
      );
      set({ items: itemsCopy });
    },

    canAffordItem,

    canAffordItems: (itemsNeeded: Map<ItemType, number>) => {
      return Array.from(itemsNeeded)
        .every(([item, quantity]) => canAffordItem(item, quantity));
    },

    craftRecipe: (recipe: Recipe) => {
      const itemsCopy = new Map(get().items);
      Array.from(recipe.consumedItems).forEach(([item, quantity]) => 
        removeItem(itemsCopy, item, quantity)
      );

      if ("item" in recipe.result) {
        addItem(itemsCopy, recipe.result.item, 1);
      } else if ("feature" in recipe.result) {
        set({ flashlight: { found: true, battery: 30 }});
      }
      set({ items: itemsCopy});
    },
  };
};

function addItem(items: Map<ItemType, number>, item: ItemType, quantity: number) {
  let stack = (items.get(item) ?? 0); 
  stack += quantity;
  items.set(item, stack);
}

function removeItem(items: Map<ItemType, number>, item: ItemType, quantity: number) {
  if ((items.get(item) ?? 0) < quantity) {
    return false;
  }

  let stack = (items.get(item) ?? 0);
  stack -= quantity;
  items.set(item, stack);
  return true;
}

export default createInventorySlice;