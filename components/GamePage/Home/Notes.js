import styled from "styled-components";
import { useState } from "react";
import { SlNote } from "react-icons/sl";

export default function Notes({ onAddNotes, notes, gameId }) {
  const [edit, setEdit] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const gameNotes = event.target.notes.value;
    onAddNotes(gameNotes, gameId);
    setEdit(false);
    event.target.reset();
  }

  return (
    <>
      <StyledHeadline>Notes:</StyledHeadline>
      {edit ? (
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextarea
            placeholder="Notes for the game"
            defaultValue={notes}
            name="notes"
            cols="20"
          ></StyledTextarea>
          <StyledButton type="submit">Add notes</StyledButton>
        </StyledForm>
      ) : (
        <StyledNotesContainer>
          <StyledNotes>{notes}</StyledNotes>
          <StyledEditButton onClick={() => setEdit(true)}>
            <SlNote />
          </StyledEditButton>
        </StyledNotesContainer>
      )}
    </>
  );
}

const StyledHeadline = styled.h4`
  margin-bottom: 10px;
`;

const StyledNotesContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const StyledNotes = styled.p`
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
