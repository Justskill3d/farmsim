import React from 'react';
import {
  Apple,
  Axe,
  Beef,
  Bone,
  Boxes,
  Candy,
  Carrot,
  Cherry,
  Citrus,
  Coffee,
  Cookie,
  Cross,
  Croissant,
  Diamond,
  Droplet,
  Droplets,
  Egg,
  EggFried,
  Fish,
  Flame,
  Flower2,
  Gem,
  Grape,
  Hammer,
  HandMetal,
  Layers,
  Leaf,
  Medal,
  Milk,
  Mountain,
  Package,
  Pickaxe,
  Pizza,
  Salad,
  Sandwich,
  ScrollText,
  Shell,
  Shirt,
  ShoppingBasket,
  Snowflake,
  Soup,
  Sparkles,
  Sprout,
  Square,
  Torus,
  Trash2,
  TreePine,
  UtensilsCrossed,
  Wheat,
  Wine,
  Wrench,
} from 'lucide-react';

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

type IconComponent = React.ComponentType<IconProps>;

const MushroomIcon: IconComponent = ({ size = 24, className = '', strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 11a8 8 0 1 1 16 0c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2Z" />
    <path d="M10 13v5a2 2 0 0 0 4 0v-5" />
    <circle cx="9" cy="9" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="14" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="16" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const ITEM_ICONS: Record<string, IconComponent> = {
  // Tools
  hoe: Wrench,
  watering_can: Droplets,
  fishing_rod: Fish,
  pickaxe: Pickaxe,
  axe: Axe,

  // Seeds
  parsnip_seeds: Sprout,
  potato_seeds: Sprout,
  cauliflower_seeds: Sprout,
  melon_seeds: Sprout,
  pumpkin_seeds: Sprout,

  // Plants / Crops
  parsnip: Carrot,
  potato: Carrot,
  cauliflower: Flower2,
  melon: Citrus,
  pumpkin: Apple,

  // Fish
  anchovy: Fish,
  sardine: Fish,
  tuna: Fish,
  salmon: Fish,
  sturgeon: Fish,
  legendary_fish: Fish,

  // Minerals / Gems / Bars
  coal: Flame,
  copper_ore: Gem,
  iron_ore: Gem,
  gold_ore: Gem,
  tungsten_ore: Gem,
  copper_bar: Boxes,
  iron_bar: Boxes,
  gold_bar: Boxes,
  tungsten_bar: Boxes,
  ruby: Gem,
  emerald: Gem,
  diamond: Diamond,
  prismatic_shard: Sparkles,
  salt: Candy,

  // Foraged
  wild_horseradish: Carrot,
  spring_onion: Leaf,
  blackberry: Grape,
  mushroom: MushroomIcon,
  truffle: MushroomIcon,
  golden_walnut: Cherry,
  fiber: Leaf,
  hide: Bone,
  herbs: Leaf,
  wild_garlic: Leaf,
  bay_leaf: Leaf,
  water: Droplet,

  // Resources
  stone: Mountain,
  wood: TreePine,
  hardwood: TreePine,
  clay: Layers,

  // Cooking Ingredients
  flour: Wheat,
  butter: Square,
  oil: Droplets,
  rice: Wheat,
  dough: Cookie,
  broth: Soup,
  sugar: Snowflake,

  // Meals
  fried_egg: EggFried,
  hashbrowns: Pizza,
  fish_stew: Soup,
  mushroom_soup: Soup,
  vegetable_medley: Salad,
  complete_breakfast: Sandwich,
  lucky_lunch: UtensilsCrossed,
  seafood_gumbo: Soup,

  // Treasures
  ancient_doll: Package,
  dinosaur_egg: Egg,
  golden_pumpkin: Apple,
  pearl: Sparkles,
  treasure_chest: Package,

  // Equipment (wood/iron/tungsten sets)
  wooden_helmet: Shirt,
  wooden_chestplate: Shirt,
  wooden_leggings: Shirt,
  wooden_boots: Shirt,
  iron_helmet: Shirt,
  iron_chestplate: Shirt,
  iron_leggings: Shirt,
  iron_boots: Shirt,
  tungsten_helmet: Shirt,
  tungsten_chestplate: Shirt,
  tungsten_leggings: Shirt,
  tungsten_boots: Shirt,
  plank: TreePine,
  leather: Shirt,

  // Rings
  ring_of_harvest: Torus,
  ring_of_the_deep: Torus,
  ring_of_tides: Torus,
  ring_of_the_wild: Torus,
  golden_ring: Torus,
  prismatic_ring: Torus,

  // Amulets
  wooden_amulet: Cross,
  iron_amulet: Cross,
  amulet_of_plenty: Cross,
  amulet_of_fortune: Cross,

  // Gloves
  leather_gloves: HandMetal,
  iron_gauntlets: HandMetal,
  tungsten_gauntlets: HandMetal,

  // Belts
  leather_belt: Medal,
  iron_belt: Medal,
  champions_belt: Medal,

  // Recipe Notes
  note_ring_of_harvest: ScrollText,
  note_ring_of_the_deep: ScrollText,
  note_ring_of_tides: ScrollText,
  note_ring_of_the_wild: ScrollText,
  note_golden_ring: ScrollText,
  note_prismatic_ring: ScrollText,
  note_wooden_amulet: ScrollText,
  note_iron_amulet: ScrollText,
  note_amulet_of_plenty: ScrollText,
  note_amulet_of_fortune: ScrollText,
  note_leather_gloves: ScrollText,
  note_iron_gauntlets: ScrollText,
  note_tungsten_gauntlets: ScrollText,
  note_leather_belt: ScrollText,
  note_iron_belt: ScrollText,
  note_champions_belt: ScrollText,
  note_fish_stew: ScrollText,
  note_lucky_lunch: ScrollText,
  note_complete_breakfast: ScrollText,
  note_seafood_gumbo: ScrollText,

  // Trash
  stonedust: Sparkles,
  dry_leave: Leaf,
  old_can: Trash2,
  old_seed: Sprout,

  // Misc flavor fallbacks
  wine: Wine,
  beef: Beef,
  coffee: Coffee,
  milk: Milk,
  egg: Egg,
  croissant: Croissant,
  basket: ShoppingBasket,
  hammer: Hammer,
  shell: Shell,
};

export const getItemIcon = (itemId: string): IconComponent | null => {
  return ITEM_ICONS[itemId] ?? null;
};

interface ItemIconProps {
  itemId: string;
  itemName: string;
  size?: number;
  className?: string;
  fallbackClassName?: string;
}

export const ItemIcon: React.FC<ItemIconProps> = ({
  itemId,
  itemName,
  size = 20,
  className = '',
  fallbackClassName = '',
}) => {
  const Icon = getItemIcon(itemId);
  if (Icon) {
    return <Icon size={size} className={className} strokeWidth={2} />;
  }
  return <span className={fallbackClassName}>{itemName.charAt(0)}</span>;
};
