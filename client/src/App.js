import React from "react";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from './GlobalState'
import { ToastContainer } from 'react-toastify';



export default function App() {
  return (
    <div className="App">
      <DataProvider>
        <ToastContainer />
        <Routes />
      </DataProvider>
    </div>
  );
}
