import * as d3 from "d3-timer";

import { ExplorationContext } from "../contexts/exploration";
import { InventoryContext } from "../contexts/inventory";
import { ItemType, RoomConfig } from "../shared/types";
import { randomBetween } from "../shared/utils";

const explorationTime = 3000;

export function startExploring(inventory: InventoryContext, exploration: ExplorationContext, room: RoomConfig) {
  exploration.startExploring();

  return new Promise((resolve, reject) => {
    const timer = d3.timer((elapsed: number) => {
      if (elapsed < explorationTime) {
        exploration.updateProgress(elapsed/explorationTime);
        return;
      }

      inventory.addItems(getRandomLoot(room));

      timer.stop();
      exploration.stopExploring();
      resolve(true);
    });
  });
}

export function getRandomLoot(room: RoomConfig) {
  const items: Map<ItemType, number> = new Map(); 

  room.loot.forEach(loot => {
    if (loot.chance > Math.random()) {
      const quantity = Math.round(randomBetween(loot.min, loot.max));
      items.set(loot.item, quantity);
    }
  });
  return items;
}