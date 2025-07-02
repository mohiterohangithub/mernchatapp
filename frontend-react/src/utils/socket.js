import { io } from "socket.io-client";

import { URL } from "./webUtils";

const socket = io(URL, {
  reconnectionAttempts: 5,
  timeout: 10000,
  auth: {
    token: localStorage.getItem("token"), // JWT Token
  },
});

export default socket;
