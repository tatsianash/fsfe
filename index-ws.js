const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})


server.on("request", app);
server.listen(3000, () => console.log("server started on port 3000"));


/* begin websocket */

const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws){
  const numClients = wss.clients.size;
  console.log("Client connected", numClients);
  wss.broadcast(`Current number of visitors: ${numClients}`);

  if(ws.readyState === ws.OPEN) {
    ws.send('Hello, client!');
  }

  ws.on('close', function close() {
    console.log("Client disconnected", numClients);
    wss.broadcast(`Current number of visitors: ${numClients}`);
  });

});


wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocketServer.OPEN) {
      client.send(msg);
    }
  });
};

