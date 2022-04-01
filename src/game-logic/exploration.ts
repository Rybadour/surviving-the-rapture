import * as d3 from "d3-timer";

import { ExplorationContext } from "../contexts/exploration";
import { InventoryContext } from "../contexts/inventory";
import { Room, RoomConfig } from "../shared/types";

const explorationTimeFactor = 0.5;

export function startExploring(inventory: InventoryContext, exploration: ExplorationContext, room: Room) {
  exploration.startExploring(room);

  return new Promise((resolve, reject) => {
    const timer = d3.timer((elapsed: number) => {
      const maxTime = room.explorationTime * 1000 * explorationTimeFactor;
      if (elapsed < maxTime) {
        exploration.updateProgress(elapsed / maxTime);
        return;
      }

      inventory.addItems(room.loot);

      timer.stop();
      exploration.stopExploring(room);
      resolve(true);
    });
  });
}