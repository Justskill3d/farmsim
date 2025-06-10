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
    id: 'dough',
    name: 'Dough',
    description: 'Basic bread dough.',
    category: 'component',
    ingredients: ['flour', 'water'],
    result: getItemById('dough') || {
      id: 'dough',
      name: 'Dough',
      description: 'Basic bread dough.',
      type: 'component',
      value: 30,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99
    }
  },
  {
    id: 'broth',
    name: 'Vegetable Broth',
    description: 'A flavorful cooking base.',
    category: 'component',
    ingredients: ['wild_horseradish', 'spring_onion'],
    result: getItemById('broth') || {
      id: 'broth',
      name: 'Vegetable Broth',
      description: 'A flavorful cooking base.',
      type: 'component',
      value: 40,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99
    }
  }
];

// Meal recipes
const meals: CraftingRecipe[] = [
  {
    id: 'fish_stew',
    name: 'Fish Stew',
    description: 'A hearty seafood dish.',
    category: 'meal',
    ingredients: ['tuna', 'broth'],
    result: getItemById('fish_stew') || {
      id: 'fish_stew',
      name: 'Fish Stew',
      description: 'A hearty seafood dish.',
      type: 'meal',
      value: 180,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 99,
      effects: {
        energy: 45,
        experience: 25,
        skillBonus: {
          skill: 'fishing',
          amount: 15
        }
      }
    }
  },
  {
    id: 'mushroom_soup',
    name: 'Mushroom Soup',
    description: 'A warming forest soup.',
    category: 'meal',
    ingredients: ['mushroom', 'broth'],
    result: getItemById('mushroom_soup') || {
      id: 'mushroom_soup',
      name: 'Mushroom Soup',
      description: 'A warming forest soup.',
      type: 'meal',
      value: 120,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      effects: {
        energy: 30,
        experience: 20,
        skillBonus: {
          skill: 'foraging',
          amount: 10
        }
      }
    }
  },
  {
    id: 'vegetable_medley',
    name: 'Vegetable Medley',
    description: 'A healthy mix of vegetables.',
    category: 'meal',
    ingredients: ['parsnip', 'potato'],
    result: getItemById('vegetable_medley') || {
      id: 'vegetable_medley',
      name: 'Vegetable Medley',
      description: 'A healthy mix of vegetables.',
      type: 'meal',
      value: 150,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      effects: {
        energy: 35,
        experience: 20,
        skillBonus: {
          skill: 'farming',
          amount: 12
        }
      }
    }
  },
  {
    id: 'seafood_gumbo',
    name: 'Seafood Gumbo',
    description: 'A spicy seafood stew.',
    category: 'meal',
    ingredients: ['fish_stew', 'herbs'],
    result: getItemById('seafood_gumbo') || {
      id: 'seafood_gumbo',
      name: 'Seafood Gumbo',
      description: 'A spicy seafood stew.',
      type: 'meal',
      value: 400,
      rarity: 'rare',
      stackable: true,
      maxStackSize: 99,
      effects: {
        energy: 80,
        experience: 45,
        skillBonus: {
          skill: 'cooking',
          amount: 25
        }
      }
    }
  }
];

// Combine all recipes
export const craftingRecipes: CraftingRecipe[] = [
  ...components,
  ...meals
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