import { ItemsByType } from "../contexts/inventory";

export enum ItemType {
  AAA_Battery = "AAA_Battery",
  BrokenFlashlight = "BrokenFlashlight",
  CPU = "CPU",
  Flashlight = "Flashlight",
  GasCan = "GasCan",
  LightBulb = "LightBulb",
  MachineParts = "MachineParts",
  MicroController = "MicroController",
  Motor = "Motor",
  RechargeableBattery = "RechargeableBattery",
  RubberHose = "RubberHose",
  ScrapElectronics = "ScrapElectronics",
  ScrapMetal = "ScrapMetal",
  Wires = "Wires",
}

export interface RoomConfig {
  id: string;
  name: string;
  mapLabel: string;
  x: number;
  y: number;
  width: number;
  height: number;
  loot: ItemsByType;
  explorationTime: number;
  connectedRooms: string[];
  hasLighting: boolean;
  feature: RoomFeature;
  explorations: Exploration[];
}

export type Room = RoomConfig & {
  isDiscovered: boolean;
  isKnown: boolean;
  isExplored: boolean;
  currentProgress: number;
  currentChunks: number;
};

export interface Exploration {
  items: ItemsByType;
  doorReveals: string[];
  anecdote: string;
  isImportant: boolean;
}

export enum RoomFeature {
  Workbench = "Workbench",
}

export interface RecipeWithoutId {
  name: string;
  feature: RoomFeature;
  durationSec: number;
  consumedItems: Map<ItemType, number>;
  limit: number;
  result: { item: ItemType } | { feature: SpecialFeature };
}

export type SpecialFeature = 'flashlight' | 'flashlight-battery';
