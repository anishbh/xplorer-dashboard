# Xplorer Dashboard

## Pi Server
(Pi should be connected over Ethernet to laptop.)

1. On your laptop, `ssh pi@raspberrypi.local`. Password is `minibot`. (You can also directly just use the Pi's terminal if you want)

2. Make sure to take note of the IP of the Pi by doing `hostname -I`.

2. Clone the pi-server branch and cd into pi_server:
```
> git clone -b pi-server --single-branch https://github.com/anishbh/xplorer-dashboard.git
> cd xplorer_dashboard/pi_server
```
3. Run the install.sh script (might need to `chmod +x install.sh`). Might take a bit of time to install all packages.
```
> chmod +x install.sh
> ./install.sh
```

4. Activate the venv, and then run the server. This will run the sensor server and camera server. 
```
> source venv/bin/activate
> python3 run_server.py
```

## Running the dashboard
1. In a separate terminal, clone the repository (main branch)
```
> git clone https://github.com/anishbh/xplorer-dashboard.git
> cd xplorer_dashboard
```
2. Install dependencies
```
> cd dashboard
> npm install
```
3. Make sure the correct `PI_IP` of the Raspberry Pi is set in `dashboard/src/utils/constants.ts`

4. Run the server and view in browser on `http://localhost:3000`. Might have issues on Chrome so use Safari / another browser
```
npm run dev
```

5. Camera feed should already be visible. Press "Start" to see other sensor feed.
   
6. For thruster control, make sure the XRP serial port is correct in motor_bridge.py by running
```
ls /dev/tty.usbmodem*
```

7. Connect thruster controls in a separate terminal and run
```
python3 motor_bridge.py
```
