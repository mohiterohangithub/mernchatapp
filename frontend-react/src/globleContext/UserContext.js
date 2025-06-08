import React, { useContext, useState } from "react";

const UserContextProvider = React.createContext();

export const useUserInfo = () => {
  return useContext(UserContextProvider);
};

function UserContext({ children }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    pic: null,
    _id: "",
  });
  return (
    <UserContextProvider.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContextProvider.Provider>
  );
}

export default UserContext;
