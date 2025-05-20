import { Perk, GameState, Activity } from '../types';

const createPerk = (
  id: string,
  name: string,
  description: string,
  effect: (state: GameState) => GameState,
  levelRequired: number = 1
): Perk & { levelRequired: number } => ({
  id,
  name,
  description,
  effect,
  levelRequired
});

// Tool mastery perks
const toolMasteryPerks: Record<string, Perk & { levelRequired: number }> = {
  watering_can_master: createPerk(
    'watering_can_master',
    'Master Irrigator',
    'Water all plots with a single action',
    (state) => state,
    5 // Level 5 required
  ),
  pickaxe_master: createPerk(
    'pickaxe_master',
    'Efficient Excavator',
    'Regain energy when mining common or uncommon ores',
    (state) => state,
    5 // Level 5 required
  ),
  hoe_master: createPerk(
    'hoe_master',
    'Expert Tiller',
    'Tilling no longer consumes energy',
    (state) => state,
    5 // Level 5 required
  ),
  axe_master: createPerk(
    'axe_master',
    'Forest Master',
    'Regain energy when gathering common or uncommon foraged items',
    (state) => state,
    5 // Level 5 required
  ),
  fishing_rod_master: createPerk(
    'fishing_rod_master',
    'Fish Whisperer',
    'Start each day with a legendary fish',
    (state) => state,
    5 // Level 5 required
  )
};

export const perksByActivity: Record<Activity, (Perk & { levelRequired: number })[]> = {
  farming: [
    createPerk(
      'farming_yield',
      'Bountiful Harvest',
      'Increases farming yield by 25%',
      (state) => state
    ),
    createPerk(
      'farming_energy',
      'Green Thumb',
      'Reduces farming energy cost by 20%',
      (state) => state
    ),
    createPerk(
      'farming_quality',
      'Quality Crops',
      'Increases chance of higher quality crops by 15%',
      (state) => state
    ),
    toolMasteryPerks.hoe_master,
    toolMasteryPerks.watering_can_master
  ],
  fishing: [
    createPerk(
      'fishing_rare',
      'Lucky Fisher',
      'Increases chance of rare fish by 20%',
      (state) => state
    ),
    createPerk(
      'fishing_double',
      'Double Catch',
      '15% chance to catch two fish at once',
      (state) => state
    ),
    createPerk(
      'fishing_energy',
      'Sea Legs',
      'Reduces fishing energy cost by 20%',
      (state) => state
    ),
    toolMasteryPerks.fishing_rod_master
  ],
  mining: [
    createPerk(
      'mining_gems',
      'Gem Hunter',
      'Increases chance of finding gems by 25%',
      (state) => state
    ),
    createPerk(
      'mining_double',
      'Double Strike',
      '20% chance to get double ore',
      (state) => state
    ),
    createPerk(
      'mining_energy',
      'Efficient Miner',
      'Reduces mining energy cost by 20%',
      (state) => state
    ),
    toolMasteryPerks.pickaxe_master
  ],
  foraging: [
    createPerk(
      'foraging_rare',
      'Eagle Eye',
      'Increases chance of finding rare items by 25%',
      (state) => state
    ),
    createPerk(
      'foraging_double',
      'Gatherer',
      '20% chance to gather double items',
      (state) => state
    ),
    createPerk(
      'foraging_energy',
      'Forest Walker',
      'Reduces foraging energy cost by 20%',
      (state) => state
    ),
    toolMasteryPerks.axe_master
  ],
  cooking: [
    createPerk(
      'cooking_quality',
      'Master Chef',
      'Increases food quality by 25%',
      (state) => state
    ),
    createPerk(
      'cooking_double',
      'Efficient Cook',
      '20% chance to cook double portions',
      (state) => state
    ),
    createPerk(
      'cooking_energy',
      'Kitchen Expert',
      'Reduces cooking energy cost by 20%',
      (state) => state
    )
  ]
};

export const getRandomPerks = (activity: Activity, gameState?: GameState): [Perk, Perk] => {
  // If gameState is undefined or doesn't have skills, return the first two perks (or duplicate the first if only one exists)
  if (!gameState?.skills) {
    const activityPerks = perksByActivity[activity];
    return [activityPerks[0], activityPerks[1] || activityPerks[0]];
  }

  const availablePerks = perksByActivity[activity].filter(perk => {
    const skillLevel = gameState.skills[activity].level;
    return skillLevel >= (perk.levelRequired || 1);
  });
  
  if (availablePerks.length < 2) {
    // If not enough perks are available, return basic perks
    return [availablePerks[0], availablePerks[1] || availablePerks[0]];
  }
  
  const firstIndex = Math.floor(Math.random() * availablePerks.length);
  let secondIndex = Math.floor(Math.random() * availablePerks.length);
  
  // Ensure we don't get the same perk twice
  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * availablePerks.length);
  }
  
  return [availablePerks[firstIndex], availablePerks[secondIndex]];
};