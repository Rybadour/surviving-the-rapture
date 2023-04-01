import * as d3 from "d3-timer";

import { Room } from "../shared/types";
import { ExplorationSlice } from "../store/exploration";
import { InventorySlice } from "../store/inventory";

const explorationTimeFactor = 0.05;
const unlitTimeFactor = 4;

export function startExploring(inventory: InventorySlice, exploration: ExplorationSlice, room: Room) {
  exploration.startExploring(room);

  return new Promise((resolve, reject) => {
    const timer = d3.timer((elapsed: number) => {
      let maxTime = room.explorationTime * 1000 * explorationTimeFactor;
      if (!room.hasLighting) {
        maxTime *= unlitTimeFactor;
      }
      if (elapsed < maxTime) {
        exploration.updateProgress(room, elapsed / maxTime);
        return;
      }

      timer.stop();
      exploration.completeExploring(room);
      resolve(true);
    });
  });
}