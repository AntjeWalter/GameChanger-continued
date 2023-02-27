import styled from "styled-components";
import { SlClose } from "react-icons/sl";

export default function Contestant({
  contestantId,
  name,
  points,
  onAddContestantPoints,
  onRemoveContestantPoints,
  onDeleteContestant,
  currentGame,
  gameId,
}) {
  return (
    <StyledContestant>
      <StyledDeleteButton
        onClick={() => onDeleteContestant(contestantId, currentGame, gameId)}
      >
        <SlClose />
      </StyledDeleteButton>
      <StyledName>{name}</StyledName>
      <StyledPoints>
        {points === 1 ? `${points} Point` : `${points} Points`}{" "}
      </StyledPoints>
      <StyledButtons>
        <StyledRemoveButton
          aria-label="Remove one point"
          onClick={() =>
            onRemoveContestantPoints(contestantId, currentGame, gameId)
          }
        >
          -
        </StyledRemoveButton>
        <StyledAddButton
          aria-label="Add one point"
          onClick={() =>
            onAddContestantPoints(contestantId, currentGame, gameId)
          }
        >
          +
        </StyledAddButton>
      </StyledButtons>
    </StyledContestant>
  );
}

const StyledContestant = styled.section`
  display: grid;
  grid-template-areas: "name name points buttons";
  grid-template-columns: 0.2fr 1fr 1fr 1fr;
  margin: 10px 0;
  gap: 3px;
`;

const StyledDeleteButton = styled.button`
  border: none;
  background-color: transparent;
`;

const StyledName = styled.div`
  grid-area: "name";
`;

const StyledPoints = styled.div`
  grid-area: "points";
`;

const StyledButtons = styled.div`
  grid-area: "buttons";
  justify-self: right;
`;

const StyledRemoveButton = styled.button`
  border: none;
  border-radius: 2px;
  background-color: #990d35;
  color: white;
  font-size: 1.1rem;
  width: 25px;
`;

const StyledAddButton = styled.button`
  background-color: #0d9971;
  border: none;
  border-radius: 2px;
  color: white;
  margin-left: 2px;
  font-size: 1.1rem;
  width: 25px;
`;
