import { useState } from "react";
import styled from "styled-components";
import { SlNote } from "react-icons/sl";

export default function Rules({ onAddRules, rules, gameId }) {
  const [edit, setEdit] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const gameRules = event.target.rules.value;
    onAddRules(gameRules, gameId);
    setEdit(false);
    event.target.reset();
  }

  return (
    <>
      <StyledHeadline>Rules of the game:</StyledHeadline>
      {edit ? (
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextarea
            placeholder="Rules for the game"
            defaultValue={rules}
            name="rules"
            cols="20"
          ></StyledTextarea>
          <StyledButton type="submit">Add notes</StyledButton>
        </StyledForm>
      ) : (
        <StyledRulesContainer>
          <StyledRules>{rules}</StyledRules>
          <StyledEditButton onClick={() => setEdit(true)}>
            <SlNote />
          </StyledEditButton>
        </StyledRulesContainer>
      )}
    </>
  );
}

const StyledHeadline = styled.h4`
  margin-bottom: 10px;
`;

const StyledRulesContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledRules = styled.p`
  white-space: pre-line;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const StyledTextarea = styled.textarea`
  width: 70%;
  font-family: inherit;
  white-space: pre;
`;

const StyledButton = styled.button`
  font-family: inherit;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: #0d9971;
`;

const StyledEditButton = styled.button`
  font-family: inherit;
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: #0d9971;
  padding-top: 5px;
`;
