import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthBox from "./AuthBox";

function Login() {
  return (
    <div class="section">
      <p>Login</p>
      <AuthBox isLogin={true} />
      <StyledDiv>
        회원이 아니라면?
        <Link to="/signup">
          <SytleSpan>회원가입</SytleSpan>
        </Link>
      </StyledDiv>
    </div>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SytleSpan = styled.div`
  margin-left: 8px;
  color: blue;
`;
export default Login;
