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
    energyCost: 5,
    timeCost: 30,
    iconName: 'Seedling',
    possibleItems: [
      'old_seed',
      'parsnip', 'potato', 'cauliflower', 'melon', 'pumpkin',
      'parsnip_seeds', 'potato_seeds', 'cauliflower_seeds', 'melon_seeds', 'pumpkin_seeds'
    ],
    requiredTool: 'hoe'
  },
  {
    id: 'fishing',
    name: 'Fishing',
    description: 'Catch fish at the local ponds and ocean.',
    energyCost: 8,
    timeCost: 60,
    iconName: 'Fish',
    possibleItems: [
      'old_can',
      'anchovy', 'sardine', 'tuna', 'salmon', 'sturgeon', 'legendary_fish'
    ],
    requiredTool: 'fishing_rod'
  },
  {
    id: 'mining',
    name: 'Mining',
    description: 'Mine for ores, gems, and treasures.',
    energyCost: 10,
    timeCost: 90,
    iconName: 'Pickaxe',
    possibleItems: [
      'stone_dust','salt',
      'stone', 'coal', 'copper_ore', 'iron_ore', 'gold_ore', 'tungsten_ore',
      'ruby', 'emerald', 'diamond', 'prismatic_shard',
      'ancient_doll', 'treasure_chest'
    ],
    requiredTool: 'pickaxe'
  },
  {
    id: 'foraging',
    name: 'Foraging',
    description: 'Collect wild plants and resources.',
    energyCost: 4,
    timeCost: 45,
    iconName: 'Leaf',
    possibleItems: [
      'dry_leave', 'hide', 'water',
      'wild_horseradish', 'spring_onion', 'blackberry', 'mushroom', 'truffle',
      'golden_walnut', 'wood', 'hardwood', 'fiber',
      'herbs', 'wild_garlic', 'bay_leaf'
    ],
    requiredTool: 'axe'
  },
  {
    id: 'cooking',
    name: 'Cooking',
    description: 'Discover new recipes and prepare meals.',
    energyCost: 3,
    timeCost: 40,
    iconName: 'Utensils',
    possibleItems: [
      'flour', 'butter', 'oil', 'sugar', 'rice'
      
    ]
  }
];

export const getActivityById = (id: Activity): ActivityDetails | undefined => {
  return activities.find(activity => activity.id === id);
};