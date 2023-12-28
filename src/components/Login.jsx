import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin" && password === "password") {
      onLogin();
    } else {
      alert("로그인 실패. 사용자 이름과 비밀번호를 확인하세요.");
    }
  };
  return (
    <>
      <LoginWrapper>
        <LoginForm>
          <h2>애니잇</h2>
          <FormLabel>
            <FormInput
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormLabel>
          <FormLabel>
            <FormInput
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormLabel>
          <FormButton type="button" onClick={handleLogin}>
            로그인
          </FormButton>
          <FormButton>회원가입</FormButton>
        </LoginForm>
      </LoginWrapper>
    </>
  );
}
export default Login;

const LoginWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 50vh;
  height: 700px;
`;
const LoginForm = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vh;
  height: 600px;
`;
const FormLabel = styled.label`
  margin: 15px;
`;
const FormInput = styled.input`
  width: 250px;
  height: 40px;
  border-radius: 10px;
  border-color: white;
  background-color: #9bbbff;
`;
const FormButton = styled.button`
  width: 250px;
  height: 40px;
  border-radius: 10px;
  margin: 10px;
  border-color: white;
`;
