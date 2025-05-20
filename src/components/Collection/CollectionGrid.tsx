import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import { allItems } from '../../data/items';
import { Book, Search, Filter } from 'lucide-react';
import { ItemType, ItemRarity } from '../../types';

const CollectionGrid: React.FC = () => {
  const { state } = useGame();
  const { discoveredItems = [] } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ItemType | 'all'>('all');
  const [selectedRarity, setSelectedRarity] = useState<ItemRarity | 'all'>('all');

  const itemTypes = Array.from(new Set(allItems.map(item => item.type)));
  const rarityTypes: ItemRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity;
    return matchesSearch && matchesType && matchesRarity;
  });

  const totalItems = allItems.length;
  const discoveredCount = discoveredItems.length;
  const completionPercentage = Math.round((discoveredCount / totalItems) * 100);

  const rarityColors = {
    common: 'bg-gray-100 text-gray-800',
    uncommon: 'bg-green-100 text-green-800',
    rare: 'bg-blue-100 text-blue-800',
    epic: 'bg-purple-100 text-purple-800',
    legendary: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="mt-4">
      <Card
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Book size={18} className="mr-2" />
              <span>Collection</span>
            </div>
            <div className="text-sm">
              Progress: {discoveredCount}/{totalItems} ({completionPercentage}%)
            </div>
          </div>
        }
        className="bg-amber-50"
      >
        <div className="mb-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ItemType | 'all')}
                className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Types</option>
                {itemTypes.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value as ItemRarity | 'all')}
                className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Rarities</option>
                {rarityTypes.map(rarity => (
                  <option key={rarity} value={rarity}>{rarity.charAt(0).toUpperCase() + rarity.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {filteredItems.map((item) => {
            const isDiscovered = discoveredItems.includes(item.id);

            return (
              <div
                key={item.id}
                className={`p-3 rounded-lg border-2 ${
                  isDiscovered
                    ? `${rarityColors[item.rarity]} border-transparent`
                    : 'bg-gray-100 border-gray-200'
                }`}
              >
                {isDiscovered ? (
                  <div>
                    <div className="flex items-center mb-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold ${rarityColors[item.rarity]}`}>
                        {item.name.charAt(0)}
                      </div>
                      <div className="ml-2 flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.name}</div>
                        <div className="text-xs text-gray-600 capitalize">{item.type}</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${rarityColors[item.rarity]} capitalize`}>
                        {item.rarity}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        ${item.value}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <span className="text-gray-400 text-xl">?</span>
                    </div>
                    <div className="text-sm text-gray-400">Undiscovered Item</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default CollectionGrid;