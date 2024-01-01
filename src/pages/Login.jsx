import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase/firebase';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import googlelogo from '../assets/google-logo-icon.png';
import githublogo from '../assets/github-logo-icon.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user?.email);
        });
    }, []);

    const navigate = useNavigate();

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
            navigate('/');
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
            console.log('로그인완료');
            alert(`안녕하세요`);
            setCurrentUser(userCredential.user.email);
            navigate('/');
        } catch (error) {
            alert('이메일,비밀번호를 확인해주세요.');
            console.error(error);
        }
    };

    return (
        <>
            {currentUser ? (
                <>
                    <div>{currentUser}</div>
                    <button
                        onClick={async () => {
                            alert('로그아웃 하시겠습니까?');
                            await signOut(auth);
                            setCurrentUser(null);
                        }}
                    >
                        로그아웃
                    </button>
                </>
            ) : (
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

                        <FormButton onClick={handleClickSignIn}>
                            로그인
                        </FormButton>

                        <SocialLogin>소셜계정으로 로그인</SocialLogin>

                        <Socialcontanier>
                            {/* Google 소셜 로그인 버튼  */}
                            <GoogleLogin onClick={handleClickGoogle} />
                            {/* github 소셜 로그인 버튼 */}
                            <GitHubLogin onClick={handleGithubSignIn} />
                        </Socialcontanier>

                        <SignupButton
                            onClick={() => {
                                navigate('/signup');
                            }}
                        >
                            회원가입
                        </SignupButton>
                    </LoginForm>
                </LoginWrapper>
            )}
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
    margin-top: 70px;
`;
const FormLabel = styled.label`
    margin: 15px;
`;
const FormInput = styled.input`
    width: 250px;
    height: 40px;
    border-radius: 10px;
    border-color: white;
    background-color: white;
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
    background-color: black;
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
