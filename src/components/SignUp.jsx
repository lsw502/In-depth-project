import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickName] = useState("");

  // 모달
  const handleSignup = () => {
    // 회원가입 로직을 처리하고 필요한 경우 부모 컴포넌트에 결과를 전달
    console.log("회원가입 정보:", { email, password, nickname });
    onClose(); // 모달 닫기
  };

  return (
    <SignupWrapper>
      <SignUpForm>
        <BackButton>←</BackButton>
        <h2>회원가입</h2>

        <FormLabel>
          <FormInput
            type="text"
            name="nickname"
            value={nickname}
            placeholder="닉네임"
            onChange={(e) => {
              setNickName(e.target.value);
            }}
          />
          <CheckDuplicateButton>중복 확인</CheckDuplicateButton>
        </FormLabel>

        <FormInput
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <CheckDuplicateButton>중복 확인</CheckDuplicateButton>

        <FormInput
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <SignUpButton
          // onClick={handleSignUp}
          onClick={async () => {
            try {
              await createUserWithEmailAndPassword(
                auth,
                email,
                password,
                nickname
              );
            } catch (error) {
              console.error(error);
            }
          }}
        >
          회원가입
        </SignUpButton>
      </SignUpForm>
    </SignupWrapper>
  );
}

export default Signup;

const SignupWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 30px;
  width: 50vh;
  height: 540px;
`;
const SignUpForm = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vh;
  height: 420px;
`;
const BackButton = styled.button``;
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

const CheckDuplicateButton = styled.button``;
const SignUpButton = styled.button``;
