import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import Plot from './Plot';
import { Sprout, Info, Droplet } from 'lucide-react';
import { Plot as PlotType } from '../../types';
import { getItemById } from '../../data/items';

const PlotInfoBox: React.FC<{ plot: PlotType | null }> = ({ plot }) => {
  const { state } = useGame();
  const { day } = state;

  if (!plot) return null;

  const seed = plot.seedId ? getItemById(plot.seedId) : null;
  const statusColor = {
    untilled: 'bg-amber-100 text-amber-800',
    tilled: 'bg-amber-100 text-amber-800',
    seeded: 'bg-green-100 text-green-800',
    growing: 'bg-green-100 text-green-800',
    mature: 'bg-emerald-100 text-emerald-800',
    dead: 'bg-red-100 text-red-800'
  }[plot.state];

  const getDaysPassed = () => {
    if (!plot.plantedDay) return 0;
    return day - plot.plantedDay;
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-amber-200">
      <div className="flex items-center gap-2 mb-3">
        <Info size={18} className="text-amber-600" />
        <h3 className="font-medium">Plot Information</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-600 mb-1">Status</div>
          <span className={`px-2 py-1 rounded-full text-sm ${statusColor}`}>
            {plot.state.charAt(0).toUpperCase() + plot.state.slice(1)}
          </span>
        </div>

        {seed && (
          <div>
            <div className="text-sm text-gray-600 mb-1">Plant</div>
            <div className="font-medium">{seed.name}</div>
            {plot.daysToMature && plot.plantedDay && (
              <div className="text-sm text-gray-500 mt-1">
                Growth Progress: Day {getDaysPassed()} / {plot.daysToMature}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-gray-600 mb-1">Water Level</div>
            <div className={`font-medium ${plot.waterLevel ? 'text-blue-600' : 'text-gray-500'}`}>
              {plot.waterLevel ? 'Watered' : 'Dry'}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Fertilizer</div>
            <div className={`font-medium ${plot.fertilized ? 'text-green-600' : 'text-gray-500'}`}>
              {plot.fertilized ? 'Applied' : 'None'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FarmingPlots: React.FC = () => {
  const { state } = useGame();
  const { plots, inventory } = state;
  const [selectedPlot, setSelectedPlot] = useState<PlotType | null>(null);
  const [isWateringMode, setIsWateringMode] = useState(false);

  // Count total seeds in inventory
  const seedCount = inventory.reduce((total, item) => {
    if (item && item.type === 'seed') {
      return total + item.quantity;
    }
    return total;
  }, 0);

  const hasWateringCan = inventory.some(item => item && item.id === 'watering_can');

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sprout size={18} className="mr-2" />
                  <span>Farming Plots</span>
                </div>
                <div className="flex items-center gap-4">
                  {hasWateringCan && (
                    <button
                      onClick={() => setIsWateringMode(!isWateringMode)}
                      className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                        isWateringMode 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Droplet size={16} className="mr-2" />
                      {isWateringMode ? 'Cancel Watering' : 'Water Plots'}
                    </button>
                  )}
                  <div className="text-sm text-gray-600">
                    {seedCount} seeds
                  </div>
                </div>
              </div>
            }
            className="bg-amber-50"
          >
            <div className="grid grid-cols-4 gap-4">
              {plots.map((plot) => (
                <Plot 
                  key={plot.id} 
                  plot={plot}
                  onSelect={() => setSelectedPlot(plot)}
                  isWateringMode={isWateringMode}
                />
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card
            title={
              <div className="flex items-center">
                <Info size={18} className="mr-2" />
                <span>Plot Details</span>
              </div>
            }
            className="bg-amber-50"
          >
            {selectedPlot ? (
              <PlotInfoBox plot={selectedPlot} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Info size={24} className="mx-auto mb-2 opacity-50" />
                <p>Select a plot to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmingPlots;