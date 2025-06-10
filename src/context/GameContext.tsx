import React, { createContext, useContext, useReducer } from 'react';
import { tools } from '../data/items';
import { getRandomPerks } from '../data/perks';
import { getTreasureLoot, applyItemEffects } from '../utils/itemUtils';

interface GameState {
  day: number;
  season: string;
  year: number;
  time: number;
  energy: number;
  maxEnergy: number;
  money: number;
  weather: Weather;
  inventory: (InventoryItem | null)[];
  inventorySize: number;
  activeActivity: Activity | null;
  skills: Record<Activity, Skill>;
  showPerkSelection: boolean;
  currentSkillLevelUp: Activity | null;
  plots: Plot[];
  notification: Notification | null;
  equipment: Equipment;
  discoveredRecipes: string[];
  discoveredItems: string[];
}

const initialState: GameState = {
  day: 1,
  season: 'spring',
  year: 1,
  time: 360,
  energy: 100,
  maxEnergy: 100,
  money: 500,
  weather: 'sunny',
  inventory: Array(16).fill(null).map((_, index) => {
    const tool = tools[index];
    return tool ? { ...tool, quantity: 1, slotId: index } : null;
  }),
  inventorySize: 16,
  activeActivity: null,
  skills: {
    farming: { level: 1, experience: 0, perks: [] },
    fishing: { level: 1, experience: 0, perks: [] },
    mining: { level: 1, experience: 0, perks: [] },
    foraging: { level: 1, experience: 0, perks: [] },
    cooking: { level: 1, experience: 0, perks: [] },
  },
  showPerkSelection: false,
  currentSkillLevelUp: null,
  plots: Array(12).fill(null).map((_, index) => ({
    id: index,
    state: 'untilled',
    waterLevel: 0,
    fertilized: false
  })),
  notification: null,
  equipment: {
    head: null,
    torso: null,
    belt: null,
    legs: null,
    boots: null,
    hands: null,
    ring_left: null,
    ring_right: null,
    amulet: null
  },
  discoveredRecipes: [],
  discoveredItems: []
};

const calculateLevel = (experience: number): number => {
  return Math.floor(Math.sqrt(experience / 100)) + 1;
};

const getNextSeason = (currentSeason: string): string => {
  const seasons = ['spring', 'summer', 'fall', 'winter'];
  const currentIndex = seasons.indexOf(currentSeason);
  return seasons[(currentIndex + 1) % 4];
};

const getSeasonalWeather = (season: string): Weather[] => {
  switch (season) {
    case 'winter':
      return ['snowy', 'stormy'];
    case 'spring':
      return ['sunny', 'rainy'];
    case 'summer':
      return ['sunny', 'stormy'];
    case 'fall':
      return ['sunny', 'rainy', 'stormy'];
    default:
      return ['sunny', 'rainy'];
  }
};

