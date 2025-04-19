import React from 'react';
import SensorDashboard from './components/SensorDashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <main>
        <SensorDashboard />
      </main>
    </div>
  );
};

export default App;