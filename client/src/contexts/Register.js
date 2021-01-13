import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { link } from '../const/const'
export const RegisterContext = React.createContext();

export function RegisterProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
  const [isFilledUsername, setFilledUsername] = useState(false);
  const [isFilledFullname, setFilledFullname] = useState(false);
  const [isPassword, setFilledPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [jwt, setJWT] = useState("")

  const notify = () => toast.success("Register Successfully !");
  const notify1 = (message) => toast.error(message);

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
  const onChangeFullname = (e) => {
    if (e.target.value.length > 0) {
      setFilledFullname(true);
      setFullname(e.target.value.trim());
    }
  };  
  const handleRegister = async (e, notify) => {
    e.preventDefault();
    const res = await axios.post(`${link}/users/register`, {
      username,
      password,
      fullName
    });
    if(res.data.accesstoken){
      localStorage.setItem("cool-jwt", res.data.accesstoken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(JSON.parse(localStorage.getItem("user")));
      setJWT(res.data.accesstoken)
      notify()
    }
    else {
      notify1(res.data.message)
    }
  };
  return (
    <RegisterContext.Provider
      value={{
        user,
        isFilledUsername,
        isPassword,
        onChangeUsername,
        onChangePassword,
        onChangeFullname,
        handleRegister,
        notify,
        jwt
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
