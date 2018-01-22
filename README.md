# Personal Home Automation App
Personal Home Automation web application that allows control of lights and displays home temperature and humidity levels inside home.

![Image of Home Web Interface](/static/home_webinterface.PNG)

## Public API

This application uses a RESTful API to interact with the devices configured inside.

### Room Temperature and Humidity

Make an HTTP GET request to this URL.

`http://home.hamzanasir.com:3000/sensor`

This returns a JSON in the format

`{
   "temperature":"21.0°C",
   "humidity":"37.7%"
 }`

### Plug State

You can see the status of my lights via this GET request!

`http://home.hamzanasir.com:3000/plugs/{plug}`

You can use plug 1 or 2 for this to work. You'll get something like this in return.

`{
    "powerState": 0,
    "time": 0
 }`
