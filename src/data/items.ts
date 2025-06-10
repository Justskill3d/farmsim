import { Item, ItemType, ItemRarity, ToolTier, CraftingCategory, Activity } from '../types';

export const createItem = (
  id: string,
  name: string,
  description: string,
  type: ItemType,
  value: number,
  rarity: ItemRarity = 'common',
  stackable: boolean = true,
  maxStackSize: number = 99,
  tier?: ToolTier,
  craftingCategory?: CraftingCategory,
  effects?: {
    energy?: number;
    experience?: number;
    skillBonus?: {
      skill: Activity;
      amount: number;
    };
    goldMultiplier?: number;
    energyCostModifier?: {
      activity: Activity;
      amount: number;
    };
  },
  equipmentSlot?: string,
  stats?: {
    farming?: number;
    fishing?: number;
    mining?: number;
    foraging?: number;
    cooking?: number;
    energy?: number;
    speed?: number;
    luck?: number;
  }
): Item => ({
  id,
  name,
  description,
  type,
  value,
  rarity,
  stackable,
  maxStackSize,
  imageUrl: `public/assets/items/${id}.png`,
  tier,
  craftingCategory,
  effects,
  equipmentSlot,
  stats
});

// 1. Tools
export const tools: Item[] = [
  createItem('hoe', 'Basic Hoe', 'Used for tilling soil.', 'tool', 0, 'common', false, 1, 'basic'),
  createItem('watering_can', 'Basic Watering Can', 'Used for watering crops.', 'tool', 0, 'common', false, 1, 'basic'),
  createItem('fishing_rod', 'Basic Fishing Rod', 'Used for catching fish.', 'tool', 0, 'common', false, 1, 'basic'),
  createItem('pickaxe', 'Basic Pickaxe', 'Used for mining ores and breaking rocks.', 'tool', 0, 'common', false, 1, 'basic'),
  createItem('axe', 'Basic Axe', 'Used for chopping wood.', 'tool', 0, 'common', false, 1, 'basic'),
];

// 2. Seeds and Plants
export const seeds: Item[] = [
  createItem('parsnip_seeds', 'Parsnip Seeds', 'Plant these in spring.', 'seed', 20, 'common', true, 99, 4),
  createItem('potato_seeds', 'Potato Seeds', 'Plant these in spring.', 'seed', 30, 'common', true, 99, 6),
  createItem('cauliflower_seeds', 'Cauliflower Seeds', 'Plant these in spring.', 'seed', 40, 'common', true, 99, 12),
  createItem('melon_seeds', 'Melon Seeds', 'Plant these in summer.', 'seed', 80, 'common', true, 99, 12),
  createItem('pumpkin_seeds', 'Pumpkin Seeds', 'Plant these in fall.', 'seed', 100, 'common', true, 99, 13),
];

export const plants: Item[] = [
  createItem('parsnip', 'Parsnip', 'A spring root vegetable.', 'crop', 35),
  createItem('potato', 'Potato', 'A starchy tuber.', 'crop', 50),
  createItem('cauliflower', 'Cauliflower', 'Prized for its delicate flavor.', 'crop', 100, 'uncommon'),
  createItem('melon', 'Melon', 'Sweet summer fruit.', 'crop', 250, 'uncommon'),
  createItem('pumpkin', 'Pumpkin', 'A fall favorite.', 'crop', 320, 'uncommon'),
];

// 3. Fish
export const fish: Item[] = [
  createItem('anchovy', 'Anchovy', 'A small ocean fish.', 'fish', 30),
  createItem('sardine', 'Sardine', 'A common ocean fish.', 'fish', 40),
  createItem('tuna', 'Tuna', 'A large, powerful fish.', 'fish', 100, 'uncommon'),
  createItem('salmon', 'Salmon', 'Swims upstream to spawn.', 'fish', 75,'uncommon'),
  createItem('sturgeon', 'Sturgeon', 'An ancient fish species.', 'fish', 200, 'rare'),
  createItem('legendary_fish', 'Legendary Fish', 'A mythical creature of the deep.', 'fish', 1000, 'legendary', false, 1),
];

// 4. Ores and Gems
export const minerals: Item[] = [
  createItem('coal', 'Coal', 'A common mineral used for smelting.', 'mineral', 25, 'common'),
  createItem('copper_ore', 'Copper Ore', 'A common ore.', 'mineral', 15),
  createItem('iron_ore', 'Iron Ore', 'A valuable ore.', 'mineral', 40),
  createItem('gold_ore', 'Gold Ore', 'A precious metal ore.', 'mineral', 150, 'rare'),
  createItem('tungsten_ore', 'Tungsten Ore', 'A rare and valuable ore.', 'mineral', 300, 'epic'),
  createItem('ruby', 'Ruby', 'A precious red gem.', 'mineral', 250, 'rare'),
  createItem('emerald', 'Emerald', 'A precious green gem.', 'mineral', 300, 'rare'),
  createItem('diamond', 'Diamond', 'A rare and valuable gem.', 'mineral', 750, 'epic'),
  createItem('prismatic_shard', 'Prismatic Shard', 'A mysterious crystalline form.', 'mineral', 2000, 'legendary'),
  createItem('salt', 'Salt', 'A mineral essential for crafting.', 'mineral', 10, 'common'),
];

