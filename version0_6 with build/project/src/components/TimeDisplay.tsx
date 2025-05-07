import React, { useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { Sun, Moon, Sunset, Sunrise } from 'lucide-react';
import Card from './UI/Card';

const TimeDisplay: React.FC = () => {
  const { state, getTimeOfDay, getFormattedTime } = useGame();
  const { day, season, year } = state;
  const timeOfDay = getTimeOfDay();
  
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

  return (
    <div className="mb-4">
      <Card 
        className={`overflow-hidden transition-colors duration-1000 bg-gradient-to-r ${timeIconAndColor.color}`}
        bordered={false}
      >
        <div className={`flex justify-between items-center ${timeIconAndColor.text}`}>
          <div className="flex items-center">
            {timeIconAndColor.icon}
            <div className="ml-2 font-semibold">
              {getFormattedTime()}
            </div>
          </div>
          
          <div className="flex items-center">
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