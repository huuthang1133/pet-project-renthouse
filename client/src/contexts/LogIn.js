import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { link } from '../const/const'
export const LoginContext = React.createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
  const [isFilledUsername, setFilledUsername] = useState(false);
  const [isPassword, setFilledPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('')

  const notify = () => toast.success("Login Successfully !");
  const notify1 = (message) => toast.error(message);

  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cool-jwt");
    setUser(localStorage.getItem("user"));
  };
  const onChangeUsername = (e) => {
    if (e.target.value) {
      setFilledUsername(true);
      setUsername(e.target.value);
    }
  };
  const onChangePassword = (e) => {
    if (e.target.value > 5) {
      setFilledPassword(true);
      setPassword(e.target.value);
    }
  };
  const handleLogin = async (e, notify) => {
    e.preventDefault();
    const res = await axios.post(`${link}/users/login`, {
      username,
      password
    });
    if(res.data.accesstoken){
      localStorage.setItem("cool-jwt", res.data.accesstoken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setToken(localStorage.getItem("cool-jwt"));
      notify()
    }
    else {
      notify1(res.data.message)
    }
  };
  return (
    <LoginContext.Provider
      value={{
        user,
        isFilledUsername,
        isPassword,
        onLogout,
        onChangeUsername,
        onChangePassword,
        handleLogin,
        notify,
        token
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
