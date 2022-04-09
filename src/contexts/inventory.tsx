import { createContext, useEffect, useState } from "react";
import { ItemType, Recipe } from "../shared/types";

export type ItemsByType = Map<ItemType, number>;

export type InventoryContext = {
  items: ItemsByType,
  addItems: (newItems: ItemsByType) => void,
  canAffordItems: (items: Map<ItemType, number>) => boolean,
  craftRecipe: (recipe: Recipe) => void,
};

const defaultContext: InventoryContext  = {
  items: new Map(),
  addItems: (newItems: ItemsByType) => {},
  canAffordItems: (items: Map<ItemType, number>) => false,
  craftRecipe: (recipe: Recipe) => {},
};
export const InventoryContext = createContext(defaultContext);

export function InventoryProvider(props: Record<string, any>) {
  const [items, setItems] = useState<ItemsByType>(new Map([]));

  function addItems(newItems: Map<ItemType, number>) {
    const itemsCopy = new Map(items);
    newItems.forEach((quantity, type) => 
      addItem(itemsCopy, type, quantity)
    );
    setItems(itemsCopy);
  }

  function canAffordItems(items: Map<ItemType, number>) {
    return Array.from(items)
      .every(([item, quantity]) => canAffordItem(items, item, quantity));
  }

  function craftRecipe(recipe: Recipe) {
    const itemsCopy = new Map(items);
    addItem(itemsCopy, recipe.producedItem, 1);
    Array.from(recipe.consumedItems).forEach(([item, quantity]) => 
      removeItem(itemsCopy, item, quantity)
    );
    setItems(itemsCopy);
  }

  return <InventoryContext.Provider value={{
    items,
    addItems, canAffordItems: canAffordItems, craftRecipe
  }} {...props} />;
}

function canAffordItem(items: Map<ItemType, number>, item: ItemType, quantity: number) {
  const contains = items.get(item) ?? 0;
  return contains >= quantity;
}

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