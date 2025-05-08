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
  imageUrl: `/assets/items/${id}.png`,
  tier,
  craftingCategory,
  effects
});

// 1. Tools
export const tools: Item[] = [
  createItem('hoe', 'Basic Hoe', 'Used for tilling soil.', 'tool', 0, 'common', false, 1, 'basic'),
  createItem('watering_can', 'Watering Can', 'Used for watering crops.', 'tool', 0, 'common', false, 1, 'basic'),
  createItem('fishing_rod', 'Fishing Rod', 'Used for catching fish.', 'tool', 0, 'common', false, 1, 'basic'),
  createItem('pickaxe', 'Pickaxe', 'Used for mining ores and breaking rocks.', 'tool', 0, 'common', false, 1, 'basic'),
  createItem('axe', 'Axe', 'Used for chopping wood.', 'tool', 0, 'common', false, 1, 'basic'),
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
];

// 5. Forageable Items
export const foraged: Item[] = [
  createItem('wild_horseradish', 'Wild Horseradish', 'Spring forage.', 'foraged', 50),
  createItem('spring_onion', 'Spring Onion', 'Found in spring.', 'foraged', 40),
  createItem('blackberry', 'Blackberry', 'Fall forage.', 'foraged', 45),
  createItem('mushroom', 'Mushroom', 'Found in all seasons.', 'foraged', 40),
  createItem('truffle', 'Truffle', 'A rare delicacy.', 'foraged', 625, 'rare'),
  createItem('golden_walnut', 'Golden Walnut', 'A mysterious nut.', 'foraged', 1000, 'epic'),
];

// 6. Resources
export const resources: Item[] = [
  createItem('stone', 'Stone', 'Basic building material.', 'resource', 2, 'common', true, 999),
  createItem('wood', 'Wood', 'Basic crafting material.', 'resource', 2, 'common', true, 999),
  createItem('hardwood', 'Hardwood', 'High-quality wood.', 'resource', 15, 'uncommon'),
  createItem('clay', 'Clay', 'Used in crafting.', 'resource', 10),
  createItem('fiber', 'Fiber', 'Used in crafting.', 'resource', 5),
];

// 7. Meals
export const meals: Item[] = [
  createItem('fried_egg', 'Fried Egg', 'A basic breakfast.', 'meal', 35),
  createItem('hashbrowns', 'Hashbrowns', 'Crispy potato goodness.', 'meal', 50),
  createItem('complete_breakfast', 'Complete Breakfast', 'The perfect start.', 'meal', 350, 'rare'),
  createItem('lucky_lunch', 'Lucky Lunch', 'Brings good fortune.', 'meal', 250, 'uncommon'),
  createItem('seafood_gumbo', 'Seafood Gumbo', 'A spicy favorite.', 'meal', 400, 'rare'),
];

// 8. Treasures
export const treasures: Item[] = [
  createItem('ancient_doll', 'Ancient Doll', 'A mysterious artifact.', 'treasure', 300, 'rare'),
  createItem('dinosaur_egg', 'Dinosaur Egg', 'A prehistoric find.', 'treasure', 500, 'epic'),
  createItem('golden_pumpkin', 'Golden Pumpkin', 'A rare treasure.', 'treasure', 2500, 'epic'),
  createItem('pearl', 'Pearl', 'A beautiful gem from the sea.', 'treasure', 1000, 'rare'),
  createItem('treasure_chest', 'Treasure Chest', 'Contains valuable items.', 'treasure', 5000, 'legendary'),
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
  ...meals,
  ...treasures,
];

// Get item by ID
export const getItemById = (id: string): Item | undefined => {
  return allItems.find(item => item.id === id);
};