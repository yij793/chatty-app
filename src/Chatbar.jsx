
///This part is working well but I want to practice function Component so I commit it out!
import React, { Component } from 'react'

// class Chatbar extends Component {
//   render() {
//     return (
//       <footer className="chatbar">
//          <input className="chatbar-username" placeholder="Your Name (Optional)"  
//          value={this.props.value}  
//          onChange={this.props.changeStateName} 
//          onBlur={this.props.blur} 
//          onFocus={this.props.focus}/>
//         <input className="chatbar-message" placeholder="Type a message and hit ENTER"   
//         onKeyPress={this.props.newText}/>
//         <span style={{color:'red',display:'none'}}>you cannot send empty</span>
//       </footer>
//     )
//   }
// }

//////Function Compoent//////
function Chatbar(props){
  const {value,blur,focus,newText,changeStateName}=props
  return (
    <footer className="chatbar">
       <input className="chatbar-username" placeholder="Your Name (Optional)"  
       value={value}  
       onChange={changeStateName} 
       onBlur={blur} 
       onFocus={focus}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER"   
      onKeyPress={newText}/>
      <span style={{color:'red',display:'none'}}>you cannot send empty</span>
    </footer>
  )
    
}
          
export default Chatbar