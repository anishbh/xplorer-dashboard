import React, { useEffect, useRef, useState } from "react";
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
import { FaGlobe, FaTemperatureHigh, FaTrash } from 'react-icons/fa';
import { GiElectric, GiPositionMarker } from 'react-icons/gi';
import { BsRulers } from 'react-icons/bs';

import {
  GridStackProvider,
  GridStackRender,
  GridStackRenderProvider,
  useGridStackContext,
} from "../lib";
import "gridstack/dist/gridstack.css";
import "../assets/gridstack.css";
import { GridStackOptions } from "gridstack";

const COMPONENT_MAP = {
  ColorSensor,
  Accelerometer,
  Gyroscope,
  LED,
  Servo,
  Temperature,
  Rangefinder,
  Motor,
};

const CELL_HEIGHT = 50;
const BREAKPOINTS = [
  { c: 1, w: 700 },
  { c: 3, w: 850 },
  { c: 6, w: 950 },
  { c: 8, w: 1100 },
];

const gridOptions: GridStackOptions = {
  acceptWidgets: true,
  cellHeight: CELL_HEIGHT,
  removable: '#trash',
  columnOpts: {
    breakpointForWindow: true,
    breakpoints: BREAKPOINTS,
    layout: "moveScale",
    columnMax: 12,
  },
  margin: 3,
  draggable: {
    // handle: '.grid-stack-item-content', // Drag handle
    scroll: true,                  // Allow scrolling while dragging
    // containment: 'parent'          // Constrains dragging to parent container
  },
  float: true,
  children: [
    // {
    //   id: "accelerometer",
    //   h: 4,
    //   w: 4,
    //   x: 0,
    //   y: 2,
    //   content: JSON.stringify({
    //     name: "Accelerometer",
    //     props: {
    //       isActive: true
    //     },
    //   }),
    // },
    // {
    //   id: "gyroscope",
    //   h: 4,
    //   w: 4,
    //   x: 4,
    //   y: 0,
    //   content: JSON.stringify({
    //     name: "Gyroscope",
    //     props: {
    //       isActive: false,
    //     },
    //   }),
    // },
    // {
    //   id: "colorsensor",
    //   h: 4,
    //   w: 4,
    //   x: 8,
    //   y: 0,
    //   content: JSON.stringify({
    //     name: "ColorSensor",
    //     props: {
    //       isActive: false
    //     },
    //   }),
    // },
    // {
    //   id: "led",
    //   h: 4,
    //   w: 4,
    //   x: 0,
    //   y: 0,
    //   content: JSON.stringify({
    //     name: "LED",
    //     props: {
    //       isActive: false
    //     },
    //   }),
    // },
    // {
    //   id: "motor",
    //   h: 4,
    //   w: 4,
    //   x: 0,
    //   y: 0,
    //   content: JSON.stringify({
    //     name: "Motor",
    //     props: {
    //       isActive: false
    //     },
    //   }),
    // },
    // {
    //   id: "temperature",
    //   h: 4,
    //   w: 4,
    //   x: 8,
    //   y: 0,
    //   content: JSON.stringify({
    //     name: "Temperature",
    //     props: {
    //       isActive: false
    //     },
    //   }),
    // },
    // {
    //   id: "rangefinder",
    //   h: 4,
    //   w: 4,
    //   x: 0,
    //   y: 0,
    //   content: JSON.stringify({
    //     name: "Rangefinder",
    //     props: {
    //       isActive: false
    //     },
    //   }),
    // },
    // {
    //   id: "servo",
    //   h: 4,
    //   w: 4,
    //   x: 2,
    //   y: 0,
    //   content: JSON.stringify({
    //     name: "Servo",
    //     props: {
    //       isActive: false
    //     },
    //   }),
    // },


  ],
};

type ActionType = 'accelerometer' | 'color' | 'gyroscope' | 'led' | 'motor' | 'servo' | 'temperature' | 'rangefinder';

