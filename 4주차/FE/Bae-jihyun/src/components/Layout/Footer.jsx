import React from "react";
import styled from "styled-components";

function Footer() {
  return <SytledFooter>만든이 : 단국대학교 배지현</SytledFooter>;
}
const SytledFooter = styled.footer`
  display: flex;
  align-items: center;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 30px;
  background-color: lightblue;
`;
export default Footer;
