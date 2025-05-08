import React, { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { InventoryItem, CraftingCategory } from '../../types';
import { findRecipe, getRecipesByCategory } from '../../data/crafting';
import Card from '../UI/Card';
import { Beaker, Book } from 'lucide-react';

const CraftingInterface: React.FC = () => {
  const { state, dispatch } = useGame();
  const [selectedSlots, setSelectedSlots] = useState<[InventoryItem | null, InventoryItem | null]>([null, null]);
  const [draggedItem, setDraggedItem] = useState<InventoryItem | null>(null);
  
  const nonToolItems = state.inventory.filter(
    (item): item is InventoryItem => 
      item !== null && item.type !== 'tool'
  );

  const handleDragStart = (e: React.DragEvent, item: InventoryItem) => {
    e.dataTransfer.setData('text/plain', item.slotId.toString());
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newSelectedSlots = [...selectedSlots] as [InventoryItem | null, InventoryItem | null];
    newSelectedSlots[slotIndex] = draggedItem;
    setSelectedSlots(newSelectedSlots);
    setDraggedItem(null);
  };

  const handleCraft = () => {
    if (!selectedSlots[0] || !selectedSlots[1]) {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Crafting Failed',
          message: 'Please select two ingredients',
          type: 'error'
        }
      });
      return;
    }

    const recipe = findRecipe(selectedSlots[0].id, selectedSlots[1].id);
    
    if (recipe) {
      // Remove ingredients
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { slotId: selectedSlots[0].slotId, quantity: 1 }
      });
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { slotId: selectedSlots[1].slotId, quantity: 1 }
      });

      // Add crafted item
      dispatch({
        type: 'ADD_ITEM',
        payload: { ...recipe.result, quantity: 1, slotId: -1 }
      });

      // Discover recipe if not already discovered
      if (!state.discoveredRecipes?.includes(recipe.id)) {
        dispatch({
          type: 'DISCOVER_RECIPE',
          payload: recipe.id
        });
      }

      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Crafting Success!',
          message: `Created ${recipe.result.name}`,
          type: 'success'
        }
      });

      // Reset selected slots
      setSelectedSlots([null, null]);
    } else {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Crafting Failed',
          message: 'These ingredients cannot be combined',
          type: 'error'
        }
      });
    }
  };

  const renderDiscoveredRecipes = () => {
    if (!Array.isArray(state.discoveredRecipes)) {
      return (
        <div className="text-center text-gray-500 py-8">
          <p>Loading recipes...</p>
        </div>
      );
    }

    const categories: CraftingCategory[] = ['consumable', 'equipment', 'relic'];
    
    return categories.map(category => {
      const recipes = getRecipesByCategory(category).filter(
        recipe => state.discoveredRecipes.includes(recipe.id)
      );

      if (recipes.length === 0) return null;

      return (
        <div key={category} className="mt-6">
          <h3 className="text-lg font-medium capitalize mb-3">{category}s</h3>
          <div className="space-y-2">
            {recipes.map(recipe => (
              <div key={recipe.id} className="bg-white p-3 rounded-lg border border-amber-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{recipe.name}</h4>
                    <p className="text-sm text-gray-600">{recipe.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {recipe.ingredients.join(' + ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mt-4">
      <Card
        title={
          <div className="flex items-center">
            <Beaker size={18} className="mr-2" />
            <span>Crafting Station - Work in Progress</span>
          </div>
        }
        className="bg-amber-50"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-4">Available Items</h3>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {nonToolItems.map(item => (
                <div
                  key={item.slotId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="bg-white p-2 rounded-lg border-2 border-amber-200 cursor-move hover:border-amber-400 transition-colors"
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                      {item.name.charAt(0)}
                    </div>
                    <div className="mt-1 text-sm truncate">{item.name}</div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-gray-500">x{item.quantity}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mb-4">
              {[0, 1].map(index => (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`flex-1 h-32 rounded-lg border-2 border-dashed ${
                    selectedSlots[index]
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-gray-300 bg-gray-50'
                  } flex items-center justify-center`}
                >
                  {selectedSlots[index] ? (
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xl">
                        {selectedSlots[index]!.name.charAt(0)}
                      </div>
                      <div className="mt-2 text-sm">{selectedSlots[index]!.name}</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      Drop ingredient here
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleCraft}
              disabled={!selectedSlots[0] || !selectedSlots[1]}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                selectedSlots[0] && selectedSlots[1]
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Craft
            </button>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <Book size={18} className="mr-2" />
              <h3 className="font-medium">Recipe Book</h3>
            </div>
            <div className="bg-white rounded-lg border border-amber-200 p-4">
              {Array.isArray(state.discoveredRecipes) && state.discoveredRecipes.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>No recipes discovered yet.</p>
                  <p className="text-sm mt-2">Try combining different ingredients!</p>
                </div>
              ) : (
                renderDiscoveredRecipes()
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CraftingInterface;