import React, { useState } from "react";

function LoginForm({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 로직을 처리하고 필요한 경우 부모 컴포넌트에 결과를 전달
    console.log("로그인 정보:", { username, password });
    onClose(); // 모달 닫기
  };
  return (
    <div>
      <h2>로그인</h2>
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
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
