import { useState, useEffect } from "react";

import { useMessageContext } from "../../globleContext/MessageContext";
import socket from "../../utils/socket";
import api from "../../utils/axiosInstance";
import Chats from "./Chats";
import ProfileBar from "./ProfileBar";
import SendMessage from "./SendMessage";
import { fetchAllMessages } from "../../utils/webUtils";

import s from "./Message.module.scss";

function Message() {
  const { selectChat } = useMessageContext();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectChat) return;
    const getAllMessages = async () => {
      const res = await api.post(fetchAllMessages, {
        chatId: selectChat._id,
      });
      const chatData = await res.data;
      setMessages(chatData);
    };
    getAllMessages();
    socket.emit("join room", selectChat._id);
    socket.on("receive-private-message", (recodedMsg) => {
      if (recodedMsg.chat === selectChat._id) {
        setMessages((pre) => {
          return [...pre, recodedMsg];
        });
      }
    });

    return () => {
      socket.emit("leave-room", selectChat._id);
    };
  }, [selectChat]);
  return (
    <div className={s.container}>
      {selectChat && (
        <>
          <ProfileBar />
          <Chats messages={messages} />
          <SendMessage />
        </>
      )}
    </div>
  );
}

export default Message;
