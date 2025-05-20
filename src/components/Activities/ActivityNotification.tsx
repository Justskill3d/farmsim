import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../../types';
import { X } from 'lucide-react';

interface ActivityNotificationProps {
  items: InventoryItem[];
  onClose: () => void;
}

const ActivityNotification: React.FC<ActivityNotificationProps> = ({ items, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg border border-amber-200 p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
      
      <h3 className="font-medium mb-2">Items Found!</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div 
            key={`${item.id}-${index}`}
            className={`flex items-center p-2 rounded-md ${
              item.rarity === 'legendary' ? 'bg-orange-100' :
              item.rarity === 'epic' ? 'bg-purple-100' :
              item.rarity === 'rare' ? 'bg-blue-100' :
              item.rarity === 'uncommon' ? 'bg-green-100' :
              'bg-gray-100'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-lg">
              {item.name.charAt(0)}
            </div>
            <div className="ml-2">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-600">
                {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.rarity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityNotification;