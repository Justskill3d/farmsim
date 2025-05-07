import { CraftingRecipe, Item } from '../types';
import { createItem } from './items';

// Create consumable items
const consumables: Item[] = [
  createItem(
    'energy_potion',
    'Energy Potion',
    'Restores 50 energy instantly',
    'consumable',
    100,
    'common',
    true,
    99,
    undefined,
    'consumable',
    { energy: 50 }
  ),
  createItem(
    'experience_potion',
    'Experience Potion',
    'Grants 2x experience for the next activity',
    'consumable',
    200,
    'uncommon',
    true,
    99,
    undefined,
    'consumable',
    { experience: 2 }
  ),
  createItem(
    'golden_apple',
    'Golden Apple',
    'Restores all energy and grants +10% gold for the day',
    'consumable',
    500,
    'rare',
    true,
    99,
    undefined,
    'consumable',
    { energy: 100, goldMultiplier: 1.1 }
  )
];

// Create relics
const relics: Item[] = [
  createItem(
    'miners_charm',
    "Miner's Charm",
    'Reduces mining energy cost by 2, increases other activities cost by 2',
    'relic',
    1000,
    'rare',
    false,
    1,
    undefined,
    'relic',
    {
      energyCostModifier: {
        activity: 'mining',
        amount: -2
      }
    }
  ),
  createItem(
    'golden_idol',
    'Golden Idol',
    'Increases gold earned by 25%',
    'relic',
    2000,
    'epic',
    false,
    1,
    undefined,
    'relic',
    { goldMultiplier: 1.25 }
  )
];

export const craftingRecipes: CraftingRecipe[] = [
  // Consumables
  {
    id: 'energy_potion_recipe',
    name: 'Energy Potion',
    description: 'Mix mushrooms with spring water to create an energy potion',
    category: 'consumable',
    ingredients: ['mushroom', 'spring_water'],
    result: consumables[0]
  },
  {
    id: 'experience_potion_recipe',
    name: 'Experience Potion',
    description: 'Combine rare herbs with magical essence',
    category: 'consumable',
    ingredients: ['rare_herb', 'magical_essence'],
    result: consumables[1]
  },
  {
    id: 'golden_apple_recipe',
    name: 'Golden Apple',
    description: 'Infuse a perfect apple with gold dust',
    category: 'consumable',
    ingredients: ['perfect_apple', 'gold_dust'],
    result: consumables[2]
  },
  
  // Relics
  {
    id: 'miners_charm_recipe',
    name: "Miner's Charm",
    description: 'Forge a charm using tungsten ore and a magical gem',
    category: 'relic',
    ingredients: ['tungsten_ore', 'prismatic_shard'],
    result: relics[0]
  },
  {
    id: 'golden_idol_recipe',
    name: 'Golden Idol',
    description: 'Create a powerful idol from gold and ancient artifacts',
    category: 'relic',
    ingredients: ['gold_bar', 'ancient_doll'],
    result: relics[1]
  }
];

export const findRecipe = (ingredient1: string, ingredient2: string): CraftingRecipe | undefined => {
  return craftingRecipes.find(recipe => {
    const [a, b] = recipe.ingredients;
    return (a === ingredient1 && b === ingredient2) || (a === ingredient2 && b === ingredient1);
  });
};

export const getRecipesByCategory = (category: string): CraftingRecipe[] => {
  return craftingRecipes.filter(recipe => recipe.category === category);
};

export const getAllRecipes = (): CraftingRecipe[] => craftingRecipes;