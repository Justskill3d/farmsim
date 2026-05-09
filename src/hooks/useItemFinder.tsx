import { useState, useCallback } from 'react';
import { Item, Activity, ToolTier, EquipmentStats, ItemRarity } from '../types';
import { getItemById } from '../data/items';
import { getActivityById } from '../data/activities';
import { useGame } from '../context/GameContext';

const TIER_LEVEL_REQUIREMENTS: Record<ToolTier, number> = {
  basic: 0,
  copper: 2,
  iron: 4,
  tungsten: 6
};

const RARITY_LEVEL_REQUIREMENTS: Record<ItemRarity, number> = {
  common: 0,
  uncommon: 2,
  rare: 4,
  epic: 6,
  legendary: 8
};

const RARITY_WEIGHTS: Record<ItemRarity, number> = {
  common: 100,
  uncommon: 40,
  rare: 15,
  epic: 5,
  legendary: 2
};

const SPECIAL_TYPE_WEIGHTS: Record<string, number> = {
  equipment: 3,
  consumable: 5,
};

const EQUIPMENT_GATE_CHANCE = 0.03;
const NOTE_GATE_CHANCE = 0.05;

interface FindItemsResult {
  items: Item[];
  qualityChance?: number;
}

const getEquipmentStats = (equipment: Record<string, { stats?: EquipmentStats } | null>): EquipmentStats => {
  const totals: EquipmentStats = { farming: 0, fishing: 0, mining: 0, foraging: 0, cooking: 0, energy: 0, speed: 0, luck: 0 };
  Object.values(equipment).forEach(item => {
    if (item?.stats) {
      Object.entries(item.stats).forEach(([key, value]) => {
        totals[key as keyof EquipmentStats] = (totals[key as keyof EquipmentStats] || 0) + (value || 0);
      });
    }
  });
  return totals;
};

const getItemWeight = (item: Item, luckBonus: number): number => {
  const specialWeight = SPECIAL_TYPE_WEIGHTS[item.type];
  if (specialWeight !== undefined) {
    return specialWeight * (1 + luckBonus * 2);
  }
  if (item.recipeId) {
    return SPECIAL_TYPE_WEIGHTS.consumable * (1 + luckBonus * 2);
  }
  return RARITY_WEIGHTS[item.rarity] * (1 + luckBonus);
};

const weightedRandomPick = (pool: Item[], luckBonus: number): Item | null => {
  if (pool.length === 0) return null;
  const weights = pool.map(item => getItemWeight(item, luckBonus));
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let roll = Math.random() * totalWeight;
  for (let i = 0; i < pool.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return pool[i];
  }
  return pool[pool.length - 1];
};

