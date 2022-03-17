import * as d3 from "d3-timer";

import { ExplorationContext } from "../contexts/exploration";
import { InventoryContext } from "../contexts/inventory";
import { ItemType } from "../shared/types";
import config from '../config/exploration.json';
import { randomBetween } from "../shared/utils";

const explorationTime = 3000;

export function startExploring(inventory: InventoryContext, exploration: ExplorationContext) {
  exploration.startExploring();

  return new Promise((resolve, reject) => {
    const timer = d3.timer((elapsed: number) => {
      if (elapsed < explorationTime) {
        exploration.updateProgress(elapsed/explorationTime);
        return;
      }

      inventory.addItems(getRandomLoot());

      timer.stop();
      exploration.stopExploring();
      resolve(true);
    });
  });
}

export function getRandomLoot() {
  const items: Map<ItemType, number> = new Map(); 

  config.loot.forEach(loot => {
    if (loot.chance > Math.random()) {
      const quantity = Math.round(randomBetween(loot.min, loot.max));
      items.set(ItemType[loot.type as keyof typeof ItemType], quantity);
    }
  });
  return items;
}