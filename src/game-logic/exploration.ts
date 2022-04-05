import * as d3 from "d3-timer";

import { ExplorationContext } from "../contexts/exploration";
import { InventoryContext } from "../contexts/inventory";
import { Room, RoomConfig } from "../shared/types";

const explorationTimeFactor = 0.05;
const unlitTimeFactor = 4;

export function startExploring(inventory: InventoryContext, exploration: ExplorationContext, room: Room) {
  exploration.startExploring(room);

  return new Promise((resolve, reject) => {
    const timer = d3.timer((elapsed: number) => {
      let maxTime = room.explorationTime * 1000 * explorationTimeFactor;
      if (!room.hasLighting) {
        maxTime *= unlitTimeFactor;
      }
      if (elapsed < maxTime) {
        exploration.updateProgress(elapsed / maxTime);
        return;
      }

      inventory.addItems(room.loot);

      timer.stop();
      exploration.completeExploring(room);
      resolve(true);
    });
  });
}