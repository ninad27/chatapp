import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import Header from "../../components/header";
import MessageInput from "../../components/messageInput";
import Messages from "../../components/messages";
import { UserList } from "../../components/userList";

import { getCurrentUserEmail, getCurrentUserId } from "../../utils/userService";
import { socket } from "../../utils/socket";
import { ChatInterfaces } from "../../utils/interfaces";
import { getRequest } from "../../utils/apiService";

export default function Dashboard() {
  const [userList, setUserList] = useState<ChatInterfaces.User[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatInterfaces.User | null>(null);
  const [messages, setMessages] = useState<ChatInterfaces.message[]>([]);

  const navigate = useNavigate();
  const email = getCurrentUserEmail();

  const previousSelectedUser = useRef<ChatInterfaces.User | null>(null);

  const loadAllMessages = (): void => {
    const currentUserId = getCurrentUserId();

    const payload = {
      selectedUser: selectedUser?.id,
      currentUser: currentUserId,
    };

    if (payload.selectedUser === undefined || payload.selectedUser === null) {
      return;
    }

    socket.emit("findAllMessages", payload, (responseMessages: ChatInterfaces.message[]) => {
      setMessages(responseMessages);
    });
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    } else {
      getUserList();
    }
  }, []);

  useEffect(() => {
    if (selectedUser && previousSelectedUser.current === null) {
      implementSocket();
    } else {
      loadAllMessages();
    }
    previousSelectedUser.current = selectedUser;
  }, [selectedUser]);

  const getUserList = (): void => {
    getRequest("users")
      .then((response) => {
        const currentUserId = getCurrentUserId();

        const otherUsers = response.filter((user: ChatInterfaces.User) => {
          return user.id !== currentUserId;
        });

        setUserList(otherUsers);
        if (otherUsers.length > 0) {
          setSelectedUser(otherUsers[0]);
        }
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  const implementSocket = (): (() => void) => {
    socket.connect(); // connect to socket

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newMessage", () => loadAllMessages());

    // remove all event listeners
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newMessage", () => loadAllMessages());
      socket.disconnect();
    };
  };

  const handleConnect = (): void => {
    loadAllMessages();
  };

  const handleDisconnect = (): void => {
    console.log("Socket disconnected");
  };

  const send = async (inputValue: string): Promise<void> => {
    const currentUserId = getCurrentUserId();

    if (inputValue.trim().length === 0) return;
    socket.emit("createMessage", { from: currentUserId, to: selectedUser?.id, message: inputValue.trim() });
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
