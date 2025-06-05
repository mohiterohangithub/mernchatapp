import { useEffect, useState, useRef } from "react";

import api from "../../utils/axiosInstance";
import { createChat, getAllUsers } from "../../utils/webUtils";
import UserList from "./UserList";
import useOutsideClick from "../../utils/customHooks/useOutsideClick";
import { useInfoContext } from "../../globleContext/InfoContext";

import s from "./CreateChat.module.scss";

function CreateChat() {
  const [user, setUser] = useState({ id: null, name: "" });

  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [list, setList] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const listRef = useRef(null);
  const parentRef = useRef(null);

  const { setAddPopup, setNewChat } = useInfoContext();

  useOutsideClick(listRef, () => {
    setPopUp(false);
  });

  useEffect(() => {
    try {
      const fetchAllUsers = async () => {
        const res = await api.get(getAllUsers);
        const data = await res.data;
        setAllUsers([...data]);
        setList([...data]);
      };
      fetchAllUsers();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    if (allUsers.length > 0 && search?.length > 1 && popUp) {
      let newList = allUsers.filter(({ name }) => {
        if (name.indexOf(search) !== -1) {
          return true;
        }
        return false;
      });
      setList(newList);
    } else {
      setList(allUsers);
    }
  }, [search]);

  useEffect(() => {
    setSearch(user.name);
  }, [user]);

  const handleCreateChat = async () => {
    try {
      const res = await api.post(createChat, {
        userId: user.id,
      });
      if (res.status === 200 && res.statusText === "OK") {
        setAddPopup((pre) => {
          return { ...pre, open: false };
        });
        setNewChat(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={s.container}>
      <div ref={parentRef} className={s.popup}>
        <p className={s.fnd}>Add Friends</p>
        <div className={s.inputList} ref={listRef}>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setPopUp(true)}
              placeholder="Add contacts"
              value={search}
            />
          </div>
          {popUp && (
            <div className={s.list}>
              <UserList list={list} setUser={setUser} setPopUp={setPopUp} />
            </div>
          )}
        </div>
        <button onClick={handleCreateChat} className={s.createChat}>
          Create Chat With Friends
        </button>
      </div>
    </div>
  );
}
export default CreateChat;
