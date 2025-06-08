import { useEffect, useRef } from "react";

import { useUserInfo } from "../../globleContext/UserContext";
import s from "./Chats.module.scss";

function Chats({ messages }) {
  const { userInfo } = useUserInfo();
  const containerRef = useRef(false);

  const renderReceivedMessage = (value) => {
    const currentUser = value.sender._id === userInfo._id;
    return (
      <div
        className={s.recodedMessageWrapper}
        style={{ justifyContent: currentUser ? "flex-end" : "flex-start" }}
      >
        <div className={s.content}>
          <p className={s.msg}>{value.content}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={containerRef} className={s.container}>
      {messages?.length > 0 &&
        messages.map((value) => renderReceivedMessage(value))}
    </div>
  );
}

export default Chats;
