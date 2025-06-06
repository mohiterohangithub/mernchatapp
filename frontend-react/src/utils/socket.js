import { io } from "socket.io-client";

import { URL } from "./webUtils";

const socket = io(URL, {
  auth: {
    token: localStorage.getItem("token"), // JWT Token
  },
});

export default socket;
