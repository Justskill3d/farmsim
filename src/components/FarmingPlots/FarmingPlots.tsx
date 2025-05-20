import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import Plot from './Plot';
import InventoryGrid from '../Inventory/InventoryGrid';
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
      <div className="flex items-center justify-between mb-4">
        <span className={`px-2 py-1 rounded-full text-sm ${statusColor}`}>
          {plot.state.charAt(0).toUpperCase() + plot.state.slice(1)}
        </span>
        <div className="flex items-center gap-2">
          <Droplet 
            size={18} 
            className={plot.waterLevel ? 'text-blue-500 fill-current' : 'text-gray-400'} 
          />
          {plot.fertilized && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">F</span>
          )}
        </div>
      </div>

      {seed && (
        <div className="space-y-2">
          <div className="font-medium">{seed.name}</div>
          {plot.daysToMature && plot.plantedDay && (
            <div className="text-sm text-gray-600">
              Growth: Day {getDaysPassed()} / {plot.daysToMature}
              <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(getDaysPassed() / plot.daysToMature) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FarmingPlots: React.FC = () => {
  const { state, dispatch } = useGame();
  const { plots, inventory, skills } = state;
  const [selectedPlot, setSelectedPlot] = useState<PlotType | null>(null);
  const [isWateringMode, setIsWateringMode] = useState(false);

  const seedCount = inventory.reduce((total, item) => {
    if (item && item.type === 'seed') {
      return total + item.quantity;
    }
    return total;
  }, 0);

  const hasWateringCan = inventory.some(item => item && item.id === 'watering_can');
  const wateringCanTool = inventory.find(item => item && item.id === 'watering_can');
  const hasMasterWatering = wateringCanTool?.tier === 'tungsten' && 
    skills.farming.perks.includes('watering_can_master');

  const handleWaterAll = () => {
    if (!hasWateringCan || !hasMasterWatering) return;

    let waterablePlots = plots.filter(plot => 
      (plot.state === 'seeded' || plot.state === 'growing') && !plot.waterLevel
    );

    if (waterablePlots.length > 0) {
      waterablePlots.forEach(plot => {
        dispatch({ 
          type: 'WATER_PLOT', 
          payload: plot.id 
        });
      });

      // Only use energy once for all plots
      dispatch({ 
        type: 'USE_ENERGY', 
        payload: 3 
      });

      dispatch({
        type: 'ADD_EXPERIENCE',
        payload: { 
          activity: 'farming', 
          amount: 5 * waterablePlots.length 
        }
      });

      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          title: 'Master Irrigation',
          message: `Watered ${waterablePlots.length} plots at once!`,
          type: 'success'
        }
      });
    }
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <Card
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sprout size={18} className="mr-2" />
                  <span>Farming Plots</span>
                </div>
                <div className="flex items-center gap-4">
                  {hasWateringCan && (
                    hasMasterWatering ? (
                      <button
                        onClick={handleWaterAll}
                        className="flex items-center px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      >
                        <Droplet size={16} className="mr-2" />
                        Water All Plots
                      </button>
                    ) : (
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
                    )
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

        <div className="lg:col-span-1">
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

      <div className="mt-4">
        <InventoryGrid />
      </div>
    </div>
  );
};

export default FarmingPlots;