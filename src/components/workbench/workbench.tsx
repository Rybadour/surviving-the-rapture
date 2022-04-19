import { useCallback, useContext } from "react";
import { Button, Tooltip } from "@mui/material";

import './workbench.scss';
import recipes from "../../config/recipes";
import { Recipe, RoomFeature } from "../../shared/types";
import { InventoryContext } from "../../contexts/inventory";
import { WorkbenchContext } from "../../contexts/workbench";
import { craftRecipe } from "../../game-logic/crafting";
import { ProgressBar } from "../progress-bar/progress-bar";
import { getItemIcon } from "../../shared/item-helper";
import classNames from "classnames";

export function Workbench() {
    const workbench = useContext(WorkbenchContext);
    const inventory = useContext(InventoryContext);

    const onCraftRecipe = useCallback((recipe: Recipe) => {
      craftRecipe(inventory, workbench, recipe);
    }, [workbench, inventory]);

    return <div className="workbench">
      <h2>Workbench</h2>

      <div className="recipes">
        {Object.entries(recipes)
        .filter(([key, recipe]) => recipe.feature == RoomFeature.Workbench)
        .map(([key, recipe]) => 
          <div key={key} className="recipe">
            <div className="name">{recipe.name}</div>

            <div>Need:</div>
            <div className="consumed-items">
              {Array.from(recipe.consumedItems).map(([item, num]) => 
                <Tooltip key={item} placement="bottom" arrow title={item}>
                    <div
                      className={classNames("item", {
                        satisfied: inventory.canAffordItem(item, num),
                      })}
                    >
                    <img src={getItemIcon(item)} />
                    <span className="quantity">{num.toLocaleString()}</span>
                  </div>
                </Tooltip>
              )}
            </div>

            {workbench.isCrafting ? 
              <ProgressBar progress={workbench.progress} /> :
              <Button
                className="craft-button"
                onClick={() => onCraftRecipe(recipe)}
                variant="contained"
                color="success"
                disabled={!inventory.canAffordItems(recipe.consumedItems)}
              >
                Craft
              </Button>
            }
          </div>
        )}
      </div>
    </div>;
}