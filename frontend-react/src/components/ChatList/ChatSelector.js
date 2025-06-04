import s from "./ChatSelector.module.scss";

function ChatSelector({ chatName }) {
  return (
    <div className={s.container}>
      <div className={s.userInfo}>
        <div className={s.profilePic}></div>
        <div className={s.userData}>
          <div className={s.name}>{chatName}</div>
          <div className={s.latestMsg}></div>
        </div>
      </div>
    </div>
  );
}

export default ChatSelector;
