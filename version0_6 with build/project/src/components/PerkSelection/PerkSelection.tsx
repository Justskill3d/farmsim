import React from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import { Star, Award } from 'lucide-react';

const PerkSelection: React.FC = () => {
  const { state, dispatch } = useGame();
  const { currentSkillLevelUp, skills } = state;

  if (!currentSkillLevelUp || !skills[currentSkillLevelUp].availablePerks) {
    return null;
  }

  const skill = skills[currentSkillLevelUp];
  const [perk1, perk2] = skill.availablePerks;

  const handlePerkSelection = (perkId: string) => {
    dispatch({
      type: 'SELECT_PERK',
      payload: {
        activity: currentSkillLevelUp,
        perkId
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-2xl w-full mx-4">
        <Card className="bg-amber-50">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <Star className="text-yellow-500 mr-2" size={24} />
              <h2 className="text-2xl font-bold">Level Up!</h2>
              <Star className="text-yellow-500 ml-2" size={24} />
            </div>
            <p className="text-gray-600">
              Your {currentSkillLevelUp} skill has reached level {skill.level}!
              Choose a perk to enhance your abilities:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[perk1, perk2].map((perk) => (
              <div
                key={perk.id}
                onClick={() => handlePerkSelection(perk.id)}
                className="cursor-pointer transform transition-all hover:scale-105"
              >
                <Card
                  className="h-full bg-white hover:bg-amber-100 border-2 hover:border-amber-400"
                  hoverable
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-amber-100">
                      <Award className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{perk.name}</h3>
                      <p className="text-gray-600">{perk.description}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PerkSelection;