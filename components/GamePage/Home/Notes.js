import styled from "styled-components";

export default function Notes({ onAddNotes, notes, gameId }) {
  function handleSubmit(event) {
    event.preventDefault();
    const gameNotes = event.target.notes.value;
    onAddNotes(gameNotes, gameId);
    event.target.reset();
  }

  return (
    <>
      <h4>Notes:</h4>
      <p>{notes}</p>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextarea
          placeholder="Notes for the game"
          name="notes"
        ></StyledTextarea>
        <StyledButton type="submit">Add notes</StyledButton>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const StyledTextarea = styled.textarea`
  width: 70%;
  font-family: inherit;
`;

const StyledButton = styled.button`
  width: 25%;
  font-family: inherit;
  border: none;
  border-radius: 5px;
  background-color: #0d9971;
`;
