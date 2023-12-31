import React, { useState } from "react";

function SignupForm({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // 회원가입 로직을 처리하고 필요한 경우 부모 컴포넌트에 결과를 전달
    console.log("회원가입 정보:", { username, email, password });
    onClose(); // 모달 닫기
  };
  return (
    <div>
      <h2>회원가입</h2>
      <form>
        <label>
          아이디:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleSignup}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
