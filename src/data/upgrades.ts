import { ToolTier } from '../types';

export interface ToolUpgrade {
  tier: ToolTier;
  name: string;
  requirements: {
    ore: {
      id: string;
      quantity: number;
    };
    rarity?: ItemRarity;
  };
  stats: {
    energyReduction: number;
    speedBonus: number;
    qualityBonus: number;
  };
}

export const toolUpgrades: Record<ToolTier, ToolUpgrade> = {
  basic: {
    tier: 'basic',
    name: 'Basic',
    requirements: {
      ore: { id: '', quantity: 0 }
    },
    stats: {
      energyReduction: 0,
      speedBonus: 0,
      qualityBonus: 0
    }
  },
  copper: {
    tier: 'copper',
    name: 'Copper',
    requirements: {
      ore: { id: 'copper_bar', quantity: 5 }
    },
    stats: {
      energyReduction: 0.1, // 10% energy reduction
      speedBonus: 0.15,     // 15% speed bonus
      qualityBonus: 0.1     // 10% quality bonus
    }
  },
  iron: {
    tier: 'iron',
    name: 'Iron',
    requirements: {
      ore: { id: 'iron_bar', quantity: 5 },
      rarity: 'rare'
    },
    stats: {
      energyReduction: 0.2, // 20% energy reduction
      speedBonus: 0.25,     // 25% speed bonus
      qualityBonus: 0.2     // 20% quality bonus
    }
  },
  tungsten: {
    tier: 'tungsten',
    name: 'Tungsten',
    requirements: {
      ore: { id: 'tungsten_bar', quantity: 5 },
      rarity: 'legendary'
    },
    stats: {
      energyReduction: 0.35, // 35% energy reduction
      speedBonus: 0.4,       // 40% speed bonus
      qualityBonus: 0.35     // 35% quality bonus
    }
  }
};

export const getNextToolTier = (currentTier: ToolTier): ToolTier | null => {
  const tiers: ToolTier[] = ['basic', 'copper', 'iron', 'tungsten'];
  const currentIndex = tiers.indexOf(currentTier);
  return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
};

export const getToolUpgradeRequirements = (tier: ToolTier): ToolUpgrade | undefined => {
  return toolUpgrades[tier];
};