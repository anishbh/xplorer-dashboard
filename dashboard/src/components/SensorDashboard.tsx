import React,{ useEffect, useRef } from "react";
import ColorSensor from "./sensors/ColorSensor";
import Accelerometer from "./sensors/Accelerometer";
import Gyroscope from "./sensors/Gyroscope";
import Temperature from "./sensors/Temperature";
import LED from "./sensors/LED";
import Servo from "./sensors/Servo";
import Motor from "./sensors/Motor";
import useSensorData from "../hooks/useSensorData";
import Rangefinder from "./sensors/Rangefinder";
import { createSwapy } from "swapy";

const SensorDashboard: React.FC = () => {
  const { isConnected, error } = useSensorData();
  const dashboardRef = useRef(null);
  const swapyRef = useRef(null);

  useEffect(() => {
    if (dashboardRef.current) {
      swapyRef.current = createSwapy(dashboardRef.current, {
        autoScrollOnDrag: true,
      });

      swapyRef.current.onSwap((event) => {
        console.log('Swapped sensors:', event);
      });
      
      swapyRef.current.onSwapEnd((event) => {
        console.log('Swap ended:', event);
      });
    }

    return () => {
      if (swapyRef.current) {
        swapyRef.current.destroy();
      }
    };
  }, []);

  const reset_layout = () => {
    let hasDrag = true;

    while (hasDrag) {
      hasDrag = false;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("dragPosition") || key?.startsWith("swapyPosition")) {
          hasDrag = true;
          localStorage.removeItem(key);
          break;
        }
      }
    }

    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sensor Dashboard</h1>
          <p className="text-gray-600">
            Monitor and control your sensors in real-time
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <button
            onClick={reset_layout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
          >
            Reset Layout
          </button>
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

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div 
        ref={dashboardRef} 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {/* Color Sensor */}
        <div className="sensor-slot" data-swapy-slot="color_sensor">
          <div className="sensor-item rounded-lg shadow-md bg-white overflow-hidden" data-swapy-item="color_sensor">
            <div className="drag-handle bg-gray-100 p-2 flex justify-center" data-swapy-handle>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-4">
              <ColorSensor />
            </div>
          </div>
        </div>

        {/* Accelerometer */}
        <div className="sensor-slot" data-swapy-slot="accelerometer">
          <div className="sensor-item rounded-lg shadow-md bg-white overflow-hidden" data-swapy-item="accelerometer">
            <div className="drag-handle bg-gray-100 p-2 flex justify-center" data-swapy-handle>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-4">
              <Accelerometer />
            </div>
          </div>
        </div>

        {/* Gyroscope */}
        <div className="sensor-slot" data-swapy-slot="gyroscope">
          <div className="sensor-item rounded-lg shadow-md bg-white overflow-hidden" data-swapy-item="gyroscope">
            <div className="drag-handle bg-gray-100 p-2 flex justify-center" data-swapy-handle>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-4">
              <Gyroscope />
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="sensor-slot" data-swapy-slot="temperature">
          <div className="sensor-item rounded-lg shadow-md bg-white overflow-hidden" data-swapy-item="temperature">
            <div className="drag-handle bg-gray-100 p-2 flex justify-center" data-swapy-handle>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-4">
              <Temperature />
            </div>
          </div>
        </div>

        {/* LED */}
        <div className="sensor-slot" data-swapy-slot="LED">
          <div className="sensor-item rounded-lg shadow-md bg-white overflow-hidden" data-swapy-item="LED">
            <div className="drag-handle bg-gray-100 p-2 flex justify-center" data-swapy-handle>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-4">
              <LED />
            </div>
          </div>
        </div>

        {/* Servo */}
        <div className="sensor-slot" data-swapy-slot="Servo">
          <div className="sensor-item rounded-lg shadow-md bg-white overflow-hidden" data-swapy-item="Servo">
            <div className="drag-handle bg-gray-100 p-2 flex justify-center" data-swapy-handle>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-4">
              <Servo />
            </div>
          </div>
        </div>

        {/* Motor */}
        <div className="sensor-slot" data-swapy-slot="Motor">
          <div className="sensor-item rounded-lg shadow-md bg-white overflow-hidden" data-swapy-item="Motor">
            <div className="drag-handle bg-gray-100 p-2 flex justify-center" data-swapy-handle>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-4">
              <Motor />
            </div>
          </div>
        </div>

        {/* Rangefinder */}
        <div className="sensor-slot" data-swapy-slot="Rangefinder">
          <div className="sensor-item rounded-lg shadow-md bg-white overflow-hidden" data-swapy-item="Rangefinder">
            <div className="drag-handle bg-gray-100 p-2 flex justify-center" data-swapy-handle>
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-4">
              <Rangefinder />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-lg font-semibold mb-2">About This Dashboard</h2>
        <p className="text-gray-600">
          This dashboard connects to a Flask backend with Socket.IO at port
          5001. Each sensor runs for approximately 10 seconds after activation
          before automatically stopping. You can restart sensors as needed to
          continue receiving data.
        </p>

        <div className="mt-4 bg-blue-50 p-4 rounded-md text-blue-800 text-sm">
          <strong>Note:</strong> If you're not seeing data after clicking Start,
          ensure the Flask backend is running and accessible at the correct
          port. Check the browser console for connection issues.
        </div>
      </div>
    </div>
  );
};

export default SensorDashboard;