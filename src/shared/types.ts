import { ItemsByType } from "../contexts/inventory";

export enum ItemType {
  Wires = "Wires",
  MachineParts = "MachineParts",
  ScrapElectronics = "ScrapElectronics",
  ScrapMetal = "ScrapMetal",
  CPU = "CPU",
  MicroController = "MicroController",
  Motor = "Motor",
  LightBulb = "LightBulb",
}

export type RoomConfig = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  loot: ItemsByType;
  explorationTime: number;
  connectedRooms: string[];
};

export type Room = RoomConfig & {
  isDiscovered: boolean;
  isKnown: boolean;
  isExplored: boolean;
  currentProgress: number;
  remainingItems: ItemType[];
};