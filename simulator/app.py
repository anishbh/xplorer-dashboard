from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import threading
from simulator import Simulator
import time 

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')
simulator = Simulator(socketio)

sensor_data = {
    "color_sensor": simulator.generate_color_sensor,
    "accelerometer": simulator.generate_accelerometer,
    "gyroscope": simulator.generate_gyroscope,
    "temperature": simulator.generate_temperature,
    "LED": simulator.generate_LED,
    "servo": simulator.generate_servo,
    "motor": simulator.generate_motor,
    "rangefinder": simulator.generate_rangefinder
}

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    
    
@socketio.on('send_data')    
def send_data(data):    
    data = data.get("data", [])

    print(f"Received data: {data}")
    for sensor in data:
        if sensor in sensor_data:
            print(f"Starting {sensor} sensor")
            threading.Thread(target=sensor_data[sensor], daemon=True).start()
        else:
            print(f"Sensor {sensor} not found")
            emit('data_update', {'value': f"Sensor {sensor} not found"})
       

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)