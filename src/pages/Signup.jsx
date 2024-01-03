import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import backicon from '../assets/icon-back.png';
import { useNavigate } from 'react-router-dom';
import { NicknameAtom, loginIdAtom } from '../recoil/Atom';
import { useRecoilState } from 'recoil';

function Signup() {
    const navigate = useNavigate('');
    const [userNickname, setuserNickname] = useRecoilState(NicknameAtom);
    const [userId, setUserId] = useRecoilState(loginIdAtom);

    // const [nickname, setNickName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [inputs, setInputs] = useState({
        email: '',
        nickname: '',
        password: ''
    });

    const resetInputs = () => {
        setInputs({
            email: '',
            nickname: '',
            password: ''
        });
    };

    const changeInputs = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const checkInputs = () => {
        if (
            inputs.email.trim().length === 0 ||
            inputs.password.trim().length === 0 ||
            inputs.nickname.trim().length === 0
        ) {
            alert('정보를 모두 입력해주세요');
            resetInputs();
            return;
        }
        if (inputs.nickname.length < 2) {
            alert('닉네임은 2자 이상이어야 합니다');
            resetInputs();
            return;
        }
        return true;
    };

    const errorMsg = (code) => {
        switch (code) {
            case 'auth/user-not-found' || 'auth/wrong-password':
                return '이메일 또는 비밀번호가 일치하지 않습니다';
            case 'auth/email-already-in-use':
                return '이미 사용 중인 이메일입니다';
            case 'auth/weak-password':
                return '비밀번호는 6자 이상이어야 합니다';
            case 'auth/network-request-failed':
                return '네트워크 연결에 실패 하였습니다';
            case 'auth/invalid-email':
                return '잘못된 이메일 형식입니다';
            case 'auth/internal-error':
                return '잘못된 요청입니다';
            default:
                return '로그인에 실패 했습니다';
        }
    };
    const registerUser = async (e) => {
        e.preventDefault();

        if (!checkInputs()) {
            return;
        }
    };
    const handleClickSignIn = async (event) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                inputs.email,
                inputs.password
            );
            alert('회원가입이 되었습니다!');

            setuserNickname(inputs.nickname);
            setUserId(inputs.email);
            navigate('/login');
        } catch (error) {
            alert(errorMsg(error.code));
        }

        setInputs({
            email: '',
            nickname: '',
            password: ''
        });
    };

    return (
        <>
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
                                value={inputs.nickname}
                                placeholder="닉네임"
                                onChange={changeInputs}
                            />
                        </FormLabel>

                        <FormInput
                            type="email"
                            name="email"
                            value={inputs.email}
                            placeholder="이메일"
                            onChange={changeInputs}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={inputs.password}
                            placeholder="비밀번호 입력"
                            onChange={changeInputs}
                        />

                        <SignUpButton
                            onClick={handleClickSignIn}
                            // onClick={handleClickSignup}

                            // onClick={async () => {
                            //     try {
                            //         await createUserWithEmailAndPassword(
                            //             auth,

                            //             email,
                            //             password
                            //         );

                            //         console.log('회원가입 완료');
                            //         alert(`안녕하세요`);
                            //         navigate('/');
                            //     } catch (error) {
                            //         console.error(error);
                            //     }
                            // }}
                        >
                            회원가입
                        </SignUpButton>
                    </Formcontainer>
                </SignUpForm>
            </SignupWrapper>
        </>
    );
}

export default Signup;

const SignupWrapper = styled.div`
    margin: 40px auto;
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 10px;
    width: 50vh;
    height: 500px;
`;
const SignUpForm = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40vh;
    height: 420px;
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
    gap: 55px;
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
