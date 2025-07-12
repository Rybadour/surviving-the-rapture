import { ItemType, Recipe, RoomFeature } from "../shared/types";

const recipes: Record<string, Recipe> = {
  "fix-flashlight": {
    name: "Fix Flashlight",
    feature: RoomFeature.Workbench,
    durationSec: 20,
    consumedItems: new Map([
      [ItemType.BrokenFlashlight, 1],
      [ItemType.LightBulb, 1],
      [ItemType.Wires, 4]
    ]),
    result: { feature: 'flashlight' },
  } 
};

export default recipes;