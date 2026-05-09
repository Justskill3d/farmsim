import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import InventoryItemComponent from './InventoryItem';
import { InventoryItem } from '../../types';
import Card from '../UI/Card';
import { Package, DollarSign, Plus } from 'lucide-react';

const BASE_INVENTORY_SIZE = 16;
const MAX_INVENTORY_SIZE = 40;
const SLOTS_PER_EXPANSION = 4;

const InventoryGrid: React.FC = () => {
  const { state, dispatch } = useGame();
  const { inventory, inventorySize, equipment } = state;
  const hasPrismaticRing =
    equipment.ring_left?.id === 'prismatic_ring' ||
    equipment.ring_right?.id === 'prismatic_ring';
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Create slots array with the correct size
  const slots = Array(inventorySize).fill(null).map((_, index) => {
    return inventory.find(item => item && item.slotId === index) || null;
  });

  const handleSelectItem = (item: InventoryItem) => {
    setSelectedItem(selectedItem?.slotId === item.slotId ? null : item);
  };

  const handleSellAll = () => {
    let totalValue = 0;
    const soldItems = new Map<string, number>();

    inventory.forEach(item => {
      if (item && item.type !== 'tool') {
        const itemValue = item.value * item.quantity;
        totalValue += itemValue;
        
        soldItems.set(item.name, (soldItems.get(item.name) || 0) + item.quantity);
        
        dispatch({
          type: 'REMOVE_ITEM',
          payload: { slotId: item.slotId, quantity: item.quantity }
        });
      }
    });

    if (totalValue > 0) {
      dispatch({
        type: 'SELL_ITEM',
        payload: { value: totalValue }
      });

      const itemsSummary = Array.from(soldItems.entries())
        .map(([name, quantity]) => `${quantity}x ${name}`)
        .join(', ');

      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Items Sold!',
          message: `Sold ${itemsSummary} for $${totalValue.toLocaleString()}`,
          type: 'success'
        }
      });
    }
  };

  const sellableItemsCount = inventory.filter(item => item && item.type !== 'tool').length;
  const isInventoryFull = inventory.filter(Boolean).length >= inventorySize;

  const expansionsPurchased = (inventorySize - BASE_INVENTORY_SIZE) / SLOTS_PER_EXPANSION;
  const maxExpansions = (MAX_INVENTORY_SIZE - BASE_INVENTORY_SIZE) / SLOTS_PER_EXPANSION;
  const isAtMaxSize = inventorySize >= MAX_INVENTORY_SIZE;
  const expansionCost = 5000 + expansionsPurchased * 10000;
  const canAffordExpansion = state.money >= expansionCost;

  const handleExpandInventory = () => {
    dispatch({ type: 'EXPAND_INVENTORY' });
  };

  return (
    <div className="mt-4">
      <Card 
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Package size={18} className="mr-2" />
              <span>Inventory</span>
            </div>
            <div className="flex items-center gap-4">
              {hasPrismaticRing && sellableItemsCount > 0 && (
                <button
                  onClick={handleSellAll}
                  className="flex items-center px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <DollarSign size={16} className="mr-1" />
                  Sell All
                </button>
              )}
              <div className={`text-sm ${isInventoryFull ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                {inventory.filter(Boolean).length}/{inventorySize} slots
              </div>
            </div>
          </div>
        }
        className={`bg-amber-50 ${isInventoryFull ? 'bg-red-50 border-red-200' : ''}`}
      >
        <div className="grid grid-cols-4 gap-2">
          {slots.map((item, index) => (
            <div key={index} className="min-h-[80px] relative">
              {item ? (
                <InventoryItemComponent 
                  item={item} 
                  onSelect={handleSelectItem}
                  selected={selectedItem?.slotId === item.slotId}
                />
              ) : (
                <div className={`h-full border border-dashed rounded-md flex items-center justify-center ${
                  isInventoryFull 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 bg-gray-50'
                }`}>
                  <span className={`text-xs ${
                    isInventoryFull ? 'text-red-500' : 'text-gray-400'
                  }`}>Empty</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-white rounded-md border border-amber-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="flex items-center text-sm font-medium text-gray-800">
                <Package size={14} className="mr-1.5 text-amber-700" />
                Backpack Expansion
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {isAtMaxSize
                  ? `Maximum capacity reached (${MAX_INVENTORY_SIZE} slots)`
                  : `Tier ${expansionsPurchased}/${maxExpansions} \u00B7 +${SLOTS_PER_EXPANSION} slots per purchase`}
              </div>
            </div>
            <button
              onClick={handleExpandInventory}
              disabled={isAtMaxSize || !canAffordExpansion}
              className={`flex items-center px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                isAtMaxSize
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : canAffordExpansion
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAtMaxSize ? (
                <span>Maxed</span>
              ) : (
                <>
                  <Plus size={14} className="mr-1" />
                  <span>Expand for {expansionCost.toLocaleString()}g</span>
                </>
              )}
            </button>
          </div>
        </div>

        {selectedItem && (
          <div className="mt-4 p-3 bg-white rounded-md border border-gray-200">
            <h3 className="font-medium">{selectedItem.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{selectedItem.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                Type: {selectedItem.type}
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                Value: ${selectedItem.value}
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">
                Rarity: {selectedItem.rarity}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InventoryGrid;