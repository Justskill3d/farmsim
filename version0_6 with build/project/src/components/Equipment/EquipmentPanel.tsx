import React from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import EquipmentSlot from './EquipmentSlot';
import { Shield } from 'lucide-react';
import { EquipmentStats } from '../../types';

const EquipmentPanel: React.FC = () => {
  const { state } = useGame();
  const { equipment } = state;

  const calculateTotalStats = (): EquipmentStats => {
    const stats: EquipmentStats = {
      health: 0,
      energy: 0,
      defense: 0,
      luck: 0,
      speed: 0
    };

    Object.values(equipment).forEach(item => {
      if (item?.stats) {
        Object.entries(item.stats).forEach(([key, value]) => {
          stats[key as keyof EquipmentStats] = (stats[key as keyof EquipmentStats] || 0) + (value || 0);
        });
      }
    });

    return stats;
  };

  const totalStats = calculateTotalStats();

  return (
    <div className="mt-4">
      <Card
        title={
          <div className="flex items-center">
            <Shield size={18} className="mr-2" />
            <span>Equipment</span>
          </div>
        }
        className="bg-amber-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-start-2">
                <EquipmentSlot type="head" item={equipment.head} />
              </div>
              <div className="col-start-2">
                <EquipmentSlot type="torso" item={equipment.torso} />
              </div>
              <div className="col-start-2">
                <EquipmentSlot type="belt" item={equipment.belt} />
              </div>
              <div className="col-start-2">
                <EquipmentSlot type="legs" item={equipment.legs} />
              </div>
              <div className="col-start-2">
                <EquipmentSlot type="boots" item={equipment.boots} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <EquipmentSlot type="hands" item={equipment.hands} />
              <EquipmentSlot type="amulet" item={equipment.amulet} />
              <div className="space-y-4">
                <EquipmentSlot type="ring_left" item={equipment.ring_left} />
                <EquipmentSlot type="ring_right" item={equipment.ring_right} />
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-amber-200">
              <h3 className="font-medium mb-3">Total Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(totalStats).map(([stat, value]) => (
                  value > 0 && (
                    <div key={stat} className="flex items-center justify-between bg-amber-50 p-2 rounded">
                      <span className="capitalize">{stat.replace('_', ' ')}</span>
                      <span className="font-medium text-amber-700">+{value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EquipmentPanel;