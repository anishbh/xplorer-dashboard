import React from 'react';
import { GiElectric } from 'react-icons/gi';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { MotorData } from '../../utils/sensorParsers';

const Motor: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, isConnected, sensorData } = useSensorData();
  const sensorName = 'motor';
  const motorData = getSensorData<MotorData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  // Calculate a percentage for the speed gauge
  const speedPercentage = motorData ? (motorData.speed / 100) * 100 : 0;

  const sensorCardProps = {
    title: "Motor",
    icon: <GiElectric size={20} />,
    onStart: handleStart,
    onStop: handleStop,
    isConnected: isConnected,
    lastUpdated: lastUpdated
  };

  return (
    <SensorCard {...sensorCardProps}>
      {!motorData ? (
        <div className="flex items-center justify-center w-full">
          <div className="text-gray-500">No Data Available</div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Speed gauge visualization */}
          <div className="w-full h-4 bg-gray-200 rounded-full mb-2">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${Math.min(100, speedPercentage)}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full text-center">
            {[
              { label: 'Speed', value: motorData.speed.toFixed(1) },
              { label: 'Position', value: motorData.position.toFixed(1) },
              { label: 'Count', value: motorData.count }
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="font-mono">{value}</span>
              </div>
            ))}
          </div>

          {/* Rotation animation */}
          <div className="mt-2 relative w-12 h-12">
            <svg
              className="w-full h-full"
              viewBox="0 0 24 24"
              style={{
                animation: `spin ${Math.max(0.1, 2 - motorData.speed / 50)}s linear infinite`
              }}
            >
              <path
                fill="currentColor"
                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,10.5A1.5,1.5 0 0,0 10.5,12A1.5,1.5 0 0,0 12,13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 12,10.5M7.5,12A1.5,1.5 0 0,0 9,10.5A1.5,1.5 0 0,0 7.5,9A1.5,1.5 0 0,0 6,10.5A1.5,1.5 0 0,0 7.5,12M16.5,12A1.5,1.5 0 0,0 18,10.5A1.5,1.5 0 0,0 16.5,9A1.5,1.5 0 0,0 15,10.5A1.5,1.5 0 0,0 16.5,12Z"
              />
            </svg>
          </div>
        </div>
      )}
    </SensorCard>
  );
};

export default Motor;