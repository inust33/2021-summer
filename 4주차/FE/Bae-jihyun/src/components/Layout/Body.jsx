import React, { useCallback } from "react";
import styled from "styled-components";

function Body() {
  const handleToDoSubmit = useCallback((event) => {}, []);

  return (
    <StyledSection>
      <StyledForm id="todo-form">
        <StyledInput
          type="text"
          placeholder="Write a To Do and Press Enter"
          required
        />
        <button onClick={handleToDoSubmit}>제출</button>
      </StyledForm>
      <ul id="todo-list"></ul>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  flex: 1;
  margin-top: 10px;
`;
const StyledForm = styled.form`
  display: flex;
  justify-content: center;
`;
const StyledInput = styled.input`
  width: 200px;
  margin-right: 8px;
`;

export default Body;
