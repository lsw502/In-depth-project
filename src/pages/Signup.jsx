import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import backicon from '../assets/icon-back.png';
import { useNavigate } from 'react-router-dom';
import { NicknameAtom, loginIdAtom } from '../recoil/Atom';
import { useRecoilState } from 'recoil';

function Signup() {
    const [userNickname, setuserNickname] = useRecoilState(NicknameAtom);
    const [userId, setUserId] = useRecoilState(loginIdAtom);

    const [nickname, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate('');

    // 파이어베이스
    // const handleClickSignup = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await createUserWithEmailAndPassword(
    //             auth,
    //             nickname,
    //             email,
    //             password
    //         );

    //         console.log('회원가입 완료');
    //         alert(`안녕하세요`);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <SignupWrapper>
            <SignUpForm>
                <Backcontainer>
                    <BackButton
                        onClick={() => {
                            navigate('/login');
                        }}
                    />
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

                    <SignUpButton
                        // onClick={handleClickSignup}

                        onClick={async () => {
                            try {
                                await createUserWithEmailAndPassword(
                                    auth,
                                    email,
                                    password
                                );

                                setuserNickname(nickname);
                                setUserId(email);
                                console.log('회원가입 완료');
                                alert(`안녕하세요`);
                                navigate('/login');
                            } catch (error) {
                                console.error(error);
                            }
                        }}
                    >
                        회원가입
                    </SignUpButton>
                </Formcontainer>
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
    background-color: white;
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
    background-color: black;
`;
