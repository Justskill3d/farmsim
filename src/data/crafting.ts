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
  },
  // Metal Bar Recipes
  {
    id: 'copper_bar',
    name: 'Copper Bar',
    description: 'Smelt copper ore with coal to create refined copper.',
    category: 'component',
    ingredients: ['copper_ore', 'coal'],
    result: getItemById('copper_bar') || {
      id: 'copper_bar',
      name: 'Copper Bar',
      description: 'Refined copper ready for crafting.',
      type: 'component',
      value: 50,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99
    }
  },
  {
    id: 'iron_bar',
    name: 'Iron Bar',
    description: 'Smelt iron ore with coal to create refined iron.',
    category: 'component',
    ingredients: ['iron_ore', 'coal'],
    result: getItemById('iron_bar') || {
      id: 'iron_bar',
      name: 'Iron Bar',
      description: 'Refined iron ready for crafting.',
      type: 'component',
      value: 100,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 99
    }
  },
  {
    id: 'gold_bar',
    name: 'Gold Bar',
    description: 'Smelt gold ore with coal to create refined gold.',
    category: 'component',
    ingredients: ['gold_ore', 'coal'],
    result: getItemById('gold_bar') || {
      id: 'gold_bar',
      name: 'Gold Bar',
      description: 'Refined gold ready for crafting.',
      type: 'component',
      value: 400,
      rarity: 'rare',
      stackable: true,
      maxStackSize: 99
    }
  },
  {
    id: 'tungsten_bar',
    name: 'Tungsten Bar',
    description: 'Smelt tungsten ore with coal to create refined tungsten.',
    category: 'component',
    ingredients: ['tungsten_ore', 'coal'],
    result: getItemById('tungsten_bar') || {
      id: 'tungsten_bar',
      name: 'Tungsten Bar',
      description: 'Refined tungsten ready for crafting.',
      type: 'component',
      value: 800,
      rarity: 'epic',
      stackable: true,
      maxStackSize: 99
    }
  },
  {
    id: 'leather',
    name: 'Leather',
    description: 'Tan hide with salt to produce usable leather.',
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
  }
];

