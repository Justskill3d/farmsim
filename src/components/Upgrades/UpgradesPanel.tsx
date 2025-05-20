import React from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import { PenTool as Tool, Check } from 'lucide-react';
import { getNextToolTier, getToolUpgradeRequirements } from '../../data/upgrades';
import { Item } from '../../types';

const UpgradesPanel: React.FC = () => {
  const { state, dispatch } = useGame();
  const { inventory } = state;

  const tools = inventory.filter((item): item is Item => 
    item !== null && item.type === 'tool'
  );

  const hasRequiredItems = (tool: Item) => {
    const nextTier = getNextToolTier(tool.tier || 'basic');
    if (!nextTier) return false;

    const upgrade = getToolUpgradeRequirements(nextTier);
    if (!upgrade) return false;

    // Check for required ore
    const hasOre = inventory.some(item => 
      item && 
      item.id === upgrade.requirements.ore.id && 
      item.quantity >= upgrade.requirements.ore.quantity
    );

    // Check for required rarity item if needed
    const hasRarityItem = !upgrade.requirements.rarity || inventory.some(item =>
      item && 
      item.type !== 'tool' && 
      item.rarity === upgrade.requirements.rarity
    );

    return hasOre && hasRarityItem;
  };

  const getButtonStyle = (tool: Item, canUpgrade: boolean, nextTier: string | null) => {
    if (!nextTier) {
      return {
        className: 'px-4 py-2 rounded-md bg-green-100 text-green-800 flex items-center gap-2',
        text: (
          <>
            <Check size={16} />
            <span>Max Level</span>
          </>
        )
      };
    }

    if (canUpgrade) {
      const tierColors = {
        copper: 'bg-amber-500 hover:bg-amber-600 text-white',
        iron: 'bg-gray-600 hover:bg-gray-700 text-white',
        tungsten: 'bg-blue-600 hover:bg-blue-700 text-white'
      };

      return {
        className: `px-4 py-2 rounded-md ${tierColors[nextTier as keyof typeof tierColors]}`,
        text: `Upgrade to ${nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}`
      };
    }

    return {
      className: 'px-4 py-2 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed',
      text: `Upgrade to ${nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}`
    };
  };

  const handleUpgrade = (tool: Item) => {
    const nextTier = getNextToolTier(tool.tier || 'basic');
    if (!nextTier) return;

    const upgrade = getToolUpgradeRequirements(nextTier);
    if (!upgrade) return;

    // Remove required ore
    const oreItem = inventory.find(item => 
      item && 
      item.id === upgrade.requirements.ore.id && 
      item.quantity >= upgrade.requirements.ore.quantity
    );

    if (oreItem) {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: {
          slotId: oreItem.slotId,
          quantity: upgrade.requirements.ore.quantity
        }
      });
    }

    // Remove rarity item if required
    if (upgrade.requirements.rarity) {
      const rarityItem = inventory.find(item =>
        item && 
        item.type !== 'tool' && 
        item.rarity === upgrade.requirements.rarity
      );

      if (rarityItem) {
        dispatch({
          type: 'REMOVE_ITEM',
          payload: {
            slotId: rarityItem.slotId,
            quantity: 1
          }
        });
      }
    }

    // Upgrade the tool
    dispatch({
      type: 'UPGRADE_TOOL',
      payload: {
        toolId: tool.id,
        newTier: nextTier
      }
    });

    // Show notification
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: {
        title: 'Tool Upgraded!',
        message: `Your ${tool.name} has been upgraded to ${upgrade.name}!`,
        type: 'success'
      }
    });
  };

  const getTierBadgeStyle = (tier: string) => {
    const styles = {
      basic: 'bg-gray-100 text-gray-800',
      copper: 'bg-amber-100 text-amber-800',
      iron: 'bg-gray-700 text-white',
      tungsten: 'bg-blue-100 text-blue-800'
    };
    return styles[tier as keyof typeof styles] || styles.basic;
  };

  return (
    <div className="mt-4">
      <Card
        title={
          <div className="flex items-center">
            <Tool size={18} className="mr-2" />
            <span>Tool Upgrades</span>
          </div>
        }
        className="bg-amber-50"
      >
        <div className="space-y-4">
          {tools.map(tool => {
            const nextTier = getNextToolTier(tool.tier || 'basic');
            const upgrade = nextTier ? getToolUpgradeRequirements(nextTier) : null;
            const canUpgrade = upgrade && hasRequiredItems(tool);
            const buttonStyle = getButtonStyle(tool, canUpgrade, nextTier);

            return (
              <div key={tool.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{tool.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getTierBadgeStyle(tool.tier || 'basic')}`}>
                        {tool.tier?.charAt(0).toUpperCase() + tool.tier?.slice(1) || 'Basic'} Tier
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => canUpgrade && handleUpgrade(tool)}
                    disabled={!canUpgrade && nextTier !== null}
                    className={buttonStyle.className}
                  >
                    {buttonStyle.text}
                  </button>
                </div>

                {upgrade && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className={`mr-2 ${canUpgrade ? 'text-green-600' : 'text-red-600'}`}>
                          •
                        </span>
                        {upgrade.requirements.ore.quantity}x {upgrade.requirements.ore.id.split('_').join(' ')}
                      </div>
                      {upgrade.requirements.rarity && (
                        <div className="flex items-center text-sm">
                          <span className={`mr-2 ${canUpgrade ? 'text-green-600' : 'text-red-600'}`}>
                            •
                          </span>
                          Any {upgrade.requirements.rarity} item
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Upgrade Benefits:</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-2 bg-amber-50 rounded-md">
                          <div className="text-sm font-medium">Energy</div>
                          <div className="text-amber-600">
                            -{Math.round(upgrade.stats.energyReduction * 100)}%
                          </div>
                        </div>
                        <div className="text-center p-2 bg-amber-50 rounded-md">
                          <div className="text-sm font-medium">Speed</div>
                          <div className="text-amber-600">
                            +{Math.round(upgrade.stats.speedBonus * 100)}%
                          </div>
                        </div>
                        <div className="text-center p-2 bg-amber-50 rounded-md">
                          <div className="text-sm font-medium">Quality</div>
                          <div className="text-amber-600">
                            +{Math.round(upgrade.stats.qualityBonus * 100)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default UpgradesPanel;