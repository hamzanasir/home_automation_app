var express = require('express')
var app = express()

const { Client } = require('tplink-smarthome-api');
const client = new Client();
const plugHost = ['192.168.0.26', '192.168.0.27'];

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/plugs/:plug', function (req, res) {
  const plug = client.getDevice({host: plugHost[parseInt(req.params.plug) - 1]})
    .then((device) => {
        device.getSysInfo()
          .then((info) => {
            return info.on_time
          })
          .then((time) => {
            device.getPowerState()
              .then((powerState) => {
                device.setPowerState(!powerState);
                res.send({ powerState, time });
              })
          })
          .catch((err) => {
            res.send(err)
          })
    })
    .catch((err) => {
      res.send(err)
    })
});

app.listen(3000, '0.0.0.0', function () {
  console.log('Home app listening on port 3000!')
})
