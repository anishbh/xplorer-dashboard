import React from 'react';
import { MdLightbulb } from 'react-icons/md';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { LEDData } from '../../utils/sensorParsers';

const LED: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, activeSensors, isConnected, sensorData } = useSensorData();
  const sensorName = 'LED';
  const isActive = activeSensors.includes(sensorName);
  const ledData = getSensorData<LEDData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  return (
    <SensorCard
      title="LED"
      icon={<MdLightbulb size={20} />}
      isActive={isActive}
      onStart={handleStart}
      onStop={handleStop}
      isConnected={isConnected}
      lastUpdated={lastUpdated}
    >
      {ledData && isActive ? (
        <div className="flex flex-col items-center">
          <div className={`text-4xl ${ledData.state === 'on' ? 'text-yellow-400' : 'text-gray-400'}`}>
            <MdLightbulb />
          </div>
          <div className="mt-2 font-medium">
            {ledData.state === 'on' ? 'ON' : 'OFF'}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">No data available</div>
      )}
    </SensorCard>
  );
};

export default LED;
