require('dotenv').load();
var express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
var sensor = require('node-dht-sensor');
var app = express()

const { Client } = require('tplink-smarthome-api');
const client = new Client();
const plugHost = ['192.168.0.26', '192.168.0.27'];

app.use(express.static(`${__dirname}/public`));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 120000 },
}));

function authenticate(req, res, next) {
  if (req.session.userid !== process.env.ADMINU || req.session.password !== process.env.ADMINP) {
    res.redirect('/login');
  } else {
    next();
  }
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', authenticate, function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});

app.post('/login', (req, res) => {
  req.session.userid = req.body.userid;
  req.session.password = req.body.password;
  res.redirect('/');
});

app.get('/plugs/:plug', function (req, res) {
  const plug = client.getDevice({host: plugHost[parseInt(req.params.plug) - 1]}).then((device) => {
    device.getSysInfo().then((data) => {
      res.send({powerState: data.relay_state, time: data.on_time});
    });
  });
});

app.post('/plugs/:plug', authenticate, function (req, res) {
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

app.get('/sensor', function (req, res) {
  sensor.read(22, 2, function(err, temperature, humidity) {
      if (!err) {
          res.send({
            temperature: `${temperature.toFixed(1)}°C`,
            humidity: `${humidity.toFixed(1)}%`
          });
      } else {
        res.send({ error: 'An error occured while getting sesnor data' });
      }
  });
});

app.listen(3000, '0.0.0.0', function () {
  console.log('Home app listening on port 3000!')
})
