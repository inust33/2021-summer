import React from "react";
import styled from "styled-components";
import Body from "./Layout/Body";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header.jsx";

function Feed() {
  return (
    <>
      <p>Feed</p>
      <StyledSection>
        <Header />
        <Body />
        <Footer />
      </StyledSection>
    </>
  );
}
const StyledSection = styled.section`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
export default Feed;
