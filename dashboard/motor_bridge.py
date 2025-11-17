# motor_bridge.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import serial
import time

# To confirm XRP serial port, run in terminal: ls /dev/tty.usbmodem*
PORT = "/dev/tty.usbmodem101"  # <- update if needed

# Connect to XRP via USB serial
ser = serial.Serial(PORT, 115200, timeout=1)
time.sleep(2)  # give it a moment to initialize

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route("/drive", methods=["POST"])
def drive():
    data = request.get_json()
    cmd = data.get("cmd", "")
    valid = ["w", "a", "s", "d", "stop", "center", "1", "0", "2", "3"]
    
    if cmd not in valid:
        return jsonify({"error": "Invalid command"}), 400

    # Map commands to what your XRP code expects
    if cmd == "stop" or cmd == "center":
        ser.write(b"1\n")  # Stop thrusters
    else:
        ser.write((cmd + "\n").encode())
    
    print(f"Sent command: {cmd}")
    return jsonify({"status": "ok", "sent": cmd})

if __name__ == "__main__":
    print("Flask bridge running on http://0.0.0.0:5001")
    print("Thruster Commands: w, a, s, d, stop")
    print("Ballast Commands: 0 (sink), 2 (float), 3 (hover)")
    app.run(host="0.0.0.0", port=5001)