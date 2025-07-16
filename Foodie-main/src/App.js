import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;