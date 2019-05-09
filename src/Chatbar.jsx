import React, { Component } from 'react'

class Chatbar extends Component {
  render() {
    const addtext=(e)=>{
      if(e.key==='Enter'){
        let contents=e.target.value
        if(contents.trim()!==null && contents.trim()!=='' ){
          this.props.newText(contents)
          e.target.value=''
        }
        }else{
          console.log('NO!!!!')
        }
       
      
    }
    const changeName=(e)=>{
      const newValue=e.target.value
      this.props.changeStateName(newValue)
    }
    return (
      <footer className="chatbar">
         <input className="chatbar-username" placeholder="Your Name (Optional)"  value={this.props.value}  onChange={changeName} onBlur={this.props.blur} onFocus={this.props.focus}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"   onKeyPress={addtext}/>
      </footer>
    )
  }
}

export default Chatbar
