import React, { useContext, useState } from "react";

const Info = React.createContext();

export const useInfoContext = () => {
  return useContext(Info);
};

function InfoContext({ children }) {
  const [addPopup, setAddPopup] = useState({
    open: false,
    chatType: "",
  });

  const [newChat, setNewChat] = useState(true);

  return (
    <Info.Provider value={{ addPopup, setAddPopup, newChat, setNewChat }}>
      {children}
    </Info.Provider>
  );
}

export default InfoContext;
