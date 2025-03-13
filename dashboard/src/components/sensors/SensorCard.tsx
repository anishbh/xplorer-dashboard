import React, { ReactNode } from 'react';

interface SensorCardProps {
  title: string;
  icon: ReactNode;
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
  isConnected: boolean;
  children: ReactNode;
  lastUpdated?: string;
}

const SensorCard: React.FC<SensorCardProps> = ({
  title,
  icon,
  isActive,
  onStart,
  onStop,
  isConnected,
  children,
  lastUpdated
}) => {
  return (
    <div className="sensor-card border-4 border-gray-300 rounded-2xl">
      <div className="flex justify-between items-center mb-3 m-4">
        <div className="flex items-center gap-2">
          <div className="text-gray-600">
            {icon}
          </div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>

        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs text-gray-500">{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      </div>

      <div className="mb-3">
        {children}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-400 m-4">
          {lastUpdated && (
            <span>{isActive ? `Updated: ${new Date(lastUpdated).toLocaleTimeString()}` : ""}</span>
          )}
        </div>

        <div>
          {isActive ? (
            <button
              onClick={onStop}
              className="sensor-button-secondary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={onStart}
              disabled={!isConnected}
              className="sensor-button-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
