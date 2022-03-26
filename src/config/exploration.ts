import { ItemType, RoomConfig } from "../shared/types";

const rooms: Record<string, RoomConfig> = {
  room1: {
    image: "Basic2x3Room.png",
    x: 32,
    y: 32,
    width: 64,
    height: 96,
    loot: [{
      item: ItemType.Wires,
      chance: 0.8,
      min: 1,
      max: 4
    }, {
      item: ItemType.MachineParts,
      chance: 0.2,
      min: 1,
      max: 2
    }],
  }
};

export default rooms;