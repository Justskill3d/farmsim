import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Plot as PlotType, InventoryItem } from '../../types';
import { getItemById } from '../../data/items';
import { Droplet, Sprout, Trash2 } from 'lucide-react';
import { useItemFinder } from '../../hooks/useItemFinder';

interface PlotProps {
  plot: PlotType;
  onSelect: () => void;
  isWateringMode: boolean;
}

const Plot: React.FC<PlotProps> = ({ plot, onSelect, isWateringMode }) => {
  const { state, dispatch } = useGame();
  const { inventory, day, energy } = state;
  const { findItems } = useItemFinder();
  const [isDragOver, setIsDragOver] = useState(false);

  const seed = plot.seedId ? getItemById(plot.seedId) : null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (plot.state === 'tilled') {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (plot.state !== 'tilled') return;

    const slotId = e.dataTransfer.getData('text/plain');
    const droppedItem = inventory[parseInt(slotId)];

    if (!droppedItem || droppedItem.type !== 'seed') {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Invalid Item',
          message: 'You can only plant seeds in tilled soil.',
          type: 'error'
        }
      });
      return;
    }

    const growthDays = droppedItem.growthDays || 4;

    dispatch({
      type: 'PLANT_SEED',
      payload: {
        plotId: plot.id,
        seedId: droppedItem.id,
        daysToMature: growthDays,
        plantedDay: day
      }
    });

    dispatch({
      type: 'REMOVE_ITEM',
      payload: { 
        slotId: droppedItem.slotId, 
        quantity: 1 
      }
    });

    dispatch({ 
      type: 'USE_ENERGY', 
      payload: 2 
    });

    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: { 
        activity: 'farming', 
        amount: 15 
      }
    });

    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: {
        title: 'Seed Planted',
        message: `Planted ${droppedItem.name}. It will take ${growthDays} days to mature.`,
        type: 'success'
      }
    });

    onSelect();
  };

  const determineHarvestedCropRarity = (skillLevel: number, toolTier: string) => {
    const baseRarityChances = {
      common: 1,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0
    };

    // Skill level affects rarity chances
    if (skillLevel >= 2) baseRarityChances.uncommon = 0.3;
    if (skillLevel >= 4) baseRarityChances.rare = 0.15;
    if (skillLevel >= 6) baseRarityChances.epic = 0.08;
    if (skillLevel >= 8) baseRarityChances.legendary = 0.03;

    // Tool tier provides additional bonuses
    const toolBonus = {
      basic: 1,
      copper: 1.2,
      iron: 1.5,
      tungsten: 2
    }[toolTier] || 1;

    // Apply tool bonus to all chances except common
    baseRarityChances.uncommon *= toolBonus;
    baseRarityChances.rare *= toolBonus;
    baseRarityChances.epic *= toolBonus;
    baseRarityChances.legendary *= toolBonus;

    // Roll for rarity
    const roll = Math.random();
    if (roll < baseRarityChances.legendary) return 'legendary';
    if (roll < baseRarityChances.epic) return 'epic';
    if (roll < baseRarityChances.rare) return 'rare';
    if (roll < baseRarityChances.uncommon) return 'uncommon';
    return 'common';
  };

  const handlePlotClick = () => {
    if (isWateringMode) {
      if ((plot.state === 'seeded' || plot.state === 'growing') && !plot.waterLevel && energy >= 3) {
        dispatch({ 
          type: 'WATER_PLOT', 
          payload: plot.id 
        });

        dispatch({ 
          type: 'USE_ENERGY', 
          payload: 3 
        });

        dispatch({
          type: 'ADD_EXPERIENCE',
          payload: { 
            activity: 'farming', 
            amount: 5 
          }
        });

        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: {
            title: 'Plot Watered',
            message: 'The plot has been watered for today.',
            type: 'success'
          }
        });

        onSelect();
      } else if (plot.waterLevel > 0) {
        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: {
            title: 'Already Watered',
            message: 'This plot has already been watered today.',
            type: 'info'
          }
        });
      }
      return;
    }

    onSelect();
    
    const selectedItem = inventory.find(item => 
      item && (
        (plot.state === 'untilled' && item.id === 'hoe') ||
        (plot.state === 'mature' && item.id === 'hoe') ||
        (plot.state === 'dead' && item.id === 'hoe')
      )
    );

    if (!selectedItem) return;

    if (plot.state === 'untilled' && selectedItem.id === 'hoe' && energy >= 5) {
      dispatch({ 
        type: 'TILL_PLOT', 
        payload: plot.id 
      });

      dispatch({ 
        type: 'USE_ENERGY', 
        payload: 5 
      });

      dispatch({
        type: 'ADD_EXPERIENCE',
        payload: { 
          activity: 'farming', 
          amount: 10 
        }
      });

      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Plot Tilled',
          message: 'The plot is ready for planting!',
          type: 'success'
        }
      });
    } else if (plot.state === 'mature' && selectedItem.id === 'hoe') {
      const harvestAmount = Math.floor(Math.random() * 3) + 2;
      const baseCrop = getItemById(plot.seedId?.replace('_seeds', '') || '');
      
      if (baseCrop) {
        const skillLevel = state.skills.farming.level;
        const toolTier = selectedItem.tier || 'basic';
        const harvestedRarity = determineHarvestedCropRarity(skillLevel, toolTier);
        
        const harvestedCrop = {
          ...baseCrop,
          rarity: harvestedRarity,
          value: baseCrop.value * {
            common: 1,
            uncommon: 2,
            rare: 4,
            epic: 8,
            legendary: 16
          }[harvestedRarity]
        };

        dispatch({
          type: 'ADD_ITEM',
          payload: {
            ...harvestedCrop,
            quantity: harvestAmount,
            slotId: -1
          }
        });

        dispatch({
          type: 'ADD_EXPERIENCE',
          payload: { 
            activity: 'farming', 
            amount: 50 
          }
        });

        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: {
            title: 'Crop Harvested!',
            message: `Found ${harvestAmount}x ${harvestedRarity} ${harvestedCrop.name}`,
            type: 'success'
          }
        });
      }
      
      dispatch({ 
        type: 'HARVEST_PLOT', 
        payload: plot.id 
      });
    } else if (plot.state === 'dead' && selectedItem.id === 'hoe' && energy >= 4) {
      dispatch({ 
        type: 'CLEAR_DEAD_PLOT', 
        payload: plot.id 
      });

      dispatch({ 
        type: 'USE_ENERGY', 
        payload: 4 
      });

      dispatch({
        type: 'ADD_EXPERIENCE',
        payload: { 
          activity: 'farming', 
          amount: 5 
        }
      });
    }
  };

  const getPlotColor = () => {
    switch (plot.state) {
      case 'untilled':
        return 'bg-amber-200';
      case 'tilled':
        return isDragOver ? 'bg-amber-500' : 'bg-amber-700';
      case 'seeded':
      case 'growing':
        return plot.waterLevel > 0 ? 'bg-amber-800' : 'bg-amber-600';
      case 'mature':
        return 'bg-green-600';
      case 'dead':
        return 'bg-gray-700';
      default:
        return 'bg-amber-200';
    }
  };

  const getGrowthProgress = () => {
    if (!plot.plantedDay || !plot.daysToMature) return 0;
    const daysPassed = day - plot.plantedDay;
    return Math.min((daysPassed / plot.daysToMature) * 100, 100);
  };

  const canBeWatered = (plot.state === 'seeded' || plot.state === 'growing') && !plot.waterLevel;

  return (
    <div
      className={`group aspect-square rounded-lg ${getPlotColor()} relative cursor-pointer transition-all hover:scale-105 ${
        isWateringMode && canBeWatered
          ? 'ring-2 ring-blue-400 ring-opacity-75'
          : ''
      } ${isDragOver ? 'ring-2 ring-amber-400' : ''}`}
      onClick={handlePlotClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {plot.fertilized && (
        <div className="absolute top-1 right-1">
          <span className="text-xs bg-green-500 text-white px-1 rounded">F</span>
        </div>
      )}

      {plot.waterLevel > 0 && (
        <div className="absolute top-1 left-1">
          <Droplet size={16} className="text-blue-500" />
        </div>
      )}

      {(plot.state === 'seeded' || plot.state === 'growing' || plot.state === 'mature') && seed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Sprout
            size={24}
            className={`${
              plot.state === 'mature' ? 'text-green-300' : 'text-green-500'
            }`}
          />
        </div>
      )}

      {plot.state === 'dead' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Trash2 size={24} className="text-red-500" />
        </div>
      )}

      {plot.state === 'growing' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${getGrowthProgress()}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Plot;