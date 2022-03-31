import { ItemType, RoomConfig } from "../shared/types";

/* *
const rooms: Record<string, RoomConfig> = {
  garage: {
    name: "Garage",
    x: 32,
    y: 32,
    width: 100,
    height: 200,
    loot: new Map([
      [ItemType.Wires, 4],
      [ItemType.MachineParts, 2],
    ]),
  },
  hallway1: {
    name: "",
    x: 64,
    y: 20,
    width: 200,
    height: 10,
    loot: new Map([
      [ItemType.Wires, 1],
      [ItemType.LightBulb, 1],
    ]),
  },
};
/* */

import mapData from "../../public/Map1Test.json";
import { LOOP_TYPES } from "@babel/types";

type LDTKEntityInstance = {
  iid: string;
  width: number;
  height: number;
  defUid: number;
  px: number[];
  fieldInstances: {
    __identifier: string;
    __value: any;
    __type: string;
  }[];
};

function getEntityField(entity: LDTKEntityInstance, fieldName: string) {
  const field = entity.fieldInstances.filter((fi) => fi.__identifier == fieldName);
  return field.length > 0 ? field[0].__value : "";
}

const rooms: Record<string, RoomConfig> = {};
mapData.levels.forEach((level) => {
  level.layerInstances.forEach((layer) => {
    layer.entityInstances.forEach((entity) => {
      const items: string[] = getEntityField(entity, "items");
      const itemsByType: Map<ItemType, number> = new Map();
      items.forEach((i) => {
        const type: ItemType = ItemType[i];
        itemsByType.set(i, (itemsByType.get(i) ?? 0) + 1);
      });
      rooms[getEntityField(entity, "id")] = {
        x: entity.px[0],
        y: entity.px[1],
        width: entity.width,
        height: entity.height,
        name: getEntityField(entity, "name"),
        loot: itemsByType,
        explorationTime: 100,
      };
    });
  });
});

export default rooms;