// Meal recipes
const meals: CraftingRecipe[] = [
  {
    id: 'fried_egg',
    name: 'Fried Egg',
    description: 'A simple breakfast fried in butter and oil.',
    category: 'meal',
    ingredients: ['butter', 'oil'],
    result: getItemById('fried_egg') || {
      id: 'fried_egg',
      name: 'Fried Egg',
      description: 'A basic breakfast.',
      type: 'meal',
      value: 35,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/fried_egg.png',
      effects: { energy: 15, experience: 10 }
    }
  },
  {
    id: 'hashbrowns',
    name: 'Hashbrowns',
    description: 'Crispy fried potato cooked in oil.',
    category: 'meal',
    ingredients: ['potato', 'oil'],
    result: getItemById('hashbrowns') || {
      id: 'hashbrowns',
      name: 'Hashbrowns',
      description: 'Crispy potato goodness.',
      type: 'meal',
      value: 50,
      rarity: 'common',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/hashbrowns.png',
      effects: { energy: 20, experience: 15 }
    }
  },
  {
    id: 'complete_breakfast',
    name: 'Complete Breakfast',
    description: 'Combine a fried egg and hashbrowns for the perfect morning meal.',
    category: 'meal',
    ingredients: ['fried_egg', 'hashbrowns'],
    result: getItemById('complete_breakfast') || {
      id: 'complete_breakfast',
      name: 'Complete Breakfast',
      description: 'The perfect start to the day.',
      type: 'meal',
      value: 350,
      rarity: 'rare',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/complete_breakfast.png',
      effects: { energy: 75, experience: 40 }
    }
  },
  {
    id: 'lucky_lunch',
    name: 'Lucky Lunch',
    description: 'Salmon served over rice for a fortunate midday meal.',
    category: 'meal',
    ingredients: ['salmon', 'rice'],
    result: getItemById('lucky_lunch') || {
      id: 'lucky_lunch',
      name: 'Lucky Lunch',
      description: 'Brings good fortune.',
      type: 'meal',
      value: 250,
      rarity: 'uncommon',
      stackable: true,
      maxStackSize: 99,
      imageUrl: 'public/assets/items/lucky_lunch.png',
      effects: {
        energy: 50,
        experience: 30,
        skillBonus: { skill: 'fishing', amount: 20 }
      }
    }
  },
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

// Armor recipes — each piece uses a unique ingredient pair so findRecipe() resolves unambiguously
const armor: CraftingRecipe[] = [
  // Wooden set
  {
    id: 'wooden_helmet',
    name: 'Wooden Helmet',
    description: 'Shape planks and fiber into a lightweight wooden helmet.',
    category: 'equipment',
    ingredients: ['plank', 'fiber'],
    result: getItemById('wooden_helmet')!
  },
  {
    id: 'wooden_chestplate',
    name: 'Wooden Chestplate',
    description: 'Reinforce planks with leather to form a wooden chestplate.',
    category: 'equipment',
    ingredients: ['plank', 'leather'],
    result: getItemById('wooden_chestplate')!
  },
  {
    id: 'wooden_leggings',
    name: 'Wooden Leggings',
    description: 'Bind planks and raw wood together into sturdy leggings.',
    category: 'equipment',
    ingredients: ['plank', 'wood'],
    result: getItemById('wooden_leggings')!
  },
  {
    id: 'wooden_boots',
    name: 'Wooden Boots',
    description: 'Weave leather and fiber around a wooden sole.',
    category: 'equipment',
    ingredients: ['leather', 'fiber'],
    result: getItemById('wooden_boots')!
  },
  // Iron set
  {
    id: 'iron_helmet',
    name: 'Iron Helmet',
    description: 'Forge an iron bar and leather into a sturdy iron helmet.',
    category: 'equipment',
    ingredients: ['iron_bar', 'leather'],
    result: getItemById('iron_helmet')!
  },
  {
    id: 'iron_chestplate',
    name: 'Iron Chestplate',
    description: 'Combine an iron bar and a wooden plank to form an iron chestplate.',
    category: 'equipment',
    ingredients: ['iron_bar', 'plank'],
    result: getItemById('iron_chestplate')!
  },
  {
    id: 'iron_leggings',
    name: 'Iron Leggings',
    description: 'Weave an iron bar with fiber into protective iron leggings.',
    category: 'equipment',
    ingredients: ['iron_bar', 'fiber'],
    result: getItemById('iron_leggings')!
  },
  {
    id: 'iron_boots',
    name: 'Iron Boots',
    description: 'Set an iron bar in stone to forge heavy iron boots.',
    category: 'equipment',
    ingredients: ['iron_bar', 'stone'],
    result: getItemById('iron_boots')!
  },
  // Tungsten set
  {
    id: 'tungsten_helmet',
    name: 'Tungsten Helmet',
    description: 'Fuse a tungsten bar with an iron bar to craft an exceptional helmet.',
    category: 'equipment',
    ingredients: ['tungsten_bar', 'iron_bar'],
    result: getItemById('tungsten_helmet')!
  },
  {
    id: 'tungsten_chestplate',
    name: 'Tungsten Chestplate',
    description: 'Layer a tungsten bar over leather to forge a masterwork chestplate.',
    category: 'equipment',
    ingredients: ['tungsten_bar', 'leather'],
    result: getItemById('tungsten_chestplate')!
  },
  {
    id: 'tungsten_leggings',
    name: 'Tungsten Leggings',
    description: 'Mount a tungsten bar onto a plank frame for superior leg protection.',
    category: 'equipment',
    ingredients: ['tungsten_bar', 'plank'],
    result: getItemById('tungsten_leggings')!
  },
  {
    id: 'tungsten_boots',
    name: 'Tungsten Boots',
    description: 'Bind a tungsten bar with fiber to craft exceptional boots.',
    category: 'equipment',
    ingredients: ['tungsten_bar', 'fiber'],
    result: getItemById('tungsten_boots')!
  }
];

// Accessories — rings, amulets, gloves, belts
const accessories: CraftingRecipe[] = [
  // Rings
  {
    id: 'ring_of_harvest',
    name: 'Ring of Harvest',
    description: 'Set a gold bar with a parsnip to forge a ring of bountiful harvests.',
    category: 'equipment',
    ingredients: ['gold_bar', 'parsnip'],
    result: getItemById('ring_of_harvest')!
  },
  {
    id: 'ring_of_the_deep',
    name: 'Ring of the Deep',
    description: 'Fuse a gold bar with coal to forge a ring attuned to the mines.',
    category: 'equipment',
    ingredients: ['gold_bar', 'coal'],
    result: getItemById('ring_of_the_deep')!
  },
  {
    id: 'ring_of_tides',
    name: 'Ring of Tides',
    description: 'Combine a gold bar with salmon to craft a ring that calls to the sea.',
    category: 'equipment',
    ingredients: ['gold_bar', 'salmon'],
    result: getItemById('ring_of_tides')!
  },
  {
    id: 'ring_of_the_wild',
    name: 'Ring of the Wild',
    description: 'Bind a gold bar with a truffle to weave a ring of the forest.',
    category: 'equipment',
    ingredients: ['gold_bar', 'truffle'],
    result: getItemById('ring_of_the_wild')!
  },
  {
    id: 'golden_ring',
    name: 'Golden Ring',
    description: 'Combine two gold bars into a pure golden ring of fortune.',
    category: 'equipment',
    ingredients: ['gold_bar', 'gold_bar'],
    result: getItemById('golden_ring')!
  },
  {
    id: 'prismatic_ring',
    name: 'Prismatic Ring',
    description: 'Set a prismatic shard in gold to create the ultimate ring.',
    category: 'equipment',
    ingredients: ['prismatic_shard', 'gold_bar'],
    result: getItemById('prismatic_ring')!
  },
  // Amulets
  {
    id: 'wooden_amulet',
    name: 'Wooden Amulet',
    description: 'Carve wood and bind it with leather into a simple charm.',
    category: 'equipment',
    ingredients: ['wood', 'leather'],
    result: getItemById('wooden_amulet')!
  },
  {
    id: 'iron_amulet',
    name: 'Iron Amulet',
    description: 'Forge an iron bar with coal into a weighty pendant.',
    category: 'equipment',
    ingredients: ['iron_bar', 'coal'],
    result: getItemById('iron_amulet')!
  },
  {
    id: 'amulet_of_plenty',
    name: 'Amulet of Plenty',
    description: 'Infuse a gold bar with aromatic herbs to craft an amulet of abundance.',
    category: 'equipment',
    ingredients: ['gold_bar', 'herbs'],
    result: getItemById('amulet_of_plenty')!
  },
  {
    id: 'amulet_of_fortune',
    name: 'Amulet of Fortune',
    description: 'Mount a diamond in gold to create a legendary amulet.',
    category: 'equipment',
    ingredients: ['diamond', 'gold_bar'],
    result: getItemById('amulet_of_fortune')!
  },
  // Gloves
  {
    id: 'leather_gloves',
    name: 'Leather Gloves',
    description: 'Stitch two pieces of leather into protective gloves.',
    category: 'equipment',
    ingredients: ['leather', 'leather'],
    result: getItemById('leather_gloves')!
  },
  {
    id: 'iron_gauntlets',
    name: 'Iron Gauntlets',
    description: 'Forge two iron bars into heavy gauntlets.',
    category: 'equipment',
    ingredients: ['iron_bar', 'iron_bar'],
    result: getItemById('iron_gauntlets')!
  },
  {
    id: 'tungsten_gauntlets',
    name: 'Tungsten Gauntlets',
    description: 'Hammer two tungsten bars into indestructible gauntlets.',
    category: 'equipment',
    ingredients: ['tungsten_bar', 'tungsten_bar'],
    result: getItemById('tungsten_gauntlets')!
  },
  // Belts
  {
    id: 'leather_belt',
    name: 'Leather Belt',
    description: 'Tan leather with hide to fashion a sturdy belt.',
    category: 'equipment',
    ingredients: ['leather', 'hide'],
    result: getItemById('leather_belt')!
  },
  {
    id: 'iron_belt',
    name: 'Iron Belt',
    description: 'Reinforce raw hide with an iron bar for a durable belt.',
    category: 'equipment',
    ingredients: ['iron_bar', 'hide'],
    result: getItemById('iron_belt')!
  },
  {
    id: 'champions_belt',
    name: "Champion's Belt",
    description: 'Combine a gold bar with fine leather to craft a champion-worthy belt.',
    category: 'equipment',
    ingredients: ['gold_bar', 'leather'],
    result: getItemById('champions_belt')!
  }
];

// Combine all recipes
export const craftingRecipes: CraftingRecipe[] = [
  ...components,
  ...meals,
  ...armor,
  ...accessories
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