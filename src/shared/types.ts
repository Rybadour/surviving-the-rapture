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
};

export type RoomConfig = {
  name: string,
  x: number,
  y: number,
  width: number,
  height: number,
  loot: ItemsByType,
};