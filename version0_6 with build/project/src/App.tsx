import React from 'react';
import { GameProvider } from './context/GameContext';
import Dashboard from './components/Dashboard/Dashboard';
import PerkSelection from './components/PerkSelection/PerkSelection';
import Notification from './components/UI/Notification';

function App() {
  return (
    <GameProvider>
      <Dashboard />
      <PerkSelection />
      <Notification />
    </GameProvider>
  );
}

export default App;