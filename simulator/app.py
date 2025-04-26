from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import threading
from simulator import Simulator
import time 
import random

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')
simulator = Simulator(socketio)
sending_data = threading.Event()


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
    sending_data.set()
    print(f"Received data: {data}")
    for sensor in data:
        if sensor in sensor_data:
            print(f"Starting {sensor} sensor")
            threading.Thread(target=sensor_data[sensor], args=(sending_data,), daemon=True).start()
        else:
            print(f"Sensor {sensor} not found")
            
@socketio.on('start_data')    
def start_data():    
    print(f"Starting data generation")
    sending_data.set()
    while sending_data.is_set():
        data = ["color_sensor", "accelerometer", "gyroscope", "motor", "LED", "servo", "rangefinder", "temperature"]

        threads = []  # Create a list to store thread references

        for sensor in data:
            print(f"Starting {sensor} sensor")
            generate = threading.Thread(target=sensor_data[sensor], args=(sending_data,), daemon=True)
            generate.start()
            threads.append(generate)  # Store the thread reference
        
        # Join all threads
        for thread in threads:
            thread.join()  # Wait for each thread to complete
        socketio.sleep(1)

@socketio.on('stop_data')
def stop_data():
    print(f"Stopping data generation")
    # Clear the event flag to signal the loop to stop
    sending_data.clear()
    # Emit a message to clients that data streaming has stopped
    emit('data_update', {'value': 'Data streaming stopped'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)