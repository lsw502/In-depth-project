import React, { useState, useRef } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import backicon from "../assets/icon-park_back.png";

function Signup({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickName] = useState("");
  const modalRef = useRef(null);
  // const navigate = useNavigate("");

  // 파이어베이스
  const handleClickSignup = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      console.log("회원가입 완료");
      alert(`안녕하세요`);
      onClose();
      // navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  return (
    <WrapperBackground ref={modalRef} onClick={(e) => modalOutSideClick(e)}>
      <SignupWrapper>
        <SignUpForm>
          <Backcontainer>
            <BackButton />
          </Backcontainer>
          <h2>회원가입</h2>

          <Formcontainer>
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
            </FormLabel>

            <FormInput
              type="email"
              value={email}
              placeholder="이메일"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <FormInput
              type="password"
              value={password}
              placeholder="비밀번호 입력"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {/* <FormInput
            type="password"
            value={passwordCheck}
            placeholder="비밀번호 재입력"
            onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
          /> */}

            <SignUpButton
              onClick={handleClickSignup}
              // onClick={async () => {
              //   try {
              //     await createUserWithEmailAndPassword(
              //       auth,
              //       email,
              //       password,
              //       nickname
              //     );
              //   } catch (error) {
              //     console.error(error);
              //   }
              // }}
            >
              회원가입
            </SignUpButton>
          </Formcontainer>
        </SignUpForm>
      </SignupWrapper>
    </WrapperBackground>
  );
}

export default Signup;
const WrapperBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1rem);
  /* background-color: black; */
`;

const SignupWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 30px;
  width: 40vh;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  background-color: white;
`;
const SignUpForm = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vh;
  height: 420px;
  margin-bottom: 25px;
`;
const Backcontainer = styled.div`
  display: flex;
  width: 250px;
  height: 40px;
`;
const BackButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: blue;
  background-image: url(${backicon});
  background-size: 100%;
  background-repeat: no-repeat;
`;

const Formcontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
`;

const FormLabel = styled.label``;

const FormInput = styled.input`
  width: 250px;
  height: 40px;
  border-radius: 10px;
  border-color: white;
  background-color: #9bbbff;
`;

const SignUpButton = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  border-color: white;
  color: white;
  &:hover {
    background-color: blue;
  }
  background-color: #9bbbff;
`;
