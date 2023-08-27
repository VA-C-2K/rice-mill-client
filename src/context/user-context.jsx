/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const tokenInfo = JSON.parse(localStorage.getItem("token"));
    setUser(userInfo);
    setToken(tokenInfo);

    if (!userInfo && !tokenInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <>{children}</>
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
