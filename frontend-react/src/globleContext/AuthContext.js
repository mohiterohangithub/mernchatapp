import React, { useContext } from "react";

const AuthToken = React.createContext();

export const useGetAuthToken = () => {
  return useContext(AuthToken);
};

function AuthContext({ children }) {
  const token = localStorage.getItem("token");
  console.log("token", token);
  return <AuthToken.Provider value={token}>{children}</AuthToken.Provider>;
}

export default AuthContext;
