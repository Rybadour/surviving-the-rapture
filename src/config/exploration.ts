import { ItemType, RoomConfig } from "../shared/types";
import mapData from "../../public/Map1Test.json";

type LDTKEntityInstance = {
  __identifier: string;
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

type LDTKEntityLayer = {
  entityInstances: LDTKEntityInstance[];
}

type LDTKEntityReference = {
  entityIid: string;
}

function getEntityField(entity: LDTKEntityInstance, fieldName: string) {
  const field = entity.fieldInstances.filter((fi) => fi.__identifier == fieldName);
  return field.length > 0 ? field[0].__value : "";
}

function getRoomIdFromRef(refId: string, layer: LDTKEntityLayer) {
  const found = layer.entityInstances.find(entity => entity.iid == refId);
  const entityId = (found ? getEntityField(found, "id") : "");
  return entityId ? entityId : refId;
}

const rooms: Record<string, RoomConfig> = {};
mapData.levels.forEach((level) => {
  level.layerInstances.forEach((layer) => {
    layer.entityInstances
      .filter(entity => entity.__identifier == "Room")
      .forEach((entity) => {
      const items: string[] = getEntityField(entity, "items");
      const itemsByType: Map<ItemType, number> = new Map();
      items.forEach((i) => {
        const type: ItemType = ItemType[i];
        itemsByType.set(i, (itemsByType.get(i) ?? 0) + 1);
      });
      let roomId = getEntityField(entity, "id");
      if (!roomId) {
        roomId = entity.iid;
      }
      rooms[roomId] = {
        id: roomId,
        x: entity.px[0],
        y: entity.px[1],
        width: entity.width,
        height: entity.height,
        name: getEntityField(entity, "name"),
        loot: itemsByType,
        explorationTime: getEntityField(entity, "exploreTime"),
        connectedRooms: getEntityField(entity, "connectedRooms")
          .map((ref: LDTKEntityReference) => getRoomIdFromRef(ref.entityIid, layer))
      };
    });
  });
});

export default rooms;
