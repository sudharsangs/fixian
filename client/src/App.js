import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";

function App() {
  return (
    <div className="container">
      <Home />
    </div>
  );
}

export default App;
