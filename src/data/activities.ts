import { Activity } from '../types';

export interface ActivityDetails {
  id: Activity;
  name: string;
  description: string;
  energyCost: number;
  timeCost: number;
  iconName: string;
  possibleItems: string[];
  requiredTool?: string;
}

export const activities: ActivityDetails[] = [
  {
    id: 'farming',
    name: 'Farming',
    description: 'Plant and harvest crops to earn money.',
    energyCost: 6,
    timeCost: 75,
    iconName: 'Seedling',
    possibleItems: [
      'old_seed',
      'parsnip', 'potato', 'cauliflower', 'melon', 'pumpkin', 'starfruit', 'ancient_fruit',
      'parsnip_seeds', 'potato_seeds', 'cauliflower_seeds', 'melon_seeds', 'pumpkin_seeds',
      'starfruit_seeds', 'ancient_fruit_seeds',
      'note_ring_of_harvest', 'note_wooden_amulet', 'note_leather_gloves', 'note_leather_belt'
    ],
    requiredTool: 'hoe'
  },
  {
    id: 'fishing',
    name: 'Fishing',
    description: 'Catch fish at the local ponds and ocean.',
    energyCost: 8,
    timeCost: 75,
    iconName: 'Fish',
    possibleItems: [
      'old_can',
      'anchovy', 'sardine', 'tuna', 'salmon', 'catfish', 'sturgeon', 'legendary_fish',
      'pearl',
      'ring_of_tides',
      'note_ring_of_tides', 'note_fish_stew', 'note_lucky_lunch'
    ],
    requiredTool: 'fishing_rod'
  },
  {
    id: 'mining',
    name: 'Mining',
    description: 'Mine for ores, gems, and treasures.',
    energyCost: 10,
    timeCost: 80,
    iconName: 'Pickaxe',
    possibleItems: [
      'stone_dust','salt',
      'stone', 'coal', 'copper_ore', 'iron_ore', 'gold_ore', 'tungsten_ore',
      'ruby', 'emerald', 'diamond', 'prismatic_shard',
      'ancient_doll', 'treasure_chest',
      'ring_of_the_deep', 'iron_gauntlets', 'iron_amulet',
      'note_ring_of_the_deep', 'note_iron_amulet', 'note_iron_gauntlets', 'note_iron_belt', 'note_golden_ring'
    ],
    requiredTool: 'pickaxe'
  },
  {
    id: 'foraging',
    name: 'Foraging',
    description: 'Collect wild plants and resources.',
    energyCost: 5,
    timeCost: 75,
    iconName: 'Leaf',
    possibleItems: [
      'dry_leave', 'hide', 'water',
      'wild_horseradish', 'spring_onion', 'blackberry', 'mushroom', 'truffle',
      'golden_walnut', 'wood', 'hardwood', 'fiber',
      'herbs', 'wild_garlic', 'bay_leaf',
      'ring_of_the_wild', 'leather_gloves', 'wooden_amulet',
      'note_ring_of_the_wild', 'note_champions_belt', 'note_seafood_gumbo'
    ],
    requiredTool: 'axe'
  },
  {
    id: 'cooking',
    name: 'Cooking',
    description: 'Discover new recipes and prepare meals.',
    energyCost: 4,
    timeCost: 70,
    iconName: 'Utensils',
    possibleItems: [
      'flour', 'butter', 'oil', 'sugar', 'rice',
      'note_complete_breakfast', 'note_seafood_gumbo'
    ]
  }
];

export const getActivityById = (id: Activity): ActivityDetails | undefined => {
  return activities.find(activity => activity.id === id);
};