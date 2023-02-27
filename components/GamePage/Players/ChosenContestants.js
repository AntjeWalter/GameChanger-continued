import styled from "styled-components";
import { SlClose } from "react-icons/sl";

export default function ChosenContestant({
  contestantId,
  contestantName,
  contestantPoints,
  onDeleteChosenContestant,
  gameId,
  currentPlayerId,
}) {
  return (
    <StyledListItem>
      <StyledDeleteButton
        onClick={() =>
          onDeleteChosenContestant(contestantId, gameId, currentPlayerId)
        }
      >
        <SlClose />
      </StyledDeleteButton>
      {contestantName}:{" "}
      {contestantPoints === 1
        ? `${contestantPoints} Point`
        : `${contestantPoints} Points`}
    </StyledListItem>
  );
}

const StyledListItem = styled.li`
  margin-bottom: 10px;
`;

const StyledDeleteButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 0.9rem;
  margin-right: 10px;
`;
