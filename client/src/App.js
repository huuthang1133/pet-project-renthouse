import React from "react";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginProvider, } from "./contexts/LogIn";
import { RegisterProvider } from "./contexts/Register";
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <div className="App">
      <RegisterProvider>
        <LoginProvider>
          <ToastContainer />
          <Routes />
        </LoginProvider>
      </RegisterProvider>

    </div>
  );
}
