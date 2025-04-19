import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import useSensorData from "../hooks/useSensorData";
import ColorSensor from "./sensors/ColorSensor";
import Accelerometer from "./sensors/Accelerometer";
import Gyroscope from "./sensors/Gyroscope";
import Temperature from "./sensors/Temperature";
import LED from "./sensors/LED";
import Servo from "./sensors/Servo";
import Motor from "./sensors/Motor";
import Rangefinder from "./sensors/Rangefinder";
import { Dropdown, DropdownItem } from "flowbite-react";
import { MdSpeed, MdColorLens, MdLightbulb } from 'react-icons/md';
import { FaGlobe, FaTemperatureHigh } from 'react-icons/fa';
import { GiElectric, GiPositionMarker } from 'react-icons/gi';
import { BsRulers } from 'react-icons/bs';

import {
  GridStackProvider,
  GridStackRender,
  GridStackRenderProvider,
} from "../lib";
import "gridstack/dist/gridstack.css";
import "../assets/gridstack.css";

const COMPONENT_MAP = {
  ColorSensor,
  Accelerometer,
  Gyroscope,
  LED
};

const gridOptions = {
  acceptWidgets: true,
  margin: 3,
  cellHeight: 70,
  draggable: {
    // handle: '.grid-stack-item-content', // Drag handle
    scroll: true,                  // Allow scrolling while dragging
    containment: 'parent'          // Constrains dragging to parent container
  },
  float: true,
  children: [
    {
      id: "accelerometer",
      h: 4,
      w: 4,
      x: 0,
      y: 2,
      content: JSON.stringify({
        name: "Accelerometer",
        props: {
          isActive: true
        },
      }),
    },
    {
      id: "gyroscope",
      h: 4,
      w: 4,
      x: 4,
      y: 0,
      content: JSON.stringify({
        name: "Gyroscope",
        props: {
          isActive: false,
        },
      }),
    },
    {
      id: "colorsensor",
      h: 4,
      w: 4,
      x: 8,
      y: 0,
      content: JSON.stringify({
        name: "ColorSensor",
        props: {
          isActive: false
        },
      }),
    },
    {
      id: "led",
      h: 4,
      w: 4,
      x: 8,
      y: 4,
      content: JSON.stringify({
        name: "LED",
        props: {
          isActive: false
        },
      }),
    }
  ],
};

type ActionType = 'accelerometer' | 'color' | 'gyroscope' | 'led' | 'motor' | 'servo' | 'temperature' | 'rangefinder';

const SensorDashboard: React.FC = () => {
  const { isConnected, startDataStreaming, stopDataStreaming, } = useSensorData();


  // Stop all sensors at once
  const stopAllSensors = () => {
    stopDataStreaming();
  };

  const handleStart = () => {
    startDataStreaming();
    console.log('Start');
  };

  const handleAction = (action: ActionType) => {
    switch (action) {
      case 'accelerometer':
        console.log('Accelerometer action triggered');
        break;
      case 'color':
        console.log('Color sensor action triggered');
        break;
      case 'gyroscope':
        console.log('Gyroscope action triggered');
        break;
      case 'led':
        console.log('LED action triggered');
        break;
      case 'motor':
        console.log('Motor action triggered');
        break;
      case 'servo':
        console.log('Servo action triggered');
        break;
      case 'temperature':
        console.log('Temperature action triggered');
        break;
      case 'rangefinder':
        console.log('Rangefinder action triggered');
        break;
    }
  };


  return (
    <div className="mx-auto px-4 pb-10 bg-slate-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sensor Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Dropdown label="Add New Component">
            <DropdownItem icon={MdSpeed} onClick={() => handleAction('accelerometer')}>Accelerometer</DropdownItem>
            <DropdownItem icon={MdColorLens} onClick={() => handleAction('color')}>ColorSensor</DropdownItem>
            <DropdownItem icon={FaGlobe} onClick={() => handleAction('gyroscope')}>Gyroscope</DropdownItem>
            <DropdownItem icon={GiElectric} onClick={() => handleAction('motor')}>Motor</DropdownItem>
            <DropdownItem icon={MdLightbulb} onClick={() => handleAction('led')}>LED</DropdownItem>
            <DropdownItem icon={BsRulers} onClick={() => handleAction('rangefinder')}>Rangefinder</DropdownItem>
            <DropdownItem icon={GiPositionMarker} onClick={() => handleAction('servo')}>Servo</DropdownItem>
            <DropdownItem icon={FaTemperatureHigh} onClick={() => handleAction('temperature')}>Temperature</DropdownItem>
          </Dropdown>
        </div >
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleStart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start</button>
            <button
              onClick={stopAllSensors}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Stop All</button>
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div >

      <GridStackProvider initialOptions={gridOptions}>
        <GridStackRenderProvider>
          <GridStackRender componentMap={COMPONENT_MAP} />
        </GridStackRenderProvider>
      </GridStackProvider>
    </div >
  );
};

export default SensorDashboard;