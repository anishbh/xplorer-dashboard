import time
import random
from threading import Event
from typing import Callable, Dict, List, Union

from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

# pip install eventlet flask flask-cors flask-socketio

def read_temperature_c() -> float:
    """Return a single float value for temperature in Celsius."""
    return 25.0 + random.uniform(-0.5, 0.5)


SensorReader = Callable[[], Union[float, int, List[Union[float, int]], tuple]]

SENSORS: Dict[str, Dict[str, Union[str, SensorReader]]] = {
    "temperature": {
        "label": "Temperature Data",
        "reader": read_temperature_c,
    }
}

DEFAULT_STREAM_SENSORS: List[str] = ["temperature"]

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

stream_stop = Event()
stream_thread = None
streaming = False


def _ensure_list(values: Union[float, int, List[Union[float, int]], tuple]) -> List[Union[float, int]]:
    if isinstance(values, (list, tuple)):
        return list(values)
    return [values]


def make_payload(sensor_key: str) -> dict:
    cfg = SENSORS[sensor_key]
    label: str = cfg["label"]
    reader: SensorReader = cfg["reader"]

    raw_values = _ensure_list(reader())
    formatted_values = []
    for v in raw_values:
      if isinstance(v, float):
          formatted_values.append(f"{v:.2f}")
      else:
          formatted_values.append(str(v))

    values_str = ", ".join(formatted_values)

    return {
        "value": f"\"{label}\", \"{values_str}\""
    }


def stream_sensors_forever(sensor_keys: List[str]):
    global streaming
    print(f"Background stream started for sensors: {sensor_keys}")
    while not stream_stop.is_set():
        for key in sensor_keys:
            if key in SENSORS:
                payload = make_payload(key)
                socketio.emit("data_update", payload)
        socketio.sleep(1.0)
    streaming = False
    print("Background stream loop exited")


@socketio.on("connect")
def on_connect():
    print("Client connected")


@socketio.on("disconnect")
def on_disconnect():
    print("Client disconnected")


@socketio.on("send_data")
def on_send_data(payload):
    try:
        sensors = (payload or {}).get("data", [])
    except Exception:
        sensors = []
    if not isinstance(sensors, list):
        sensors = []

    requested = [s.lower() for s in sensors]

    for sensor_key in requested:
        if sensor_key in SENSORS:
            out = make_payload(sensor_key)
            emit("data_update", out)
        else:
            print(f"Unknown sensor requested: {sensor_key}")


@socketio.on("start_data")
def on_start_data():
    global stream_thread, streaming

    if streaming:
        print("start_data called, but already streaming")
        return

    print("Starting streaming")
    stream_stop.clear()
    streaming = True
    stream_thread = socketio.start_background_task(
        stream_sensors_forever,
        DEFAULT_STREAM_SENSORS.copy(),
    )


@socketio.on("stop_data")
def on_stop_data():
    global streaming
    if not streaming:
        print("stop_data called, but not currently streaming")
        return

    print("Stopping streaming")
    stream_stop.set()


if __name__ == "__main__":
    print("Sensor server on 0.0.0.0:5001")
    socketio.run(app, host="0.0.0.0", port=5001)