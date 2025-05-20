import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { InventoryItem, EquipmentSlot as EquipmentSlotType } from '../../types';
import { HardHat, Shirt, Medal, Ruler, Footprints, HandMetal, Torus, Cross, X, Sprout, Fish, Pickaxe, Leaf, Utensils, Battery, Gauge, Sparkles } from 'lucide-react';

interface EquipmentSlotProps {
  type: EquipmentSlotType;
  item: InventoryItem | null;
}

const EquipmentSlot: React.FC<EquipmentSlotProps> = ({ type, item }) => {
  const { state, dispatch } = useGame();
  const [showEquipMenu, setShowEquipMenu] = useState(false);

  const handleUnequip = () => {
    if (item) {
      dispatch({
        type: 'UNEQUIP_ITEM',
        payload: { slot: type }
      });
      setShowEquipMenu(false);
    }
  };

  const handleEquip = (equipItem: InventoryItem) => {
    if (item) {
      handleUnequip();
    }
    dispatch({
      type: 'EQUIP_ITEM',
      payload: { item: equipItem, slot: type }
    });
    setShowEquipMenu(false);
  };

  const getSlotIcon = () => {
    switch (type) {
      case 'head':
        return <HardHat size={24} />;
      case 'torso':
        return <Shirt size={24} />;
      case 'belt':
        return <Medal size={24} />;
      case 'legs':
        return <Ruler size={24} />;
      case 'boots':
        return <Footprints size={24} />;
      case 'hands':
        return <HandMetal size={24} />;
      case 'ring_left':
      case 'ring_right':
        return <Torus size={24} />;
      case 'amulet':
        return <Cross size={24} />;
      default:
        return <HardHat size={24} />;
    }
  };

  const getSlotName = () => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getEquippableItems = () => {
    return state.inventory.filter((invItem): invItem is InventoryItem => 
      invItem !== null && 
      invItem.type === 'equipment' && 
      invItem.equipmentSlot === type
    );
  };

  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'epic':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'rare':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'uncommon':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'farming':
        return <Sprout size={12} className="mr-1" />;
      case 'fishing':
        return <Fish size={12} className="mr-1" />;
      case 'mining':
        return <Pickaxe size={12} className="mr-1" />;
      case 'foraging':
        return <Leaf size={12} className="mr-1" />;
      case 'cooking':
        return <Utensils size={12} className="mr-1" />;
      case 'energy':
        return <Battery size={12} className="mr-1" />;
      case 'speed':
        return <Gauge size={12} className="mr-1" />;
      case 'luck':
        return <Sparkles size={12} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div 
        className={`relative aspect-square rounded-lg border-2 ${
          item 
            ? `${getRarityStyle(item.rarity)} hover:shadow-lg` 
            : 'border-gray-200 bg-gray-50 hover:border-amber-200'
        } p-2 transition-all cursor-pointer`}
        onClick={() => setShowEquipMenu(true)}
      >
        {item ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold ${getRarityStyle(item.rarity)}`}>
              {getSlotIcon()}
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm font-medium truncate">{item.name}</div>
              {item.stats && (
                <div className="text-xs mt-1 space-y-1">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    value > 0 && (
                      <div key={stat} className={`flex items-center justify-center ${getRarityStyle(item.rarity)} px-2 py-0.5 rounded-full`}>
                        {getStatIcon(stat)}
                        <span>+{value}</span>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            {getSlotIcon()}
            <div className="mt-2 text-xs">{getSlotName()}</div>
          </div>
        )}
      </div>

      {showEquipMenu && (
        <div className="absolute z-50 top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-amber-200">
          <div className="p-3 border-b border-amber-100 flex justify-between items-center">
            <h3 className="font-medium">{getSlotName()} Equipment</h3>
            <button 
              onClick={() => setShowEquipMenu(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-2">
            {item && (
              <div className="mb-3">
                <div className={`p-2 rounded-md ${getRarityStyle(item.rarity)}`}>
                  <div className="font-medium">Currently Equipped:</div>
                  <div className="text-sm">{item.name}</div>
                  {item.stats && (
                    <div className="text-xs mt-1 space-y-1">
                      {Object.entries(item.stats).map(([stat, value]) => (
                        value > 0 && (
                          <div key={stat} className="flex items-center bg-white bg-opacity-50 px-2 py-0.5 rounded-full">
                            {getStatIcon(stat)}
                            <span>+{value} {stat}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                  <button
                    onClick={handleUnequip}
                    className="mt-2 w-full text-center p-1 bg-red-100 text-red-700 hover:bg-red-200 rounded"
                  >
                    Unequip
                  </button>
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              {getEquippableItems().map(equipItem => (
                <div
                  key={equipItem.slotId}
                  onClick={() => handleEquip(equipItem)}
                  className={`p-2 rounded-md hover:bg-amber-50 cursor-pointer ${
                    item?.slotId === equipItem.slotId ? 'bg-amber-100' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getRarityStyle(equipItem.rarity)}`}>
                      {getSlotIcon()}
                    </div>
                    <div className="ml-2">
                      <div className="font-medium text-sm">{equipItem.name}</div>
                      {equipItem.stats && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(equipItem.stats)
                            .filter(([_, value]) => value > 0)
                            .map(([stat, value]) => (
                              <div key={stat} className={`flex items-center text-xs ${getRarityStyle(equipItem.rarity)} px-2 py-0.5 rounded-full`}>
                                {getStatIcon(stat)}
                                <span>+{value}</span>
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {getEquippableItems().length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No equipment available for this slot
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentSlot;