import { Activity } from '../types';

export type EventKind = 'daily' | 'encounter';

export interface EventEffects {
  activityMultipliers?: Partial<Record<Activity, number>>;
  cropDoubleChance?: number;
  rareChanceBonus?: Partial<Record<Activity, number>>;
  sellMultiplier?: number;
  cropDeathChance?: number;
  energyBonus?: number;
  guaranteedItem?: string;
  goldDelta?: number;
  itemsGranted?: { id: string; quantity: number }[];
}

export interface DailyEvent {
  id: string;
  kind: 'daily';
  title: string;
  description: string;
  flavor: string;
  iconName: string;
  accent: 'emerald' | 'sky' | 'amber' | 'rose' | 'slate' | 'teal';
  effects: EventEffects;
}

export interface EncounterOption {
  id: string;
  label: string;
  description: string;
  effects: EventEffects;
}

export interface EncounterEvent {
  id: string;
  kind: 'encounter';
  title: string;
  description: string;
  flavor: string;
  iconName: string;
  accent: 'emerald' | 'sky' | 'amber' | 'rose' | 'slate' | 'teal';
  options: EncounterOption[];
}

export type GameEvent = DailyEvent | EncounterEvent;

export const dailyEvents: DailyEvent[] = [
  {
    id: 'meteor_shower',
    kind: 'daily',
    title: 'Meteor Shower Tonight',
    description: 'Streaks of light tear through the night sky. The mines shimmer with unusual minerals.',
    flavor: 'Mining yields are doubled today.',
    iconName: 'Sparkles',
    accent: 'sky',
    effects: { activityMultipliers: { mining: 2 } },
  },
  {
    id: 'caravan_in_town',
    kind: 'daily',
    title: 'Caravan in Town',
    description: 'A merchant caravan has rolled into the valley, paying top coin for fresh produce.',
    flavor: 'All items sell for 50% more today.',
    iconName: 'Coins',
    accent: 'amber',
    effects: { sellMultiplier: 1.5 },
  },
  {
    id: 'fish_migration',
    kind: 'daily',
    title: 'Fish Migration',
    description: 'Rare fish are swimming close to shore. Fishermen talk of unusual catches.',
    flavor: 'Rare fish chance tripled today.',
    iconName: 'Fish',
    accent: 'teal',
    effects: { rareChanceBonus: { fishing: 2 } },
  },
  {
    id: 'whispers_in_the_woods',
    kind: 'daily',
    title: 'Whispers in the Woods',
    description: 'The forest seems alive today. Strange footprints lead to hidden clearings.',
    flavor: 'First foraging of the day is guaranteed rare.',
    iconName: 'Leaf',
    accent: 'emerald',
    effects: { rareChanceBonus: { foraging: 2 } },
  },
  {
    id: 'crop_blight',
    kind: 'daily',
    title: 'Crop Blight',
    description: 'A sickly fog has rolled over the valley. Non-watered plots are at risk.',
    flavor: 'Unwatered crops have a high chance to die at day end.',
    iconName: 'CloudFog',
    accent: 'slate',
    effects: { cropDeathChance: 0.5 },
  },
  {
    id: 'harvest_festival',
    kind: 'daily',
    title: 'Harvest Festival',
    description: 'The valley throws its annual festival. Everything is bustling and profitable.',
    flavor: 'All activities earn +25% more gold today.',
    iconName: 'Wheat',
    accent: 'amber',
    effects: { sellMultiplier: 1.25 },
  },
  {
    id: 'spring_breeze',
    kind: 'daily',
    title: 'Gentle Spring Breeze',
    description: 'A perfect day. Your energy feels renewed just by stepping outside.',
    flavor: 'Start the day with +25 bonus energy.',
    iconName: 'Wind',
    accent: 'emerald',
    effects: { energyBonus: 25 },
  },
  {
    id: 'lucky_morning',
    kind: 'daily',
    title: 'Lucky Morning',
    description: 'You wake up feeling fortunate. A four-leaf clover rests on your windowsill.',
    flavor: 'Rare item chance up across every profession.',
    iconName: 'Clover',
    accent: 'emerald',
    effects: {
      rareChanceBonus: { farming: 1.5, fishing: 1.5, mining: 1.5, foraging: 1.5, cooking: 1.5 },
    },
  },
  {
    id: 'overcast_skies',
    kind: 'daily',
    title: 'Overcast Skies',
    description: 'The clouds hang low but it has not rained. Crops look thirsty.',
    flavor: 'Farming yields are slightly lower today.',
    iconName: 'Cloud',
    accent: 'slate',
    effects: { activityMultipliers: { farming: 0.8 } },
  },
  {
    id: 'market_boom',
    kind: 'daily',
    title: 'Market Boom',
    description: 'Demand for cooked meals has spiked at the local inn.',
    flavor: 'Cooked meals sell for double today.',
    iconName: 'Utensils',
    accent: 'rose',
    effects: { activityMultipliers: { cooking: 2 } },
  },
];

