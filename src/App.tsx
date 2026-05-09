import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Dashboard from './components/Dashboard/Dashboard';
import Roadmap from './components/Roadmap/Roadmap';
import Notification from './components/UI/Notification';
import PerkSelection from './components/PerkSelection/PerkSelection';
import EventModal from './components/Events/EventModal';
import EncounterModal from './components/Events/EncounterModal';
import MysteryPackageModal from './components/Events/MysteryPackageModal';

function App() {
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
        <Notification />
        <PerkSelection />
        <EventModal />
        <EncounterModal />
        <MysteryPackageModal />
      </GameProvider>
    </Router>
  );
}

export default App;