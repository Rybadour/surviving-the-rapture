import * as d3 from "d3-timer";

import { InventoryContext } from "../contexts/inventory";
import { WorkbenchContext } from "../contexts/workbench";
import { Recipe } from "../shared/types";

const craftingTimeFactor = 0.05;

export function craftRecipe(inventory: InventoryContext, workbench: WorkbenchContext, recipe: Recipe) {
  workbench.startCraft(recipe);

  return new Promise((resolve, reject) => {
    const timer = d3.timer((elapsed: number) => {
      let maxTime = recipe.durationSec * 1000 * craftingTimeFactor;
      if (elapsed < maxTime) {
        workbench.setProgress(elapsed / maxTime);
        return;
      }

      recipe.consumedItems.forEach((num, item) => 
        inventory.removeItem(item, num)
      );
      inventory.addItems(new Map([[recipe.producedItem, 1]]));

      timer.stop();
      workbench.endCraft(recipe);
      resolve(true);
    });
  });
}