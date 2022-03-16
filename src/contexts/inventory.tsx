import { createContext, useEffect, useState } from "react";
import { ItemType } from "../shared/types";

type ItemsByType = Map<ItemType, number>;

export type InventoryContext = {
  items: ItemsByType,
  addItem: (item: ItemType, quantity: number) => void,
  canAfford: (item: ItemType, quantity: number) => boolean,
  removeItem: (item: ItemType, quantity: number) => boolean,
};

const defaultContext: InventoryContext  = {
  items: new Map(),
  addItem: (item: ItemType, quantity: number) => {},
  canAfford: (item: ItemType, quantity: number) => false,
  removeItem: (item: ItemType, quantity: number) => false,
};
export const InventoryContext = createContext(defaultContext);

export function InventoryProvider(props: Record<string, any>) {
  const [items, setItems] = useState<ItemsByType>(new Map([[ItemType.Wires, 10], [ItemType.MachineParts, 2]]));

  function addItem(item: ItemType, quantity: number) {
    let stack = (items.get(item) ?? 0); 
    stack += quantity;
    setItems(new Map(items).set(item, stack));
  }

  function canAfford(item: ItemType, quantity: number) {
    const contains = items.get(item) ?? 0;
    return contains >= quantity;
  }

  function removeItem(item: ItemType, quantity: number) {
    if (items.get(item) ?? 0 < quantity) {
      return false;
    }

    let stack = (items.get(item) ?? 0);
    stack -= quantity;
    setItems(new Map(items).set(item, stack));
    return true;
  }

  return <InventoryContext.Provider value={{
    items,
    addItem, canAfford, removeItem
  }} {...props} />;
}
