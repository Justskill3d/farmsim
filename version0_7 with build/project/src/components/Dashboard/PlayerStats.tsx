import React from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import ProgressBar from '../UI/ProgressBar';
import { DollarSign, Battery, Award, Sprout, Fish, Pickaxe, Leaf, Utensils } from 'lucide-react';

const perkNames: Record<string, string> = {
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
  'cooking_energy': 'Kitchen Expert'
};

const PlayerStats: React.FC = () => {
  const { state } = useGame();
  const { energy, maxEnergy, money, skills } = state;

  const getExperienceThreshold = (level: number): number => {
    return 100 * level * level;
  };

  const activityIcons = {
    farming: Sprout,
    fishing: Fish,
    mining: Pickaxe,
    foraging: Leaf,
    cooking: Utensils,
  };

  return (
    <Card
      title={
        <div className="flex items-center">
          <Award size={18} className="mr-2" />
          <span>Player Stats</span>
        </div>
      }
      className="bg-amber-50 mb-6"
    >
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Battery className="text-green-600 mr-1" size={18} />
              <span className="font-medium">Energy</span>
            </div>
            <span className="text-sm">{energy}/{maxEnergy}</span>
          </div>
          <ProgressBar
            current={energy}
            max={maxEnergy}
            barColor="bg-green-500"
            height={8}
            showText={false}
          />
        </div>

        <div>
          <div className="flex items-center">
            <DollarSign className="text-amber-600" size={18} />
            <span className="font-medium ml-1">Money</span>
          </div>
          <div className="mt-2 text-xl font-bold text-amber-600">${money}</div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium mb-3">Skills</h3>
          <div className="space-y-3">
            {Object.entries(skills).map(([skillName, skill]) => {
              const Icon = activityIcons[skillName as keyof typeof activityIcons];
              const nextLevelExp = getExperienceThreshold(skill.level);
              const currentLevelExp = getExperienceThreshold(skill.level - 1);
              const progress = skill.experience - currentLevelExp;
              const total = nextLevelExp - currentLevelExp;

              return (
                <div key={skillName} className="space-y-1">
                  <div className="flex items-center justify-between group relative">
                    <div className="flex items-center">
                      <Icon size={16} className="mr-2 text-gray-600" />
                      <span className="capitalize">{skillName}</span>
                    </div>
                    <span className="text-sm font-medium">Level {skill.level}</span>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 right-0 invisible group-hover:visible bg-gray-800 text-white text-xs rounded px-2 py-1 w-48 text-right">
                      XP: {skill.experience.toLocaleString()} / {nextLevelExp.toLocaleString()}
                      <br />
                      Next Level: {(nextLevelExp - skill.experience).toLocaleString()} XP needed
                    </div>
                  </div>
                  <ProgressBar
                    current={progress}
                    max={total}
                    barColor="bg-blue-500"
                    height={4}
                    showText={false}
                  />
                  {skill.perks.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
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
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlayerStats;