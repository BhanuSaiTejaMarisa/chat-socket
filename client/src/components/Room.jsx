import React, { useState } from 'react'
import Chat from './Chat';

export default function Room({ socket }) {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
    }
  }
  return (
    <div>
      <h3>Join A Chat</h3>
      <input type={"text"} placeholder="John..." onChange={e => setUsername(e.target.value)} value={username} />
      <input type={"text"} placeholder="Room ID..." onChange={e => setRoom(e.target.value)} value={room} />
      <button onClick={joinRoom}>Join A Room</button>
      <Chat socket={socket} room={room} username={username} />
    </div>
  )
}
