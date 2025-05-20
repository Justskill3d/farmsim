import { ReactNode } from 'react';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export type Activity = 'farming' | 'fishing' | 'mining' | 'foraging' | 'cooking';

export type Weather = 'sunny' | 'rainy' | 'stormy' | 'snowy';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export type ItemType = 'tool' | 'seed' | 'crop' | 'fish' | 'mineral' | 'foraged' | 'resource' | 'meal' | 'treasure' | 'equipment' | 'relic' | 'component' | 'consumable' | 'trash';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type PlotState = 'untilled' | 'tilled' | 'seeded' | 'growing' | 'mature' | 'dead';

export type ToolTier = 'basic' | 'copper' | 'iron' | 'tungsten';

export type EquipmentSlot = 'head' | 'torso' | 'belt' | 'legs' | 'boots' | 'hands' | 'ring_left' | 'ring_right' | 'amulet';

export type CraftingCategory = 'consumable' | 'equipment' | 'relic' | 'meal' | 'component';

export interface EquipmentStats {
  farming?: number;
  fishing?: number;
  mining?: number;
  foraging?: number;
  cooking?: number;
  energy?: number;
  speed?: number;
  luck?: number;
}

export interface Plot {
  id: number;
  state: PlotState;
  seedId?: string;
  plantedDay?: number;
  waterLevel: number;
  fertilized: boolean;
  daysToMature?: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  value: number;
  rarity: ItemRarity;
  stackable: boolean;
  maxStackSize: number;
  imageUrl: string;
  growthDays?: number;
  tier?: ToolTier;
  equipmentSlot?: EquipmentSlot;
  stats?: EquipmentStats;
  craftingCategory?: CraftingCategory;
  effects?: {
    energy?: number;
    experience?: number;
    skillBonus?: {
      skill: Activity;
      amount: number;
    };
    goldMultiplier?: number;
    energyCostModifier?: {
      activity: Activity;
      amount: number;
    };
  };
}

export interface InventoryItem extends Item {
  quantity: number;
  slotId: number;
}

export interface Equipment {
  head: InventoryItem | null;
  torso: InventoryItem | null;
  belt: InventoryItem | null;
  legs: InventoryItem | null;
  boots: InventoryItem | null;
  hands: InventoryItem | null;
  ring_left: InventoryItem | null;
  ring_right: InventoryItem | null;
  amulet: InventoryItem | null;
}

export interface Notification {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface CraftingRecipe {
  id: string;
  name: string;
  description: string;
  category: CraftingCategory;
  ingredients: [string, string];
  result: Item;
  discovered?: boolean;
}

export interface Skill {
  level: number;
  experience: number;
  perks: string[];
  availablePerks?: [Perk, Perk];
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  effect: (state: GameState) => GameState;
}

export interface GameState {
  day: number;
  season: Season;
  year: number;
  time: number;
  energy: number;
  maxEnergy: number;
  money: number;
  weather: Weather;
  inventory: (InventoryItem | null)[];
  inventorySize: number;
  activeActivity: Activity | null;
  skills: Record<Activity, Skill>;
  showPerkSelection: boolean;
  currentSkillLevelUp: Activity | null;
  plots: Plot[];
  notification: Notification | null;
  equipment: Equipment;
  discoveredRecipes: string[];
  discoveredItems: string[];
}

export type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  getTimeOfDay: () => string;
  getFormattedTime: () => string;
  startActivity: (activityId: string) => void;
  saveGame: () => void;
  loadGame: () => void;
};

export type GameAction =
  | { type: 'END_DAY' }
  | { type: 'ADVANCE_TIME'; payload: number }
  | { type: 'USE_ENERGY'; payload: number }
  | { type: 'ADD_ITEM'; payload: InventoryItem }
  | { type: 'REMOVE_ITEM'; payload: { slotId: number; quantity?: number } }
  | { type: 'SELL_ITEM'; payload: { slotId?: number; quantity?: number; value?: number } }
  | { type: 'ADD_EXPERIENCE'; payload: { activity: Activity; amount: number } }
  | { type: 'SELECT_PERK'; payload: { activity: Activity; perkId: string } }
  | { type: 'SET_ACTIVE_ACTIVITY'; payload: Activity | null }
  | { type: 'TILL_PLOT'; payload: number }
  | { type: 'PLANT_SEED'; payload: { plotId: number; seedId: string; daysToMature: number; plantedDay: number } }
  | { type: 'WATER_PLOT'; payload: number }
  | { type: 'FERTILIZE_PLOT'; payload: number }
  | { type: 'HARVEST_PLOT'; payload: number }
  | { type: 'CLEAR_DEAD_PLOT'; payload: number }
  | { type: 'SHOW_NOTIFICATION'; payload: Notification }
  | { type: 'CLEAR_NOTIFICATION' }
  | { type: 'UPGRADE_TOOL'; payload: { toolId: string; newTier: ToolTier } }
  | { type: 'EQUIP_ITEM'; payload: { item: InventoryItem; slot: EquipmentSlot } }
  | { type: 'UNEQUIP_ITEM'; payload: { slot: EquipmentSlot } }
  | { type: 'CRAFT_ITEM'; payload: { ingredients: [InventoryItem, InventoryItem] } }
  | { type: 'DISCOVER_RECIPE'; payload: string }
  | { type: 'DISCOVER_ITEM'; payload: string }
  | { type: 'SAVE_GAME' }
  | { type: 'LOAD_GAME' };