import { CraftingRecipe } from '../types';
import { getItemById } from './items';

export const craftingRecipes: CraftingRecipe[] = [
  {
    id: 'scarecrow',
    name: 'Scarecrow',
    description: 'Prevents crows from eating your crops.',
    result: getItemById('scarecrow') || {
      id: 'scarecrow',
      name: 'Scarecrow',
      description: 'Prevents crows from eating your crops.',
      type: 'craftable',
      value: 100,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 10,
      imageUrl: '/assets/items/scarecrow.png'
    },
    quantity: 1,
    ingredients: [
      { itemId: 'coal', quantity: 1 },
      { itemId: 'stone', quantity: 1 }
      
    ],
    unlocked: true
  },
  {
    id: 'chest',
    name: 'Chest',
    description: 'Expands your inventory by 8 slots.',
    result: getItemById('chest') || {
      id: 'chest',
      name: 'Chest',
      description: 'Expands your inventory by 8 slots.',
      type: 'craftable',
      value: 250,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 5,
      imageUrl: '/assets/items/chest.png'
    },
    quantity: 1,
    ingredients: [
      { itemId: 'wood', quantity: 50 },
      { itemId: 'stone', quantity: 25 }
    ],
    unlocked: true
  },
  {
    id: 'fertilizer',
    name: 'Basic Fertilizer',
    description: 'Increases crop quality.',
    result: getItemById('fertilizer') || {
      id: 'fertilizer',
      name: 'Basic Fertilizer',
      description: 'Increases crop quality.',
      type: 'craftable',
      value: 5,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      imageUrl: '/assets/items/fertilizer.png'
    },
    quantity: 5,
    ingredients: [
      { itemId: 'stone', quantity: 2 }
    ],
    unlocked: true
  },
  {
    id: 'crab_pot',
    name: 'Crab Pot',
    description: 'Catches crab and lobster overnight.',
    result: getItemById('crab_pot') || {
      id: 'crab_pot',
      name: 'Crab Pot',
      description: 'Catches crab and lobster overnight.',
      type: 'craftable',
      value: 150,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 10,
      imageUrl: '/assets/items/crab_pot.png'
    },
    quantity: 1,
    ingredients: [
      { itemId: 'iron_ore', quantity: 5 },
      { itemId: 'wood', quantity: 40 }
    ],
    unlocked: false
  },
  {
    id: 'copper_bar',
    name: 'Copper Bar',
    description: 'A bar of refined copper.',
    result: getItemById('copper_bar') || {
      id: 'copper_bar',
      name: 'Copper Bar',
      description: 'A bar of refined copper.',
      type: 'craftable',
      value: 60,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 99,
      imageUrl: '/assets/items/copper_bar.png'
    },
    quantity: 1,
    ingredients: [
      { itemId: 'copper_ore', quantity: 3 },
      { itemId: 'coal', quantity: 1 }
    ],
    unlocked: true
  },
  {
    id: 'iron_bar',
    name: 'Iron Bar',
    description: 'A bar of refined iron.',
    result: getItemById('iron_bar') || {
      id: 'iron_bar',
      name: 'Iron Bar',
      description: 'A bar of refined iron.',
      type: 'craftable',
      value: 120,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 99,
      imageUrl: '/assets/items/iron_bar.png'
    },
    quantity: 1,
    ingredients: [
      { itemId: 'iron_ore', quantity: 3 },
      { itemId: 'coal', quantity: 1 }
    ],
    unlocked: false
  },
  {
    id: 'gold_bar',
    name: 'Gold Bar',
    description: 'A bar of refined gold.',
    result: getItemById('gold_bar') || {
      id: 'gold_bar',
      name: 'Gold Bar',
      description: 'A bar of refined gold.',
      type: 'craftable',
      value: 250,
      rarity: 'rare',
      stackable: true,
      maxStackSize: 99,
      imageUrl: '/assets/items/gold_bar.png'
    },
    quantity: 1,
    ingredients: [
      { itemId: 'gold_ore', quantity: 3 },
      { itemId: 'coal', quantity: 2 }
    ],
    unlocked: false
  }
];

// Get recipe by ID
export const getRecipeById = (id: string): CraftingRecipe | undefined => {
  return craftingRecipes.find(recipe => recipe.id === id);
};

// Get recipes by ingredient
export const getRecipesByIngredient = (itemId: string): CraftingRecipe[] => {
  return craftingRecipes.filter(recipe => 
    recipe.ingredients.some(ingredient => ingredient.itemId === itemId)
  );
};

// Add a missing item to the recipes data
export const addMissingItem = (id: string, name: string, type: string): void => {
  // This function would add missing items to the allItems array
  // Implementation would depend on how we manage state
  console.log(`Missing item: ${id}, ${name}, ${type}`);
};