export const encounterEvents: EncounterEvent[] = [
  {
    id: 'traveling_jeweler',
    kind: 'encounter',
    title: 'A Traveling Jeweler',
    description: 'A well-dressed stranger offers you a deal for your rarest gemstones.',
    flavor: '"I will give you 1,200 gold, right now, for a prismatic shard or diamond. No questions asked."',
    iconName: 'Gem',
    accent: 'sky',
    options: [
      {
        id: 'accept',
        label: 'Sell a gem on the spot',
        description: 'Gain 1,200g immediately.',
        effects: { goldDelta: 1200 },
      },
      {
        id: 'haggle',
        label: 'Haggle for more',
        description: '50/50: gain 2,000g or lose the deal entirely.',
        effects: { goldDelta: Math.random() < 0.5 ? 2000 : 0 },
      },
      {
        id: 'refuse',
        label: 'Refuse politely',
        description: 'Keep your valuables. The jeweler leaves a token of respect (+1 pearl).',
        effects: { itemsGranted: [{ id: 'pearl', quantity: 1 }] },
      },
    ],
  },
  {
    id: 'collapsed_mine',
    kind: 'encounter',
    title: 'A Collapsed Mine Shaft',
    description: 'An old mining tunnel has caved in, revealing a glinting chamber beyond.',
    flavor: 'It looks dangerous. But that sparkle...',
    iconName: 'MountainSnow',
    accent: 'slate',
    options: [
      {
        id: 'enter',
        label: 'Squeeze through the rubble',
        description: 'Risky: lose 30 energy, gain 2 random gems.',
        effects: { itemsGranted: [{ id: 'diamond', quantity: 1 }, { id: 'ruby', quantity: 1 }] },
      },
      {
        id: 'leave',
        label: 'Leave it for another day',
        description: 'Safer. Nothing happens.',
        effects: {},
      },
    ],
  },
  {
    id: 'mystery_seed',
    kind: 'encounter',
    title: 'The Wandering Botanist',
    description: 'An eccentric botanist offers a single mystery seed for 2,000 gold.',
    flavor: '"I swear on my life, it could be anything. Worth every coin, though."',
    iconName: 'Sprout',
    accent: 'emerald',
    options: [
      {
        id: 'buy',
        label: 'Buy the mystery seed',
        description: 'Pay 2,000g for a random rare seed.',
        effects: {
          goldDelta: -2000,
          itemsGranted: [
            Math.random() < 0.5
              ? { id: 'ancient_fruit_seeds', quantity: 1 }
              : { id: 'starfruit_seeds', quantity: 2 },
          ],
        },
      },
      {
        id: 'walk_away',
        label: 'Walk away',
        description: 'Your gold stays in your pocket.',
        effects: {},
      },
    ],
  },
  {
    id: 'wounded_fox',
    kind: 'encounter',
    title: 'A Wounded Fox',
    description: 'A russet fox limps at the edge of your farm, watching you warily.',
    flavor: 'Its eyes are bright. It looks... intelligent.',
    iconName: 'Heart',
    accent: 'rose',
    options: [
      {
        id: 'feed',
        label: 'Feed it some crops',
        description: 'Give a small offering. Gain the fox\'s favor (+3 herbs later).',
        effects: { itemsGranted: [{ id: 'herbs', quantity: 3 }] },
      },
      {
        id: 'ignore',
        label: 'Leave it alone',
        description: 'It limps off into the woods.',
        effects: {},
      },
      {
        id: 'sell_hide',
        label: 'Hunt it for the hide',
        description: 'Cold but pragmatic. Gain 2 hides.',
        effects: { itemsGranted: [{ id: 'hide', quantity: 2 }] },
      },
    ],
  },
  {
    id: 'old_fisherman',
    kind: 'encounter',
    title: 'The Old Fisherman',
    description: 'A weather-beaten angler shares rumors of a legendary catch.',
    flavor: '"I saw a shadow the size of a rowboat off the east pier last night."',
    iconName: 'Anchor',
    accent: 'teal',
    options: [
      {
        id: 'tip_him',
        label: 'Tip him 500g for the info',
        description: 'Gain a lucky lunch and a blessing (+1 legendary fish chance).',
        effects: {
          goldDelta: -500,
          itemsGranted: [{ id: 'lucky_lunch', quantity: 1 }],
        },
      },
      {
        id: 'thank',
        label: 'Thank him and move on',
        description: 'No cost, no reward.',
        effects: {},
      },
    ],
  },
];

