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
  createItem('starfruit_seeds', 'Starfruit Seeds', 'Plant these in summer.', 'seed', 200, 'uncommon', true, 99, 13),
  createItem('ancient_fruit_seeds', 'Ancient Seeds', 'A seed from a forgotten era.', 'seed', 300, 'rare', true, 99, 20),
];

export const plants: Item[] = [
  createItem('parsnip', 'Parsnip', 'A spring root vegetable.', 'crop', 40),
  createItem('potato', 'Potato', 'A starchy tuber.', 'crop', 60),
  createItem('cauliflower', 'Cauliflower', 'Prized for its delicate flavor.', 'crop', 130, 'uncommon'),
  createItem('melon', 'Melon', 'Sweet summer fruit.', 'crop', 300, 'uncommon'),
  createItem('pumpkin', 'Pumpkin', 'A fall favorite.', 'crop', 380, 'uncommon'),
  createItem('starfruit', 'Starfruit', 'A shining, tangy summer fruit.', 'crop', 500, 'rare'),
  createItem('ancient_fruit', 'Ancient Fruit', 'A fruit from a forgotten era.', 'crop', 750, 'epic'),
];

// 3. Fish
export const fish: Item[] = [
  createItem('anchovy', 'Anchovy', 'A small ocean fish.', 'fish', 35),
  createItem('sardine', 'Sardine', 'A common ocean fish.', 'fish', 50),
  createItem('tuna', 'Tuna', 'A large, powerful fish.', 'fish', 140, 'uncommon'),
  createItem('salmon', 'Salmon', 'Swims upstream to spawn.', 'fish', 110,'uncommon'),
  createItem('catfish', 'Catfish', 'A slippery river fish prized by anglers.', 'fish', 320, 'rare'),
  createItem('sturgeon', 'Sturgeon', 'An ancient fish species.', 'fish', 500, 'rare'),
  createItem('legendary_fish', 'Legendary Fish', 'A mythical creature of the deep.', 'fish', 2000, 'legendary', false, 1),
];

// 4. Ores and Gems
export const minerals: Item[] = [
  createItem('coal', 'Coal', 'A common mineral used for smelting.', 'mineral', 25, 'common'),
  createItem('copper_ore', 'Copper Ore', 'A common ore.', 'mineral', 15),
  createItem('iron_ore', 'Iron Ore', 'A valuable ore.', 'mineral', 40),
  createItem('gold_ore', 'Gold Ore', 'A precious metal ore.', 'mineral', 150, 'rare'),
  createItem('tungsten_ore', 'Tungsten Ore', 'A rare and valuable ore.', 'mineral', 500, 'epic'),
  createItem('copper_bar', 'Copper Bar', 'Refined copper ready for crafting.', 'component', 50, 'common'),
  createItem('iron_bar', 'Iron Bar', 'Refined iron ready for crafting.', 'component', 100, 'uncommon'),
  createItem('gold_bar', 'Gold Bar', 'Refined gold ready for crafting.', 'component', 400, 'rare'),
  createItem('tungsten_bar', 'Tungsten Bar', 'Refined tungsten ready for crafting.', 'component', 1400, 'epic'),
  createItem('ruby', 'Ruby', 'A precious red gem.', 'mineral', 250, 'rare'),
  createItem('emerald', 'Emerald', 'A precious green gem.', 'mineral', 300, 'rare'),
  createItem('diamond', 'Diamond', 'A rare and valuable gem.', 'mineral', 750, 'epic'),
  createItem('prismatic_shard', 'Prismatic Shard', 'A mysterious crystalline form.', 'mineral', 4500, 'legendary'),
  createItem('salt', 'Salt', 'A mineral essential for crafting.', 'mineral', 10, 'common'),
];

