import React, { useState } from "react";
// import LoginForm from "components/LoginForm";
// import SignupForm from "components/SignupForm";
// import Router from "./shared/Router";
import Signup from "./components/Signup";
import Login from "./components/Login";
function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  const handleLoginClick = () => {
    setModalOpen(true);
    setActiveForm("login");
  };

  const handleSignupClick = () => {
    setModalOpen(true);
    setActiveForm("signup");
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div>
        <header>
          <h1>리액트 메인 홈페이지</h1>
          <button onClick={handleLoginClick}>로그인</button>
          <button onClick={handleSignupClick}>회원가입</button>
        </header>

        {isModalOpen && (
          <div className="modal">
            {activeForm === "login" ? (
              <Login onClose={handleModalClose} />
            ) : (
              <Signup onClose={handleModalClose} />
            )}
          </div>
        )}
      </div>
      {/* <Router /> */}
    </>
  );
}

export default App;
