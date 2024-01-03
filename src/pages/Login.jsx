import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase/firebase';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import googlelogo from '../assets/google-logo-icon.png';
import { useDispatch } from 'react-redux';
import { login } from 'store/authSlice';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { loginIdAtom } from 'recoil/Atom';

function Login() {
    const [userId, setUserId] = useRecoilState(loginIdAtom);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const changeInputs = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const resetInputs = () => {
        setInputs({
            email: '',
            password: ''
        });
    };

    const checkInputs = () => {
        if (
            inputs.email.trim().length === 0 ||
            inputs.password.trim().length === 0
        ) {
            alert('이메일과 비밀번호 모두 입력해주세요');
            resetInputs();
            return;
        }
        if (!inputs.email.includes('@')) {
            alert('이메일 형식으로 입력해주세요');
            resetInputs();
            return;
        }
    };

    const loginEmail = async (e) => {
        e.preventDefault();
        checkInputs();
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                inputs.email,
                inputs.password
            );
            alert('로그인 되었습니다!');
            localStorage.setItem(
                'accessToken',
                userCredential.user.accessToken
            );
            dispatch(login(userCredential.user));

            navigate('/');
        } catch (error) {
            console.error(error);
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const loginGoogle = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            alert('로그인 되었습니다!');
            localStorage.setItem(
                'accessToken',
                userCredential.user.accessToken
            );
            navigate('/');
            dispatch(login(userCredential.user));
        } catch (error) {
            console.log(error.message);
            alert('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <LoginWrapper>
            <LoginForm>
                <h2>애니잇</h2>
                <FormLabel>
                    <FormInput
                        type="email"
                        name="email"
                        value={inputs.email}
                        placeholder="이메일"
                        onChange={changeInputs}
                    />
                </FormLabel>

                <FormLabel>
                    <FormInput
                        type="password"
                        name="password"
                        value={inputs.password}
                        placeholder="비밀번호 입력"
                        onChange={changeInputs}
                    />
                </FormLabel>

                <FormButton onClick={loginEmail}>로그인</FormButton>

                <SocialLogin>소셜계정으로 로그인</SocialLogin>

                <Socialcontanier>
                    {/* Google 소셜 로그인 버튼  */}
                    <GoogleLogin onClick={loginGoogle} />
                    {/* github 소셜 로그인 버튼
                            <GitHubLogin onClick={handleGithubSignIn} /> */}
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
        //     )}
        // </>
    );
}

export default Login;

const LoginWrapper = styled.div`
    margin: 40px auto;
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 10px;
    width: 50vh;
    height: 500px;
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
// const GitHubLogin = styled.button`
//     background-image: url(${githublogo});
//     width: 30px;
//     height: 30px;
//     background-size: 100%;
//     background-repeat: no-repeat;
//     border: none;
//     background-color: transparent;
//     cursor: pointer;
// `;

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
