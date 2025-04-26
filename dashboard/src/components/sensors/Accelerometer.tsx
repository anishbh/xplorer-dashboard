import React from 'react';
import { MdSpeed } from 'react-icons/md';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { AccelerometerData } from '../../utils/sensorParsers';

const Accelerometer: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, isConnected, sensorData } = useSensorData();
  const sensorName = 'accelerometer';
  const accelData = getSensorData<AccelerometerData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  const sensorCardProps = {
    title: "Accelerometer",
    icon: <MdSpeed size={20} />,
    onStart: handleStart,
    onStop: handleStop,
    isConnected: isConnected,
    lastUpdated: lastUpdated
  };

  return (
    <SensorCard {...sensorCardProps}>
      {!accelData ? (
        <div className="flex items-center justify-center w-full">
          <div className="text-gray-500">No Data Available</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 text-center">
          {['x', 'y', 'z'].map((axis) => (
            <div key={axis} className="flex flex-col">
              <span className="text-xs text-gray-500">{axis.toUpperCase()}</span>
              <span className="font-mono">{accelData[axis].toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </SensorCard>
  );
};

export default Accelerometer;