import React from 'react';
import { MdColorLens } from 'react-icons/md';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { ColorSensorData } from '../../utils/sensorParsers';

const ColorSensor: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, activeSensors, isConnected, sensorData } = useSensorData();
  const sensorName = 'color_sensor';
  const isActive = activeSensors.includes(sensorName);
  const colorData = getSensorData<ColorSensorData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  return (
    <SensorCard
      title="Color Sensor"
      icon={<MdColorLens size={20} />}
      isActive={isActive}
      onStart={handleStart}
      onStop={handleStop}
      isConnected={isConnected}
      lastUpdated={lastUpdated}
    >
      {colorData && isActive ? (
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 rounded-full mb-2"
            style={{
              backgroundColor: `rgb(${colorData.r}, ${colorData.g}, ${colorData.b})`
            }}
          ></div>
          <div className="grid grid-cols-3 gap-2 w-full text-center">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">R</span>
              <span className="font-mono">{colorData.r}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">G</span>
              <span className="font-mono">{colorData.g}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">B</span>
              <span className="font-mono">{colorData.b}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">No data available</div>
      )}
    </SensorCard>
  );
};

export default ColorSensor;