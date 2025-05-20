import React from 'react';
import { useGame } from '../../context/GameContext';
import Card from '../UI/Card';
import { CloudRain, Cloud, CloudLightning, CloudSnow, Sun } from 'lucide-react';

const WeatherDisplay: React.FC = () => {
  const { state } = useGame();
  const { weather, season } = state;

  const getWeatherIcon = () => {
    switch (weather) {
      case 'sunny':
        return <Sun size={24} className="text-yellow-500" />;
      case 'rainy':
        return <CloudRain size={24} className="text-blue-500" />;
      case 'stormy':
        return <CloudLightning size={24} className="text-purple-500" />;
      case 'snowy':
        return <CloudSnow size={24} className="text-blue-300" />;
      default:
        return <Cloud size={24} className="text-gray-500" />;
    }
  };

  const getWeatherDescription = () => {
    switch (weather) {
      case 'sunny':
        return "It's a beautiful sunny day!";
      case 'rainy':
        return "Rain is watering your crops today.";
      case 'stormy':
        return "Be careful, there's a thunderstorm outside!";
      case 'snowy':
        return "Snow is falling gently outside.";
      default:
        return "The weather is pleasant today.";
    }
  };

  const weatherColors = {
    sunny: 'bg-yellow-50 border-yellow-200',
    rainy: 'bg-blue-50 border-blue-200',
    stormy: 'bg-purple-50 border-purple-200',
    snowy: 'bg-blue-50 border-blue-200'
  };

  const weatherEffects = {
    sunny: 'Great for foraging and farming!',
    rainy: 'Crops are watered automatically. Good fishing day!',
    stormy: 'Stay inside and cook or craft. Good mining day!',
    snowy: 'Winter foraging available. Some crops won\'t grow.'
  };

  return (
    <Card className={`${weatherColors[weather]} transition-colors duration-500`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium capitalize">{weather} Weather</h3>
          <p className="text-sm text-gray-600 mt-1">{getWeatherDescription()}</p>
          <div className="mt-3 text-xs p-2 bg-white bg-opacity-60 rounded-md">
            <strong>Effect:</strong> {weatherEffects[weather]}
          </div>
        </div>
        <div className="p-3 rounded-full bg-white bg-opacity-70">
          {getWeatherIcon()}
        </div>
      </div>
    </Card>
  );
};

export default WeatherDisplay;