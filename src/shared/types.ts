export enum ItemType {
  Wires,
  MachineParts,
  ScrapElectronics,
  ScrapMetal,
  CPU,
  MicroController,
  Motor,
  LightBulb,
};

export type RoomConfig = {
  image: string,
  x: number,
  y: number,
  width: number,
  height: number,
  loot: {
    item: ItemType,
    chance: number,
    min: number,
    max: number,
  }[],
};