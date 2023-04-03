import './App.css';
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import ChatContent from './components/ChatContent';
const socket = io.connect("http://localhost:3001")

function App() {
  const [messages, setMessages] = useState([]);



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route path="/chat" element={<ChatPage socket={socket} messages={messages} setMessages={setMessages} />}>
          <Route path=":userId" element={<ChatContent socket={socket} messages={messages} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
