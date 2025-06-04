import React, { useLayoutEffect } from "react";
import api from "../../utils/axiosInstance";
import { useGetAuthToken } from "../../globleContext/AuthContext";

import SearchAndAddUser from "../../components/SearchAndAddUser";
import ChatList from "../../components/ChatList/ChatList";

import s from "./ChatHome.module.scss";

function ChatHome() {
  const { getToken } = useGetAuthToken();
  const token = getToken();
  useLayoutEffect(() => {
    api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [token]);

  return (
    <div className={s.container}>
      <div className={s.chatContainer}>
        <div className={s.chatList}>
          <div className={s.searchInputAddUser}>
            <SearchAndAddUser />
          </div>
          <div className={s.listWrapperParent}>
            <div className={s.listWrapper}>
              <ChatList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHome;
