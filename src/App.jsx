import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import messagesDB from './messagesDB.json';

class App extends Component {
  constructor(props){
    super(props)
    this.state={messagesDB: [],username:'',preverseName:'Anonymous',user:0,postmessages:[],currentColor:'black'}
     this.ws = new WebSocket('ws://localhost:3001')
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    
    this.ws.onopen = (event) => {
      console.log("Connected to server");
    }
    this.ws.onmessage = (event)=> {
      let newData=JSON.parse(event.data);
      switch(newData.type) {
        case "incomingMessage":
        let newstate1=this.state.messagesDB
        newstate1.push(newData)
        this.setState({messagesDB:newstate1})
          break;
        case "incomingNotification":
        let newstate2=this.state.messagesDB
        newstate2.push(newData)
        this.setState({messagesDB:newstate2})
          break;
        case "onlineNumber":
        this.setState({user:newData.size})
          break;
        case "color":
        this.setState({currentColor:newData.color})
          break;
        case "withPic":
        let newstate3=this.state.messagesDB
        newstate3.push(newData)
        this.setState({messagesDB:newstate3})
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + newData.type);
    }     
    }
    }

  changeName=(newName)=>{
    this.setState({username : newName}) 
  }
  addText=(text)=>{
    let username=this.state.username;
    if(username===null || username===''){username='Anonymous'}
    let reg=/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    if(reg.test(text)){
      let url=text.match(reg);
      let newMesg=text.replace(reg,'');
      let newMesgs={
        type:'withPics',
        content:newMesg,
        url:url,
        username:username,
        color:this.state.currentColor
      }
      this.ws.send(JSON.stringify(newMesgs))

    }else{
      console.log('this should not')
      let newtext={
      type:'incomingMessage',
      content:text,
      username:username,
      color:this.state.currentColor
    }
    this.ws.send(JSON.stringify(newtext))
  }
    
    
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
    }
    if(this.state.preverseName!==this.state.username && this.state.preverseName!=='')
    this.ws.send(JSON.stringify(notifction))
  }



  render() {
    return (
     
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className='displayOnline'>{this.state.user} online </span>
      </nav>
      <MessageList 
      infors={this.state.messagesDB}/>
      <Chatbar 
      newText={this.addText} 
      value={this.state.username} 
      changeStateName={this.changeName} 
      blur={this.sendNote} 
      focus={this.getPreverseName}/>
      
    </div>
      
    );
  }
}
export default App;

