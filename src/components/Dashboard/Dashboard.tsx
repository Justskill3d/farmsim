import React, { useState, useEffect } from 'react';
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
import Footer from '../Footer/Footer';
import { Sprout, Activity as ActivityIcon, Package, PenTool as Tool, Hammer, Shield, Save, Upload, Book, Circle as HelpCircle } from 'lucide-react';
import CollectionGrid from '../Collection/CollectionGrid';
import DiscoveryModal from '../UI/DiscoveryModal';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

function Dashboard() {
  const { state, dispatch, saveGame, loadGame } = useGame();
  const { weather, season, money, day, inventory, inventorySize } = state;
  const [activeTab, setActiveTab] = useState<'farming' | 'activities' | 'inventory' | 'upgrades' | 'crafting' | 'equipment' | 'collection'>('farming');

  useEffect(() => {
    // Check if tutorial has been shown before
    const tutorialShown = localStorage.getItem('farmingSimTutorialShown');
    
    if (!tutorialShown) {
      // Initialize the tutorial
      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: '#welcome-message',
            popover: {
              title: 'Welcome to Farming Simulator Simulator! 🌱',
              description: 'Let me show you around! This tutorial will teach you the basics of becoming a successful farmer.',
              side: "bottom",
              align: 'start'
            }
          },
          {
            element: '#activities-tab',
            popover: {
              title: 'Activities - Your Main Source of Items',
              description: 'Click here to perform activities like farming, fishing, mining, foraging, and cooking. Each activity gives you items and improves your skills!',
              side: "bottom",
              align: 'start'
            }
          },
          {
            element: '#farming-tab',
            popover: {
              title: 'Farming - Plant and Harvest',
              description: 'This is where you can plant seeds and manage your crops. First, till the soil with your hoe, then drag seeds from your inventory to plant them!',
              side: "bottom",
              align: 'start'
            }
          },
          {
            element: '#inventory-tab',
            popover: {
              title: 'Inventory - Your Items',
              description: 'All your items are stored here. You can sell items for money, use consumables, or drag seeds to plant them in your farming plots.',
              side: "bottom",
              align: 'start'
            }
          },
          {
            element: '#upgrades-tab',
            popover: {
              title: 'Upgrades - Improve Your Tools',
              description: 'Upgrade your tools with ores you find while mining. Better tools work faster, use less energy, and give better results!',
              side: "bottom",
              align: 'start'
            }
          },
          {
            element: '#equipment-tab',
            popover: {
              title: 'Equipment - Boost Your Stats',
              description: 'Equip gear to boost your skills and efficiency. Craft equipment using materials you gather from activities.',
              side: "bottom",
              align: 'start'
            }
          },
          {
            element: '#crafting-tab',
            popover: {
              title: 'Crafting - Create New Items',
              description: 'Combine items to create equipment, meals, and other useful things. Experiment with different combinations to discover new recipes!',
              side: "bottom",
              align: 'start'
            }
          },
          {
            element: '#player-stats',
            popover: {
              title: 'Your Progress',
              description: 'Track your energy, money, and skill levels here. As you level up skills, you\'ll unlock powerful perks!',
              side: "left",
              align: 'start'
            }
          },
          {
            element: '#end-day-button',
            popover: {
              title: 'End Day',
              description: 'When you\'re done for the day, click here to advance to the next day. Your energy will restore and your crops will grow!',
              side: "left",
              align: 'start'
            }
          },
          {
            popover: {
              title: 'Ready to Start! 🎉',
              description: 'You\'re all set! Start by performing activities to get items and improve your skills. Your goal is to reach $1,000,000 in 100 days. Good luck and get rich, farmer!',
              side: "bottom",
              align: 'start'
            }
          }
        ],
        onDestroyStarted: () => {
          // Mark tutorial as shown
          localStorage.setItem('farmingSimTutorialShown', 'true');
          driverObj.destroy();
        }
      });

      // Start the tutorial after a short delay to ensure DOM is ready
      setTimeout(() => {
        driverObj.drive();
      }, 500);
    }
  }, []);

  const handleEndDay = () => {
    dispatch({
      type: 'END_DAY'
    });
  };

  const startTutorial = () => {
    // Remove the tutorial flag and reload to restart tutorial
    localStorage.removeItem('farmingSimTutorialShown');
    window.location.reload();
  };

  const isGameOver = day > 100 || money >= 1000000;
  const isInventoryFull = inventory.filter(Boolean).length >= inventorySize;

  type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
  type WeatherType = 'sunny' | 'rainy' | 'stormy' | 'snowy';

  const gradientColors: Record<TimeOfDay, Record<WeatherType, [string, string]>> = {
    morning:   { sunny: ['#bfdbfe','#fef3c7'], rainy: ['#d1d5db','#bfdbfe'], stormy: ['#374151','#6b7280'], snowy: ['#f3f4f6','#eff6ff'] },
    afternoon: { sunny: ['#60a5fa','#a5f3fc'], rainy: ['#9ca3af','#93c5fd'], stormy: ['#1f2937','#4b5563'], snowy: ['#e5e7eb','#dbeafe'] },
    evening:   { sunny: ['#fca5a1','#fbcfe8'], rainy: ['#6b7280','#a5b4fc'], stormy: ['#111827','#374151'], snowy: ['#c7d2fe','#dbeafe'] },
    night:     { sunny: ['#312e81','#6b21a8'], rainy: ['#111827','#3730a3'], stormy: ['#111827','#000000'], snowy: ['#1f2937','#312e81'] },
  };

  const weatherOpacity: Record<WeatherType, number> = { sunny: 1, rainy: 0.9, stormy: 0.8, snowy: 1 };

  const getTimeOfDay = (): TimeOfDay => {
    const { time } = state;
    if (time >= 360 && time < 720) return 'morning';
    if (time >= 720 && time < 960) return 'afternoon';
    if (time >= 960 && time < 1080) return 'evening';
    return 'night';
  };

  const timeOfDay = getTimeOfDay();
  const typedWeather = weather as WeatherType;

  const [bgKey, setBgKey] = useState(() => `${timeOfDay}-${weather}`);
  const [prevColors, setPrevColors] = useState<[string, string]>(() => gradientColors[timeOfDay][typedWeather]);
  const [nextColors, setNextColors] = useState<[string, string] | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const newKey = `${timeOfDay}-${weather}`;
    if (newKey === bgKey) return;
    const incoming = gradientColors[timeOfDay][typedWeather];
    setNextColors(incoming);
    setFading(false);
    // Trigger reflow so the transition fires
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFading(true);
      });
    });
    const timer = setTimeout(() => {
      setPrevColors(incoming);
      setNextColors(null);
      setFading(false);
      setBgKey(newKey);
    }, 500);
    return () => clearTimeout(timer);
  }, [timeOfDay, weather]);

  const [from, to] = prevColors;
  const opacity = weatherOpacity[typedWeather];

  const getTextColor = () => timeOfDay === 'night' ? 'text-white' : 'text-gray-800';

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
    <div className="min-h-screen relative">
      {/* Base background layer */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, ${from}, ${to})`, opacity }}
      />
      {/* Incoming background layer — fades in on time/weather change */}
      {nextColors && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${nextColors[0]}, ${nextColors[1]})`,
            opacity: fading ? opacity : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      )}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <header className={`mb-6 ${getTextColor()}`} id="welcome-message">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Farming Simulator Simulator</h1>
              <p className="opacity-80">Experience the joy of farm life in the valley!</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={startTutorial}
                className="flex items-center px-3 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500 transition-colors"
                title="Restart Tutorial"
              >
                <HelpCircle size={16} className="mr-2" />
                Tutorial
              </button>
              <button
                onClick={saveGame}
                className="flex items-center px-3 py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition-colors"
              >
                <Save size={16} className="mr-2" />
                Save Game
              </button>
              <button
                onClick={loadGame}
                className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Upload size={16} className="mr-2" />
                Load Game
              </button>
              <div className="text-right">
                <div className="text-2xl font-bold mb-1">${money.toLocaleString()}</div>
                <div className="text-sm opacity-80">
                  Day {day}/100 - Goal: $1,000,000
                </div>
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
              <div className="grid grid-cols-4 gap-2">
                <button
                  id="farming-tab"
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
                  id="activities-tab"
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
                  id="inventory-tab"
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
                <button
                  id="collection-tab"
                  onClick={() => setActiveTab('collection')}
                  className={`py-2 px-4 rounded-md flex items-center justify-center transition-colors ${
                    activeTab === 'collection' 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Book size={18} className="mr-2" />
                  Collection
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <button
                  id="upgrades-tab"
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
                  id="crafting-tab"
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
                  id="equipment-tab"
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
            {activeTab === 'collection' && <CollectionGrid />}
          </div>
          
          <div>
            <div id="player-stats">
              <PlayerStats />
            </div>
            <button
              id="end-day-button"
              onClick={handleEndDay}
              className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              <Sprout size={18} className="mr-2" />
              End Day
            </button>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
      <DiscoveryModal />
    </div>
  );
}

export default Dashboard;