import React from "react";

import Router from "./shared/Router";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
function App() {
  return (
    <>
      <Router />
      <Login />
      <SignUp />
    </>
  );
}

export default App;
