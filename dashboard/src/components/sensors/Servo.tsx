import React from 'react';
import { GiPositionMarker } from 'react-icons/gi';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { ServoData } from '../../utils/sensorParsers';

const Servo: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, isConnected, sensorData } = useSensorData();
  const sensorName = 'servo';
  const servoData = getSensorData<ServoData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  // Calculate position on a semicircle for visualization
  const angle = servoData ? servoData.angle : 0;
  const normalizedAngle = Math.min(200, Math.max(0, angle)) / 200; // Normalize to 0-1 range
  const radians = normalizedAngle * Math.PI;
  const x = 50 + 40 * Math.cos(radians);
  const y = 50 - 40 * Math.sin(radians);

  const sensorCardProps = {
    title: "Servo",
    icon: <GiPositionMarker size={20} />,
    onStart: handleStart,
    onStop: handleStop,
    isConnected: isConnected,
    lastUpdated: lastUpdated
  };

  return (
    <SensorCard {...sensorCardProps}>
      {!servoData ? (
        <div className="flex items-center justify-center w-full">
          <div className="text-gray-500">No Data Available</div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <svg width="100" height="60" viewBox="0 0 100 60" className="mb-2">
            {/* Semicircle background */}
            <path
              d="M10,50 A40,40 0 0,1 90,50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />

            {/* Position marker */}
            <line
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="#3b82f6"
              strokeWidth="2"
            />

            <circle cx="50" cy="50" r="3" fill="#3b82f6" />
            <circle cx={x} cy={y} r="5" fill="#3b82f6" />
          </svg>

          <div className="text-xl font-semibold">
            {servoData.angle.toFixed(1)}°
          </div>
        </div>
      )}
    </SensorCard>
  );
};

export default Servo;