const endDay = (state: GameState): GameState => {
  const newDay = state.day + 1;
  let newSeason = state.season;
  let newYear = state.year;

  if (newDay % 25 === 1) {
    newSeason = getNextSeason(state.season);
    if (newSeason === 'spring') {
      newYear++;
    }
  }

  const weatherOptions = getSeasonalWeather(newSeason);
  const newWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
  
  const updatedPlots = state.plots.map(plot => {
    if (newSeason === 'winter' && (plot.state === 'seeded' || plot.state === 'growing')) {
      return { ...plot, state: 'dead' };
    }
    
    if (plot.state === 'seeded' || plot.state === 'growing') {
      const willBeWatered = newWeather === 'rainy' || newWeather === 'stormy';
      
      if (plot.waterLevel === 0 && !willBeWatered) {
        return { ...plot, state: 'dead' };
      }
      
      const daysPassed = newDay - (plot.plantedDay || 0);
      if (daysPassed >= (plot.daysToMature || 0)) {
        return { ...plot, state: 'mature', waterLevel: 0 };
      }
      
      return { 
        ...plot, 
        state: 'growing', 
        waterLevel: willBeWatered ? 1 : 0 
      };
    }
    return { ...plot, waterLevel: 0 };
  });

  return {
    ...state,
    day: newDay,
    season: newSeason,
    year: newYear,
    time: 360,
    energy: state.maxEnergy,
    weather: newWeather,
    plots: updatedPlots,
    activeActivity: null,
    notification: {
      title: 'Day Ended',
      message: `Welcome to day ${newDay}!`,
      type: 'info'
    }
  };
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'ADVANCE_TIME': {
      const newTime = state.time + action.payload;
      if (newTime >= 1080) { // 18:00 (6 PM)
        return endDay(state);
      }
      return {
        ...state,
        time: newTime
      };
    }

    case 'END_DAY':
      return endDay(state);

    case 'TILL_PLOT': {
      const newPlots = [...state.plots];
      const plotIndex = newPlots.findIndex(plot => plot.id === action.payload);
      if (plotIndex !== -1) {
        newPlots[plotIndex] = {
          ...newPlots[plotIndex],
          state: 'tilled'
        };
      }
      return {
        ...state,
        plots: newPlots
      };
    }

    case 'PLANT_SEED': {
      const { plotId, seedId, daysToMature, plantedDay } = action.payload;
      const newPlots = [...state.plots];
      const plotIndex = newPlots.findIndex(plot => plot.id === plotId);
      
      if (plotIndex !== -1) {
        newPlots[plotIndex] = {
          ...newPlots[plotIndex],
          state: 'seeded',
          seedId,
          daysToMature,
          plantedDay
        };
      }
      
      return {
        ...state,
        plots: newPlots
      };
    }

    case 'WATER_PLOT': {
      const newPlots = [...state.plots];
      const plotIndex = newPlots.findIndex(plot => plot.id === action.payload);
      if (plotIndex !== -1) {
        newPlots[plotIndex] = {
          ...newPlots[plotIndex],
          waterLevel: 1
        };
      }
      return {
        ...state,
        plots: newPlots
      };
    }

    case 'HARVEST_PLOT': {
      const newPlots = [...state.plots];
      const plotIndex = newPlots.findIndex(plot => plot.id === action.payload);
      if (plotIndex !== -1) {
        newPlots[plotIndex] = {
          ...newPlots[plotIndex],
          state: 'untilled',
          seedId: undefined,
          plantedDay: undefined,
          daysToMature: undefined,
          waterLevel: 0,
          fertilized: false
        };
      }
      return {
        ...state,
        plots: newPlots
      };
    }

    case 'CLEAR_DEAD_PLOT': {
      const newPlots = [...state.plots];
      const plotIndex = newPlots.findIndex(plot => plot.id === action.payload);
      if (plotIndex !== -1) {
        newPlots[plotIndex] = {
          ...newPlots[plotIndex],
          state: 'untilled',
          seedId: undefined,
          plantedDay: undefined,
          daysToMature: undefined,
          waterLevel: 0,
          fertilized: false
        };
      }
      return {
        ...state,
        plots: newPlots
      };
    }

    case 'UPGRADE_TOOL': {
      const { toolId, newTier } = action.payload;
      const newInventory = [...state.inventory];
      const toolIndex = newInventory.findIndex(item => item?.id === toolId);
      
      if (toolIndex !== -1 && newInventory[toolIndex]) {
        newInventory[toolIndex] = {
          ...newInventory[toolIndex]!,
          tier: newTier,
          name: `${newTier.charAt(0).toUpperCase() + newTier.slice(1)} ${newInventory[toolIndex]!.name.split(' ').slice(1).join(' ')}`
        };
      }
      
      return {
        ...state,
        inventory: newInventory
      };
    }

    case 'EQUIP_ITEM': {
      const { item, slot } = action.payload;
      const newInventory = [...state.inventory];
      const currentEquipped = state.equipment[slot];

      if (currentEquipped) {
        const emptySlot = newInventory.findIndex(invItem => invItem === null);
        if (emptySlot !== -1) {
          newInventory[emptySlot] = currentEquipped;
        }
      }

      newInventory[item.slotId] = null;

      const newEquipment = {
        ...state.equipment,
        [slot]: item
      };

      return {
        ...state,
        inventory: newInventory,
        equipment: newEquipment,
        notification: {
          title: 'Item Equipped',
          message: `Equipped ${item.name}`,
          type: 'success'
        }
      };
    }

    case 'UNEQUIP_ITEM': {
      const { slot } = action.payload;
      const item = state.equipment[slot];

      if (!item) return state;

      const emptySlot = state.inventory.findIndex(invItem => invItem === null);
      if (emptySlot === -1) {
        return {
          ...state,
          notification: {
            title: 'Inventory Full',
            message: 'Cannot unequip item - inventory is full',
            type: 'error'
          }
        };
      }

      const newInventory = [...state.inventory];
      newInventory[emptySlot] = { ...item, slotId: emptySlot };

      const newEquipment = {
        ...state.equipment,
        [slot]: null
      };

      return {
        ...state,
        inventory: newInventory,
        equipment: newEquipment,
        notification: {
          title: 'Item Unequipped',
          message: `Unequipped ${item.name}`,
          type: 'success'
        }
      };
    }

    case 'USE_ITEM': {
      const item = action.payload;
      
      // Remove the item from inventory
      const newInventory = [...state.inventory];
      const itemIndex = newInventory.findIndex(i => i?.slotId === item.slotId);
      
      if (itemIndex === -1) return state;
      
      if (item.quantity > 1) {
        newInventory[itemIndex] = {
          ...item,
          quantity: item.quantity - 1
        };
      } else {
        newInventory[itemIndex] = null;
      }
      
      // Apply item effects
      let newState = applyItemEffects({ ...state, inventory: newInventory }, item);
      
      // Show notification
      let message = '';
      if (item.effects?.energy) {
        message = `Restored ${item.effects.energy} energy`;
      } else if (item.effects?.experience) {
        message = `Gained ${item.effects.experience} experience`;
      } else if (item.effects?.skillBonus) {
        message = `Gained ${item.effects.skillBonus.amount} ${item.effects.skillBonus.skill} experience`;
      }
      
      return {
        ...newState,
        notification: {
          title: 'Item Used',
          message,
          type: 'success'
        }
      };
    }

    case 'SAVE_GAME': {
      const saveData = JSON.stringify(state);
      localStorage.setItem('gameState', saveData);
      return {
        ...state,
        notification: {
          title: 'Game Saved',
          message: 'Your progress has been saved successfully!',
          type: 'success'
        }
      };
    }

    case 'LOAD_GAME': {
      const savedData = localStorage.getItem('gameState');
      if (!savedData) {
        return {
          ...state,
          notification: {
            title: 'No Save Found',
            message: 'No saved game was found.',
            type: 'error'
          }
        };
      }

      try {
        const loadedState = JSON.parse(savedData);
        return {
          ...loadedState,
          notification: {
            title: 'Game Loaded',
            message: 'Your progress has been restored!',
            type: 'success'
          }
        };
      } catch (error) {
        return {
          ...state,
          notification: {
            title: 'Load Failed',
            message: 'Failed to load saved game.',
            type: 'error'
          }
        };
      }
    }

    case 'SET_ACTIVE_ACTIVITY':
      return {
        ...state,
        activeActivity: action.payload
      };

    case 'USE_ENERGY':
      return {
        ...state,
        energy: Math.max(0, state.energy - action.payload)
      };

    case 'ADD_EXPERIENCE': {
      const { activity, amount } = action.payload;
      const currentSkill = state.skills[activity];
      const newExperience = currentSkill.experience + amount;
      const currentLevel = currentSkill.level;
      const newLevel = calculateLevel(newExperience);
      
      if (newLevel > currentLevel) {
        const availablePerks = getRandomPerks(activity, state);
        
        return {
          ...state,
          skills: {
            ...state.skills,
            [activity]: {
              ...currentSkill,
              level: newLevel,
              experience: newExperience,
              availablePerks
            }
          },
          currentSkillLevelUp: activity,
          showPerkSelection: true,
          notification: {
            title: 'Level Up!',
            message: `Your ${activity} skill is now level ${newLevel}! Choose a perk!`,
            type: 'success'
          }
        };
      }
      
      return {
        ...state,
        skills: {
          ...state.skills,
          [activity]: {
            ...currentSkill,
            experience: newExperience
          }
        }
      };
    }

    case 'ADD_ITEM': {
      const newInventory = [...state.inventory];
      const { id, stackable = true, maxStackSize = 99 } = action.payload;
      let remainingQuantity = action.payload.quantity;
      
      const newDiscoveredItems = state.discoveredItems.includes(id)
        ? state.discoveredItems
        : [...state.discoveredItems, id];
      
      if (stackable) {
        for (let i = 0; i < newInventory.length && remainingQuantity > 0; i++) {
          const item = newInventory[i];
          if (item && item.id === id && item.quantity < maxStackSize) {
            const spaceInStack = maxStackSize - item.quantity;
            const amountToAdd = Math.min(spaceInStack, remainingQuantity);
            
            newInventory[i] = {
              ...item,
              quantity: item.quantity + amountToAdd
            };
            
            remainingQuantity -= amountToAdd;
          }
        }
      }
      
      while (remainingQuantity > 0) {
        const emptySlot = newInventory.findIndex(item => item === null);
        if (emptySlot === -1) break;
        
        const quantityForNewStack = Math.min(remainingQuantity, maxStackSize);
        newInventory[emptySlot] = {
          ...action.payload,
          quantity: quantityForNewStack,
          slotId: emptySlot
        };
        
        remainingQuantity -= quantityForNewStack;
      }
      
      return {
        ...state,
        inventory: newInventory,
        discoveredItems: newDiscoveredItems
      };
    }

    case 'REMOVE_ITEM': {
      const { slotId, quantity = 1 } = action.payload;
      const inventory = [...state.inventory];
      const item = inventory[slotId];
      
      if (!item) return state;
      
      if (item.quantity <= quantity) {
        inventory[slotId] = null;
      } else {
        inventory[slotId] = {
          ...item,
          quantity: item.quantity - quantity
        };
      }
      
      return {
        ...state,
        inventory
      };
    }

    case 'SELL_ITEM':
      const { value = 0 } = action.payload;
      return {
        ...state,
        money: state.money + value
      };

    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        notification: action.payload
      };

    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null
      };

    case 'SELECT_PERK': {
      const { activity, perkId } = action.payload;
      const skill = state.skills[activity];
      
      return {
        ...state,
        skills: {
          ...state.skills,
          [activity]: {
            ...skill,
            perks: [...skill.perks, perkId],
            availablePerks: undefined
          }
        },
        currentSkillLevelUp: null,
        showPerkSelection: false
      };
    }

    case 'DISCOVER_RECIPE':
      return {
        ...state,
        discoveredRecipes: [...(state.discoveredRecipes || []), action.payload]
      };

    case 'DISCOVER_ITEM':
      return {
        ...state,
        discoveredItems: state.discoveredItems.includes(action.payload)
          ? state.discoveredItems
          : [...state.discoveredItems, action.payload]
      };

    default:
      return state;
  }
};

const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => null,
  getTimeOfDay: () => '',
  getFormattedTime: () => '',
  startActivity: () => null,
  saveGame: () => null,
  loadGame: () => null
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const getTimeOfDay = () => {
    const { time } = state;
    if (time >= 360 && time < 720) return 'morning';
    if (time >= 720 && time < 960) return 'afternoon';
    if (time >= 960 && time < 1080) return 'evening';
    return 'night';
  };

  const getFormattedTime = () => {
    const { time } = state;
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const startActivity = (activityId: string) => {
    dispatch({
      type: 'SET_ACTIVE_ACTIVITY',
      payload: activityId
    });
  };

  const saveGame = () => {
    dispatch({ type: 'SAVE_GAME' });
  };

  const loadGame = () => {
    dispatch({ type: 'LOAD_GAME' });
  };

  return (
    <GameContext.Provider value={{ 
      state, 
      dispatch, 
      getTimeOfDay, 
      getFormattedTime, 
      startActivity,
      saveGame,
      loadGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};