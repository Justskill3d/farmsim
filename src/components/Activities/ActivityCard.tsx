import React from 'react';
import { ActivityDetails } from '../../data/activities';
import { useGame } from '../../context/GameContext';
import { useRunActivity } from '../../hooks/useRunActivity';
import Card from '../UI/Card';
import * as LucideIcons from 'lucide-react';
import { Item } from '../../types';

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

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onItemsFound }) => {
  const { state } = useGame();
  const { skills } = state;
  const { runActivity, getActivityStatus } = useRunActivity();

  const skill = skills[activity.id];
  const status = getActivityStatus(activity);
  const { canPerform, isActive, hasEnoughEnergy, hasRequiredTool, energyCost, timeCost } = status;

  const handleStartActivity = () => {
    runActivity(activity, onItemsFound);
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