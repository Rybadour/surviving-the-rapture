import { ItemType, LevelConfig, LevelId, RoomConfig, RoomFeature, RoomId } from "../shared/types";
import mapData from "../../public/Map1Test.json";
import { getFields, getLayerByName, getRefFields, LDTKEntityLayer, LDTKEntityReference, LDTKLevel } from "./ldtk-utils";

function getRoomIdFromRef(ref: LDTKEntityReference, layer: LDTKEntityLayer) {
  const entityId = getRefFields(ref, layer).id;
  return entityId ? entityId : ref.entityIid;
}

function transformItemsFieldIntoMap(items?: string[]) {
  if (!items) {
    return [];
  }

  const itemsByType: Map<ItemType, number> = new Map();
  items.forEach((i) => {
    const type: ItemType = ItemType[i];
    itemsByType.set(type, (itemsByType.get(type) ?? 0) + 1);
  });
  return itemsByType;
}

export const rooms: Record<RoomId, RoomConfig> = {};
export const levels: Record<LevelId, LevelConfig> = {};

mapData.levels.forEach((level) => {
  const levelConfig: LevelConfig = {
    id: level.identifier,
    rooms: [],
  };

  level.layerInstances.forEach((layer) => {
    layer.entityInstances
      .filter((entity) => entity.__identifier == "Room")
      .forEach((entity) => {
        const fields = getFields(entity);
        let roomId = fields.id;
        if (!roomId) {
          roomId = entity.iid;
        }
        if (fields.staircaseUp) {
          console.log(fields.staircaseUp);
        }
        rooms[roomId] = {
          id: roomId,
          x: entity.px[0],
          y: entity.px[1],
          width: entity.width,
          height: entity.height,
          name: fields.name,
          mapLabel: fields.mapLabel,
          loot: transformItemsFieldIntoMap(fields.items),
          explorationTime: fields.exploreTime,
          hasLighting: fields.hasLighting,
          feature: RoomFeature[fields.feature],
          stairCaseUp: fields.staircaseUp ? getRoomIdFromRef(fields.staircaseUp, layer) : null,
          connectedRooms: fields.connectedRooms.map((ref: LDTKEntityReference) => getRoomIdFromRef(ref, layer)),
          explorations: fields.explorations
            .map(ref => {
              const layer = getLayerByName(level, "Explorations");
              return layer ? getRefFields(ref, layer) : null;
            })
            .filter(exploration => !!exploration)
            .map(exploration => ({
              items: transformItemsFieldIntoMap(exploration.items),
              doorReveals: (exploration.doorReveals ?? []).map(ref => getRoomIdFromRef(ref, layer)),
              anecdote: exploration.anecdote,
              isImportant: exploration.isImportantDiscovery,
            })),
        };

        levelConfig.rooms.push(roomId);
      });
  });

  levels[levelConfig.id] = levelConfig;
});