// 5. Forageable Items
export const foraged: Item[] = [
  createItem('wild_horseradish', 'Wild Horseradish', 'Spring forage.', 'foraged', 50),
  createItem('spring_onion', 'Spring Onion', 'Found in spring and it is an onion', 'foraged', 40),
  createItem('blackberry', 'Blackberry', 'Fall forage.', 'foraged', 45),
  createItem('mushroom', 'Mushroom', 'Found in all seasons.', 'foraged', 40),
  createItem('truffle', 'Truffle', 'A rare delicacy.', 'foraged', 625, 'rare'),
  createItem('golden_walnut', 'Golden Walnut', 'A mysterious nut.', 'foraged', 1000, 'epic'),
  createItem('fiber', 'Fiber', 'Used in crafting. Maybe.', 'foraged', 5),
  createItem('hide', 'Hide', 'Animal hide for crafting.', 'foraged', 15),
  createItem('herbs', 'Fresh Herbs', 'Aromatic herbs for cooking.', 'foraged', 25, 'common'),
  createItem('wild_garlic', 'Wild Garlic', 'Adds flavor to dishes.', 'foraged', 35, 'common'),
  createItem('bay_leaf', 'Bay Leaf', 'A fragrant leaf for seasoning.', 'foraged', 30, 'common'),
  createItem('water', 'Fresh Water', 'Clean water for cooking and crafting.', 'foraged', 5, 'common', true, 99),
];

// 6. Resources
export const resources: Item[] = [
  createItem('stone', 'Stone', 'Basic building material.', 'resource', 2, 'common', true, 999),
  createItem('wood', 'Wood', 'Basic crafting material.', 'resource', 2, 'common', true, 999),
  createItem('hardwood', 'Hardwood', 'High-quality wood.', 'resource', 15, 'uncommon'),
  createItem('clay', 'Clay', 'Used in crafting.', 'resource', 10),
  createItem('fiber', 'Fiber', 'Used in crafting.', 'resource', 5),
];

// 7. Cooking Ingredients
export const cookingIngredients: Item[] = [
  createItem('flour', 'Flour', 'Basic baking ingredient.', 'component', 15, 'common'),
  createItem('butter', 'Butter', 'Made from fresh cream.', 'component', 25, 'common'),
  createItem('oil', 'Cooking Oil', 'For frying and sautéing.', 'component', 20, 'common'),
  createItem('sugar', 'Sugar', 'Sweetens any dish.', 'component', 15, 'common'),
  createItem('rice', 'Rice', 'A versatile grain.', 'component', 20, 'common'),
  createItem('dough', 'Dough', 'Made from flour and water.', 'component', 30, 'common'),
  createItem('broth', 'Vegetable Broth', 'Base for soups and sauces.', 'component', 40, 'common'),
];

// 8. Meals
export const meals: Item[] = [
  createItem('fried_egg', 'Fried Egg', 'A basic breakfast.', 'meal', 35, 'common', true, 99, undefined, undefined, {
    energy: 15,
    experience: 10
  }),
  createItem('hashbrowns', 'Hashbrowns', 'Crispy potato goodness.', 'meal', 50, 'common', true, 99, undefined, undefined, {
    energy: 20,
    experience: 15
  }),
  createItem('fish_stew', 'Fish Stew', 'A hearty seafood dish.', 'meal', 180, 'uncommon', true, 99, undefined, undefined, {
    energy: 45,
    experience: 25,
    skillBonus: {
      skill: 'fishing',
      amount: 15
    }
  }),
  createItem('mushroom_soup', 'Mushroom Soup', 'A warming forest soup.', 'meal', 120, 'common', true, 99, undefined, undefined, {
    energy: 30,
    experience: 20,
    skillBonus: {
      skill: 'foraging',
      amount: 10
    }
  }),
  createItem('vegetable_medley', 'Vegetable Medley', 'A healthy mix of vegetables.', 'meal', 150, 'common', true, 99, undefined, undefined, {
    energy: 35,
    experience: 20,
    skillBonus: {
      skill: 'farming',
      amount: 12
    }
  }),
  createItem('complete_breakfast', 'Complete Breakfast', 'The perfect start.', 'meal', 350, 'rare', true, 99, undefined, undefined, {
    energy: 75,
    experience: 40,
    energyCostModifier: {
      activity: 'farming',
      amount: -0.2
    }
  }),
  createItem('lucky_lunch', 'Lucky Lunch', 'Brings good fortune.', 'meal', 250, 'uncommon', true, 99, undefined, undefined, {
    energy: 50,
    experience: 30,
    skillBonus: {
      skill: 'fishing',
      amount: 20
    }
  }),
  createItem('seafood_gumbo', 'Seafood Gumbo', 'A spicy favorite.', 'meal', 400, 'rare', true, 99, undefined, undefined, {
    energy: 80,
    experience: 45,
    skillBonus: {
      skill: 'cooking',
      amount: 25
    }
  }),
];

