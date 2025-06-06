import ChatSelector from "./ChatSelector";
import { useUserInfo } from "../../globleContext/UserContext";

import s from "./ChatList.module.scss";

function ChatList({ userChat }) {
  const { userInfo } = useUserInfo();
  const getChatName = (chat) => {
    if (chat.isGroupChat) {
      return chat.chatName;
    } else {
      const friend = chat.users.filter((element) => {
        return element._id !== userInfo._id;
      });
      return friend[0].name;
    }
  };

  return (
    <div className={s.container}>
      {userChat.map((chat, index) => (
        <ChatSelector
          key={`${chat.chatName}${index}`}
          ChatName={getChatName(chat)}
          index={index}
          {...chat}
        />
      ))}
    </div>
  );
}

export default ChatList;
