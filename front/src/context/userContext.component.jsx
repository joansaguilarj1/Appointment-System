/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import axios from "axios";

export const UsersContext = createContext({
  isLogged: false,
  logInUser: () => {},
  logOutUser: () => {},
  registerUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("user"));

  const logInUser = async (values) => {
    const response = await axios.post("http://localhost:3000/users/login", values);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setIsLogged(response.data.user);
    return response;
  };

   const registerUser = async (values) => {
    const response = await axios.post("http://localhost:3000/users/register", values)
    return response;
  };

  const logOutUser = () => {
    setIsLogged(false);
    localStorage.clear();
  };

  const value = {
    isLogged,
    logInUser,
    logOutUser,
    registerUser
  };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
