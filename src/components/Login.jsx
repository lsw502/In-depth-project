import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, getAuth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
// import { useNavigate } from "react-router-dom";
import googlelogo from '../assets/google-logo-icon.png';
import githublogo from '../assets/github-logo-icon.png';

function Login({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate("");

    // 모달
    const handleLogin = () => {
        // 로그인 로직을 처리하고 필요한 경우 부모 컴포넌트에 결과를 전달
        console.log('로그인 정보:', { email, password });
        onClose(); // 모달 닫기
    };

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
                // navigate("/");
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
                    <FormButton
                        onClick={async () => {
                            try {
                                const userCredential =
                                    await signInWithEmailAndPassword(
                                        auth,
                                        email,
                                        password
                                    );
                                console.log(userCredential);
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        로그인
                    </FormButton>

                    <SocialLogin>소셜계정으로 로그인</SocialLogin>
                    {/* Google 소셜 로그인 버튼  */}
                    <GoogleLogin onClick={handleClickGoogle} />
                    {/* github 소셜 로그인 버튼 */}
                    <GitHubLogin onClick={handleGithubSignIn} />
                    <SignupButton>회원가입</SignupButton>
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
    border-radius: 30px;
    width: 50vh;
    height: 540px;
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
`;
const FormButton = styled.button`
    width: 250px;
    height: 40px;
    border-radius: 10px;
    margin: 10px;
    border-color: white;
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

const SignupButton = styled.button`
    border: none;
    margin-top: 30px;
    background-color: transparent;
    cursor: pointer;
    font-size: 10px;
    color: gray;
`;
