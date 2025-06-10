import React from 'react';
import { InventoryItem as InventoryItemType } from '../../types';
import { X, DollarSign, Trash2, Play, Package } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { getTreasureLoot } from '../../utils/itemUtils';

interface InventoryItemProps {
  item: InventoryItemType;
  onSelect?: (item: InventoryItemType) => void;
  selected?: boolean;
}

const rarityColors = {
  common: 'bg-gray-100',
  uncommon: 'bg-green-100',
  rare: 'bg-blue-100',
  epic: 'bg-purple-100',
  legendary: 'bg-orange-100'
};

const rarityTextColors = {
  common: 'text-gray-700',
  uncommon: 'text-green-700',
  rare: 'text-blue-700',
  epic: 'text-purple-700',
  legendary: 'text-orange-700'
};

const tierColors = {
  basic: 'bg-gray-100 text-gray-800',
  copper: 'bg-amber-100 text-amber-800',
  iron: 'bg-gray-700 text-white',
  tungsten: 'bg-blue-100 text-blue-800'
};

const InventoryItemComponent: React.FC<InventoryItemProps> = ({ item, onSelect, selected }) => {
  const { dispatch } = useGame();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', item.slotId.toString());
  };

  const handleSell = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type !== 'tool') {
      const value = item.value * (item.quantity || 1);
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { slotId: item.slotId, quantity: item.quantity }
      });
      dispatch({
        type: 'SELL_ITEM',
        payload: { value }
      });
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Item Sold!',
          message: `Sold ${item.quantity}x ${item.name} for $${value}`,
          type: 'success'
        }
      });
    }
  };

  const handleDiscard = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type !== 'tool') {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { slotId: item.slotId, quantity: 1 }
      });
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Item Discarded',
          message: `Discarded 1x ${item.name}`,
          type: 'info'
        }
      });
    }
  };

  const handleUse = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (item.id === 'treasure_chest') {
      const loot = getTreasureLoot();
      
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { slotId: item.slotId, quantity: 1 }
      });

      loot.forEach(item => {
        dispatch({
          type: 'ADD_ITEM',
          payload: { ...item, quantity: 1, slotId: -1 }
        });
      });

      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Treasure Found!',
          message: `Found ${loot.map(i => i.name).join(', ')}!`,
          type: 'success'
        }
      });
    } else {
      dispatch({
        type: 'USE_ITEM',
        payload: item
      });
    }
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  const canBeUsed = item.type === 'meal' || item.type === 'consumable' || item.type === 'relic' || item.id === 'treasure_chest';

  return (
    <div 
      className={`relative p-2 rounded-lg border-2 ${rarityColors[item.rarity]} 
        transition-all cursor-pointer hover:shadow-md 
        ${selected ? 'ring-2 ring-blue-500 shadow-md' : ''}`}
      onClick={handleClick}
      draggable={item.type === 'seed'}
      onDragStart={handleDragStart}
    >
      <div className="flex items-center">
        <div className={`w-10 h-10 ${rarityColors[item.rarity]} rounded-lg flex items-center justify-center overflow-hidden text-xl font-bold ${rarityTextColors[item.rarity]}`}>
          {item.name.charAt(0)}
        </div>
        <div className="ml-2 flex-1 min-w-0">
          <div className="text-sm font-medium truncate">
            {item.type === 'tool' && item.tier ? (
              <div className="flex items-center gap-1">
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${tierColors[item.tier]}`}>
                  {item.tier.charAt(0).toUpperCase() + item.tier.slice(1)}
                </span>
                <span>{item.name.split(' ').slice(1).join(' ')}</span>
              </div>
            ) : (
              item.name
            )}
          </div>
          <div className="text-xs flex items-center">
            <DollarSign size={12} className="text-green-600" />
            <span className="text-green-600">{item.value}</span>
          </div>
        </div>
        {item.stackable && item.quantity > 1 && (
          <div className="text-xs font-bold bg-white bg-opacity-50 rounded-full px-2 py-1 ml-1">
            {item.quantity}
          </div>
        )}
      </div>
      
      {item.type !== 'tool' && (
        <div className="absolute -top-2 -right-2 flex space-x-1">
          {canBeUsed && (
            <button 
              onClick={handleUse}
              className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm"
              title={item.id === 'treasure_chest' ? 'Open chest' : 'Use item'}
            >
              {item.id === 'treasure_chest' ? <Package size={12} /> : <Play size={12} />}
            </button>
          )}
          <button 
            onClick={handleSell}
            className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-green-600 transition-colors shadow-sm"
            title="Sell item"
          >
            <DollarSign size={12} />
          </button>
          <button 
            onClick={handleDiscard}
            className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
            title="Discard item"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-1">
        <span className={`text-xs px-2 py-0.5 rounded-full ${rarityColors[item.rarity]} ${rarityTextColors[item.rarity]} capitalize font-medium`}>
          {item.rarity}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-50 text-gray-700 capitalize">
          {item.type}
        </span>
      </div>
    </div>
  );
};

export default InventoryItemComponent;