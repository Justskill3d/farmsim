import { CraftingRecipe, Item } from '../types';
import { getItemById } from './items';

// Create basic crafting components
const components: CraftingRecipe[] = [
  {
    id: 'wooden_plank',
    name: 'Wooden Plank',
    description: 'A basic crafting material.',
    category: 'component',
    ingredients: ['wood', 'wood'],
    result: getItemById('plank') || {
      id: 'plank',
      name: 'Wooden Plank',
      description: 'A basic crafting material.',
      type: 'component',
      value: 5,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/plank.png'
    }
  },
  {
    id: 'leather',
    name: 'Leather',
    description: 'Tanned hide for crafting.',
    category: 'component',
    ingredients: ['hide', 'salt'],
    result: getItemById('leather') || {
      id: 'leather',
      name: 'Leather',
      description: 'Tanned hide for crafting.',
      type: 'component',
      value: 25,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/leather.png'
    }
  },
  {
    id: 'copper_bar',
    name: 'Copper Bar',
    description: 'A refined copper bar.',
    category: 'component',
    ingredients: ['copper_ore', 'coal'],
    result: getItemById('copper_bar') || {
      id: 'copper_bar',
      name: 'Copper Bar',
      description: 'A refined copper bar.',
      type: 'component',
      value: 60,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/copper_bar.png'
    }
  },
  {
    id: 'iron_bar',
    name: 'Iron Bar',
    description: 'A refined iron bar.',
    category: 'component',
    ingredients: ['iron_ore', 'coal'],
    result: getItemById('iron_bar') || {
      id: 'iron_bar',
      name: 'Iron Bar',
      description: 'A refined iron bar.',
      type: 'component',
      value: 120,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/iron_bar.png'
    }
  },
  {
    id: 'tungsten_bar',
    name: 'Tungsten Bar',
    description: 'A refined tungsten bar.',
    category: 'component',
    ingredients: ['tungsten_ore', 'coal'],
    result: getItemById('tungsten_bar') || {
      id: 'tungsten_bar',
      name: 'Tungsten Bar',
      description: 'A refined tungsten bar.',
      type: 'component',
      value: 500,
      rarity: 'rare',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/tungsten_bar.png'
    }
  }
];

// Wood Set recipes
const woodSet: CraftingRecipe[] = [
  {
    id: 'wooden_helmet',
    name: 'Wooden Helmet',
    description: 'A helmet carved from sturdy wood.',
    category: 'equipment',
    ingredients: ['plank', 'leather'],
    result: getItemById('wooden_helmet') || {
      id: 'wooden_helmet',
      name: 'Wooden Helmet',
      description: 'A helmet carved from sturdy wood.',
      type: 'equipment',
      value: 40,
      rarity: 'common',
      stackable: false,
      maxStackSize: 1,
      imageUrl: 'public/assets/items/wooden_helmet.png',
      equipmentSlot: 'head',
      stats: {
        foraging: 2,
        energy: 1
      }
    }
  },
  {
    id: 'wooden_chestplate',
    name: 'Wooden Chestplate',
    description: 'A chestplate made of reinforced wood.',
    category: 'equipment',
    ingredients: ['plank', 'plank'],
    result: getItemById('wooden_chestplate') || {
      id: 'wooden_chestplate',
      name: 'Wooden Chestplate',
      description: 'A chestplate made of reinforced wood.',
      type: 'equipment',
      value: 60,
      rarity: 'common',
      stackable: false,
      maxStackSize: 1,
      imageUrl: 'public/assets/items/wooden_chestplate.png',
      equipmentSlot: 'torso',
      stats: {
        foraging: 3,
        energy: 2
      }
    }
  },
  {
    id: 'wooden_leggings',
    name: 'Wooden Leggings',
    description: 'Leggings crafted from treated wood.',
    category: 'equipment',
    ingredients: ['plank', 'leather'],
    result: getItemById('wooden_leggings') || {
      id: 'wooden_leggings',
      name: 'Wooden Leggings',
      description: 'Leggings crafted from treated wood.',
      type: 'equipment',
      value: 50,
      rarity: 'common',
      stackable: false,
      maxStackSize: 1,
      imageUrl: 'public/assets/items/wooden_leggings.png',
      equipmentSlot: 'legs',
      stats: {
        foraging: 2,
        speed: 1
      }
    }
  },
  {
    id: 'wooden_boots',
    name: 'Wooden Boots',
    description: 'Boots fashioned from lightweight wood.',
    category: 'equipment',
    ingredients: ['plank', 'leather'],
    result: getItemById('wooden_boots') || {
      id: 'wooden_boots',
      name: 'Wooden Boots',
      description: 'Boots fashioned from lightweight wood.',
      type: 'equipment',
      value: 35,
      rarity: 'common',
      stackable: false,
      maxStackSize: 1,
      imageUrl: 'public/assets/items/wooden_boots.png',
      equipmentSlot: 'boots',
      stats: {
        foraging: 1,
        speed: 2
      }
    }
  }
];

