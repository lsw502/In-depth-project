import React, { useState } from "react";
import styled from "styled-components";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSignUpSuccess, setSignUpSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 실제 회원가입 로직을 추가할 수 있습니다.
    console.log("회원가입 정보:", formData);
  };

  const handleCheckDuplicate = (fieldName) => {
    // 여기에 각 필드에 대한 중복 확인 로직을 추가할 수 있습니다.
    console.log(`중복 확인 (${fieldName}): `, formData[fieldName]);
  };

  return (
    <SignupWrapper>
      <SignUpForm onSubmit={handleSubmit}>
        <BackButton>←</BackButton>
        <h2>회원가입</h2>
        <FormLabel>
          <FormInput
            type="text"
            name="username"
            placeholder="닉네임"
            value={formData.username}
            onChange={handleChange}
          />
          <ButtonContainer>
            <CheckDuplicateButton
              onClick={() => handleCheckDuplicate("username")}
            >
              중복 확인
            </CheckDuplicateButton>
          </ButtonContainer>
        </FormLabel>

        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <ButtonContainer>
          <CheckDuplicateButton onClick={() => handleCheckDuplicate("email")}>
            중복 확인
          </CheckDuplicateButton>
        </ButtonContainer>

        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <SignUpButton type="submit">회원가입</SignUpButton>

        {isSignUpSuccess && (
          <SuccessMessage>회원가입을 축하드립니다!</SuccessMessage>
        )}
      </SignUpForm>
    </SignupWrapper>
  );
};

export default SignUp;

const SignupWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 50vh;
  height: 700px;
`;
const SignUpForm = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vh;
  height: 600px;
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
const ButtonContainer = styled.div``;
const CheckDuplicateButton = styled.button``;
const SignUpButton = styled.button``;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;