const SensorDashboard: React.FC = () => {
  const { isConnected, startDataStreaming, stopDataStreaming } = useSensorData();
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const gridStackRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<any>(null);

  // Stop all sensors at once
  const stopAllSensors = () => {
    setIsStreaming(false);
    stopDataStreaming();
  };

  const handleStart = () => {
    if (!isStreaming) {
      startDataStreaming();
      setIsStreaming(true);
      console.log('Start');
    }
  };

  useEffect(() => {
    // Short delay to ensure grid is fully initialized
    const timer = setTimeout(() => {
      if (gridStackRef.current) {
        // In GridStack, once initialized, there's a gridstack property on the element
        // or you can use GridStack.getGridElement(gridStackRef.current)
        const gridElement = gridStackRef.current.querySelector('.grid-stack');
        if (gridElement && (gridElement as any).gridstack) {
          gridInstanceRef.current = (gridElement as any).gridstack;
          console.log('Grid initialized:', gridInstanceRef.current);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto px-4 pb-10 bg-slate-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sensor Dashboard</h1>
        </div>
        <div id="trash">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded h-32 w-32 flex items-center justify-center"
            aria-label="Delete"
          >
            <FaTrash size={72} />
          </button>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleStart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{isStreaming ? 'Started' : 'Start'}</button>
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
      <div ref={gridStackRef}>
        <GridStackProvider initialOptions={gridOptions}>
          <AddWidgets />
          <GridStackRenderProvider>
            <GridStackRender componentMap={COMPONENT_MAP} />
          </GridStackRenderProvider>
        </GridStackProvider>
      </div >
    </div >
  );
};

function AddWidgets() {
  const { addWidget } = useGridStackContext();

  const handleAction = (action: ActionType) => {
    // if (!gridInstanceRef.current) {
    //   console.error('Grid not initialized');
    //   return;
    // }

    switch (action) {
      case 'accelerometer': {
        const node = () => ({
          id: `accelerometer-${Date.now()}`, // Add unique ID
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
        });
        // gridInstanceRef.current.addWidget(node);
        addWidget(node);
        console.log('Accelerometer action triggered');
        break;
      }
      case 'color':
        {
          const node = () => ({
            id: `color-${Date.now()}`, // Add unique ID
            h: 4,
            w: 4,
            x: 0,
            y: 2,
            content: JSON.stringify({
              name: "ColorSensor",
              props: {
                isActive: true
              },
            }),
          });
          addWidget(node);
          console.log('Color sensor action triggered');
          break;
        }
      case 'gyroscope':
        {
          const node = () => ({
            id: `gyroscope-${Date.now()}`, // Add unique ID
            h: 4,
            w: 4,
            x: 0,
            y: 2,
            content: JSON.stringify({
              name: "Gyroscope",
              props: {
                isActive: true
              },
            }),
          });
          addWidget(node);
          console.log('Gyroscope action triggered');
          break;
        }
      case 'led':
        {
          const node = () => ({
            id: `led-${Date.now()}`, // Add unique ID
            h: 4,
            w: 4,
            x: 0,
            y: 2,
            content: JSON.stringify({
              name: "LED",
              props: {
                isActive: true
              },
            }),
          });
          addWidget(node);
          console.log('LED action triggered');
          break;
        }
      case 'motor':
        {
          const node = () => ({
            id: `motor-${Date.now()}`, // Add unique ID
            h: 4,
            w: 4,
            x: 0,
            y: 2,
            content: JSON.stringify({
              name: "Motor",
              props: {
                isActive: true
              },
            }),
          });
          addWidget(node);
          console.log('Motor action triggered');
          break;
        }
      case 'servo':
        {
          const node = () => ({
            id: `servo-${Date.now()}`, // Add unique ID
            h: 4,
            w: 4,
            x: 0,
            y: 2,
            content: JSON.stringify({
              name: "Servo",
              props: {
                isActive: true
              },
            }),
          });
          addWidget(node);
          console.log('Servo action triggered');
          break;
        }
      case 'temperature':
        {
          const node = () => ({
            id: `temperature-${Date.now()}`, // Add unique ID
            h: 4,
            w: 4,
            x: 0,
            y: 2,
            content: JSON.stringify({
              name: "Temperature",
              props: {
                isActive: true
              },
            }),
          });
          addWidget(node);
          console.log('Temperature action triggered');
          break;
        }
      case 'rangefinder':
        {
          const node = () => ({
            id: `rangefinder-${Date.now()}`, // Add unique ID
            h: 4,
            w: 4,
            x: 0,
            y: 2,
            content: JSON.stringify({
              name: "Rangefinder",
              props: {
                isActive: true
              },
            }),
          });
          addWidget(node);
          console.log('Rangefinder action triggered');
          break;
        }
    }
  };


  return (
    <div className="flex items-center gap-100 mt-4 sm:mt-0">
      <Dropdown label="Add New Component" className="font-bold flex items-center gap-2 mt-4 sm:mt-0">
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
  );
}


export default SensorDashboard;