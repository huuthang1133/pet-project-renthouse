import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const LoginContext = React.createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
  const [isFilledUsername, setFilledUsername] = useState(false);
  const [isPassword, setFilledPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notify = () => toast.success("Login Successfully !");
  const notify1 = (message) => toast.error(message);


  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cool-jwt");
    setUser(localStorage.getItem("user"));
  };
  const onChange1 = (e) => {
    if (e.target.value) {
      setFilledUsername(true);
      setUsername(e.target.value);
    }
  };
  const onChange2 = (e) => {
    if (e.target.value > 5) {
      setFilledPassword(true);
      setPassword(e.target.value);
    }
  };
  const handleLogin = async (e, notify) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:9081/login", {
      username,
      password
    });
    if(res.data.accessToken){
      localStorage.setItem("cool-jwt", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(JSON.parse(localStorage.getItem("user")));
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
        onChange1,
        onChange2,
        handleLogin,
        notify
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
