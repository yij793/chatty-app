import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx';
import MessageList from './MessageList.jsx';
import messagesDB from './messagesDB.json';
class App extends Component {
  constructor(props){
    super(props)
    this.state={messagesDB,username:''}
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messagesDB.push(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages})
      console.log(this.state)
    }, 3000);
  }
  changeName=(newName)=>{
    this.setState({username : newName})
  }
  addText=(text)=>{
    console.log('this is text',text)
    let username=this.state.username;
    if(username===''){username='Anonymous2'}
    let newtext={
      type:'incomingMessage',
      content:text,
      username:username
    }
    let newState=this.state.messagesDB.push(newtext)
    this.setState({newState})
  };

  render() {
    return (
     
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList infors={this.state.messagesDB}/>
      <Chatbar newText={this.addText} value={this.state.username} changeStateName={this.changeName}/>
    </div>
      
    );
  }
}
export default App;

