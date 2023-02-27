import styled from "styled-components";
import Link from "next/link";
import { SlClose } from "react-icons/sl";

export default function Player({
  playerId,
  name,
  points,
  gameId,
  currentGame,
  onDeletePlayer,
}) {
  return (
    <StyledPlayer>
      <StyledDeleteButton
        onClick={() => onDeletePlayer(playerId, currentGame, gameId)}
      >
        <SlClose />
      </StyledDeleteButton>
      <StyledLink href={`/game/${gameId}/player/${playerId}`}>
        {name}
      </StyledLink>
      <StyledPoints>
        {points === 1
          ? `${points} Point`
          : points === ""
          ? `0 Points`
          : `${points} Points`}
      </StyledPoints>
    </StyledPlayer>
  );
}

const StyledPlayer = styled.section`
  display: grid;
  grid-template-areas: "delete name name points";
  grid-template-columns: 0.3fr 2fr 1fr;
  margin: 10px 0;
`;

const StyledDeleteButton = styled.button`
  border: none;
  background-color: transparent;
`;

const StyledLink = styled(Link)`
  grid-area: "name";
  text-decoration: none;
  color: black;
`;

const StyledPoints = styled.div`
  grid-area: "points";
`;
