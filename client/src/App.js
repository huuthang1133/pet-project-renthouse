import React from "react";
import Routes from "./routes";
import { LoginProvider } from "./contexts/LogIn";

export default function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Routes />
      </LoginProvider>
    </div>
  );
}
