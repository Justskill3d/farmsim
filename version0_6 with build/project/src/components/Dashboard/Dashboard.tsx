import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import TimeDisplay from '../TimeDisplay';
import InventoryGrid from '../Inventory/InventoryGrid';
import ActivitiesPanel from '../Activities/ActivitiesPanel';
import PlayerStats from './PlayerStats';
import WeatherDisplay from './WeatherDisplay';
import FarmingPlots from '../FarmingPlots/FarmingPlots';
import UpgradesPanel from '../Upgrades/UpgradesPanel';
import EquipmentPanel from '../Equipment/EquipmentPanel';
import CraftingInterface from '../Crafting/CraftingInterface';
import { Sprout, Activity as ActivityIcon, Package, PenTool as Tool, Hammer, Shield } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { state, dispatch } = useGame();
  const { weather, season, money, day, inventory, inventorySize } = state;
  const [activeTab, setActiveTab] = useState<'farming' | 'activities' | 'inventory' | 'upgrades' | 'crafting' | 'equipment'>('farming');

  const handleEndDay = () => {
    dispatch({
      type: 'END_DAY'
    });
  };

  const isGameOver = day > 100 || money >= 1000000;
  const isInventoryFull = inventory.filter(Boolean).length >= inventorySize;

  const getDashboardBackground = () => {
    const timeOfDay = getTimeOfDay();
    
    const weatherClass = {
      sunny: 'bg-gradient-to-b',
      rainy: 'bg-gradient-to-b opacity-90',
      stormy: 'bg-gradient-to-b opacity-80',
      snowy: 'bg-gradient-to-b'
    }[weather];
    
    const timeColors = {
      morning: {
        sunny: 'from-blue-200 to-amber-100',
        rainy: 'from-gray-300 to-blue-200',
        stormy: 'from-gray-700 to-gray-500',
        snowy: 'from-gray-100 to-blue-50'
      },
      afternoon: {
        sunny: 'from-blue-400 to-cyan-200',
        rainy: 'from-gray-400 to-blue-300',
        stormy: 'from-gray-800 to-gray-600',
        snowy: 'from-gray-200 to-blue-100'
      },
      evening: {
        sunny: 'from-orange-300 to-pink-200',
        rainy: 'from-gray-500 to-indigo-300',
        stormy: 'from-gray-900 to-gray-700',
        snowy: 'from-indigo-200 to-blue-100'
      },
      night: {
        sunny: 'from-indigo-900 to-purple-800',
        rainy: 'from-gray-900 to-indigo-800',
        stormy: 'from-gray-900 to-black',
        snowy: 'from-gray-800 to-indigo-900'
      }
    };
    
    return `${weatherClass} ${timeColors[timeOfDay][weather]} transition-all duration-1000`;
  };
  
  const getTimeOfDay = () => {
    const { time } = state;
    if (time >= 360 && time < 720) return 'morning';
    if (time >= 720 && time < 960) return 'afternoon';
    if (time >= 960 && time < 1080) return 'evening';
    return 'night';
  };

  const getTextColor = () => {
    const timeOfDay = getTimeOfDay();
    return timeOfDay === 'night' ? 'text-white' : 'text-gray-800';
  };

  if (isGameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-100 to-amber-200">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-2xl mx-4">
          <h1 className="text-4xl font-bold mb-4">
            {money >= 1000000 ? 'Congratulations!' : 'Game Over'}
          </h1>
          <p className="text-xl mb-6">
            {money >= 1000000 
              ? `You've reached $${money.toLocaleString()} in ${day} days!`
              : `You didn't reach $1,000,000 in 100 days. Final money: $${money.toLocaleString()}`
            }
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 pb-8 ${getDashboardBackground()}`}>
      <div className="max-w-5xl mx-auto">
        <header className={`mb-6 ${getTextColor()}`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Stardew Valley Simulator</h1>
              <p className="opacity-80">Experience the joy of farm life in the valley!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold mb-1">${money.toLocaleString()}</div>
              <div className="text-sm opacity-80">
                Day {day}/100 - Goal: $1,000,000
              </div>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <TimeDisplay />
          </div>
          <div>
            <WeatherDisplay />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg p-2">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveTab('farming')}
                  className={`py-2 px-4 rounded-md flex items-center justify-center transition-colors ${
                    activeTab === 'farming' 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Sprout size={18} className="mr-2" />
                  Farming
                </button>
                <button
                  onClick={() => setActiveTab('activities')}
                  className={`py-2 px-4 rounded-md flex items-center justify-center transition-colors ${
                    activeTab === 'activities' 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <ActivityIcon size={18} className="mr-2" />
                  Activities
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`py-2 px-4 rounded-md flex items-center justify-center transition-colors ${
                    activeTab === 'inventory' 
                      ? 'bg-amber-100 text-amber-900' 
                      : isInventoryFull 
                      ? 'bg-red-100 text-red-900 hover:bg-red-200'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Package size={18} className="mr-2" />
                  Inventory {isInventoryFull && <span className="ml-1">(Full!)</span>}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  onClick={() => setActiveTab('upgrades')}
                  className={`py-2 px-4 rounded-md flex items-center justify-center transition-colors ${
                    activeTab === 'upgrades' 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Tool size={18} className="mr-2" />
                  Upgrades
                </button>
                <button
                  onClick={() => setActiveTab('crafting')}
                  className={`py-2 px-4 rounded-md flex items-center justify-center transition-colors ${
                    activeTab === 'crafting' 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Hammer size={18} className="mr-2" />
                  Crafting
                </button>
                <button
                  onClick={() => setActiveTab('equipment')}
                  className={`py-2 px-4 rounded-md flex items-center justify-center transition-colors ${
                    activeTab === 'equipment' 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Shield size={18} className="mr-2" />
                  Equipment
                </button>
              </div>
            </div>

            {activeTab === 'farming' && <FarmingPlots />}
            {activeTab === 'activities' && <ActivitiesPanel />}
            {activeTab === 'inventory' && <InventoryGrid />}
            {activeTab === 'upgrades' && <UpgradesPanel />}
            {activeTab === 'crafting' && <CraftingInterface />}
            {activeTab === 'equipment' && <EquipmentPanel />}
          </div>
          
          <div>
            <PlayerStats />
            <button
              onClick={handleEndDay}
              className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <Sprout size={18} className="mr-2" />
              End Day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;