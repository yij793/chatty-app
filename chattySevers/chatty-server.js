const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket=require('ws')
// Set the port to 3001
const PORT = 3001;
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3');

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  wss.clients.forEach(function each(client) {
      client.send(wss.clients.size);
  })
  ws.on('message', function incoming(data) {
    let jsonData=JSON.parse(data)
    switch(jsonData.type){
      case "incomingMessage":
        newData={
          id:uuidv1(),
          username:jsonData.username,
          content:jsonData.content,
          type:'incomingMessage'
        }
        break;
      case "incomingNotification":
      newData={
        id:uuidv1(),
        note:jsonData.note,
        type:'incomingNotification'
      }
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    
  }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newData));
      }
    })
  })
  ws.on('close', () => {
    console.log('Client disconnected')
    wss.clients.forEach(function each(client) {
      client.send(wss.clients.size);
  })
})});


