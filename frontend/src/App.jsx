import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { BlueView } from './components/BlueView';
import { RedView } from './components/RedView';
import { QuantumView } from './components/QuantumView';
import { Dashboard } from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard onViewChange={setCurrentView} />;
      case 'blue': return <BlueView />;
      case 'red': return <RedView />;
      case 'quantum': return <QuantumView />;
      default: return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default App;
