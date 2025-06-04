import React from "react";

import s from "./UserList.module.scss";

function UserList({ list, setUser, setPopUp }) {
  const handleClick = (id, name) => {
    setUser({ id, name });
    setPopUp(false);
  };

  return (
    <div className={s.container}>
      {list.map(({ name, email, _id }) => (
        <div
          onClick={() => handleClick(_id, name)}
          key={email}
          className={s.listCard}
        >
          <div className={s.imageWrapper}></div>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
