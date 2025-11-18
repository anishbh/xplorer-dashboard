import React, { useState } from 'react';
import { MdVideocam } from 'react-icons/md';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { PI_IP } from '../../utils/constants';

import SensorCard from './SensorCard';
import useSensorData from '../../hooks/useSensorData';

const STREAM_URL = `http://${PI_IP}:5002/video_feed`; 

type ViewMode = 'Live' | 'Info';

const Camera: React.FC = () => {
  const { requestSensors, stopSensor, isConnected, sensorData } = useSensorData();

  const sensorName = 'camera';
  const lastUpdated = sensorData.get(sensorName)?.timestamp;

  const [viewMode, setViewMode] = useState<ViewMode>('Live');

  const handleStart = () => {
    requestSensors([sensorName]); // optional, only matters if backend listens for "camera"
  };

  const handleStop = () => {
    stopSensor(sensorName); 
  };

  const sensorCardProps = {
    title: 'Camera',
    icon: <MdVideocam size={20} />,
    onStart: handleStart,
    onStop: handleStop,
    isConnected: isConnected,
    lastUpdated: lastUpdated,
  };

  return (
    <SensorCard {...sensorCardProps}>
      {/* Top-right dropdown, same vibe as other cards */}
      <div className="absolute top-4 right-4">
        <Dropdown
          label={viewMode}
          className="font-bold flex items-center text-sm border border-gray-300 rounded"
        >
          <DropdownItem onClick={() => setViewMode('Live')}>Live</DropdownItem>
          <DropdownItem onClick={() => setViewMode('Info')}>Info</DropdownItem>
        </Dropdown>
      </div>

      <div className="flex flex-col w-full h-full relative pt-12">
        {viewMode === 'Live' ? (
          <div className="flex-1 flex items-center justify-center">
            <iframe
              src={STREAM_URL}
              className="w-full h-full rounded-lg border-0 bg-black"
              allow="autoplay; fullscreen"
              title="Camera Stream"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center text-sm text-gray-600">
            <p className="mb-2">
              This card embeds the MediaMTX WebRTC player at:
            </p>
            <p className="font-mono text-xs break-all mb-2">
              {STREAM_URL}
            </p>
            <p className="text-xs">
              If you later want tighter UI control (no surrounding MediaMTX page),
              you can switch to HLS or write a custom WebRTC client, but this is the
              simplest working setup.
            </p>
          </div>
        )}
      </div>
    </SensorCard>
  );
};

export default Camera;