import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ChatBar from '../components/ChatBar';
import ChatBody from '../components/ChatBody';
import ChatFooter from '../components/ChatFooter';


const ChatPage = ({ socket, messages, setMessages }) => {

  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);
  const [chatWithUser, setChatWithUser] = useState({})
  const { userId } = useParams()
  const [users, setUsers] = useState([])


  useEffect(() => {
    socket.on('chat_receive_message', (data) => {
      // const messagesData = data.filter(message => message.socketId === userId)
      if (data.socketID === userId) {

        setMessages([...messages, data])
      }
      console.log("chat receive message called ", data.socketID, userId, { data, });
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      setUsers(data)
    });
  }, [socket]);

  useEffect(() => {
    let [chatUser] = users.filter(user => user.socketID === userId);
    setChatWithUser(chatUser);
    setMessages([])
  }, [userId, users])

  // console.log(chatWithUser);
  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">

        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} chatWithUser={chatWithUser} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default ChatPage;