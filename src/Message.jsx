import React, { Component } from 'react';
class Message extends Component {
  render() {
    if(this.props.type==='incomingNotification'){
      console.log('this is a incomingNotification')
      console.log(this.props.note)
      return (<div className="message system">
    {this.props.note}
         </div>)
    }else
    {return(
      <div>
      <div className="message">
      <span className="message-username" >{this.props.name}</span>
      <span className="message-content" >{this.props.content}</span>
      </div>

</div>
    )}
  
  }
}
export default Message;

          