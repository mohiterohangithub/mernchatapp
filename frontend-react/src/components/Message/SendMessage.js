import { useState } from "react";
import socket from "../../utils/socket";
import { useMessageContext } from "../../globleContext/MessageContext";
import { Send } from "../../accts/iconIndex";

import s from "./SendMessage.module.scss";

function SendMessage() {
  const { selectChat } = useMessageContext();

  const { _id = null } = selectChat ?? {};

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (_id && message) {
      socket.emit("send-private-message", {
        chatId: _id,
        message,
      });
    }
  };

  const typeMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = async (e) => {
    console.log("message", message);
    if (e.key === "Enter") {
      await sendMessage();
      setMessage("");
    }
  };

  const handleClick = async (e) => {
    if (message) {
      await sendMessage();
      setMessage("");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.inputWrapper}>
        <input
          className={s.input}
          onKeyDown={handleKeyDown}
          onChange={typeMessageHandler}
          value={message}
          placeholder="Type a message"
        />
        <div onClick={handleClick} className={s.iconWrapper}>
          <Send width="45px" height="100%" />
        </div>
      </div>
    </div>
  );
}

export default SendMessage;
