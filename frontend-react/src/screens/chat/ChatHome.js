import { useEffect, useLayoutEffect } from "react";
import api from "../../utils/axiosInstance";
import { useGetAuthToken } from "../../globleContext/AuthContext";
import { useUserInfo } from "../../globleContext/UserContext";
import Chats from "../../components/Chats";
import { getUserInfo } from "../../utils/webUtils";
import Message from "../../components/Message";

import s from "./ChatHome.module.scss";

function ChatHome() {
  const { getToken } = useGetAuthToken();
  const token = getToken();
  const { setUserInfo } = useUserInfo();
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await api.get(getUserInfo);
        const userData = await res.data;
        setUserInfo(userData);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className={s.container}>
      <div className={s.chatContainer}>
        <Chats />
        <Message />
      </div>
    </div>
  );
}

export default ChatHome;
