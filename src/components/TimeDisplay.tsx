import React, { useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { Sun, Moon, Sunset, Sunrise, Sprout, Fish, Pickaxe, Leaf, Utensils } from 'lucide-react';
import Card from './UI/Card';
import { Activity } from '../types';
import { activities as allActivities } from '../data/activities';
import { useRunActivity } from '../hooks/useRunActivity';

const TimeDisplay: React.FC = () => {
  const { state, getTimeOfDay, getFormattedTime } = useGame();
  const { day, season, year } = state;
  const timeOfDay = getTimeOfDay();
  const { runActivity, getActivityStatus } = useRunActivity();

  const timeIconAndColor = useMemo(() => {
    switch (timeOfDay) {
      case 'morning':
        return {
          icon: <Sunrise className="text-amber-500" size={24} />,
          color: 'from-blue-200 to-amber-100',
          text: 'text-amber-800'
        };
      case 'afternoon':
        return {
          icon: <Sun className="text-yellow-500" size={24} />,
          color: 'from-blue-400 to-sky-300',
          text: 'text-blue-900'
        };
      case 'evening':
        return {
          icon: <Sunset className="text-orange-500" size={24} />,
          color: 'from-orange-400 to-pink-300',
          text: 'text-orange-900'
        };
      case 'night':
        return {
          icon: <Moon className="text-indigo-400" size={24} />,
          color: 'from-indigo-900 to-purple-800',
          text: 'text-white'
        };
      default:
        return {
          icon: <Sun className="text-yellow-500" size={24} />,
          color: 'from-blue-400 to-sky-300',
          text: 'text-blue-900'
        };
    }
  }, [timeOfDay]);

  const seasonColors = {
    spring: 'bg-green-100 text-green-800 border-green-300',
    summer: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    fall: 'bg-orange-100 text-orange-800 border-orange-300',
    winter: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  const quickActivities: {
    id: Activity;
    label: string;
    Icon: typeof Sprout;
    ring: string;
    bg: string;
  }[] = [
    { id: 'farming', label: 'Farming', Icon: Sprout, ring: 'ring-amber-400', bg: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { id: 'fishing', label: 'Fishing', Icon: Fish, ring: 'ring-sky-400', bg: 'bg-sky-100 text-sky-700 hover:bg-sky-200' },
    { id: 'mining', label: 'Mining', Icon: Pickaxe, ring: 'ring-slate-400', bg: 'bg-slate-100 text-slate-700 hover:bg-slate-200' },
    { id: 'foraging', label: 'Foraging', Icon: Leaf, ring: 'ring-emerald-400', bg: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
    { id: 'cooking', label: 'Cooking', Icon: Utensils, ring: 'ring-rose-400', bg: 'bg-rose-100 text-rose-700 hover:bg-rose-200' },
  ];

  return (
    <div className="mb-4">
      <Card
        className={`overflow-hidden transition-colors duration-1000 bg-gradient-to-r ${timeIconAndColor.color}`}
        bordered={false}
      >
        <div className={`flex flex-wrap justify-between items-center gap-3 ${timeIconAndColor.text}`}>
          <div className="flex items-center">
            {timeIconAndColor.icon}
            <div className="ml-2 font-semibold">
              {getFormattedTime()}
            </div>
          </div>

          <div className="flex items-center gap-2 order-3 sm:order-2 w-full sm:w-auto justify-center">
            {quickActivities.map(({ id, label, Icon, ring, bg }) => {
              const details = allActivities.find(a => a.id === id);
              if (!details) return null;
              const status = getActivityStatus(details);
              const { canPerform, isActive, hasRequiredTool, hasEnoughEnergy, energyCost, timeCost } = status;

              let tooltip = `${label} - ${energyCost} energy, ${timeCost} min`;
              if (isActive) tooltip = `${label} in progress...`;
              else if (!hasRequiredTool) tooltip = `${label} - missing tool`;
              else if (!hasEnoughEnergy) tooltip = `${label} - not enough energy`;

              return (
                <button
                  key={id}
                  onClick={() => runActivity(details)}
                  disabled={!canPerform}
                  title={tooltip}
                  aria-label={tooltip}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all ${bg} ${
                    isActive ? `ring-2 ring-offset-1 ${ring} animate-pulse` : ''
                  } ${!canPerform ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                >
                  <Icon size={18} />
                  {!hasRequiredTool && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border border-white"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center order-2 sm:order-3">
            <div className={`text-sm px-2 py-1 rounded-full ${seasonColors[season]} border`}>
              {season.charAt(0).toUpperCase() + season.slice(1)}
            </div>
            <div className="ml-2 font-medium">
              Day {day}, Year {year}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TimeDisplay;
