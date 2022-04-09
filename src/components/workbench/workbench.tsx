import { useContext } from "react";

import './workbench.scss';
import recipes from "../../config/recipes";
import { RoomFeature } from "../../shared/types";
import { InventoryContext } from "../../contexts/inventory";
import { WorkbenchContext } from "../../contexts/workbench";
import { Button } from "@mui/material";

export function Workbench() {
    const workbench = useContext(WorkbenchContext);
    const inventory = useContext(InventoryContext);

    return <div className="workbench">
      <h2>Workbench</h2>

      <div className="recipes">
        {Object.entries(recipes)
        .filter(([key, recipe]) => recipe.feature == RoomFeature.Workbench)
        .map(([key, recipe]) => 
          <div key={key} className="recipe">
            <div className="name">{recipe.name}</div>

            <div className="produces">
              <span>Create a</span>
              {recipe.producedItem}
            </div>

            <div>Need:</div>
            <div className="consumed-items">
              {Array.from(recipe.consumedItems).map(([item, num]) => 
                <div>{item} - {num}</div>
              )}
            </div>

            <Button>Craft</Button>
          </div>
        )}
      </div>
    </div>;
}