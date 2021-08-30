import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, useHistory } from "react-router-dom";
import * as auth from "./auth";

function AuthBox({ isLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const PASSWORD_RULES = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*).{8,}$/;
  const alertText = document.querySelector(".alert");

  function submit() {
    if (!isLogin) {
      const exist = sessionStorage.getItem(userId);
      if (exist === null) {
        const CHECK = PASSWORD_RULES.test(password);
        if (CHECK) {
          auth.login(userId, password).then((res) => {
            if (res.resultcode === 1) {
              history.push("login");
            }
          });
        }
        if (!CHECK) {
          alertText.innerText =
            "비밀번호 : 특수문자를 포함해 8글자 이상 넣어주세요.";
        }
      }
      if (exist !== null) {
        alertText.innerText = "중복된 아이디가 있습니다.";
      }
    }
    if (isLogin) {
      const storedPassword = sessionStorage.getItem(userId);
      if (storedPassword === null)
        alertText.innerText = "아이디가 존재하지 않습니다.";
      if (storedPassword !== null && storedPassword !== password)
        alertText.innerText = "비밀번호를 다시 확인해주세요";
      if (storedPassword !== null && storedPassword === password) {
        sessionStorage.setItem("isAuthorized", "true");
        history.push("/");
      }
    }
  }
  return (
    <StyledSection>
      <p>ID</p>
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      ></input>
      <p>Password</p>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <StyledButton onClick={submit}>enter</StyledButton>
      <p className="alert"></p>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
`;

const StyledButton = styled.button`
  margin-top: 30px;
`;

export default AuthBox;
