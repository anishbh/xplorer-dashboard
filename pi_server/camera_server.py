from flask import Flask, Response
from flask_cors import CORS

from picamera2 import Picamera2
import cv2

# sudo apt install python3-picamera2
# pip install flask flask-cors opencv-python

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

picam2 = Picamera2()
config = picam2.create_video_configuration(main={"size": (640, 480)})
picam2.configure(config)
picam2.start()


def generate_frames():
    while True:
        frame = picam2.capture_array()
        ret, buffer = cv2.imencode(".jpg", frame)
        if not ret:
            continue
        frame_bytes = buffer.tobytes()
        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
        )


@app.route("/")
def index():
    return """
    <html>
      <head><title>Pi Camera Stream</title></head>
      <body>
        <h1>Pi Camera Stream</h1>
        <img src="/video_feed" />
      </body>
    </html>
    """


@app.route("/video_feed")
def video_feed():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame",
    )


if __name__ == "__main__":
    print("Camera server on 0.0.0.0:5002")
    app.run(host="0.0.0.0", port=5002, debug=False, threaded=True)