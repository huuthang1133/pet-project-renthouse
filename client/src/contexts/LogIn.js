import React, { useState } from "react";
import axios from "axios";

export const LoginContext = React.createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
  const [isFilledUsername, setFilledUsername] = useState(false);
  const [isPassword, setFilledPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://pet-project-renthouse.herokuapp.com/login", {
      username,
      password
    });
    console.log(res.data);
    localStorage.setItem("cool-jwt", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(JSON.parse(localStorage.getItem("user")));
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
        handleLogin
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
