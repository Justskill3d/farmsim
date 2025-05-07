import { useState, useCallback } from 'react';
import { Item, Activity, ToolTier } from '../types';
import { getItemById } from '../data/items';
import { getActivityById } from '../data/activities';
import { useGame } from '../context/GameContext';

const TIER_LEVEL_REQUIREMENTS: Record<ToolTier, number> = {
  basic: 0,
  copper: 2,
  iron: 4,
  tungsten: 6
};

const RARITY_LEVEL_REQUIREMENTS = {
  common: 0,
  uncommon: 2,
  rare: 4,
  epic: 6,
  legendary: 8
};

interface FindItemsResult {
  items: Item[];
  qualityChance?: number;
}

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
    
    const requiredTool = activityDetails.requiredTool;
    const tool = requiredTool 
      ? state.inventory.find(item => item && item.id === requiredTool)
      : null;
    
    if (requiredTool && !tool) return { items: [] };
    
    const toolTier = tool?.tier || 'basic';
    const skillLevel = skill.level;
    
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
    
    const chance = Math.min(baseChances[activity] + (luckModifier * 0.05) + rareBonus, 1);
    let itemCount = Math.floor(Math.random() * maxItems[activity]) + 1;
    
    const hasDoublePerk = skill.perks.includes(`${activity}_double`);
    if (hasDoublePerk && Math.random() < 0.2) {
      itemCount *= 2;
    }

    // Calculate quality chance for farming
    let qualityChance = 0;
    if (activity === 'farming') {
      const hasQualityPerk = skill.perks.includes('farming_quality');
      const baseQualityChance = 0.05 + (skillLevel * 0.01); // Base 5% + 1% per level
      const perkBonus = hasQualityPerk ? 0.15 : 0; // +15% from perk
      qualityChance = Math.min(baseQualityChance + perkBonus, 0.5); // Cap at 50%
    }
    
    // Special handling for mining to ensure coal generation
    if (activity === 'mining') {
      if (Math.random() < 0.3) {
        const coal = getItemById('coal');
        if (coal) {
          const quantity = Math.floor(Math.random() * 3) + 1;
          foundItems.push({ ...coal, quantity });
        }
      }
    }
    
    for (let i = 0; i < itemCount; i++) {
      if (Math.random() < chance) {
        let itemPool = activityDetails.possibleItems
          .map(id => getItemById(id))
          .filter(Boolean) as Item[];
        
        itemPool = itemPool.filter(item => {
          const requiredLevel = RARITY_LEVEL_REQUIREMENTS[item.rarity];
          if (skillLevel < requiredLevel) return false;
          
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
        
        switch (activity) {
          case 'mining':
            if (skill.perks.includes('mining_gems')) {
              const gemItems = itemPool.filter(item => 
                item.type === 'mineral' && 
                ['rare', 'epic', 'legendary'].includes(item.rarity)
              );
              if (gemItems.length > 0) {
                itemPool = [...gemItems, ...gemItems, ...itemPool];
              }
            }
            break;
            
          case 'fishing':
            if (skill.perks.includes('fishing_rare')) {
              const rarefish = itemPool.filter(item => 
                ['rare', 'epic', 'legendary'].includes(item.rarity)
              );
              if (rarefish.length > 0) {
                itemPool = [...rarefish, ...rarefish, ...itemPool];
              }
            }
            break;
            
          case 'foraging':
            if (skill.perks.includes('foraging_rare')) {
              const rareitems = itemPool.filter(item => 
                ['rare', 'epic', 'legendary'].includes(item.rarity)
              );
              if (rareitems.length > 0) {
                itemPool = [...rareitems, ...rareitems, ...itemPool];
              }
            }
            break;
            
          case 'farming':
            if (skill.perks.includes('farming_rare')) {
              const rarecrops = itemPool.filter(item => 
                ['rare', 'epic', 'legendary'].includes(item.rarity)
              );
              if (rarecrops.length > 0) {
                itemPool = [...rarecrops, ...rarecrops, ...itemPool];
              }
            }
            break;
            
          case 'cooking':
            if (skill.perks.includes('cooking_quality')) {
              const qualitymeals = itemPool.filter(item => 
                ['rare', 'epic'].includes(item.rarity)
              );
              if (qualitymeals.length > 0) {
                itemPool = [...qualitymeals, ...qualitymeals, ...itemPool];
              }
            }
            break;
        }
        
        if (itemPool.length > 0) {
          const item = itemPool[Math.floor(Math.random() * itemPool.length)];
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
          
          foundItems.push({
            ...item,
            quantity
          });
        }
      }
    }
    
    // Show notification if no items were found
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
  }, [state.skills, state.inventory, dispatch]);

  return {
    findItems,
    recentlyFound,
    resetRecentlyFound
  };
};