export function pickRandomDailyEvent(): DailyEvent | null {
  if (Math.random() > 0.35) return null;
  const idx = Math.floor(Math.random() * dailyEvents.length);
  return dailyEvents[idx];
}

export function pickRandomEncounter(): EncounterEvent {
  const idx = Math.floor(Math.random() * encounterEvents.length);
  return encounterEvents[idx];
}

export interface MysteryOption {
  id: string;
  label: string;
  description: string;
  reward: { goldDelta?: number; itemsGranted?: { id: string; quantity: number }[] };
}

const mysteryPool: MysteryOption[] = [
  { id: 'gold_small', label: '500 Gold Pouch', description: 'A bag of shiny coins.', reward: { goldDelta: 500 } },
  { id: 'gold_large', label: '2,000 Gold Chest', description: 'A heavy chest of gold.', reward: { goldDelta: 2000 } },
  { id: 'seed_pack', label: 'Rare Seed Pack', description: '3 starfruit seeds.', reward: { itemsGranted: [{ id: 'starfruit_seeds', quantity: 3 }] } },
  { id: 'ancient_seed', label: 'Ancient Seed', description: 'An ancient fruit seed.', reward: { itemsGranted: [{ id: 'ancient_fruit_seeds', quantity: 1 }] } },
  { id: 'prismatic', label: 'Prismatic Shard', description: 'A rainbow crystal.', reward: { itemsGranted: [{ id: 'prismatic_shard', quantity: 1 }] } },
  { id: 'legendary_fish', label: 'Legendary Fish', description: 'Someone caught it for you.', reward: { itemsGranted: [{ id: 'legendary_fish', quantity: 1 }] } },
  { id: 'gold_bars', label: 'Three Gold Bars', description: 'Refined and ready.', reward: { itemsGranted: [{ id: 'gold_bar', quantity: 3 }] } },
  { id: 'truffles', label: 'Truffle Basket', description: '4 truffles from a foraging master.', reward: { itemsGranted: [{ id: 'truffle', quantity: 4 }] } },
  { id: 'meals', label: 'Seafood Feast', description: '2 seafood gumbos ready to eat.', reward: { itemsGranted: [{ id: 'seafood_gumbo', quantity: 2 }] } },
];

export function rollMysteryPackageOptions(): [MysteryOption, MysteryOption, MysteryOption] {
  const pool = [...mysteryPool];
  const picks: MysteryOption[] = [];
  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(idx, 1)[0]);
  }
  return picks as [MysteryOption, MysteryOption, MysteryOption];
}
