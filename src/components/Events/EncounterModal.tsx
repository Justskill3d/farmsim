import React from 'react';
import { useGame } from '../../context/GameContext';
import { Gem, MountainSnow, Sprout, Heart, Anchor, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Gem, MountainSnow, Sprout, Heart, Anchor,
};

const accentMap: Record<string, string> = {
  emerald: 'from-emerald-600 to-emerald-800',
  sky: 'from-sky-600 to-sky-800',
  amber: 'from-amber-600 to-amber-800',
  rose: 'from-rose-600 to-rose-800',
  slate: 'from-slate-600 to-slate-800',
  teal: 'from-teal-600 to-teal-800',
};

export default function EncounterModal() {
  const { state, dispatch } = useGame();
  const enc = state.pendingEncounter;

  if (!enc) return null;

  const Icon = iconMap[enc.iconName] ?? Gem;
  const gradient = accentMap[enc.accent] ?? accentMap.sky;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className={`bg-gradient-to-br ${gradient} p-6 text-white`}>
          <Icon size={48} className="mb-2" />
          <h2 className="text-2xl font-bold">{enc.title}</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed mb-3">{enc.description}</p>
          <p className="text-sm italic text-gray-600 border-l-4 border-gray-200 pl-3 mb-6">
            {enc.flavor}
          </p>
          <div className="space-y-2">
            {enc.options.map(opt => (
              <button
                key={opt.id}
                onClick={() =>
                  dispatch({ type: 'RESOLVE_ENCOUNTER', payload: { optionId: opt.id } })
                }
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all"
              >
                <div className="font-semibold text-gray-900">{opt.label}</div>
                <div className="text-sm text-gray-600 mt-1">{opt.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
