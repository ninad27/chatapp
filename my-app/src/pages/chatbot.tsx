import { useEffect, useState } from "react";

import Header from "../components/header";
import MessageInput from "../components/messageInput";
import Messages from "../components/messages";

import { getCurrentUserEmail } from "../utils/userService";
import { socket } from "../utils/socket";
import { ChatInterfaces } from "../utils/interfaces";
import { userOneEmail, userTwoEmail } from "../utils/constants";
import { useNavigate } from "react-router";

export default function ChatbotPage() {
  let navigate = useNavigate();
  const [messages, setMessages] = useState<ChatInterfaces.message[]>([]);

  useEffect(() => {
    const email = getCurrentUserEmail();
    if (!email) {
      navigate("/");
    } else {
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
    }
  }, []);

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
    <div className="chat-bot-page">
      <Header />
      <Messages messages={messages} />
      <MessageInput onSend={send} />
    </div>
  );
}
