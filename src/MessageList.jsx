import React, { Component } from 'react'
import Message from './Message.jsx'
import { generateRandomId } from './idgenerator.jsx'
class MessageList extends Component {
  render() {
    let message=this.props.infors;
    console.log(message)
    let totalMessage=message.map(item=>
        <Message name={item.username} content={item.content} key={generateRandomId()} type={item.type} note={item.note} color={item.color} url={item.url}/>
    )
    return (
        <div>
            <main className="messages"> 
                    {totalMessage}
            </main>
        </div>
   
    )
  }
}
export default MessageList


