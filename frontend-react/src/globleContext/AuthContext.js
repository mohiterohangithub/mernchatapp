import React, { useContext, useState } from "react";

const AuthToken = React.createContext();

export const useGetAuthToken = () => {
  return useContext(AuthToken);
};

function AuthContext({ children }) {
  const [token, setTokenState] = useState(() => {
    return localStorage.getItem("token") ?? false;
  });
  const getToken = () => {
    return token;
  };

  const setToken = (value) => {
    localStorage.setItem("token", value);
    setTokenState(localStorage.getItem("token"));
  };

  return (
    <AuthToken.Provider value={{ getToken, setToken }}>
      {children}
    </AuthToken.Provider>
  );
}

export default AuthContext;
