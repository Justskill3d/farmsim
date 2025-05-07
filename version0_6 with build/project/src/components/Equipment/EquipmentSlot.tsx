import React from 'react';
import { useGame } from '../../context/GameContext';
import { InventoryItem, EquipmentSlot as EquipmentSlotType } from '../../types';
import { Shield, Shirt, Bell as Belt, Tangent as Pants, Bot as Boots, HandMetal, BellRing as Ring, Cross } from 'lucide-react';

interface EquipmentSlotProps {
  type: EquipmentSlotType;
  item: InventoryItem | null;
}

const EquipmentSlot: React.FC<EquipmentSlotProps> = ({ type, item }) => {
  const { dispatch } = useGame();

  const handleUnequip = () => {
    if (item) {
      dispatch({
        type: 'UNEQUIP_ITEM',
        payload: { slot: type }
      });
    }
  };

  const getSlotIcon = () => {
    switch (type) {
      case 'head':
        return <Shield size={24} />;
      case 'torso':
        return <Shirt size={24} />;
      case 'belt':
        return <Belt size={24} />;
      case 'legs':
        return <Pants size={24} />;
      case 'boots':
        return <Boots size={24} />;
      case 'hands':
        return <HandMetal size={24} />;
      case 'ring_left':
      case 'ring_right':
        return <Ring size={24} />;
      case 'amulet':
        return <Cross size={24} />;
      default:
        return <Shield size={24} />;
    }
  };

  const getSlotName = () => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div 
      className={`relative aspect-square rounded-lg border-2 ${
        item ? 'border-amber-400 bg-amber-50' : 'border-gray-200 bg-gray-50'
      } p-2 transition-all hover:shadow-md`}
      onClick={handleUnequip}
    >
      {item ? (
        <div className="h-full flex flex-col items-center justify-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${
            item.rarity === 'legendary' ? 'bg-orange-100 text-orange-700' :
            item.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
            item.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
            item.rarity === 'uncommon' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {item.name.charAt(0)}
          </div>
          <div className="mt-2 text-center">
            <div className="text-sm font-medium truncate">{item.name}</div>
            {item.stats && (
              <div className="text-xs text-gray-600 mt-1">
                {Object.entries(item.stats).map(([stat, value]) => (
                  value > 0 && (
                    <div key={stat}>
                      +{value} {stat.replace('_', ' ')}
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
  );
};

export default EquipmentSlot;