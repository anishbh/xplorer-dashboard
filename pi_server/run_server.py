import subprocess
import time
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SENSOR_SCRIPT = os.path.join(BASE_DIR, "sensor_server.py")
CAMERA_SCRIPT = os.path.join(BASE_DIR, "camera_server.py")

LOG_DIR = os.path.join(BASE_DIR, "server_logs")
SENSOR_LOG = os.path.join(LOG_DIR, "sensor.log")
CAMERA_LOG = os.path.join(LOG_DIR, "camera.log")


def start_process(command, log_file):
    os.makedirs(LOG_DIR, exist_ok=True)

    log_fd = open(log_file, "a")
    log_fd.write(f"\n\n---- Starting {' '.join(command)} at {time.ctime()} ----\n")
    log_fd.flush()

    print(f"Starting: {' '.join(command)}")
    print(f"Logging to: {log_file}")

    proc = subprocess.Popen(
        command,
        stdout=log_fd,
        stderr=log_fd,
        text=True,
    )

    return proc, log_fd


def main():
    print("  Starting Sensor + Camera Servers")
    print("  Base dir: ", BASE_DIR)
    print("  Logs dir: ", LOG_DIR)

    # Start sensor server (port 5001)
    sensor_proc, sensor_log = start_process(["python3", SENSOR_SCRIPT], SENSOR_LOG)
    time.sleep(1)  # small delay so logs are clearer

    # Start camera server (port 5002)
    camera_proc, camera_log = start_process(["python3", CAMERA_SCRIPT], CAMERA_LOG)

    print("\nBoth servers are running.")
    print("Press CTRL+C to stop everything.\n")

    try:
        # Keep main process alive
        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print("\nStopping servers...")

        for proc in (sensor_proc, camera_proc):
            try:
                proc.terminate()
            except Exception:
                pass

        sensor_log.close()
        camera_log.close()

        print("All servers stopped.")
        sys.exit(0)


if __name__ == "__main__":
    main()
