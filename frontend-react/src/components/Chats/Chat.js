import { useState, useEffect } from "react";

import api from "../../utils/axiosInstance";
import { fetchAllChats } from "../../utils/webUtils";

import SearchAndAddUser from "../SearchAndAddUser";
import ChatList from "../ChatList/ChatList";
import { useInfoContext } from "../../globleContext/InfoContext";

import s from "./Chats.module.scss";

function Chat() {
  const [userChat, setUserChat] = useState([]);
  const [searchChat, setSearchChat] = useState([]);

  const { newChat, setNewChat } = useInfoContext();

  useEffect(() => {
    try {
      if (!newChat) return;
      const fetchAllChat = async () => {
        const response = await api.get(fetchAllChats);
        if (response.status === 200 && response.statusText === "OK") {
          const data = await response?.data;
          setUserChat([...data]);
          setSearchChat([...data]);
        }
      };
      fetchAllChat();
      setNewChat(false);
    } catch (error) {
      console.log("error", error);
    }
  }, [newChat]);

  return (
    <div className={s.chatList}>
      <div className={s.searchInputAddUser}>
        <SearchAndAddUser
          searchChat={searchChat}
          setSearchChat={setSearchChat}
          userChat={userChat}
        />
      </div>
      <div className={s.listWrapperParent}>
        <div className={s.listWrapper}>
          <ChatList userChat={searchChat} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
