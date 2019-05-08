import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import messagesDB from './messagesDB.json';
const uuidv1 = require('uuid/v1');
class App extends Component {
  constructor(props){
    super(props)
    this.state={messagesDB: [],username:'Anonymous',preverseName:'Anonymous',user:0}
     this.ws = new WebSocket('ws://localhost:3001')
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    
    this.ws.onopen = (event) => {
      console.log("Connected to server");
    }
    this.ws.onmessage = (event)=> {
      let newData=JSON.parse(event.data);
      console.log(typeof newData)
     if(typeof newData==='number'){
       this.setState({user:newData})
     }
      
     let newstate=this.state.messagesDB
        newstate.push(newData)
        this.setState({messagesDB:newstate})
      
    }
    }

  
  
  changeName=(newName)=>{
    this.setState({username : newName}) 
  }
  addText=(text)=>{
    let username=this.state.username;
    if(username===null || username===''){username='Anonymous'}
    let newtext={
      id:uuidv1(),
      type:'incomingMessage',
      content:text,
      username:username
    }
    this.ws.send(JSON.stringify(newtext))
    
  }
  getPreverseName=(e)=>{
    let name=e.target.value
    this.setState({preverseName:name})
  }
  sendNote=(e)=>{
    let name=e.target.value;
    if(name===null || name===''){name='Anonymous'}
    let notes=`${this.state.preverseName} changed their name to ${name}`
    let notifction={
      type:'incomingNotification',
      note:notes,
      id:uuidv1()
    }
    if(this.state.preverseName!==this.state.username)
    this.ws.send(JSON.stringify(notifction))
  }



  render() {
    return (
     
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className='displayOnline'>{this.state.user} online </span>
      </nav>
      <MessageList infors={this.state.messagesDB}/>
      <Chatbar newText={this.addText} value={this.state.username} changeStateName={this.changeName} blur={this.sendNote} focus={this.getPreverseName}/>
    </div>
      
    );
  }
}
export default App;

