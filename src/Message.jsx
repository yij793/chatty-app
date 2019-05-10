import React, { Component } from 'react';
// class Message extends Component {
//   render() {
//     const colors={color:this.props.color}
//     if(this.props.type==='incomingNotification'){
//       return (<div className="message system">
//     {this.props.note}
//          </div>)
//     }else if(this.props.type==='withPic'){
//      const urls= this.props.url
//      const url=urls[0];
//      return (
//       <div className="message">
//       <span className='message-username' style={colors} >{this.props.name}</span>
//       <span className="message-content" ><span>{this.props.content} </span><br/> <img src={url}></img> </span>
//       </div>
//      )
    
//     }

//     else{
//       return(
//   <div>
//       <div className="message">
//       <span className={`message-username`} style={colors} >{this.props.name}</span>
//       <span className="message-content" >{this.props.content}</span>
//       </div>

//   </div>
//     )}
  
//   }
// }

//////Function Component////
function Message(props){
 const {color,note,type,url,content,name}=props
 const colors={color:color}
  switch(type){
    case 'incomingNotification':
    return(<div className="message system">{note}</div>)  
    break;
    case 'withPic':
    const srcUrl=url[0];
    return(<div className="message">
    <span className='message-username' style={colors} >{name}</span>
    <span className="message-content" ><span>{content} </span><br/> <img src={srcUrl}></img> </span>
    </div>)
    break;
    case 'incomingMessage':
    return(<div className="message">
    <span className={`message-username`} style={colors} >{name}</span>
    <span className="message-content" >{content}</span>
  </div>)
    break;
    default:
    return null
  }
}
export default Message;