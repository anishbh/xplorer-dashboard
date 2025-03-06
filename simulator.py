import argparse
import random
import time

delay = 0.05 # Delay for 50ms

def generate_color_sensor():
    """
    Generate color sensor data
    """
    
    while True:
        r = random.randint(0, 255)
        g = random.randint(0, 255)
        b = random.randint(0, 255)
        
        print(f"\"Color Sensor Data\", \"{r}, {g}, {b}\"")
        
        time.sleep(delay)
    
        
def generate_accelerometer():
    """
    Generate accelerometer data
    """
    
    while True:
        x = random.uniform(-100, 100) # Assume the range is -100 to 100
        y = random.uniform(-100, 100)
        z = random.uniform(-100, 100)
        
        print(f"\"Accelerometer Data\", \"{x}, {y}, {z}\"")
        
        time.sleep(delay)
        

def generate_gyroscope():
    """
    Generate gyroscope data
    """
    
    pitch = 0
    roll = 0
    yaw = 0
    
    milliseconds = int(round(time.time() * 1000))
    
    while True:
        dt = int(round(time.time() * 1000)) - milliseconds
        milliseconds = int(round(time.time() * 1000))
        
        pitch += dt * random.uniform(-100, 100) / 1000
        roll += dt * random.uniform(-100, 100) / 1000
        yaw += dt * random.uniform(-100, 100) / 1000
        
        print(f"\"Gyroscope Data\", \"{pitch}, {roll}, {yaw}\"")
        
        time.sleep(delay)
        

def generate_temperature():
    """
    Generate temperature data
    """
    
    while True:
        temperature = random.uniform(-40, 125) # In celcius
        
        print(f"\"Temperature Data\", \"{temperature}\"")
        
        time.sleep(delay)
        

def generate_LED():
    """
    Generate LED data
    """
    
    while True:
        led = random.randint(0, 1)
        
        print(f"\"LED Data\", \"{led}\"")
        
        time.sleep(delay)
        

def generate_servo():
    """
    Generate servo data
    """
    
    while True:
        angle = random.uniform(0, 200)
        
        print(f"\"Servo Data\", \"{angle}\"")
        
        time.sleep(delay)
        
        
def generate_motor():
    """
    Generate motor data
    """
    
    while True:
        speed = random.uniform(0, 100)
        position = random.uniform(-100, 100)
        count = int(position)
        
        print(f"\"Motor Data\", \"{speed}, {position}, {count}\"")
        
        time.sleep(delay)
        

def generate_rangefinder():
    """
    Generate rangefinder data
    """
    
    while True:
        distance = random.uniform(2, 400) # in cm
        
        print(f"\"Rangefinder Data\", \"{distance}\"")
        
        time.sleep(delay)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    arguments = ["colorsensor", "accelerometer", "gyroscope", "temperature", "led", "servo", "motor", "rangefinder"]
    
    for arg in arguments:
        parser.add_argument(f"--{arg}", action="store_true", help=f"Generate {arg} data")
    
    args = parser.parse_args()
    
    if args.colorsensor:
        generate_color_sensor()
    elif args.accelerometer:
        generate_accelerometer()
    elif args.gyroscope:
        generate_gyroscope()
    elif args.temperature:
        generate_temperature()
    elif args.led:
        generate_LED()
    elif args.servo:
        generate_servo()
    elif args.motor:
        generate_motor()
    elif args.rangefinder:
        generate_rangefinder()
    else:
        print("Please provide a valid argument")
