from flask import Flask, request,jsonify
from flask_socketio import SocketIO,emit
from flask_cors import CORS
import time
import threading

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

def send_data():
    while True:
        socketio.sleep(1)
        data = time.time()
        print(f"Sending data: {data}")
        socketio.emit('data_update', {'value': data})

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    
    threading.Thread(target=send_data).start() # runs in a background thread to not block the main thread
    
@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)