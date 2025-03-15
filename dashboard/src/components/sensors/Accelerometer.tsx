import React from 'react';
import { MdSpeed } from 'react-icons/md';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { AccelerometerData } from '../../utils/sensorParsers';

const Accelerometer: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, activeSensors, isConnected, sensorData } = useSensorData();
  const sensorName = 'accelerometer';
  const isActive = activeSensors.includes(sensorName);
  const accelData = getSensorData<AccelerometerData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  return (
    <SensorCard
      title="Accelerometer"
      icon={<MdSpeed size={20} />}
      isActive={isActive}
      onStart={handleStart}
      onStop={handleStop}
      isConnected={isConnected}
      lastUpdated={lastUpdated}
    >
      {accelData && isActive ? (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">X</span>
            <span className="font-mono">{accelData.x.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Y</span>
            <span className="font-mono">{accelData.y.toFixed(2)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Z</span>
            <span className="font-mono">{accelData.z.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">No data available</div>
      )}
    </SensorCard>
  );
};

export default Accelerometer;
