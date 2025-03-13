import React from 'react';
import SensorDashboard from './components/SensorDashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <header className="max-w-6xl mx-auto px-4 mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">XRP Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Real-time monitoring and control of sensor data from XRP simulator
        </p>
      </header>

      <main>
        <SensorDashboard />
      </main>
    </div>
  );
};

export default App;