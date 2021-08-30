import React from "react";
import styled from "styled-components";
import AuthBox from "./AuthBox";

function SignUp() {
  return (
    <StyledSection>
      <p>SignUp</p>
      <AuthBox />
    </StyledSection>
  );
}

const StyledSection = styled.div``;

const StyledSpan = styled.span`
  margin: 0px 30px;
`;

export default SignUp;
