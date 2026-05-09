import React from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles, Coins, Fish, Leaf, CloudFog, Wheat, Wind, Cloud, Utensils, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Coins, Fish, Leaf, CloudFog, Wheat, Wind, Cloud, Utensils,
  Clover: Leaf,
};

const accentMap: Record<string, string> = {
  emerald: 'from-emerald-500 to-emerald-700',
  sky: 'from-sky-500 to-sky-700',
  amber: 'from-amber-500 to-amber-700',
  rose: 'from-rose-500 to-rose-700',
  slate: 'from-slate-500 to-slate-700',
  teal: 'from-teal-500 to-teal-700',
};

export default function EventModal() {
  const { state, dispatch } = useGame();
  const event = state.dailyEvent;
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    setDismissed(false);
  }, [event?.id, state.day]);

  if (!event || dismissed) return null;

  const Icon = iconMap[event.iconName] ?? Sparkles;
  const gradient = accentMap[event.accent] ?? accentMap.sky;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className={`bg-gradient-to-br ${gradient} p-6 text-white`}>
          <Icon size={48} className="mb-2" />
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <p className="opacity-90 mt-1 text-sm">Day {state.day}</p>
        </div>
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed mb-4">{event.description}</p>
          <p className="text-sm italic text-gray-600 border-l-4 border-gray-200 pl-3 mb-6">
            {event.flavor}
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Begin the Day
          </button>
        </div>
      </div>
    </div>
  );
}
