import React, { Component } from 'react';
class Message extends Component {
  render() {
    const colors={color:this.props.color}
    if(this.props.type==='incomingNotification'){
      return (<div className="message system">
    {this.props.note}
         </div>)
    }else

    {
      return(
      <div>
      <div className="message">
      <span className={`message-username`} style={colors} >{this.props.name}</span>
      <span className="message-content" >{this.props.content}</span>
      </div>

</div>
    )}
  
  }
}
export default Message;

          