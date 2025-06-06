import React, { useContext, useState } from "react";

const Message = React.createContext();

export const useMessageContext = () => {
  return useContext(Message);
};

function MessageContext({ children }) {
  const [selectChat, setSelectChat] = useState(null);

  return (
    <Message.Provider value={{ selectChat, setSelectChat }}>
      {children}
    </Message.Provider>
  );
}

export default MessageContext;
