import React from 'react';
import { FaGlobe } from 'react-icons/fa';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { GyroscopeData } from '../../utils/sensorParsers';

const Gyroscope: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, activeSensors, isConnected, sensorData } = useSensorData();
  const sensorName = 'gyroscope';
  const isActive = activeSensors.includes(sensorName);
  const gyroData = getSensorData<GyroscopeData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  return (
    <SensorCard
      title="Gyroscope"
      icon={<FaGlobe size={20} />}
      isActive={isActive}
      onStart={handleStart}
      onStop={handleStop}
      isConnected={isConnected}
      lastUpdated={lastUpdated}
    >
      {gyroData && isActive ? (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Pitch</span>
            <span className="font-mono">{gyroData.pitch.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Roll</span>
            <span className="font-mono">{gyroData.roll.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Yaw</span>
            <span className="font-mono">{gyroData.yaw.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">No data available</div>
      )}
    </SensorCard>
  );
};

export default Gyroscope;