import React, { Component } from 'react'

class Chatbar extends Component {
  render() {
    const addtext=(e)=>{
      console.log()
      if(e.key==='Enter'){
        let contents=e.target.value
        if(contents===null){e.preventDefalut()}else{ this.props.newText(contents)}
       }
      
    }
    const changeName=(e)=>{
      let newValue=e.target.value
      this.props.changeStateName(newValue)
    }
    return (
      <footer className="chatbar">
         <input className="chatbar-username" placeholder="Your Name (Optional)" name='username' value={this.props.value}  onChange={changeName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" name='content'  onKeyPress={addtext}/>
      </footer>
    )
  }
}

export default Chatbar
