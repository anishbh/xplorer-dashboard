import React from 'react';
import { BsRulers } from 'react-icons/bs';
import useSensorData from '../../hooks/useSensorData';
import SensorCard from './SensorCard';
import { RangefinderData } from '../../utils/sensorParsers';

const Rangefinder: React.FC = () => {
  const { getSensorData, requestSensors, stopSensor, activeSensors, isConnected, sensorData } = useSensorData();
  const sensorName = 'rangefinder';
  const isActive = activeSensors.includes(sensorName);
  const rangeData = getSensorData<RangefinderData>(sensorName);
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const handleStart = () => {
    requestSensors([sensorName]);
  };

  const handleStop = () => {
    stopSensor(sensorName);
  };

  // Calculate a percentage for distance visualization
  // Assuming max distance is 400cm as per your simulator code
  const distancePercentage = rangeData ? (rangeData.distance / 400) * 100 : 0;

  return (
    <SensorCard
      title="Rangefinder"
      icon={<BsRulers size={20} />}
      isActive={isActive}
      onStart={handleStart}
      onStop={handleStop}
      isConnected={isConnected}
      lastUpdated={lastUpdated}
    >
      {rangeData && isActive ? (
        <div className="flex flex-col items-center">
          {/* Distance visualization */}
          <div className="w-full h-4 bg-gray-200 rounded-full mb-3">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${Math.min(100, distancePercentage)}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-24 h-24 mb-2">
              {/* Radar-like animation */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
              >
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="#e5e7eb" strokeWidth="1" />

                {/* Radar sweep animation */}
                {isActive && (
                  <g className="radar-sweep">
                    <path
                      d="M50,50 L50,5 A45,45 0 0,1 95,50 Z"
                      fill="rgba(16, 185, 129, 0.2)"
                      stroke="rgba(16, 185, 129, 0.6)"
                      strokeWidth="1"
                    />
                  </g>
                )}

                {/* Center dot */}
                <circle cx="50" cy="50" r="3" fill="#10b981" />

                {/* Distance marker */}
                {rangeData && (
                  <circle
                    cx="50"
                    cy="50"
                    r={Math.min(45, (rangeData.distance / 400) * 45)}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                  />
                )}
              </svg>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-semibold mb-1">
              {rangeData.distance.toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">
              centimeters
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">No data available</div>
      )}
    </SensorCard>
  );
};

export default Rangefinder;