// 5. Forageable Items
export const foraged: Item[] = [
  createItem('wild_horseradish', 'Wild Horseradish', 'Spring forage.', 'foraged', 55),
  createItem('spring_onion', 'Spring Onion', 'Found in spring and it is an onion', 'foraged', 45),
  createItem('blackberry', 'Blackberry', 'Fall forage.', 'foraged', 50),
  createItem('mushroom', 'Mushroom', 'Found in all seasons.', 'foraged', 55),
  createItem('truffle', 'Truffle', 'A rare delicacy.', 'foraged', 450, 'rare'),
  createItem('golden_walnut', 'Golden Walnut', 'A mysterious nut.', 'foraged', 800, 'epic'),
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
  createItem('fried_egg', 'Fried Egg', 'A basic breakfast.', 'meal', 45, 'common', true, 99, undefined, undefined, {
    energy: 15,
    experience: 10
  }),
  createItem('hashbrowns', 'Hashbrowns', 'Crispy potato goodness.', 'meal', 65, 'common', true, 99, undefined, undefined, {
    energy: 20,
    experience: 15
  }),
  createItem('fish_stew', 'Fish Stew', 'A hearty seafood dish.', 'meal', 235, 'uncommon', true, 99, undefined, undefined, {
    energy: 45,
    experience: 25,
    skillBonus: {
      skill: 'fishing',
      amount: 15
    }
  }),
  createItem('mushroom_soup', 'Mushroom Soup', 'A warming forest soup.', 'meal', 155, 'common', true, 99, undefined, undefined, {
    energy: 30,
    experience: 20,
    skillBonus: {
      skill: 'foraging',
      amount: 10
    }
  }),
  createItem('vegetable_medley', 'Vegetable Medley', 'A healthy mix of vegetables.', 'meal', 195, 'common', true, 99, undefined, undefined, {
    energy: 35,
    experience: 20,
    skillBonus: {
      skill: 'farming',
      amount: 12
    }
  }),
  createItem('complete_breakfast', 'Complete Breakfast', 'The perfect start.', 'meal', 455, 'rare', true, 99, undefined, undefined, {
    energy: 75,
    experience: 40,
    energyCostModifier: {
      activity: 'farming',
      amount: -0.2
    }
  }),
  createItem('lucky_lunch', 'Lucky Lunch', 'Brings good fortune.', 'meal', 325, 'uncommon', true, 99, undefined, undefined, {
    energy: 50,
    experience: 30,
    skillBonus: {
      skill: 'fishing',
      amount: 20
    }
  }),
  createItem('seafood_gumbo', 'Seafood Gumbo', 'A spicy favorite.', 'meal', 520, 'rare', true, 99, undefined, undefined, {
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
  createItem('ancient_doll', 'Ancient Doll', 'A mysterious artifact.', 'treasure', 500, 'rare'),
  createItem('dinosaur_egg', 'Dinosaur Egg', 'A prehistoric find.', 'treasure', 600, 'epic'),
  createItem('golden_pumpkin', 'Golden Pumpkin', 'A rare treasure.', 'treasure', 2500, 'epic'),
  createItem('pearl', 'Pearl', 'A beautiful gem from the sea.', 'treasure', 900, 'rare'),
  createItem('treasure_chest', 'Treasure Chest', 'Contains valuable items.', 'treasure', 2500, 'legendary'),
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
  createItem('iron_helmet', 'Iron Helmet', 'Sturdy head protection.', 'equipment', 150, 'uncommon', false, 1, undefined, 'equipment', undefined, 'head', {
    mining: 4,
    energy: 3,
    luck: 1
  }),
  createItem('iron_chestplate', 'Iron Chestplate', 'Durable torso protection.', 'equipment', 200, 'uncommon', false, 1, undefined, 'equipment', undefined, 'torso', {
    mining: 5,
    energy: 4,
    luck: 1
  }),
  createItem('iron_leggings', 'Iron Leggings', 'Reliable leg protection.', 'equipment', 175, 'uncommon', false, 1, undefined, 'equipment', undefined, 'legs', {
    mining: 4,
    speed: 3,
    luck: 1
  }),
  createItem('iron_boots', 'Iron Boots', 'Strong foot protection.', 'equipment', 125, 'uncommon', false, 1, undefined, 'equipment', undefined, 'boots', {
    mining: 3,
    speed: 4,
    luck: 1
  }),

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
  }),

  // Rings (fit ring_left or ring_right)
  createItem('ring_of_harvest', 'Ring of Harvest', 'A verdant band that coaxes extra yield from the soil.', 'equipment', 300, 'uncommon', false, 1, undefined, 'equipment', undefined, 'ring_left', {
    farming: 5,
    luck: 1
  }),
  createItem('ring_of_the_deep', 'Ring of the Deep', 'A rough-hewn ring that resonates with buried ore.', 'equipment', 300, 'uncommon', false, 1, undefined, 'equipment', undefined, 'ring_left', {
    mining: 5,
    luck: 1
  }),
  createItem('ring_of_tides', 'Ring of Tides', 'A shimmering band that draws fish to the hook.', 'equipment', 300, 'uncommon', false, 1, undefined, 'equipment', undefined, 'ring_left', {
    fishing: 5,
    luck: 1
  }),
  createItem('ring_of_the_wild', 'Ring of the Wild', 'Woven from forest vines, it reveals hidden bounty.', 'equipment', 300, 'uncommon', false, 1, undefined, 'equipment', undefined, 'ring_left', {
    foraging: 5,
    luck: 1
  }),
  createItem('golden_ring', 'Golden Ring', 'A gleaming ring that brings fortune to its wearer.', 'equipment', 600, 'rare', false, 1, undefined, 'equipment', undefined, 'ring_left', {
    luck: 3,
    speed: 3
  }),
  createItem('prismatic_ring', 'Prismatic Ring', 'Shifts color with the light; amplifies every endeavor.', 'equipment', 5000, 'legendary', false, 1, undefined, 'equipment', undefined, 'ring_left', {
    farming: 5,
    fishing: 5,
    mining: 5,
    foraging: 5,
    cooking: 5,
    energy: 5,
    speed: 5,
    luck: 5
  }),

  // Amulets
  createItem('wooden_amulet', 'Wooden Amulet', 'A hand-carved charm on a leather cord.', 'equipment', 50, 'common', false, 1, undefined, 'equipment', undefined, 'amulet', {
    energy: 3,
    foraging: 2
  }),
  createItem('iron_amulet', 'Iron Amulet', 'A heavy pendant forged from raw iron.', 'equipment', 180, 'uncommon', false, 1, undefined, 'equipment', undefined, 'amulet', {
    energy: 5,
    mining: 3
  }),
  createItem('amulet_of_plenty', 'Amulet of Plenty', 'Radiates warmth and abundance.', 'equipment', 500, 'rare', false, 1, undefined, 'equipment', undefined, 'amulet', {
    farming: 5,
    cooking: 5,
    energy: 3
  }),
  createItem('amulet_of_fortune', 'Amulet of Fortune', 'Legends say it was found inside a golden pumpkin.', 'equipment', 2000, 'epic', false, 1, undefined, 'equipment', undefined, 'amulet', {
    luck: 5,
    speed: 5,
    energy: 5
  }),

  // Gloves / Gauntlets
  createItem('leather_gloves', 'Leather Gloves', 'Tough hide protects the hands.', 'equipment', 40, 'common', false, 1, undefined, 'equipment', undefined, 'hands', {
    foraging: 2,
    farming: 1
  }),
  createItem('iron_gauntlets', 'Iron Gauntlets', 'Heavy metal hand guards.', 'equipment', 200, 'uncommon', false, 1, undefined, 'equipment', undefined, 'hands', {
    mining: 3,
    speed: 2
  }),
  createItem('tungsten_gauntlets', 'Tungsten Gauntlets', 'Nearly indestructible hand protection.', 'equipment', 900, 'epic', false, 1, undefined, 'equipment', undefined, 'hands', {
    mining: 6,
    speed: 4,
    luck: 2
  }),

  // Belts
  createItem('leather_belt', 'Leather Belt', 'A sturdy belt with extra pouches.', 'equipment', 35, 'common', false, 1, undefined, 'equipment', undefined, 'belt', {
    energy: 3,
    speed: 1
  }),
  createItem('iron_belt', 'Iron Belt', 'Reinforced with iron buckles.', 'equipment', 180, 'uncommon', false, 1, undefined, 'equipment', undefined, 'belt', {
    energy: 5,
    speed: 2
  }),
  createItem('champions_belt', 'Champion\'s Belt', 'Worn by the valley\'s strongest.', 'equipment', 600, 'rare', false, 1, undefined, 'equipment', undefined, 'belt', {
    energy: 8,
    speed: 4,
    luck: 2
  }),

  // Verdant Set - Farming Specialist
  createItem('verdant_hat', 'Verdant Hat', 'A woven straw hat with living vines.', 'equipment', 350, 'rare', false, 1, undefined, 'equipment', undefined, 'head', {
    farming: 5, energy: 2, luck: 1
  }),
  createItem('verdant_tunic', 'Verdant Tunic', 'A tunic that smells of fresh soil.', 'equipment', 450, 'rare', false, 1, undefined, 'equipment', undefined, 'torso', {
    farming: 6, energy: 3, luck: 1
  }),
  createItem('verdant_leggings', 'Verdant Leggings', 'Leggings embroidered with green leaves.', 'equipment', 400, 'rare', false, 1, undefined, 'equipment', undefined, 'legs', {
    farming: 5, speed: 2
  }),
  createItem('verdant_boots', 'Verdant Boots', 'Boots that tread lightly on soft earth.', 'equipment', 300, 'rare', false, 1, undefined, 'equipment', undefined, 'boots', {
    farming: 4, speed: 3
  }),

  // Tidecaller Set - Fishing Specialist
  createItem('tidecaller_hood', 'Tidecaller Hood', 'A hood scaled like a fish.', 'equipment', 350, 'rare', false, 1, undefined, 'equipment', undefined, 'head', {
    fishing: 5, luck: 2
  }),
  createItem('tidecaller_coat', 'Tidecaller Coat', 'A long oilcloth coat with pearl buttons.', 'equipment', 450, 'rare', false, 1, undefined, 'equipment', undefined, 'torso', {
    fishing: 6, speed: 2, luck: 1
  }),
  createItem('tidecaller_waders', 'Tidecaller Waders', 'Waterproof legs for deep wading.', 'equipment', 400, 'rare', false, 1, undefined, 'equipment', undefined, 'legs', {
    fishing: 5, speed: 3
  }),
  createItem('tidecaller_boots', 'Tidecaller Boots', 'Boots that grip slick stones.', 'equipment', 300, 'rare', false, 1, undefined, 'equipment', undefined, 'boots', {
    fishing: 4, speed: 4
  }),

  // Gourmet Set - Cooking Specialist
  createItem('chefs_hat', 'Chef\'s Hat', 'A pristine, tall white hat.', 'equipment', 350, 'rare', false, 1, undefined, 'equipment', undefined, 'head', {
    cooking: 6, energy: 2
  }),
  createItem('gourmet_apron', 'Gourmet Apron', 'An apron stained with famous sauces.', 'equipment', 450, 'rare', false, 1, undefined, 'equipment', undefined, 'torso', {
    cooking: 7, energy: 3
  }),
  createItem('gourmet_trousers', 'Gourmet Trousers', 'Checkered kitchen trousers.', 'equipment', 400, 'rare', false, 1, undefined, 'equipment', undefined, 'legs', {
    cooking: 5, speed: 2
  }),
  createItem('gourmet_clogs', 'Gourmet Clogs', 'Comfortable all-day kitchen shoes.', 'equipment', 300, 'rare', false, 1, undefined, 'equipment', undefined, 'boots', {
    cooking: 4, speed: 3, energy: 2
  }),

  // Wanderer Set - Foraging + Speed hybrid
  createItem('wanderer_hood', 'Wanderer Hood', 'A forest-green traveling hood.', 'equipment', 350, 'rare', false, 1, undefined, 'equipment', undefined, 'head', {
    foraging: 5, speed: 2, luck: 1
  }),
  createItem('wanderer_cloak', 'Wanderer Cloak', 'A sturdy cloak woven with secrets.', 'equipment', 450, 'rare', false, 1, undefined, 'equipment', undefined, 'torso', {
    foraging: 6, speed: 3, luck: 2
  }),
  createItem('wanderer_pants', 'Wanderer Pants', 'Quiet pants for stalking through brush.', 'equipment', 400, 'rare', false, 1, undefined, 'equipment', undefined, 'legs', {
    foraging: 5, speed: 4
  }),
  createItem('wanderer_boots', 'Wanderer Boots', 'Soft boots that leave no trace.', 'equipment', 300, 'rare', false, 1, undefined, 'equipment', undefined, 'boots', {
    foraging: 4, speed: 5, luck: 1
  }),

  // Mythic Hybrid Pieces
  createItem('harvest_moon_cloak', 'Harvest Moon Cloak', 'A cloak that glows softly on harvest nights.', 'equipment', 3500, 'legendary', false, 1, undefined, 'equipment', undefined, 'torso', {
    farming: 8, cooking: 8, luck: 4, energy: 5
  }),
  createItem('deep_sea_gauntlets', 'Deep Sea Gauntlets', 'Forged from abyssal metal, they hum with pressure.', 'equipment', 3500, 'legendary', false, 1, undefined, 'equipment', undefined, 'hands', {
    mining: 8, fishing: 8, luck: 4, speed: 3
  }),
  createItem('forest_pact_ring', 'Forest Pact Ring', 'A ring blessed by ancient dryads.', 'equipment', 3500, 'legendary', false, 1, undefined, 'equipment', undefined, 'ring_left', {
    foraging: 8, farming: 8, luck: 5
  })
];

