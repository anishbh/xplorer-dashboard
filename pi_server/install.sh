#!/bin/bash
set -e

echo "=== Setting up Pi server environment ==="

# Move to the directory this script is in (pi_server)
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$BASE_DIR"

echo "Base directory: $BASE_DIR"

echo
echo "=== Installing system packages (apt) ==="
sudo apt update
sudo apt install -y python3-venv python3-picamera2

echo
echo "=== Creating Python virtual environment (with system site packages) ==="
# We use --system-site-packages so venv can see python3-picamera2
if [ -d "venv" ]; then
  echo "venv already exists, skipping creation."
else
  python3 -m venv --system-site-packages venv
  echo "venv created at $BASE_DIR/venv"
fi

echo
echo "=== Activating venv and installing Python dependencies ==="
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Shared dependencies for both sensor_server.py and camera_server.py
pip install \
  flask \
  flask-cors \
  flask-socketio \
  eventlet \
  opencv-python-headless

echo
echo "=== Done! ==="
echo "Virtualenv: $BASE_DIR/venv"
echo
echo "To run your servers:"
echo "  cd $BASE_DIR"
echo "  source venv/bin/activate"
echo "  python3 run_server.py"
echo
echo "Sensor server: http://<pi-ip>:5001"
echo "Camera stream: http://<pi-ip>:5002/video_feed"