// Consumable recipes
const consumables: CraftingRecipe[] = [
  {
    id: 'health_potion',
    name: 'Health Potion',
    description: 'Restores 50 energy.',
    category: 'consumable',
    ingredients: ['mushroom', 'spring_onion'],
    result: getItemById('health_potion') || {
      id: 'health_potion',
      name: 'Health Potion',
      description: 'Restores 50 energy.',
      type: 'consumable',
      value: 100,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/health_potion.png',
      effects: {
        energy: 50
      }
    }
  },
  {
    id: 'energy_tonic',
    name: 'Energy Tonic',
    description: 'Temporarily increases energy regeneration.',
    category: 'consumable',
    ingredients: ['wild_horseradish', 'mushroom'],
    result: getItemById('energy_tonic') || {
      id: 'energy_tonic',
      name: 'Energy Tonic',
      description: 'Temporarily increases energy regeneration.',
      type: 'consumable',
      value: 150,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/energy_tonic.png',
      effects: {
        energy: 25,
        energyCostModifier: {
          activity: 'farming',
          amount: -0.2
        }
      }
    }
  }
];

// Meal recipes
const meals: CraftingRecipe[] = [
  {
    id: 'vegetable_soup',
    name: 'Vegetable Soup',
    description: 'A hearty soup that restores energy.',
    category: 'meal',
    ingredients: ['potato', 'wild_horseradish'],
    result: getItemById('vegetable_soup') || {
      id: 'vegetable_soup',
      name: 'Vegetable Soup',
      description: 'A hearty soup that restores energy.',
      type: 'meal',
      value: 120,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/vegetable_soup.png',
      effects: {
        energy: 75,
        experience: 10
      }
    }
  },
  {
    id: 'fish_stew',
    name: 'Fish Stew',
    description: 'A delicious stew that boosts fishing skill.',
    category: 'meal',
    ingredients: ['tuna', 'potato'],
    result: getItemById('fish_stew') || {
      id: 'fish_stew',
      name: 'Fish Stew',
      description: 'A delicious stew that boosts fishing skill.',
      type: 'meal',
      value: 200,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/fish_stew.png',
      effects: {
        energy: 100,
        skillBonus: {
          skill: 'fishing',
          amount: 2
        }
      }
    }
  }
];

// Relic recipes
const relics: CraftingRecipe[] = [
  {
    id: 'ancient_totem',
    name: 'Ancient Totem',
    description: 'A mysterious relic that brings good fortune.',
    category: 'relic',
    ingredients: ['ancient_doll', 'gold_ore'],
    result: getItemById('ancient_totem') || {
      id: 'ancient_totem',
      name: 'Ancient Totem',
      description: 'A mysterious relic that brings good fortune.',
      type: 'relic',
      value: 1000,
      rarity: 'epic',
      stackable: false,
      maxStackSize: 1,
      imageUrl: 'public/assets/items/ancient_totem.png',
      effects: {
        goldMultiplier: 1.2
      }
    }
  }
];

// Combine all recipes
export const craftingRecipes: CraftingRecipe[] = [
  ...components,
  ...woodSet,
  ...consumables,
  ...meals,
  ...relics
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