export const trash: Item[] = [
  createItem('stonedust', 'Stone Dust', 'Just some particles of dust', 'trash', 0, 'common'),
  createItem('old_seed', 'Old Seed', 'It died quiet some time ago', 'trash', 0, 'common'),
  createItem('dry_leave', 'Dry Leaf', 'A fallen leaf from a tree', 'trash', 0, 'common'),
  createItem('old_can', 'Old tin can', 'A can made of alumininum, not tin', 'trash', 0, 'common')
];

// 12. Recipe Notes
export const recipeNotes: Item[] = [
  // Equipment notes -- rings
  {
    id: 'note_ring_of_harvest', name: 'Faded Farming Journal', type: 'consumable',
    description: 'The page reads: "Gold kissed by the earth\'s first spring root yields a ring of green abundance."',
    value: 500, rarity: 'uncommon', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_ring_of_harvest.png', recipeId: 'ring_of_harvest'
  },
  {
    id: 'note_ring_of_the_deep', name: 'Miner\'s Scrawled Note', type: 'consumable',
    description: 'Smudged charcoal writing: "Bind the sun-metal to blackened ember and the depths shall answer."',
    value: 500, rarity: 'uncommon', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_ring_of_the_deep.png', recipeId: 'ring_of_the_deep'
  },
  {
    id: 'note_ring_of_tides', name: 'Bottle Message', type: 'consumable',
    description: 'A salt-stained scroll: "Where gilded wealth meets the river king, a ring of tides is born."',
    value: 500, rarity: 'uncommon', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_ring_of_tides.png', recipeId: 'ring_of_tides'
  },
  {
    id: 'note_ring_of_the_wild', name: 'Bark Etching', type: 'consumable',
    description: 'Carved into bark: "The rarest fungus of the forest, wed to golden light, opens nature\'s grasp."',
    value: 500, rarity: 'uncommon', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_ring_of_the_wild.png', recipeId: 'ring_of_the_wild'
  },
  {
    id: 'note_golden_ring', name: 'Jeweler\'s Blueprint', type: 'consumable',
    description: 'A precise diagram showing two identical golden ingots fused into a single band of fortune.',
    value: 2000, rarity: 'rare', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_golden_ring.png', recipeId: 'golden_ring'
  },
  {
    id: 'note_prismatic_ring', name: 'Ancient Crystalline Tablet', type: 'consumable',
    description: 'Glowing runes whisper: "Only the rainbow shard, cradled in purest gold, becomes everything at once."',
    value: 2000, rarity: 'epic', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_prismatic_ring.png', recipeId: 'prismatic_ring'
  },
  // Equipment notes -- amulets
  {
    id: 'note_wooden_amulet', name: 'Whittler\'s Sketch', type: 'consumable',
    description: 'A child-like drawing of raw timber bound in tanned hide to make a lucky charm.',
    value: 100, rarity: 'common', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_wooden_amulet.png', recipeId: 'wooden_amulet'
  },
  {
    id: 'note_iron_amulet', name: 'Blacksmith\'s Memo', type: 'consumable',
    description: '"Heat the gray bar over black rock until it curls into a pendant. Do NOT quench in water."',
    value: 500, rarity: 'uncommon', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_iron_amulet.png', recipeId: 'iron_amulet'
  },
  {
    id: 'note_amulet_of_plenty', name: 'Herbalist\'s Secret', type: 'consumable',
    description: 'Fragrant parchment: "Wrap fresh-picked herbs around a bar of sun-gold and speak of abundance."',
    value: 2000, rarity: 'rare', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_amulet_of_plenty.png', recipeId: 'amulet_of_plenty'
  },
  {
    id: 'note_amulet_of_fortune', name: 'Legend of the Lucky Amulet', type: 'consumable',
    description: 'A tale of a flawless gem, clear as ice, mounted upon gold to channel fortune itself.',
    value: 2000, rarity: 'epic', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_amulet_of_fortune.png', recipeId: 'amulet_of_fortune'
  },
  // Equipment notes -- gloves
  {
    id: 'note_leather_gloves', name: 'Tanner\'s Pattern', type: 'consumable',
    description: 'A template showing how to stitch two sheets of tanned hide into snug-fitting gloves.',
    value: 100, rarity: 'common', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_leather_gloves.png', recipeId: 'leather_gloves'
  },
  {
    id: 'note_iron_gauntlets', name: 'Armorer\'s Sketch', type: 'consumable',
    description: 'Careful measurements: "Hammer two gray bars flat, bend at the knuckle, rivet at the wrist."',
    value: 500, rarity: 'uncommon', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_iron_gauntlets.png', recipeId: 'iron_gauntlets'
  },
  {
    id: 'note_tungsten_gauntlets', name: 'Master Forger\'s Notes', type: 'consumable',
    description: '"Only the heaviest metal, doubled upon itself, can withstand the mountain\'s fury."',
    value: 2000, rarity: 'epic', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_tungsten_gauntlets.png', recipeId: 'tungsten_gauntlets'
  },
  // Equipment notes -- belts
  {
    id: 'note_leather_belt', name: 'Traveler\'s Tip', type: 'consumable',
    description: 'Scribbled on an inn napkin: "Raw hide layered over tanned leather makes a belt that never breaks."',
    value: 100, rarity: 'common', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_leather_belt.png', recipeId: 'leather_belt'
  },
  {
    id: 'note_iron_belt', name: 'Guard\'s Requisition', type: 'consumable',
    description: '"One bar of iron, one strip of raw hide. Forge buckles thick enough to stop a blade."',
    value: 500, rarity: 'uncommon', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_iron_belt.png', recipeId: 'iron_belt'
  },
  {
    id: 'note_champions_belt', name: 'Champion\'s Legacy', type: 'consumable',
    description: 'An old tournament program: "The champion\'s prize was forged from gold and the finest tanned hide."',
    value: 2000, rarity: 'rare', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_champions_belt.png', recipeId: 'champions_belt'
  },
  // Meal notes
  {
    id: 'note_fish_stew', name: 'Sailor\'s Recipe', type: 'consumable',
    description: 'Stained with broth: "Boil the big ocean fish in a pot of vegetable stock until the bones soften."',
    value: 500, rarity: 'uncommon', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_fish_stew.png', recipeId: 'fish_stew'
  },
  {
    id: 'note_lucky_lunch', name: 'Lucky Fisherman\'s Card', type: 'consumable',
    description: '"Lay the pink river fish over steamed grain. Eat before casting and the big ones will come."',
    value: 500, rarity: 'uncommon', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_lucky_lunch.png', recipeId: 'lucky_lunch'
  },
  {
    id: 'note_complete_breakfast', name: 'Grandma\'s Morning Note', type: 'consumable',
    description: '"Take yesterday\'s fried egg and those crispy potato cakes. Together they make a perfect morning."',
    value: 2000, rarity: 'rare', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_complete_breakfast.png', recipeId: 'complete_breakfast'
  },
  {
    id: 'note_seafood_gumbo', name: 'Chef\'s Secret Page', type: 'consumable',
    description: '"Start with the stew of the sea, then stir in freshly picked forest herbs. Let it simmer until magic."',
    value: 2000, rarity: 'rare', stackable: true, maxStackSize: 99,
    imageUrl: 'public/assets/items/note_seafood_gumbo.png', recipeId: 'seafood_gumbo'
  },
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
  ...trash,
  ...recipeNotes
];

// Get item by ID
export const getItemById = (id: string): Item | undefined => {
  return allItems.find(item => item.id === id);
};