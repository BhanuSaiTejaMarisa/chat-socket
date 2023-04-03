import React, { useEffect, useState } from 'react'

export default function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  function sendMessage() {
    const messageData = {
      room,
      author: username,
      message: currentMessage,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }
    socket.emit("send_message", messageData);
    setMessageList(prev => [...prev, messageData])

  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList(prev => [...prev, data])
    })
  }, [socket])
  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map(data => (
          <div>{data.message}</div>
        ))}
      </div>
      <div className="chat-footer">
        <input type="text" placeholder='Hey...' id="" value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

