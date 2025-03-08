from flask_socketio import SocketIO,emit
import random
import time

class Simulator():
    
    def __init__(self, socketio):
        """
        Initialize the simulator for generating the sensor data
        """
        self.delay = 0.5
        self.socketio = socketio

    def generate_color_sensor(self):
        """
        Generate color sensor data
        """
        start_time = time.time()
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            r = random.randint(0, 255)
            g = random.randint(0, 255)
            b = random.randint(0, 255)
            
            print(f"\"Color Sensor Data\", \"{r}, {g}, {b}\"")
            self.socketio.emit('data_update', {'value': f"\"Color Sensor Data\", \"{r}, {g}, {b}\""})
            
            self.socketio.sleep(self.delay)
        
            
    def generate_accelerometer(self):
        """
        Generate accelerometer data
        """
        start_time = time.time()
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            x = random.uniform(-100, 100) # Assume the range is -100 to 100
            y = random.uniform(-100, 100)
            z = random.uniform(-100, 100)
            
            print(f"\"Accelerometer Data\", \"{x}, {y}, {z}\"")
            self.socketio.emit('data_update', {'value': f"\"Accelerometer Data\", \"{x}, {y}, {z}\""})

            self.socketio.sleep(self.delay)
            

    def generate_gyroscope(self):
        """
        Generate gyroscope data
        """
        start_time = time.time()
        
        pitch = 0
        roll = 0
        yaw = 0
        
        milliseconds = int(round(time.time() * 1000))
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            
            dt = int(round(time.time() * 1000)) - milliseconds
            milliseconds = int(round(time.time() * 1000))
            
            pitch += dt * random.uniform(-100, 100) / 1000
            roll += dt * random.uniform(-100, 100) / 1000
            yaw += dt * random.uniform(-100, 100) / 1000
            
            print(f"\"Gyroscope Data\", \"{pitch}, {roll}, {yaw}\"")
            self.socketio.emit('data_update', {'value': f"\"Gyroscope Data\", \"{pitch}, {roll}, {yaw}\""})
            
            self.socketio.sleep(self.delay)
            

    def generate_temperature(self):
        """
        Generate temperature data
        """
        start_time = time.time()
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            
            temperature = random.uniform(-40, 125) # In celcius
            
            print(f"\"Temperature Data\", \"{temperature}\"")
            self.socketio.emit('data_update', {'value': f"\"Temperature Data\", \"{temperature}\""})
            
            self.socketio.sleep(self.delay)
            

    def generate_LED(self):
        """
        Generate LED data
        """
        start_time = time.time()
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            led = random.randint(0, 1)
            
            print(f"\"LED Data\", \"{led}\"")
            self.socketio.emit('data_update', {'value': f"\"LED Data\", \"{led}\""})
            
            self.socketio.sleep(self.delay)
            

    def generate_servo(self):
        """
        Generate servo data
        """
        start_time = time.time()
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            
            angle = random.uniform(0, 200)
            
            print(f"\"Servo Data\", \"{angle}\"")
            self.socketio.emit('data_update', {'value': f"\"Servo Data\", \"{angle}\""})
            
            self.socketio.sleep(self.delay)
            
            
    def generate_motor(self):
        """
        Generate motor data
        """
        start_time = time.time()
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            
            speed = random.uniform(0, 100)
            position = random.uniform(-100, 100)
            count = int(position)
            
            print(f"\"Motor Data\", \"{speed}, {position}, {count}\"")
            self.socketio.emit('data_update', {'value': f"\"Motor Data\", \"{speed}, {position}, {count}\""})
            
            self.socketio.sleep(self.delay)
            

    def generate_rangefinder(self):
        """
        Generate rangefinder data
        """
        start_time = time.time()
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            distance = random.uniform(2, 400) # in cm
            
            print(f"\"Rangefinder Data\", \"{distance}\"")
            self.socketio.emit('data_update', {'value': f"\"Rangefinder Data\", \"{distance}\""})
            
            self.socketio.sleep(self.delay)