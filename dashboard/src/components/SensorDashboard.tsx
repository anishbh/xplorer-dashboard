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
import GridPersistence from "./GridPersistence";
import AddWidgets from "./AddWidget";
import { STORAGE_KEY, CELL_HEIGHT, BREAKPOINTS } from "../utils/constants";
import { FaTrash } from 'react-icons/fa';


import {
  GridStackProvider,
  GridStackRender,
  GridStackRenderProvider,
} from "../lib";
import "gridstack/dist/gridstack.css";
import "../assets/gridstack.css";
import { GridStackOptions, GridStack } from "gridstack";

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

const gridOptions: GridStackOptions = {
  acceptWidgets: true,
  cellHeight: CELL_HEIGHT,
  removable: "#trash",
  columnOpts: {
    breakpointForWindow: true,
    breakpoints: BREAKPOINTS,
    layout: "moveScale",
    columnMax: 12,
  },
  margin: 3,
  draggable: {
    // handle: '.grid-stack-item-content', // Drag handle
    scroll: true, // Allow scrolling while dragging
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

const getIntitialOptions = () => {
  const layout = localStorage.getItem(STORAGE_KEY);
  if (layout) {
    return JSON.parse(layout);
  }
  return gridOptions;
};

const SensorDashboard: React.FC = () => {
  const { isConnected, startDataStreaming, stopDataStreaming } =
    useSensorData();
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const gridStackRef = useRef<HTMLDivElement>(null);
  const gridInstanceRef = useRef<GridStack | null>(null);

  // Stop all sensors at once
  const stopAllSensors = () => {
    setIsStreaming(false);
    stopDataStreaming();
  };

  const handleStart = () => {
    if (!isStreaming) {
      startDataStreaming();
      setIsStreaming(true);
      console.log("Start");
    }
  };

  const resetLayout = () => {
    if (gridInstanceRef.current) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  useEffect(() => {
    // Short delay to ensure grid is fully initialized
    const timer = setTimeout(() => {
      if (gridStackRef.current) {
        // In GridStack, once initialized, there's a gridstack property on the element
        // or you can use GridStack.getGridElement(gridStackRef.current)
        const gridElement = gridStackRef.current.querySelector(".grid-stack");
        if (gridElement && "gridstack" in gridElement) {
          gridInstanceRef.current = (
            gridElement as unknown as { gridstack: GridStack }
          ).gridstack;
          console.log("Grid initialized:", gridInstanceRef.current);
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
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Stop All
            </button>
            <button
              onClick={resetLayout}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset Layout
            </button>
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>
      <div ref={gridStackRef}>
        <GridStackProvider initialOptions={getIntitialOptions()}>
          <AddWidgets />
          <GridPersistence />
          <GridStackRenderProvider>
            <GridStackRender componentMap={COMPONENT_MAP} />
          </GridStackRenderProvider>
        </GridStackProvider>
      </div>
    </div>
  );
};

export default SensorDashboard;
