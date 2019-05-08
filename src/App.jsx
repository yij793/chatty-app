import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import messagesDB from './messagesDB.json';
const uuidv1 = require('uuid/v1');
class App extends Component {
  constructor(props){
    super(props)
    this.state={messagesDB: [],username:'Anonymous',preverseName:'Anonymous'}
     this.ws = new WebSocket('ws://localhost:3001')
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.ws.onopen = (event) => {
      console.log("Connected to server");
    }
    this.ws.onmessage = (event)=> {
      let newstate=this.state.messagesDB
      newstate.push(JSON.parse(event.data) )
      this.setState({messagesDB:newstate})
    }
    }

  
  
  changeName=(newName)=>{
    this.setState({username : newName}) 
  }
  addText=(text)=>{
    let username=this.state.username;
    let newtext={
      id:uuidv1(),
      type:'incomingMessage',
      content:text,
      username:username
    }
    this.ws.send(JSON.stringify(newtext))
    
  }



  render() {
    return (
     
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList infors={this.state.messagesDB}/>
      <Chatbar newText={this.addText} value={this.state.username} changeStateName={this.changeName} blur={}/>
    </div>
      
    );
  }
}
export default App;

