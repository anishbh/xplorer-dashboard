import React from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { TemperatureData } from '../../utils/sensorParsers';

const Temperature: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, activeSensors, isConnected, sensorData } = useSensorData();
  const sensorName = 'temperature';
  const isActive = activeSensors.includes(sensorName);
  const tempData = getSensorData<TemperatureData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  // Convert to Fahrenheit for display
  const fahrenheit = tempData ? (tempData.celsius * 9 / 5) + 32 : null;

  return (
    <SensorCard
      title="Temperature"
      icon={<FaTemperatureHigh size={20} />}
      isActive={isActive}
      onStart={handleStart}
      onStop={handleStop}
      isConnected={isConnected}
      lastUpdated={lastUpdated}
    >
      {tempData && isActive ? (
        <div className="flex flex-col items-center">
          <div className="text-3xl font-semibold mb-1">
            {tempData.celsius.toFixed(1)}°C
          </div>
          <div className="text-sm text-gray-500">
            {fahrenheit?.toFixed(1)}°F
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">No data available</div>
      )}
    </SensorCard>
  );
};

export default Temperature;