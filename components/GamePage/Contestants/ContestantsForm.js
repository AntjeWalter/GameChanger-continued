import { nanoid } from "nanoid";
import styled from "styled-components";

export default function ContestantsForm({ onAddNewContestant, gameId }) {
  function handleContestantSubmit(event) {
    event.preventDefault();
    const contestant = event.target.contestant.value;
    const newContestant = {
      name: contestant,
      points: 0,
      id: nanoid(),
    };
    onAddNewContestant(newContestant, gameId);
    event.target.reset();
  }

  return (
    <>
      <StyledForm onSubmit={handleContestantSubmit}>
        <label>Add contestant:</label>
        <StyledInput
          placeholder="Contestant Name"
          name="contestant"
        ></StyledInput>
        <StyledButton type="submit">+</StyledButton>
      </StyledForm>
      <hr />
    </>
  );
}

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
`;

const StyledInput = styled.input`
  font-family: inherit;
`;

const StyledButton = styled.button`
  font-family: inherit;
`;
