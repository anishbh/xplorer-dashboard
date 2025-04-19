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

const SensorDashboard = () => {
  const { isConnected, error } = useSensorData();

  return (
    <div className="mx-auto px-4 pb-10 bg-slate-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sensor Dashboard</h1>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-2">
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
      
      <GridStackProvider initialOptions={gridOptions}>
        <GridStackRenderProvider>
          <GridStackRender componentMap={COMPONENT_MAP} />
        </GridStackRenderProvider>
      </GridStackProvider>
    </div>
  );
};

export default SensorDashboard;