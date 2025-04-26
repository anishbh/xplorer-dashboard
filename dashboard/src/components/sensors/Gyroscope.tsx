import React from 'react';
import { FaGlobe } from 'react-icons/fa';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { GyroscopeData } from '../../utils/sensorParsers';

const Gyroscope: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, isConnected, sensorData } = useSensorData();
  const sensorName = 'gyroscope';
  const gyroData = getSensorData<GyroscopeData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  const sensorCardProps = {
    title: "Gyroscope",
    icon: <FaGlobe size={20} />,
    onStart: handleStart,
    onStop: handleStop,
    isConnected: isConnected,
    lastUpdated: lastUpdated
  };

  return (
    <SensorCard {...sensorCardProps}>
      {!gyroData ? (
        <div className="flex items-center justify-center w-full">
          <div className="text-gray-500">No Data Available</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 text-center">
          {['pitch', 'roll', 'yaw'].map((axis) => (
            <div key={axis} className="flex flex-col">
              <span className="text-xs text-gray-500">{axis.charAt(0).toUpperCase() + axis.slice(1)}</span>
              <span className="font-mono">{gyroData[axis].toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </SensorCard>
  );
};

export default Gyroscope;