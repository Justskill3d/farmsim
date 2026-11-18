import { useGame } from '../context/GameContext';
import { useItemFinder } from './useItemFinder';
import { ActivityDetails } from '../data/activities';
import { Item, EquipmentStats } from '../types';
import { craftingRecipes } from '../data/crafting';

const getEquipmentStats = (
  equipment: Record<string, { stats?: EquipmentStats } | null>
): EquipmentStats => {
  const totals: EquipmentStats = {
    farming: 0, fishing: 0, mining: 0, foraging: 0, cooking: 0,
    energy: 0, speed: 0, luck: 0,
  };
  Object.values(equipment).forEach(item => {
    if (item?.stats) {
      Object.entries(item.stats).forEach(([key, value]) => {
        totals[key as keyof EquipmentStats] =
          (totals[key as keyof EquipmentStats] || 0) + (value || 0);
      });
    }
  });
  return totals;
};

export interface ActivityStatus {
  canPerform: boolean;
  isActive: boolean;
  hasEnoughEnergy: boolean;
  hasRequiredTool: boolean;
  energyCost: number;
  timeCost: number;
}

export const useRunActivity = () => {
  const { state, dispatch } = useGame();
  const { findItems } = useItemFinder();

  const getActivityStatus = (activity: ActivityDetails): ActivityStatus => {
    const { energy, activeActivity, skills, weather } = state;
    const skill = skills[activity.id];
    const eqStats = getEquipmentStats(state.equipment);
    const isActive = activeActivity === activity.id;

    const energyReductionPerk = skill.perks.includes(`${activity.id}_energy`);
    let energyCost = energyReductionPerk
      ? Math.floor(activity.energyCost * 0.8)
      : activity.energyCost;

    const requiredTool = activity.requiredTool;
    const tool = requiredTool
      ? state.inventory.find(item => item && item.id === requiredTool)
      : null;

    if (tool?.tier === 'tungsten') {
      if (activity.id === 'farming' && skill.perks.includes('hoe_master')) {
        energyCost = 0;
      }
    }

    if (eqStats.energy && eqStats.energy > 0) {
      energyCost = Math.max(0, Math.floor(energyCost * (1 - eqStats.energy * 0.01)));
    }

    let timeCost = activity.timeCost;
    if (tool?.tier) {
      const speedBonuses = { basic: 1, copper: 0.85, iron: 0.75, tungsten: 0.6 };
      timeCost = Math.max(1, Math.floor(timeCost * speedBonuses[tool.tier]));
    }

    if (eqStats.speed && eqStats.speed > 0) {
      timeCost = Math.max(1, Math.floor(timeCost * (1 - eqStats.speed * 0.01)));
    }

    const weatherBonuses: Record<string, string[]> = {
      sunny: ['farming', 'foraging'],
      rainy: ['fishing'],
      stormy: ['mining', 'cooking'],
    };

    if (weatherBonuses[weather]?.includes(activity.id)) {
      energyCost = Math.max(energyCost === 0 ? 0 : 1, energyCost - 1);
    }

    const hasEnoughEnergy = energy >= energyCost;
    const hasRequiredTool = !activity.requiredTool ||
      state.inventory.some(item => item && item.id === activity.requiredTool);
    const canPerform = hasEnoughEnergy && hasRequiredTool && !isActive;

    return { canPerform, isActive, hasEnoughEnergy, hasRequiredTool, energyCost, timeCost };
  };

  const runActivity = (
    activity: ActivityDetails,
    onItemsFound?: (items: Item[]) => void
  ) => {
    const status = getActivityStatus(activity);
    if (!status.canPerform) return;

    const { skills } = state;
    const skill = skills[activity.id];
    const { energyCost, timeCost } = status;
    const requiredTool = activity.requiredTool;
    const tool = requiredTool
      ? state.inventory.find(item => item && item.id === requiredTool)
      : null;

    dispatch({ type: 'SET_ACTIVE_ACTIVITY', payload: activity.id });

    if (energyCost > 0) {
      dispatch({ type: 'USE_ENERGY', payload: energyCost });
    }

    dispatch({ type: 'ADVANCE_TIME', payload: timeCost });

    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: { activity: activity.id, amount: energyCost * 2 },
    });

    const result = findItems(activity.id);

    if (tool?.tier === 'tungsten') {
      if (
        (activity.id === 'mining' && skill.perks.includes('pickaxe_master')) ||
        (activity.id === 'foraging' && skill.perks.includes('axe_master'))
      ) {
        const commonItems = result.items.filter(item =>
          ['common', 'uncommon'].includes(item.rarity)
        );
        if (commonItems.length > 0) {
          const energyRestored = Math.floor(energyCost * 0.5);
          dispatch({ type: 'USE_ENERGY', payload: -energyRestored });
          dispatch({
            type: 'SHOW_NOTIFICATION',
            payload: {
              title: 'Energy Restored',
              message: `Restored ${energyRestored} energy from mastery bonus!`,
              type: 'success',
            },
          });
        }
      }
    }

    const keptItems: Item[] = [];
    let trashGold = 0;

    result.items.forEach(item => {
      if (item.type === 'trash') {
        trashGold += Math.max(1, item.value) * (item.quantity || 1);
        dispatch({ type: 'DISCOVER_ITEM', payload: item.id });
      } else if (item.recipeId && !state.discoveredRecipes.includes(item.recipeId)) {
        dispatch({ type: 'DISCOVER_RECIPE', payload: item.recipeId });
        dispatch({ type: 'DISCOVER_ITEM', payload: item.id });
        const recipe = craftingRecipes.find(r => r.id === item.recipeId);
        dispatch({
          type: 'QUEUE_DISCOVERY',
          payload: {
            kind: 'recipe',
            name: recipe ? recipe.name : item.name,
            rarity: item.rarity,
            description: recipe ? recipe.description : undefined,
            recipeIngredients: recipe
              ? recipe.ingredients.map(i => i.replace(/_/g, ' ')).join(' + ')
              : undefined,
          },
        });
      } else {
        const isNewItem = !state.discoveredItems.includes(item.id);
        dispatch({
          type: 'ADD_ITEM',
          payload: { ...item, slotId: -1 },
        });
        keptItems.push(item);
        if (isNewItem && (item.type === 'equipment' || item.rarity === 'legendary')) {
          dispatch({
            type: 'QUEUE_DISCOVERY',
            payload: {
              kind: 'item',
              name: item.name,
              rarity: item.rarity,
              description: item.description,
            },
          });
        }
      }
    });

    if (trashGold > 0) {
      dispatch({ type: 'SELL_ITEM', payload: { value: trashGold } });
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Trash Auto-Sold',
          message: `Sold junk for ${trashGold}g`,
          type: 'info',
        },
      });
    }

    if (onItemsFound) {
      onItemsFound(keptItems.length > 0 ? keptItems : result.items);
    } else if (keptItems.length > 0) {
      const summary = keptItems
        .slice(0, 3)
        .map(i => `${i.quantity || 1} ${i.name}`)
        .join(', ');
      const extra = keptItems.length > 3 ? ` +${keptItems.length - 3} more` : '';
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: `${activity.name} complete`,
          message: `Found: ${summary}${extra}`,
          type: 'success',
        },
      });
    }

    setTimeout(() => {
      dispatch({ type: 'SET_ACTIVE_ACTIVITY', payload: null });
    }, 2000);
  };

  return { runActivity, getActivityStatus };
};
