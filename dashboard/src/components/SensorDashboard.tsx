import React from 'react';
import ColorSensor from './sensors/ColorSensor';
import Accelerometer from './sensors/Accelerometer';
import Gyroscope from './sensors/Gyroscope';
import Temperature from './sensors/Temperature';
import LED from './sensors/LED';
import Servo from './sensors/Servo';
import Motor from './sensors/Motor';
import useSensorData from '../hooks/useSensorData';
import Rangefinder from './sensors/Rangefinder';

const SensorDashboard: React.FC = () => {
  const { isConnected, error, requestSensors, stopSensor, activeSensors } = useSensorData();

  // Start all sensors at once
  const startAllSensors = () => {
    requestSensors([
      'color_sensor',
      'accelerometer',
      'gyroscope',
      'temperature',
      'LED',
      'servo',
      'motor',
      'rangefinder'
    ]);
  };

  // Stop all sensors at once
  const stopAllSensors = () => {
    ['color_sensor', 'accelerometer', 'gyroscope', 'temperature', 'LED', 'servo', 'motor', 'rangefinder']
      .forEach(sensor => stopSensor(sensor));
  };

  // Count active sensors
  const activeCount = activeSensors.length;
  const totalSensors = 8; // Total number of available sensors

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sensor Dashboard</h1>
          <p className="text-gray-600">Monitor and control your sensors in real-time</p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ColorSensor />
        <Accelerometer />
        <Gyroscope />
        <Temperature />
        <LED />
        <Servo />
        <Motor />
        <Rangefinder />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-lg font-semibold mb-2">About This Dashboard</h2>
        <p className="text-gray-600">
          This dashboard connects to a Flask backend with Socket.IO at port 5001.
          Each sensor runs for approximately 10 seconds after activation before automatically stopping.
          You can restart sensors as needed to continue receiving data.
        </p>

        <div className="mt-4 bg-blue-50 p-4 rounded-md text-blue-800 text-sm">
          <strong>Note:</strong> If you're not seeing data after clicking Start, ensure the Flask backend is running
          and accessible at the correct port. Check the browser console for connection issues.
        </div>
      </div>
    </div>
  );
};

export default SensorDashboard;