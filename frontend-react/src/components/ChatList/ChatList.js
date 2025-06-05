import { useEffect, useState, useRef } from "react";

import { fetchAllChats } from "../../utils/webUtils";
import api from "../../utils/axiosInstance";
import ChatSelector from "./ChatSelector";
import { useInfoContext } from "../../globleContext/InfoContext";

import s from "./ChatList.module.scss";

function ChatList() {
  const [userChat, setUserChat] = useState([]);

  const { newChat, setNewChat } = useInfoContext();

  useEffect(() => {
    try {
      if (!newChat) return;
      const fetchAllChat = async () => {
        const response = await api.get(fetchAllChats);
        if (response.status === 200 && response.statusText === "OK") {
          const data = await response?.data;
          setUserChat([...data]);
        }
      };
      fetchAllChat();
      setNewChat(false);
    } catch (error) {
      console.log("error", error);
    }
  }, [newChat]);

  return (
    <div className={s.container}>
      {userChat.map(({ chatName }, index) => (
        <ChatSelector
          key={`${chatName}${index}`}
          chatName={chatName}
          index={index}
        />
      ))}
    </div>
  );
}

export default ChatList;
