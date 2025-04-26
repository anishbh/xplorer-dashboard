from flask_socketio import SocketIO,emit
import random
import time

class Simulator():

    def clamp(n, min, max): 
        if n < min: 
            return min
        elif n > max: 
            return max
        else: 
            return n 
        
    def __init__(self, socketio):
        """
        Initialize the simulator for generating the sensor data
        """
        self.delay = 0.1
        self.socketio = socketio


    def generate_color_sensor(self, sending_data):
        """
        Generate color sensor data
        """
        start_time = time.time()
        r = random.randint(0, 255)
        g = random.randint(0, 255)
        b = random.randint(0, 255)
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            if not sending_data.is_set():
                break
            r += random.randint(-5, 5)
            g += random.randint(-5, 5)
            b += random.randint(-5, 5)
            r = Simulator.clamp(r, 0, 255)
            g = Simulator.clamp(g, 0, 255)
            b = Simulator.clamp(b, 0, 255)

            print(f"\"Color Sensor Data\", \"{r}, {g}, {b}\"")
            self.socketio.emit('data_update', {'value': f"\"Color Sensor Data\", \"{r}, {g}, {b}\""})
            
            self.socketio.sleep(self.delay)
        
            
    def generate_accelerometer(self, sending_data):
        """
        Generate accelerometer data
        """
        start_time = time.time()
        x = random.uniform(-100, 100) # Assume the range is -100 to 100
        y = random.uniform(-100, 100)
        z = random.uniform(-100, 100)
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            if not sending_data.is_set():
                break
            x += random.randint(-5, 5)
            y += random.randint(-5, 5)
            z += random.randint(-5, 5)
            x = Simulator.clamp(x, -100, 100)
            y = Simulator.clamp(y, -100, 100)
            z = Simulator.clamp(z, -100, 100)
            
            print(f"\"Accelerometer Data\", \"{x}, {y}, {z}\"")
            self.socketio.emit('data_update', {'value': f"\"Accelerometer Data\", \"{x}, {y}, {z}\""})

            self.socketio.sleep(self.delay)
            

    def generate_gyroscope(self, sending_data):
        """
        Generate gyroscope data
        """
        start_time = time.time()
        
        pitch = random.uniform(-100, 100)
        roll = random.uniform(-100, 100)
        yaw = random.uniform(-100, 100)
        
        milliseconds = int(round(time.time() * 1000))
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            if not sending_data.is_set():
                break
            dt = int(round(time.time() * 1000)) - milliseconds
            milliseconds = int(round(time.time() * 1000))
            
            pitch += dt * random.uniform(-5, 5) / 1000
            roll += dt * random.uniform(-5, 5) / 1000
            yaw += dt * random.uniform(-5, 5) / 1000
            pitch = Simulator.clamp(pitch, -100, 100)
            roll = Simulator.clamp(roll, -100, 100)
            yaw = Simulator.clamp(yaw, -100, 100)
            

            print(f"\"Gyroscope Data\", \"{pitch}, {roll}, {yaw}\"")
            self.socketio.emit('data_update', {'value': f"\"Gyroscope Data\", \"{pitch}, {roll}, {yaw}\""})
            
            self.socketio.sleep(self.delay)
            

    def generate_temperature(self, sending_data):
        """
        Generate temperature data
        """
        start_time = time.time()
        temperature = random.uniform(-40, 125)
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            if not sending_data.is_set():
                break
            temperature += random.uniform(-5, 5) # In celcius
            temperature = Simulator.clamp(temperature, -40, 125)
            
            print(f"\"Temperature Data\", \"{temperature}\"")
            self.socketio.emit('data_update', {'value': f"\"Temperature Data\", \"{temperature}\""})
            
            self.socketio.sleep(self.delay)
        self.socketio.emit('data_update', {'value': f"\"Temperature Data\", null"})
            

    def generate_LED(self, sending_data):
        """
        Generate LED data
        """
        start_time = time.time()
        
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            if not sending_data.is_set():
                break
            led = random.randint(0, 1)
            
            print(f"\"LED Data\", \"{led}\"")
            self.socketio.emit('data_update', {'value': f"\"LED Data\", \"{led}\""})
            
            self.socketio.sleep(self.delay)
            

    def generate_servo(self, sending_data):
        """
        Generate servo data
        """
        start_time = time.time()
        angle = random.uniform(0, 200)
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            if not sending_data.is_set():
                break
            angle += random.uniform(-5, 5)
            angle = Simulator.clamp(angle, 0, 200)
            
            print(f"\"Servo Data\", \"{angle}\"")
            self.socketio.emit('data_update', {'value': f"\"Servo Data\", \"{angle}\""})
            
            self.socketio.sleep(self.delay)

    def generate_number(self, name, sending_data):
        """
        Generate random number data
        """
        start_time = time.time()
        number = random.uniform(0, 100)
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            if not sending_data.is_set():
                break
            number += random.uniform(-100, 100)
            number = Simulator.clamp(number, 0, 100)
            
            print(f"\"{name}\", \"{number}\"")
            self.socketio.emit('data_update', {'value': f"\"{name}\", \"{number}\""})
            
            self.socketio.sleep(self.delay)
            
            
            
    def generate_motor(self, sending_data):
        """
        Generate motor data
        """
        start_time = time.time()
        speed = random.uniform(0, 100)
        position = random.uniform(-100, 100)
        count = int(position)
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            if not sending_data.is_set():
                break
            speed += random.uniform(-5, 5)
            position += random.uniform(-5, 5)
            
            speed = Simulator.clamp(speed, 0, 100)
            position = Simulator.clamp(position, -100, 100)
            count = int(position)
            
            print(f"\"Motor Data\", \"{speed}, {position}, {count}\"")
            self.socketio.emit('data_update', {'value': f"\"Motor Data\", \"{speed}, {position}, {count}\""})
            
            self.socketio.sleep(self.delay)
            

    def generate_rangefinder(self, sending_data):
        """
        Generate rangefinder data
        """
        start_time = time.time()
        distance = random.uniform(2, 400)
        while True:
            end_time = time.time()
            if end_time - start_time > 10:
                break
            if not sending_data.is_set():
                break
            distance += random.uniform(-5, 5) # in cm
            
            print(f"\"Rangefinder Data\", \"{distance}\"")
            self.socketio.emit('data_update', {'value': f"\"Rangefinder Data\", \"{distance}\""})
            
            self.socketio.sleep(self.delay)