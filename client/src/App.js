import React from "react";
import Routes from "./routes";
import { LoginProvider } from "./contexts/LogIn";
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <div className="App">
      <LoginProvider>
        <ToastContainer />
        <Routes />
      </LoginProvider>
    </div>
  );
}
