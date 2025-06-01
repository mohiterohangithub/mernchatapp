import React, { useEffect } from "react";
import api from "../../utils/axiosInstance";
import { useGetAuthToken } from "../../globleContext/AuthContext";

import s from "./ChatHome.module.scss";

function ChatHome() {
  const token = useGetAuthToken();

  useEffect(() => {
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

  return <div className={s.container}>ChatHome</div>;
}

export default ChatHome;
