var express = require('express')
var app = express()

const { Client } = require('tplink-smarthome-api');

const client = new Client();
const plug = client.getDevice({host: '192.168.0.26'}).then((device)=>{
  device.getSysInfo().then(console.log);
  device.setPowerState(false);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function () {
  console.log('Home app listening on port 3000!')
})
