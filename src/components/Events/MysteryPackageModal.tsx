import React from 'react';
import { useGame } from '../../context/GameContext';
import { Gift } from 'lucide-react';

export default function MysteryPackageModal() {
  const { state, dispatch } = useGame();
  const pkg = state.mysteryPackage;

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden">
        <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-6 text-white">
          <Gift size={48} className="mb-2" />
          <h2 className="text-2xl font-bold">Weekly Mystery Package</h2>
          <p className="opacity-90 mt-1 text-sm">Week {pkg.week} - Choose one reward. The others disappear.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {pkg.options.map(opt => (
            <button
              key={opt.id}
              onClick={() =>
                dispatch({ type: 'CLAIM_MYSTERY_PACKAGE', payload: { optionId: opt.id } })
              }
              className="text-left p-4 border-2 border-gray-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all"
            >
              <div className="font-bold text-gray-900 mb-1">{opt.label}</div>
              <div className="text-sm text-gray-600">{opt.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
