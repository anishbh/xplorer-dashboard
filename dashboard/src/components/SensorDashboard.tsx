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
import Camera from "./sensors/Camera";
import GridPersistence from "./GridPersistence";
import AddWidgets from "./AddWidget";
import { STORAGE_KEY, CELL_HEIGHT, BREAKPOINTS } from "../utils/constants";
import logoImg from "../assets/images/logo.png";


import {
  GridStackProvider,
  GridStackRender,
  GridStackRenderProvider,
} from "../lib";
import "gridstack/dist/gridstack.css";
import "../assets/gridstack.css";
import { GridStackOptions } from "gridstack";
import { FaTrash, FaTh,} from "react-icons/fa";

const COMPONENT_MAP = {
  ColorSensor,
  Accelerometer,
  Gyroscope,
  LED,
  Servo,
  Temperature,
  Rangefinder,
  Motor,
  Camera
};

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

const SensorDashboard: React.FC = () => {
  const { isConnected, startDataStreaming, stopDataStreaming } = useSensorData();
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const gridStackRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Stop all sensors at once
  const stopAllSensors = () => {
    setIsStreaming(false);
    stopDataStreaming();
    console.log('sensors stopped');
  };


  const getIntitialOptions = () => {
    const layout = localStorage.getItem(STORAGE_KEY);
    if (layout) {
      return JSON.parse(layout);
    }
    return gridOptions;
  };

  const handleStart = () => {
    if (!isStreaming) {
      startDataStreaming();
      setIsStreaming(true);
      console.log('Start');
    }
  };

  // Organize widgets in a grid layout
  const organizeWidgets = () => {
    if (!gridInstanceRef.current) {
      console.warn('Grid instance not available');
      return;
      // console.log('trying to organize');
    }
    const grid = gridInstanceRef.current;
    
    const widgets = grid.getGridItems(); // trouble!
    
    if (widgets.length === 0) return;

    const maxColumns = 12;
    let currentX = 0;
    let currentY = 0;
    let maxHeightInRow = 1;

    // Sort widgets by their current position to maintain some order
    const sortedWidgets = [...widgets].sort((a, b) => {
      const aY = parseInt(a.getAttribute('gs-y') || '0');
      const bY = parseInt(b.getAttribute('gs-y') || '0');
      const aX = parseInt(a.getAttribute('gs-x') || '0');
      const bX = parseInt(b.getAttribute('gs-x') || '0');
      return aY - bY || aX - bX;
    });

    // Batch update to prevent multiple re-renders
    grid.batchUpdate();

    sortedWidgets.forEach((widget) => {
      const width = parseInt(widget.getAttribute('gs-w') || '4');
      const height = parseInt(widget.getAttribute('gs-h') || '4');

      // Check if widget fits in current row
      if (currentX + width > maxColumns) {
        // Move to next row
        currentX = 0;
        currentY += maxHeightInRow;
        maxHeightInRow = height;
      } else {
        // Update max height in current row
        maxHeightInRow = Math.max(maxHeightInRow, height);
      }

      // Update widget position
      grid.update(widget, {
        x: currentX,
        y: currentY
      });

      // Move to next position in row
      currentX += width;
    });

    // Commit all changes
    grid.commit();
    
    console.log('Widgets organized in grid layout');
  };

  const sendCommand = async (cmd: string) => {
    try {
      await fetch("http://localhost:5001/drive", {  // replace with your Mac IP
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmd }),
      });
    } catch (err) {
      console.error("Failed to send command:", err);
    }
  };

  useEffect(() => {
    // Short delay to ensure grid is fully initialized
    const timer = setTimeout(() => {
      if (gridStackRef.current) {
        // In GridStack, once initialized, there's a gridstack property on the element
        // or you can use GridStack.getGridElement(gridStackRef.current)
        const gridElement = gridStackRef.current.querySelector('.grid-stack');
        if (gridElement && (gridElement as any).gridstack) { // eslint-disable-line @typescript-eslint/no-explicit-any
          gridInstanceRef.current = (gridElement as any).gridstack; // eslint-disable-line @typescript-eslint/no-explicit-any
          console.log('Grid initialized:', gridInstanceRef.current);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isConnected, isStreaming, startDataStreaming, stopDataStreaming, setIsStreaming]);

  // useEffect(() => {
  //   if (gridStackRef.current) {
  //     const gridElement = gridStackRef.current.querySelector('.grid-stack');
  //     if (gridElement && (gridElement as any).gridstack) {
  //       gridInstanceRef.current = (gridElement as any).gridstack;
  //     }
  //   }
  // }, [isConnected, isStreaming]);

  return (
    <div className="mx-auto px-4 pb-10 bg-slate-100 min-h-screen">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pt-4">
      <div className="flex">
        <img src={logoImg} alt="logo" className="w-10 h-10" />
        <h1 className="text-4xl font-bold text-gray-900">Sensor Dashboard Xplorer</h1>
      </div>
  
      <div className="mt-4 sm:mt-0 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleStart}
            className="bg-blue-500 hover:bg-blue-700 border-4 border-blue-700 text-white font-bold py-2 px-4 rounded">
              {isStreaming ? 'Started' : 'Start'}
            </button>
          <button
            onClick={stopAllSensors}
            className="bg-red-500 hover:bg-red-700 border-4 border-red-700 text-white font-bold py-2 px-4 rounded">Stop All</button>
          {/* New Organize Button */}
          <button
            onClick={organizeWidgets}
            className="bg-green-500 hover:bg-green-700 border-4 border-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
            <FaTh />Organize</button>
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    </div>
    
      {/* Compact Car Controls */}
    <div className="fixed left-1/5 transform -translate-x-1/2 top-20 z-10">
      <div className="bg-gray-800 p-3 rounded-2xl shadow-xl border-2 border-gray-600">
        <div className="flex items-center gap-1">
          <div className="grid grid-cols-3 gap-1">
            <div></div>
            <button
              onClick={() => sendCommand("w")}
              className="bg-gray-700 hover:bg-gray-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-sm"
            >
              ↑
            </button>
            <div></div>
            
            <button
              onClick={() => sendCommand("a")}
              className="bg-gray-700 hover:bg-gray-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-sm"
            >
              ←
            </button>
            <button
              onClick={() => sendCommand("1")}
              className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
            >
              ●
            </button>
            <button
              onClick={() => sendCommand("d")}
              className="bg-gray-700 hover:bg-gray-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-sm"
            >
              →
            </button>
            
            <div></div>
            <button
              onClick={() => sendCommand("s")}
              className="bg-gray-700 hover:bg-gray-600 text-white w-12 h-12 rounded-lg flex items-center justify-center text-sm"
            >
              ↓
            </button>
            <div></div>
          </div>
        </div>
        
        {/* Ballast Controls */}
        <div className="mt-3 grid grid-cols-3 gap-1">
          <button
            onClick={() => sendCommand("0")}
            className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-8 rounded text-xs"
          >
            Sink
          </button>
          <button
            onClick={() => sendCommand("3")}
            className="bg-green-500 hover:bg-green-600 text-white w-12 h-8 rounded text-xs"
          >
            Hover
          </button>
          <button
            onClick={() => sendCommand("2")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white w-12 h-8 rounded text-xs"
          >
            Float
          </button>
        </div>
      </div>
    </div>

  
    <div id="trash">
      <button
        className="bg-red-500 hover:bg-red-700 border-4 border-red-700 text-white font-bold py-2 px-2 right-4 rounded h-32 w-71 flex items-center justify-center absolute"
        aria-label="Delete"
      >
        <FaTrash size={72} />
      </button>
    </div>
    
    <div ref={gridStackRef}>
      <GridStackProvider initialOptions={getIntitialOptions()}>
        <AddWidgets />
        <GridPersistence />
        <div className="relative top-35 border-t-4 border-gray-300"> {/* Reduced top spacing */}
          <GridStackRenderProvider>
            <GridStackRender componentMap={COMPONENT_MAP} />
          </GridStackRenderProvider>
        </div>
      </GridStackProvider>
    </div>
  </div>
  );
};




export default SensorDashboard;
