import { ItemType } from "./types";

export function getItemIcon(item: ItemType): string {
  switch (item) {
    case ItemType.Wires:
      return 'icons/wire-coil.png'; 
    default:
      return '';
  }
}