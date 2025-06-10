import { Item, ItemRarity } from '../types';
import { getItemById } from '../data/items';

const treasurePool: { id: string; weight: number; rarity: ItemRarity }[] = [
  { id: 'gold_ore', weight: 40, rarity: 'rare' },
  { id: 'diamond', weight: 20, rarity: 'epic' },
  { id: 'ruby', weight: 25, rarity: 'rare' },
  { id: 'emerald', weight: 25, rarity: 'rare' },
  { id: 'prismatic_shard', weight: 5, rarity: 'legendary' },
  { id: 'ancient_doll', weight: 30, rarity: 'rare' },
  { id: 'golden_pumpkin', weight: 15, rarity: 'epic' },
  { id: 'pearl', weight: 35, rarity: 'rare' }
];

export const getTreasureLoot = (count: number = 3): Item[] => {
  const loot: Item[] = [];
  const totalWeight = treasurePool.reduce((sum, item) => sum + item.weight, 0);

  for (let i = 0; i < count; i++) {
    let roll = Math.random() * totalWeight;
    let selectedItem = treasurePool[0];

    for (const item of treasurePool) {
      roll -= item.weight;
      if (roll <= 0) {
        selectedItem = item;
        break;
      }
    }

    const item = getItemById(selectedItem.id);
    if (item) {
      loot.push(item);
    }
  }

  return loot;
};

export const applyItemEffects = (state: GameState, item: InventoryItem): GameState => {
  if (!item.effects) return state;

  let newState = { ...state };

  // Apply energy effects
  if (item.effects.energy) {
    newState.energy = Math.min(state.maxEnergy, state.energy + item.effects.energy);
  }

  // Apply experience effects
  if (item.effects.experience) {
    Object.keys(state.skills).forEach(skill => {
      const currentSkill = state.skills[skill as Activity];
      newState.skills[skill as Activity] = {
        ...currentSkill,
        experience: currentSkill.experience + item.effects.experience!
      };
    });
  }

  // Apply skill bonus effects
  if (item.effects.skillBonus) {
    const { skill, amount } = item.effects.skillBonus;
    const currentSkill = state.skills[skill];
    newState.skills[skill] = {
      ...currentSkill,
      experience: currentSkill.experience + amount
    };
  }

  return newState;
};