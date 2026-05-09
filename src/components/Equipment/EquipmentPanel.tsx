import React from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import EquipmentSlot from './EquipmentSlot';
import { Shield, Sprout, Fish, Pickaxe, Leaf, Utensils, Battery, Gauge, Sparkles } from 'lucide-react';
import { EquipmentStats } from '../../types';

const EquipmentPanel: React.FC = () => {
  const { state } = useGame();
  const { equipment } = state;

  const calculateTotalStats = (): EquipmentStats => {
    const stats: EquipmentStats = {
      farming: 0,
      fishing: 0,
      mining: 0,
      foraging: 0,
      cooking: 0,
      energy: 0,
      speed: 0,
      luck: 0
    };

    // Calculate base stats from equipment
    Object.values(equipment).forEach(item => {
      if (item?.stats) {
        Object.entries(item.stats).forEach(([key, value]) => {
          stats[key as keyof EquipmentStats] = (stats[key as keyof EquipmentStats] || 0) + (value || 0);
        });
      }
    });

    // Calculate set bonuses
    const pieceCount = (needle: string) =>
      Object.values(equipment).filter(item => item?.id.startsWith(needle)).length;

    const ironPieces = pieceCount('iron_');
    const tungstenPieces = pieceCount('tungsten_');
    const verdantPieces = pieceCount('verdant_');
    const tidecallerPieces = pieceCount('tidecaller_');
    const gourmetPieces = Object.values(equipment).filter(item =>
      item && (item.id.startsWith('gourmet_') || item.id === 'chefs_hat')
    ).length;
    const wandererPieces = pieceCount('wanderer_');

    if (ironPieces >= 2) stats.speed = (stats.speed || 0) + 10;
    if (tungstenPieces >= 2) stats.mining = (stats.mining || 0) + 5;
    if (verdantPieces >= 3) stats.farming = (stats.farming || 0) + 8;
    if (verdantPieces >= 4) stats.luck = (stats.luck || 0) + 4;
    if (tidecallerPieces >= 3) stats.fishing = (stats.fishing || 0) + 8;
    if (tidecallerPieces >= 4) stats.luck = (stats.luck || 0) + 4;
    if (gourmetPieces >= 3) stats.cooking = (stats.cooking || 0) + 8;
    if (gourmetPieces >= 4) stats.energy = (stats.energy || 0) + 6;
    if (wandererPieces >= 3) stats.foraging = (stats.foraging || 0) + 8;
    if (wandererPieces >= 4) stats.speed = (stats.speed || 0) + 6;

    return stats;
  };

  const pieceCount = (needle: string) =>
    Object.values(equipment).filter(item => item?.id.startsWith(needle)).length;
  const gourmetCount = Object.values(equipment).filter(item =>
    item && (item.id.startsWith('gourmet_') || item.id === 'chefs_hat')
  ).length;

  const totalStats = calculateTotalStats();

  const statIcons = {
    farming: <Sprout size={16} className="text-green-500" />,
    fishing: <Fish size={16} className="text-blue-500" />,
    mining: <Pickaxe size={16} className="text-gray-500" />,
    foraging: <Leaf size={16} className="text-green-500" />,
    cooking: <Utensils size={16} className="text-amber-500" />,
    energy: <Battery size={16} className="text-green-500" />,
    speed: <Gauge size={16} className="text-amber-500" />,
    luck: <Sparkles size={16} className="text-purple-500" />
  };

  const statColors = {
    farming: 'text-green-700 bg-green-50',
    fishing: 'text-blue-700 bg-blue-50',
    mining: 'text-gray-700 bg-gray-50',
    foraging: 'text-green-700 bg-green-50',
    cooking: 'text-amber-700 bg-amber-50',
    energy: 'text-green-700 bg-green-50',
    speed: 'text-amber-700 bg-amber-50',
    luck: 'text-purple-700 bg-purple-50'
  };

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
              <h3 className="font-medium mb-3 flex items-center">
                <Shield size={16} className="mr-2" />
                Total Equipment Stats
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(totalStats).map(([stat, value]) => (
                  value > 0 && (
                    <div 
                      key={stat} 
                      className={`flex items-center justify-between p-2 rounded ${statColors[stat as keyof typeof statColors]}`}
                    >
                      <div className="flex items-center">
                        {statIcons[stat as keyof typeof statIcons]}
                        <span className="ml-2 capitalize">{stat}</span>
                      </div>
                      <span className="font-medium">+{value}</span>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Equipment Set Bonuses */}
            <div className="p-4 bg-white rounded-lg border border-amber-200">
              <h3 className="font-medium mb-3 flex items-center">
                <Sparkles size={16} className="mr-2" />
                Set Bonuses
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                {pieceCount('iron_') >= 2 && (
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-700">Iron Set ({pieceCount('iron_')}pc)</div>
                    <div>+10 Speed</div>
                  </div>
                )}
                {pieceCount('tungsten_') >= 2 && (
                  <div className="p-2 bg-blue-50 rounded">
                    <div className="font-medium text-blue-700">Tungsten Set ({pieceCount('tungsten_')}pc)</div>
                    <div>+5 Mining, +15% XP</div>
                  </div>
                )}
                {pieceCount('verdant_') >= 3 && (
                  <div className="p-2 bg-emerald-50 rounded">
                    <div className="font-medium text-emerald-700">Verdant Set ({pieceCount('verdant_')}pc)</div>
                    <div>+8 Farming{pieceCount('verdant_') >= 4 ? ', +4 Luck' : ''}</div>
                  </div>
                )}
                {pieceCount('tidecaller_') >= 3 && (
                  <div className="p-2 bg-sky-50 rounded">
                    <div className="font-medium text-sky-700">Tidecaller Set ({pieceCount('tidecaller_')}pc)</div>
                    <div>+8 Fishing{pieceCount('tidecaller_') >= 4 ? ', +4 Luck' : ''}</div>
                  </div>
                )}
                {gourmetCount >= 3 && (
                  <div className="p-2 bg-rose-50 rounded">
                    <div className="font-medium text-rose-700">Gourmet Set ({gourmetCount}pc)</div>
                    <div>+8 Cooking{gourmetCount >= 4 ? ', +6 Energy' : ''}</div>
                  </div>
                )}
                {pieceCount('wanderer_') >= 3 && (
                  <div className="p-2 bg-teal-50 rounded">
                    <div className="font-medium text-teal-700">Wanderer Set ({pieceCount('wanderer_')}pc)</div>
                    <div>+8 Foraging{pieceCount('wanderer_') >= 4 ? ', +6 Speed' : ''}</div>
                  </div>
                )}
                {pieceCount('iron_') < 2 && pieceCount('tungsten_') < 2 && pieceCount('verdant_') < 3 && pieceCount('tidecaller_') < 3 && gourmetCount < 3 && pieceCount('wanderer_') < 3 && (
                  <div className="text-xs text-gray-500 italic">
                    Equip 3+ pieces of a set to unlock bonuses.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EquipmentPanel;