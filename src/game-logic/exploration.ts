import * as d3 from "d3-timer";
import { useEffect } from "react";

import { ExplorationContext } from "../contexts/exploration";
import { InventoryContext } from "../contexts/inventory";
import { ItemType } from "../shared/types";


const explorationTime = 3000;

export function startExploring(inventory: InventoryContext, exploration: ExplorationContext) {
  exploration.startExploring();

  return new Promise((resolve, reject) => {
    const timer = d3.timer((elapsed: number) => {
      if (elapsed < explorationTime) {
        exploration.updateProgress(elapsed/explorationTime);
        return;
      }

      inventory.addItem(ItemType.Wires, 1);
      timer.stop();
      exploration.stopExploring();
      resolve(true);
    });
  });
}