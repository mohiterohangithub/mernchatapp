import { useState } from "react";
import socket from "../../utils/socket";
import { useMessageContext } from "../../globleContext/MessageContext";
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
    if (e.key === "Enter") {
      await sendMessage();
    }
  };
  return (
    <div className={s.container}>
      <input
        onKeyDown={handleKeyDown}
        onChange={typeMessageHandler}
        value={message}
        placeholder="Type a message"
      />
    </div>
  );
}

export default SendMessage;
