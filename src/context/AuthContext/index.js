import { createContext, useContext } from "react";
import { useAuth } from "./logic";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { signUp, logIn, logOut, user } = useAuth();

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
