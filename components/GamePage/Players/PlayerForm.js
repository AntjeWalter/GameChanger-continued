import { nanoid } from "nanoid";
import styled from "styled-components";

export default function PlayerForm({ onAddNewPlayer, gameId }) {
  function handlePlayerSubmit(event) {
    event.preventDefault();
    const player = event.target.player.value;
    const newPlayer = {
      name: player,
      points: "",
      id: nanoid(),
      chosenContestants: [],
    };
    onAddNewPlayer(newPlayer, gameId);
    event.target.reset();
  }

  return (
    <>
      <StyledForm onSubmit={handlePlayerSubmit}>
        <label>Add players:</label>
        <StyledInput placeholder="Player Name" name="player"></StyledInput>
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
