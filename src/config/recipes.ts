import { mapValues } from 'lodash';

import { ItemType, RecipeWithoutId, RoomFeature } from "../shared/types";

const RECIPES = {
  'fix-flashlight': {
    name: "Fix Flashlight",
    feature: RoomFeature.Workbench,
    durationSec: 20,
    consumedItems: new Map([
      [ItemType.BrokenFlashlight, 1],
      [ItemType.LightBulb, 1],
      [ItemType.Wires, 4]
    ]),
    limit: 1,
    result: { feature: 'flashlight' },
  } 
} satisfies Record<string, Omit<Recipe, 'id'>>;

export type RecipeId = keyof typeof RECIPES;

export type Recipe = {
  id: RecipeId,
} & RecipeWithoutId;

export const recipes: Record<RecipeId, Recipe> = mapValues(RECIPES, (recipe, id) => ({
  ...recipe, id: id as RecipeId,
}))