export const useItemFinder = () => {
  const [recentlyFound, setRecentlyFound] = useState<Item[]>([]);
  const { state, dispatch } = useGame();

  const resetRecentlyFound = useCallback(() => {
    setRecentlyFound([]);
  }, []);

  const findItems = useCallback((activity: Activity, luckModifier = 0): FindItemsResult => {
    const activityDetails = getActivityById(activity);
    if (!activityDetails) return { items: [] };

    const foundItems: Item[] = [];
    const skill = state.skills[activity];
    const eqStats = getEquipmentStats(state.equipment);

    const requiredTool = activityDetails.requiredTool;
    const tool = requiredTool
      ? state.inventory.find(item => item && item.id === requiredTool)
      : null;

    if (requiredTool && !tool) return { items: [] };

    const toolTier = tool?.tier || 'basic';
    const skillLevel = skill.level;

    const equipSkillBonus = (eqStats[activity as keyof EquipmentStats] || 0) * 0.01;
    const equipLuckBonus = (eqStats.luck || 0) * 0.01;

    const baseChances = {
      farming: 0.5 + (skillLevel * 0.05),
      fishing: 0.4 + (skillLevel * 0.05),
      mining: 0.6 + (skillLevel * 0.05),
      foraging: 0.7 + (skillLevel * 0.05),
      cooking: 0.8 + (skillLevel * 0.05)
    };

    const maxItems = {
      farming: Math.min(1 + Math.floor(skillLevel / 3), 4),
      fishing: Math.min(1 + Math.floor(skillLevel / 4), 3),
      mining: Math.min(1 + Math.floor(skillLevel / 3), 5),
      foraging: Math.min(2 + Math.floor(skillLevel / 3), 6),
      cooking: Math.min(1 + Math.floor(skillLevel / 5), 3),
    };

    const hasRarePerk = skill.perks.includes(`${activity}_rare`);
    const rareBonus = hasRarePerk ? 0.2 : 0;

    const chance = Math.min(baseChances[activity] + (luckModifier * 0.05) + rareBonus + equipSkillBonus, 1);
    let itemCount = Math.floor(Math.random() * maxItems[activity]) + 1;

    const hasDoublePerk = skill.perks.includes(`${activity}_double`);
    if (hasDoublePerk && Math.random() < 0.2) {
      itemCount *= 2;
    }

    let qualityChance = 0;
    if (activity === 'farming') {
      const hasQualityPerk = skill.perks.includes('farming_quality');
      const baseQualityChance = 0.05 + (skillLevel * 0.01);
      const perkBonus = hasQualityPerk ? 0.15 : 0;
      qualityChance = Math.min(baseQualityChance + perkBonus + equipLuckBonus, 0.5);
    }

    if (activity === 'mining') {
      if (Math.random() < 0.3) {
        const coal = getItemById('coal');
        if (coal) {
          const quantity = Math.floor(Math.random() * 3) + 1;
          foundItems.push({ ...coal, quantity });
        }
      }
    }

    const equipmentGateRoll = Math.random() < (EQUIPMENT_GATE_CHANCE + equipLuckBonus * 0.02);
    const noteGateRoll = Math.random() < (NOTE_GATE_CHANCE + equipLuckBonus * 0.03);
    let foundSpecialDrop = false;

    for (let i = 0; i < itemCount; i++) {
      if (Math.random() < chance) {
        let itemPool = activityDetails.possibleItems
          .map(id => getItemById(id))
          .filter(Boolean) as Item[];

        itemPool = itemPool.filter(item => {
          const requiredLevel = RARITY_LEVEL_REQUIREMENTS[item.rarity];
          if (skillLevel < requiredLevel) return false;

          if (item.type === 'equipment') {
            if (foundSpecialDrop || !equipmentGateRoll) return false;
          }

          if (item.recipeId) {
            if (foundSpecialDrop || !noteGateRoll) return false;
          }

          if (activity === 'mining' && item.type === 'mineral') {
            const toolTierLevel = TIER_LEVEL_REQUIREMENTS[toolTier];
            const itemRarityLevel = RARITY_LEVEL_REQUIREMENTS[item.rarity];

            if (itemRarityLevel > toolTierLevel) {
              const tierDifference = itemRarityLevel - toolTierLevel;
              return Math.random() < Math.pow(0.2, tierDifference);
            }
          }

          return true;
        });

        if (skill.perks.includes(`${activity}_rare`)) {
          const rareItems = itemPool.filter(item =>
            ['rare', 'epic', 'legendary'].includes(item.rarity) &&
            item.type !== 'equipment' && !item.recipeId
          );
          if (rareItems.length > 0) {
            itemPool = [...itemPool, ...rareItems, ...rareItems];
          }
        }

        if (activity === 'mining' && skill.perks.includes('mining_gems')) {
          const gemItems = itemPool.filter(item =>
            item.type === 'mineral' &&
            ['rare', 'epic', 'legendary'].includes(item.rarity)
          );
          if (gemItems.length > 0) {
            itemPool = [...itemPool, ...gemItems, ...gemItems];
          }
        }

        if (itemPool.length > 0) {
          const item = weightedRandomPick(itemPool, equipLuckBonus);
          if (!item) continue;

          if (item.type === 'equipment' || item.recipeId) {
            foundSpecialDrop = true;
          }

          let quantity = item.stackable ? Math.floor(Math.random() * 3) + 1 : 1;

          if (skill.perks.includes(`${activity}_yield`) ||
              skill.perks.includes(`${activity}_double`)) {
            if (Math.random() < 0.2) {
              quantity *= 2;
            }
          }

          if (tool && tool.tier) {
            const tierBonus = {
              basic: 1,
              copper: 1.2,
              iron: 1.5,
              tungsten: 2
            }[tool.tier];

            quantity = Math.ceil(quantity * tierBonus);
          }

          const equipYieldBonus = 1 + (eqStats[activity as keyof EquipmentStats] || 0) * 0.02;
          quantity = Math.ceil(quantity * equipYieldBonus);

          foundItems.push({
            ...item,
            quantity
          });
        }
      }
    }

    if (foundItems.length === 0) {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'No Items Found',
          message: `You didn't find anything while ${activity}. Try again!`,
          type: 'info'
        }
      });
    }

    setRecentlyFound(foundItems);
    return { items: foundItems, qualityChance };
  }, [state.skills, state.inventory, state.equipment, dispatch]);

  return {
    findItems,
    recentlyFound,
    resetRecentlyFound
  };
};