var express = require('express')
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 4000})

var app = express()

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })

  setInterval(
    () => ws.send(`${new Date()}`),
    1000
  )
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
