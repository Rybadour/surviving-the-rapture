import * as d3 from "d3-timer";

import { Room } from "../shared/types";
import { ExplorationSlice } from "../store/exploration";
import { InventorySlice } from "../store/inventory";
import globals from "../config/global";

const explorationTimeFactor = 0.05;
const unlitTimeFactor = 4;

export function startExploring(inventory: InventorySlice, exploration: ExplorationSlice, room: Room) {
  exploration.startExploring(room);
  if (globals.TURBO_MODE) {
    exploration.completeExploring(room);
    return;
  }

  return new Promise((resolve, reject) => {
    let lastElapsed = 0;
    let lastBattery = inventory.flashlight.battery;
    const timer = d3.timer((elapsed: number) => {
      const delta = (elapsed - lastElapsed)/1000;
      lastElapsed = elapsed;

      let maxTime = room.explorationTime * 1000 * explorationTimeFactor;
      if (!room.hasLighting) {
        if (!inventory.flashlight.found || lastBattery <= 0) {
          maxTime *= unlitTimeFactor;
        } else {
          lastBattery = inventory.useFlashlight(delta);
        }
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