import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Header from "../../components/header";
import MessageInput from "../../components/messageInput";
import Messages from "../../components/messages";
import { UserList } from "../../components/userList";

import { getCurrentUserEmail } from "../../utils/userService";
import { socket } from "../../utils/socket";
import { ChatInterfaces } from "../../utils/interfaces";
import { userOneEmail, userTwoEmail } from "../../utils/constants";
import { getRequest } from "../../utils/apiService";

export default function Dashboard() {
  const [userList, setUserList] = useState<ChatInterfaces.User[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatInterfaces.User | null>(null);
  const [messages, setMessages] = useState<ChatInterfaces.message[]>([]);

  let navigate = useNavigate();

  useEffect(() => {
    const email = getCurrentUserEmail();
    if (!email) {
      navigate("/");
    } else {
      implementSocket();
      getUserList();
    }
  }, []);

  const getUserList = () => {
    getRequest("users")
      .then((response) => {
        setUserList(response);
        if (response.length > 0) {
          setSelectedUser(response[0]);
        }
      })
      .catch(() => {
        //
      });
  };

  const implementSocket = () => {
    socket.connect(); // connect to socket

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("findAllMessages", getAllMessages);
    socket.on("createMessage", handleChat);

    // remove all event listeners
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("findAllMessages", getAllMessages);
      socket.off("createMessage", handleChat);
      socket.disconnect();
    };
  };

  const handleConnect = () => {
    console.log("Socket connected");
    socket.emit("findAllMessages");
  };

  const handleDisconnect = () => {
    console.log("Socket disconnected");
  };

  const handleChat = (newMessage: ChatInterfaces.message) => {
    console.log("newMessage", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const getAllMessages = (allMessages: ChatInterfaces.message[]) => {
    setMessages(allMessages);
  };

  const send = async (inputValue: string) => {
    if (inputValue.trim().length === 0) return;

    const email = getCurrentUserEmail();
    const to = email === userOneEmail ? userTwoEmail : userOneEmail;
    socket.emit("createMessage", { from: email, to: to, message: inputValue.trim() });
  };

  return (
    <div className="dashboard-page">
      <div className="user-list-section">
        <UserList userList={userList} selectUser={setSelectedUser} selectedUser={selectedUser} />
      </div>
      <div className="chat-section">
        <div className="chat-box">
          <Header selectedUser={selectedUser} />
          <Messages messages={messages} />
          <MessageInput onSend={send} />
        </div>
      </div>
    </div>
  );
}
