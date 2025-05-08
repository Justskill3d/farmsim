import { Perk, GameState, Activity } from '../types';

const createPerk = (
  id: string,
  name: string,
  description: string,
  effect: (state: GameState) => GameState
): Perk => ({
  id,
  name,
  description,
  effect
});

export const perksByActivity: Record<Activity, Perk[]> = {
  farming: [
    createPerk(
      'farming_yield',
      'Bountiful Harvest',
      'Increases farming yield by 25%',
      (state) => ({
        ...state,
        // Effect will be implemented in the item finding logic
      })
    ),
    createPerk(
      'farming_energy',
      'Green Thumb',
      'Reduces farming energy cost by 20%',
      (state) => ({
        ...state,
        // Effect will be implemented in the activity cost calculation
      })
    ),
    createPerk(
      'farming_quality',
      'Quality Crops',
      'Increases chance of higher quality crops by 15%',
      (state) => ({
        ...state,
        // Effect will be implemented in the item quality calculation
      })
    ),
  ],
  fishing: [
    createPerk(
      'fishing_rare',
      'Lucky Fisher',
      'Increases chance of rare fish by 20%',
      (state) => ({
        ...state,
        // Effect will be implemented in the item finding logic
      })
    ),
    createPerk(
      'fishing_double',
      'Double Catch',
      '15% chance to catch two fish at once',
      (state) => ({
        ...state,
        // Effect will be implemented in the item finding logic
      })
    ),
    createPerk(
      'fishing_energy',
      'Sea Legs',
      'Reduces fishing energy cost by 20%',
      (state) => ({
        ...state,
        // Effect will be implemented in the activity cost calculation
      })
    ),
  ],
  mining: [
    createPerk(
      'mining_gems',
      'Gem Hunter',
      'Increases chance of finding gems by 25%',
      (state) => ({
        ...state,
        // Effect will be implemented in the item finding logic
      })
    ),
    createPerk(
      'mining_double',
      'Double Strike',
      '20% chance to get double ore',
      (state) => ({
        ...state,
        // Effect will be implemented in the item finding logic
      })
    ),
    createPerk(
      'mining_energy',
      'Efficient Miner',
      'Reduces mining energy cost by 20%',
      (state) => ({
        ...state,
        // Effect will be implemented in the activity cost calculation
      })
    ),
  ],
  foraging: [
    createPerk(
      'foraging_rare',
      'Eagle Eye',
      'Increases chance of finding rare items by 25%',
      (state) => ({
        ...state,
        // Effect will be implemented in the item finding logic
      })
    ),
    createPerk(
      'foraging_double',
      'Gatherer',
      '20% chance to gather double items',
      (state) => ({
        ...state,
        // Effect will be implemented in the item finding logic
      })
    ),
    createPerk(
      'foraging_energy',
      'Forest Walker',
      'Reduces foraging energy cost by 20%',
      (state) => ({
        ...state,
        // Effect will be implemented in the activity cost calculation
      })
    ),
  ],
  cooking: [
    createPerk(
      'cooking_quality',
      'Master Chef',
      'Increases food quality by 25%',
      (state) => ({
        ...state,
        // Effect will be implemented in the item quality calculation
      })
    ),
    createPerk(
      'cooking_double',
      'Efficient Cook',
      '20% chance to cook double portions',
      (state) => ({
        ...state,
        // Effect will be implemented in the item finding logic
      })
    ),
    createPerk(
      'cooking_energy',
      'Kitchen Expert',
      'Reduces cooking energy cost by 20%',
      (state) => ({
        ...state,
        // Effect will be implemented in the activity cost calculation
      })
    ),
  ],
};

export const getRandomPerks = (activity: Activity): [Perk, Perk] => {
  const availablePerks = perksByActivity[activity];
  const firstIndex = Math.floor(Math.random() * availablePerks.length);
  let secondIndex = Math.floor(Math.random() * availablePerks.length);
  
  // Ensure we don't get the same perk twice
  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * availablePerks.length);
  }
  
  return [availablePerks[firstIndex], availablePerks[secondIndex]];
};