// 9. Treasures
export const treasures: Item[] = [
  createItem('ancient_doll', 'Ancient Doll', 'A mysterious artifact.', 'treasure', 300, 'rare'),
  createItem('dinosaur_egg', 'Dinosaur Egg', 'A prehistoric find.', 'treasure', 500, 'epic'),
  createItem('golden_pumpkin', 'Golden Pumpkin', 'A rare treasure.', 'treasure', 2500, 'epic'),
  createItem('pearl', 'Pearl', 'A beautiful gem from the sea.', 'treasure', 1000, 'rare'),
  createItem('treasure_chest', 'Treasure Chest', 'Contains valuable items.', 'treasure', 5000, 'legendary'),
];

// 10. Equipment
export const equipment: Item[] = [
  // Wood Set
  createItem('wooden_helmet', 'Wooden Helmet', 'A helmet carved from sturdy wood.', 'equipment', 40, 'common', false, 1, undefined, 'equipment', undefined, 'head', {
    foraging: 2,
    energy: 1
  }),
  createItem('wooden_chestplate', 'Wooden Chestplate', 'A chestplate made of reinforced wood.', 'equipment', 60, 'common', false, 1, undefined, 'equipment', undefined, 'torso', {
    foraging: 3,
    energy: 2
  }),
  createItem('wooden_leggings', 'Wooden Leggings', 'Leggings crafted from treated wood.', 'equipment', 50, 'common', false, 1, undefined, 'equipment', undefined, 'legs', {
    foraging: 2,
    speed: 1
  }),
  createItem('wooden_boots', 'Wooden Boots', 'Boots fashioned from lightweight wood.', 'equipment', 35, 'common', false, 1, undefined, 'equipment', undefined, 'boots', {
    foraging: 1,
    speed: 2
  }),
  
  // Components
  createItem('plank', 'Wooden Plank', 'A basic crafting material.', 'component', 5, 'common'),
  createItem('leather', 'Leather', 'Tanned hide for crafting.', 'component', 25, 'common'),
  
  // Iron Set
  createItem('iron_helmet', 'Iron Helmet', 'Sturdy head protection.', 'equipment', 150, 'uncommon', false, 1, undefined, 'equipment', undefined, 'head'),
  createItem('iron_chestplate', 'Iron Chestplate', 'Durable torso protection.', 'equipment', 200, 'uncommon', false, 1, undefined, 'equipment', undefined, 'torso'),
  createItem('iron_leggings', 'Iron Leggings', 'Reliable leg protection.', 'equipment', 175, 'uncommon', false, 1, undefined, 'equipment', undefined, 'legs'),
  createItem('iron_boots', 'Iron Boots', 'Strong foot protection.', 'equipment', 125, 'uncommon', false, 1, undefined, 'equipment', undefined, 'boots'),

  // Tungsten Set
  createItem('tungsten_helmet', 'Tungsten Helmet', 'An exceptional tungsten helmet.', 'equipment', 800, 'epic', false, 1, undefined, 'equipment', undefined, 'head', {
    mining: 8,
    energy: 7,
    luck: 2
  }),
  createItem('tungsten_chestplate', 'Tungsten Chestplate', 'A masterwork tungsten chestplate.', 'equipment', 1200, 'epic', false, 1, undefined, 'equipment', undefined, 'torso', {
    mining: 10,
    energy: 8,
    luck: 3
  }),
  createItem('tungsten_leggings', 'Tungsten Leggings', 'Superior tungsten leg protection.', 'equipment', 1000, 'epic', false, 1, undefined, 'equipment', undefined, 'legs', {
    mining: 8,
    speed: 7,
    luck: 2
  }),
  createItem('tungsten_boots', 'Tungsten Boots', 'Exceptional tungsten boots.', 'equipment', 700, 'epic', false, 1, undefined, 'equipment', undefined, 'boots', {
    mining: 7,
    speed: 8,
    luck: 2
  })
];

export const trash: Item[] = [
  createItem('stonedust', 'Stone Dust', 'Just some particles of dust', 'trash', 0, 'common'),
  createItem('old_seed', 'Old Seed', 'It died quiet some time ago', 'trash', 0, 'common'),
  createItem('dry_leave', 'Dry Leaf', 'A fallen leaf from a tree', 'trash', 0, 'common'),
  createItem('old_can', 'Old tin can', 'A can made of alumininum, not tin', 'trash', 0, 'common')
];

// All items combined
export const allItems: Item[] = [
  ...tools,
  ...seeds,
  ...plants,
  ...fish,
  ...minerals,
  ...foraged,
  ...resources,
  ...cookingIngredients,
  ...meals,
  ...treasures,
  ...equipment,
  ...trash
];

// Get item by ID
export const getItemById = (id: string): Item | undefined => {
  return allItems.find(item => item.id === id);
};