import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles, BookOpen, X, Star, Sword } from 'lucide-react';
import { DiscoveryPayload, ItemRarity } from '../../types';

const rarityConfig: Record<ItemRarity, { border: string; bg: string; badge: string; glow: string; label: string }> = {
  common:    { border: 'border-gray-300',   bg: 'bg-gray-50',    badge: 'bg-gray-200 text-gray-700',     glow: '',                           label: 'Common' },
  uncommon:  { border: 'border-green-400',  bg: 'bg-green-50',   badge: 'bg-green-100 text-green-800',   glow: 'shadow-green-200',           label: 'Uncommon' },
  rare:      { border: 'border-blue-400',   bg: 'bg-blue-50',    badge: 'bg-blue-100 text-blue-800',     glow: 'shadow-blue-200',            label: 'Rare' },
  epic:      { border: 'border-orange-400', bg: 'bg-orange-50',  badge: 'bg-orange-100 text-orange-800', glow: 'shadow-orange-200',          label: 'Epic' },
  legendary: { border: 'border-amber-400',  bg: 'bg-amber-50',   badge: 'bg-amber-100 text-amber-800',   glow: 'shadow-amber-300 shadow-lg', label: 'Legendary' },
};

const KindIcon: React.FC<{ discovery: DiscoveryPayload }> = ({ discovery }) => {
  const cfg = rarityConfig[discovery.rarity];
  const iconClass = `w-16 h-16 rounded-2xl border-2 ${cfg.border} ${cfg.bg} flex items-center justify-center mx-auto mb-4`;
  if (discovery.kind === 'recipe') {
    return (
      <div className={iconClass}>
        <BookOpen size={32} className="text-amber-600" />
      </div>
    );
  }
  if (discovery.rarity === 'legendary') {
    return (
      <div className={iconClass}>
        <Star size={32} className="text-amber-500" />
      </div>
    );
  }
  return (
    <div className={iconClass}>
      <Sword size={32} className="text-blue-500" />
    </div>
  );
};

const DiscoveryModal: React.FC = () => {
  const { state, dispatch } = useGame();
  const queue = state.discoveryQueue || [];
  const current: DiscoveryPayload | undefined = queue[0];

  useEffect(() => {
    if (!current) return;
    const timer = setTimeout(() => {
      dispatch({ type: 'DISMISS_DISCOVERY' });
    }, 8000);
    return () => clearTimeout(timer);
  }, [current, dispatch]);

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'DISMISS_DISCOVERY' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, dispatch]);

  if (!current) return null;

  const cfg = rarityConfig[current.rarity];
  const headline = current.kind === 'recipe' ? 'New Recipe Unlocked!' : current.rarity === 'legendary' ? 'Legendary Find!' : 'New Equipment Found!';
  const subline = current.kind === 'recipe' ? 'You can now craft this in the Crafting tab.' : 'Check your inventory to equip it.';

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000]"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={() => dispatch({ type: 'DISMISS_DISCOVERY' })}
    >
      <div
        className={`relative bg-white rounded-2xl border-2 ${cfg.border} shadow-2xl ${cfg.glow} w-full max-w-sm mx-4 p-8 text-center animate-[fadeScaleIn_0.25s_ease-out]`}
        onClick={e => e.stopPropagation()}
      >
        {/* Shimmer bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${current.rarity === 'legendary' ? 'bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400' : current.rarity === 'epic' ? 'bg-gradient-to-r from-orange-300 via-amber-200 to-orange-400' : 'bg-gradient-to-r from-blue-300 via-sky-200 to-blue-400'}`} />

        <button
          onClick={() => dispatch({ type: 'DISMISS_DISCOVERY' })}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-center gap-1 mb-3">
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">{headline}</span>
          <Sparkles size={14} className="text-amber-400" />
        </div>

        <KindIcon discovery={current} />

        <h2 className="text-xl font-bold text-gray-900 mb-1">{current.name}</h2>

        <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 ${cfg.badge}`}>
          {cfg.label}
        </span>

        {current.description && (
          <p className="text-sm text-gray-500 mb-2">{current.description}</p>
        )}

        {current.recipeIngredients && (
          <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 mb-4">
            Ingredients: <span className="font-medium text-gray-700">{current.recipeIngredients}</span>
          </p>
        )}

        <p className="text-xs text-gray-400 mb-5">{subline}</p>

        <button
          onClick={() => dispatch({ type: 'DISMISS_DISCOVERY' })}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default DiscoveryModal;
