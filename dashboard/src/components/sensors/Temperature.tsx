import React from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { TemperatureData } from '../../utils/sensorParsers';

const Temperature: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, isConnected, sensorData } = useSensorData();
  const sensorName = 'temperature';
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

  const sensorCardProps = {
    title: "Temperature",
    icon: <FaTemperatureHigh size={20} />,
    onStart: handleStart,
    onStop: handleStop,
    isConnected: isConnected,
    lastUpdated: lastUpdated
  };

  return (
    <SensorCard {...sensorCardProps}>
      {!tempData ? (
        <div className="flex items-center justify-center w-full">
          <div className="text-gray-500">No Data Available</div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-3xl font-semibold mb-1">
            {tempData.celsius.toFixed(1)}°C
          </div>
          <div className="text-sm text-gray-500">
            {fahrenheit?.toFixed(1)}°F
          </div>
        </div>
      )}
    </SensorCard>
  );
};

export default Temperature;