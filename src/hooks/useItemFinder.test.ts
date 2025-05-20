import { useItemFinder } from './useItemFinder';
import { GameState } from '../types';

// Mock initial state with different skill levels and tool tiers
const createMockState = (skillLevel: number, toolTier: 'basic' | 'copper' | 'iron' | 'tungsten' = 'basic') => ({
  skills: {
    farming: { level: skillLevel, experience: 0, perks: [] },
    fishing: { level: 1, experience: 0, perks: [] },
    mining: { level: 1, experience: 0, perks: [] },
    foraging: { level: 1, experience: 0, perks: [] },
    cooking: { level: 1, experience: 0, perks: [] },
  },
  inventory: [
    {
      id: 'hoe',
      name: `${toolTier.charAt(0).toUpperCase() + toolTier.slice(1)} Hoe`,
      type: 'tool',
      tier: toolTier,
      slotId: 0,
      quantity: 1,
      rarity: 'common',
      stackable: false,
      maxStackSize: 1,
      value: 0,
      description: '',
      imageUrl: ''
    }
  ]
}) as unknown as GameState;

// Run 1000 tests for each configuration
const runRarityTest = (skillLevel: number, toolTier: 'basic' | 'copper' | 'iron' | 'tungsten') => {
  const state = createMockState(skillLevel, toolTier);
  const { findItems } = useItemFinder();
  
  const results = {
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
    total: 0
  };

  // Run 1000 tests
  for (let i = 0; i < 1000; i++) {
    const { items } = findItems('farming');
    items.forEach(item => {
      results[item.rarity]++;
      results.total++;
    });
  }

  console.log(`\nResults for Skill Level ${skillLevel} with ${toolTier} tool:`);
  Object.entries(results).forEach(([rarity, count]) => {
    if (rarity !== 'total') {
      const percentage = ((count / results.total) * 100).toFixed(2);
      console.log(`${rarity}: ${count} (${percentage}%)`);
    }
  });
};

// Test different configurations
console.log('Starting rarity tests...\n');

// Test 1: Low level, basic tool
runRarityTest(1, 'basic');

// Test 2: Mid level, copper tool
runRarityTest(4, 'copper');

// Test 3: High level, iron tool
runRarityTest(6, 'iron');

// Test 4: Max level, tungsten tool
runRarityTest(8, 'tungsten');