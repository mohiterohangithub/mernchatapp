import { useEffect, useState } from "react";

import { fetchAllChats } from "../../utils/webUtils";
import api from "../../utils/axiosInstance";
import ChatSelector from "./ChatSelector";

import s from "./ChatList.module.scss";

function ChatList() {
  const [userChat, setUserChat] = useState([]);

  useEffect(() => {
    try {
      const fetchAllChat = async () => {
        const response = await api.get(fetchAllChats);
        if (response.status === 200 && response.statusText === "OK") {
          const data = await response?.data;
          setUserChat([...data]);
        }
      };
      fetchAllChat();
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  
  return (
    <div className={s.container}>
      {userChat.map(({ chatName }) => (
        <ChatSelector chatName={chatName} />
      ))}
    </div>
  );
}

export default ChatList;
