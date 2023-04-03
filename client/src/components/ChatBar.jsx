import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => {
      let chatUsers = data.filter(user => user.socketID !== socket.id);
      setUsers(chatUsers);
    });
  }, [socket, users]);
  // console.log(users, socket);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <NavLink key={user.socketID} to={user.socketID} className={({ isActive }) => isActive && "active"}>{user.userName}</NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;