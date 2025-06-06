import { useMessageContext } from "../../globleContext/MessageContext";

import s from "./ChatSelector.module.scss";

function ChatSelector(props) {
  const { ChatName } = props;
  const { setSelectChat } = useMessageContext();
  const handleClick = () => {
    setSelectChat({ ...props });
  };
  return (
    <div onClick={() => handleClick(props)} className={s.container}>
      <div className={s.userInfo}>
        <div className={s.profilePic}></div>
        <div className={s.userData}>
          <div className={s.name}>{ChatName}</div>
          <div className={s.latestMsg}>Temp</div>
        </div>
      </div>
    </div>
  );
}

export default ChatSelector;
