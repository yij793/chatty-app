const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket=require('ws')
// Set the port to 3001
const PORT = 3001;
const uuidv1 = require('uuid/v1');
// Create a new express server
const server = express()
.use(express.static('public'))// Make the express server serve static assets (html, javascript, css) from the /public folder
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
//////
const wss = new SocketServer({ server });
const color=['rgb(53, 101, 0)','rgb(170, 137, 57)','rgb(170, 63, 57)','rgb(65, 48, 117)','rgb(39, 86, 107)']
/////when start a connect
wss.on('connection', function connection(ws) {
  console.log('Client Connected')
  const colors={
    type:'color',
    color:color[Math.floor(Math.random()*5)]
  }
  ws.send(JSON.stringify(colors));

  const onLineClient={
    type:'onlineNumber',
    size:wss.clients.size
  }
  //////send foreach client
  wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(onLineClient));
    });
/////when receive message from severs
  ws.on('message', function incoming(data) {  
    const jsonData=JSON.parse(data)/////parse json data
    /////divide datatype
    switch(jsonData.type){
      case "incomingMessage":
        newData={
          id:uuidv1(),
          username:jsonData.username,
          content:jsonData.content,
          type:'incomingMessage',
          color:jsonData.color
        }
        break;
      case "incomingNotification":
      newData={
        id:uuidv1(),
        note:jsonData.note,
        type:'incomingNotification'
      }
      break;
      case "withPics":
      newData={
        id:uuidv1(),
        username:jsonData.username,
        content:jsonData.content,
        type:'withPic',
        color:jsonData.color,
        url:jsonData.url
      }
      break;
      default:
      console.log(data)
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    
  }
  ////////Send back to Client
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newData));
        
      }
    })
  });
/////when close a stocks
  ws.on('close', () => {
    console.log('Client disconnected')
    const onLineClient={
      type:'onlineNumber',
      size:wss.clients.size
    }
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(onLineClient));
  })
})});


