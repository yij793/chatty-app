import React, { Component } from 'react';
class Message extends Component {
  render() {
    const colors={color:this.props.color}
    if(this.props.type==='incomingNotification'){
      return (<div className="message system">
    {this.props.note}
         </div>)
    }else if(this.props.type==='withPic'){
     const urls= this.props.url
     const url=urls[0];
     return (
      <div className="message">
      <span className='message-username' style={colors} >{this.props.name}</span>
      <span className="message-content" ><span>{this.props.content} </span><br/> <img src={url}></img> </span>
     
      </div>
     )
    
    }

    else{
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

