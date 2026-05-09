import React from 'react';
import { ActivityDetails } from '../../data/activities';
import { useGame } from '../../context/GameContext';
import { useItemFinder } from '../../hooks/useItemFinder';
import Card from '../UI/Card';
import * as LucideIcons from 'lucide-react';
import { Item, EquipmentStats } from '../../types';

// Move perkNames outside component to avoid recreation on each render
const perkNames: Record<string, string> = {
  // Basic perks
  'farming_energy': 'Energy Saver',
  'farming_double': 'Double Yield',
  'farming_rare': 'Rare Find',
  'farming_quality': 'Quality+',
  'farming_yield': 'Bountiful Harvest',
  'fishing_rare': 'Lucky Fisher',
  'fishing_double': 'Double Catch',
  'fishing_energy': 'Sea Legs',
  'mining_gems': 'Gem Hunter',
  'mining_double': 'Double Strike',
  'mining_energy': 'Efficient Miner',
  'foraging_rare': 'Eagle Eye',
  'foraging_double': 'Gatherer',
  'foraging_energy': 'Forest Walker',
  'cooking_quality': 'Master Chef',
  'cooking_double': 'Efficient Cook',
  'cooking_energy': 'Kitchen Expert',
  // Tool mastery perks (level 5+)
  'watering_can_master': 'Master Irrigator',
  'pickaxe_master': 'Efficient Excavator',
  'hoe_master': 'Expert Tiller',
  'axe_master': 'Forest Master',
  'fishing_rod_master': 'Fish Whisperer'
};

interface ActivityCardProps {
  activity: ActivityDetails;
  onItemsFound: (items: Item[]) => void;
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

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onItemsFound }) => {
  const { state, dispatch } = useGame();
  const { energy, activeActivity, skills, weather } = state;
  const { findItems } = useItemFinder();

  const isActive = activeActivity === activity.id;
  const skill = skills[activity.id];
  const eqStats = getEquipmentStats(state.equipment);

  const energyReductionPerk = skill.perks.includes(`${activity.id}_energy`);
  let energyCost = energyReductionPerk
    ? Math.floor(activity.energyCost * 0.8)
    : activity.energyCost;

  const requiredTool = activity.requiredTool;
  const tool = requiredTool ? state.inventory.find(item => item && item.id === requiredTool) : null;

  if (tool?.tier === 'tungsten') {
    if (activity.id === 'farming' && skill.perks.includes('hoe_master')) {
      energyCost = 0;
    }
  }

  // Equipment energy stat reduces energy cost (1 point = 1% reduction)
  if (eqStats.energy && eqStats.energy > 0) {
    energyCost = Math.max(0, Math.floor(energyCost * (1 - eqStats.energy * 0.01)));
  }

  let timeCost = activity.timeCost;
  if (tool?.tier) {
    const speedBonuses = {
      basic: 1,
      copper: 0.85,
      iron: 0.75,
      tungsten: 0.6
    };
    timeCost = Math.max(1, Math.floor(timeCost * speedBonuses[tool.tier]));
  }

  // Equipment speed stat reduces time cost (1 point = 1% reduction)
  if (eqStats.speed && eqStats.speed > 0) {
    timeCost = Math.max(1, Math.floor(timeCost * (1 - eqStats.speed * 0.01)));
  }

  const weatherBonuses = {
    sunny: ['farming', 'foraging'],
    rainy: ['fishing'],
    stormy: ['mining', 'cooking']
  };

  if (weatherBonuses[weather]?.includes(activity.id)) {
    energyCost = Math.max(energyCost === 0 ? 0 : 1, energyCost - 1);
  }
  
  const hasEnoughEnergy = energy >= energyCost;
  const hasRequiredTool = !activity.requiredTool || 
    state.inventory.some(item => item && item.id === activity.requiredTool);
  const canPerform = hasEnoughEnergy && hasRequiredTool && !isActive;

  const handleStartActivity = () => {
    if (canPerform) {
      dispatch({
        type: 'SET_ACTIVE_ACTIVITY',
        payload: activity.id
      });
      
      if (energyCost > 0) {
        dispatch({
          type: 'USE_ENERGY',
          payload: energyCost
        });
      }
      
      dispatch({
        type: 'ADVANCE_TIME',
        payload: timeCost
      });
      
      dispatch({
        type: 'ADD_EXPERIENCE',
        payload: {
          activity: activity.id,
          amount: energyCost * 2
        }
      });
      
      const result = findItems(activity.id);
      
      // Handle energy restoration for master perks
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
            dispatch({
              type: 'USE_ENERGY',
              payload: -energyRestored // Negative value to restore energy
            });
            
            dispatch({
              type: 'SHOW_NOTIFICATION',
              payload: {
                title: 'Energy Restored',
                message: `Restored ${energyRestored} energy from mastery bonus!`,
                type: 'success'
              }
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
        } else {
          dispatch({
            type: 'ADD_ITEM',
            payload: { ...item, slotId: -1 }
          });
          keptItems.push(item);
        }
      });

      if (trashGold > 0) {
        dispatch({
          type: 'SELL_ITEM',
          payload: { value: trashGold }
        });
        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: {
            title: 'Trash Auto-Sold',
            message: `Sold junk for ${trashGold}g`,
            type: 'info'
          }
        });
      }

      onItemsFound(keptItems.length > 0 ? keptItems : result.items);
      
      setTimeout(() => {
        dispatch({
          type: 'SET_ACTIVE_ACTIVITY',
          payload: null
        });
      }, 2000);
    }
  };

  const IconComponent = LucideIcons[activity.iconName as keyof typeof LucideIcons] || LucideIcons.Sprout;

  const getStatusBadge = () => {
    if (isActive) {
      return <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full animate-pulse">In Progress</span>;
    }
    if (!hasRequiredTool) {
      return <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Missing Tool</span>;
    }
    if (!hasEnoughEnergy) {
      return <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Not Enough Energy</span>;
    }
    return <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Available</span>;
  };

  return (
    <Card
      className={`h-full transition-all ${
        isActive ? 'bg-amber-50 border-amber-300' : 
        !canPerform ? 'opacity-70' : 'hover:bg-amber-50'
      }`}
      hoverable={canPerform}
      onClick={canPerform ? handleStartActivity : undefined}
    >
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-full ${isActive ? 'bg-amber-200' : 'bg-amber-100'}`}>
          <IconComponent className="text-amber-700" size={20} />
        </div>
        <div className="ml-2">
          <h3 className="font-medium">{activity.name}</h3>
          <div className="text-xs text-gray-600">Level {skill.level}</div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
      
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
          <LucideIcons.Clock size={12} className="mr-1" />
          {timeCost} min
        </span>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
          <LucideIcons.Battery size={12} className="mr-1" />
          {energyCost} energy
        </span>
        {getStatusBadge()}
      </div>

      {skill.perks.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex flex-wrap gap-1">
            {skill.perks.map((perkId) => (
              <span
                key={perkId}
                className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                title={perkId}
              >
                {perkNames[perkId] || 'Unknown Perk'}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ActivityCard;