import React, { useRef, useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
import googlelogo from "../assets/google-logo-icon.png";
import githublogo from "../assets/github-logo-icon.png";

function Login({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const modalRef = useRef(null);

  // const navigate = useNavigate();

  // 구글 로그인
  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        const userName = res.user.displayName;

        // local storage에 token, username 저장해주기
        console.log(token);
        console.log(userName);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClickGoogle = async (event) => {
    event.preventDefault();
    await signInWithGoogle();
  };

  // 깃 허브 로그인
  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider();
    // const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // navigate("/");
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickSignIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      console.log("로그인완료");
      alert(`안녕하세요`);
      onClose();
      // navigate("/");
    } catch (error) {
      alert("이메일,비밀번호를 확인해주세요.");
      console.error(error);
    }
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <>
      <WrapperBackground ref={modalRef} onClick={(e) => modalOutSideClick(e)}>
        <LoginWrapper>
          <LoginForm>
            <h2>애니잇</h2>
            <FormLabel>
              <FormInput
                type="email"
                value={email}
                placeholder="이메일"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormLabel>

            <FormLabel>
              <FormInput
                type="password"
                value={password}
                placeholder="비밀번호 입력"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormLabel>

            <FormButton onClick={handleClickSignIn}>로그인</FormButton>

            <SocialLogin>소셜계정으로 로그인</SocialLogin>

            <Socialcontanier>
              {/* Google 소셜 로그인 버튼  */}
              <GoogleLogin onClick={handleClickGoogle} />
              {/* github 소셜 로그인 버튼 */}
              <GitHubLogin onClick={handleGithubSignIn} />
            </Socialcontanier>

            <SignupButton
              onClick={() => {
                // navigate("/singup");
              }}
            >
              회원가입
            </SignupButton>
          </LoginForm>
        </LoginWrapper>
      </WrapperBackground>
    </>
  );
}

export default Login;
const WrapperBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1rem);
  /* background-color: black; */
`;

const LoginWrapper = styled.div`
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
const LoginForm = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vh;
  height: 420px;
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
  color: white;
`;
const FormButton = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
  border-color: white;
  &:hover {
    background-color: blue;
  }
  background-color: #9bbbff;
  color: white;
`;

const SocialLogin = styled.p`
  font-size: 10px;
  color: gray;
`;

const GoogleLogin = styled.button`
  background-image: url(${googlelogo});
  width: 30px;
  height: 30px;
  background-size: 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const GitHubLogin = styled.button`
  background-image: url(${githublogo});
  width: 30px;
  height: 30px;
  background-size: 100%;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Socialcontanier = styled.div`
  display: flex;
  gap: 25px;
`;

const SignupButton = styled.button`
  border: none;
  margin-top: 30px;
  background-color: transparent;
  cursor: pointer;
  font-size: 10px;
  color: gray;
  text-decoration: underline;
`;
