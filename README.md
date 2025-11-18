# Xplorer Dashboard

## Pi Server (remotely on Raspberry Pi)
(assuming Pi is already connected to laptop over ethernet)
1. On your laptop, 
`ssh pi@raspberrypi.local`. Password is `minibot`. 

2. Note the IP of the Pi by doing `hostname -I`

2. Clone the pi-server branch:
```
git clone -b pi-server --single-branch https://github.com/anishbh/xplorer-dashboard.git
```
3. Run the install.sh script (might need to `chmod +x install.sh`)

4. Run the full server
`python3 run_server.py`

## Running the dashboard (locally on laptop)
1. On your own laptop, Clone the repository (main branch)
```
git clone https://github.com/anishbh/xplorer-dashboard.git
```
2. Install dependencies
```
cd dashboard
npm install
```
3. Set the correct PI_IP of Raspberry Pi in `dashboard/src/utils/constants.ts`

4. Run the server. Might have issues on chrome so use Safari / another browser
```
npm run dev
```