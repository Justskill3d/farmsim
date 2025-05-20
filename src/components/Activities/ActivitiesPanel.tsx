import React, { useState } from 'react';
import { activities } from '../../data/activities';
import ActivityCard from './ActivityCard';
import ActivityNotification from './ActivityNotification';
import InventoryGrid from '../Inventory/InventoryGrid';
import Card from '../UI/Card';
import { Activity } from 'lucide-react';
import { Item } from '../../types';

const ActivitiesPanel: React.FC = () => {
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const handleItemsFound = (items: Item[]) => {
    setFoundItems(items);
    setShowNotification(true);
  };

  return (
    <div className="mt-4 space-y-4">
      <Card 
        title={
          <div className="flex items-center">
            <Activity size={18} className="mr-2" />
            <span>Activities</span>
          </div>
        }
        className="bg-amber-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map(activity => (
            <ActivityCard 
              key={activity.id} 
              activity={activity}
              onItemsFound={handleItemsFound}
            />
          ))}
        </div>
      </Card>

      <InventoryGrid />

      {showNotification && (
        <ActivityNotification
          items={foundItems}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default ActivitiesPanel;