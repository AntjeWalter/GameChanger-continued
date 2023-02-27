import { useRouter } from "next/router";
import SinglePlayer from "../../../../components/GamePage/Players/SinglePlayer";
import styled from "styled-components";
import { SlArrowLeftCircle } from "react-icons/sl";

export default function PlayerPage({
  gameId,
  onAddChosenContestants,
  onDeleteChosenContestant,
  games,
  onSumChange,
}) {
  const router = useRouter();
  const { id, playerId } = router.query;

  if (!games) {
    return null;
  }

  const currentGame = games.find((game) => game.id === id);

  if (!currentGame) {
    return null;
  }

  const currentPlayer = currentGame.players.find(
    (player) => player.id === playerId
  );

  const arrayOfChosenContestantsPoints = currentPlayer.chosenContestants.map(
    (points) => points.points
  );

  const sumOfChosenContestantsPoints = arrayOfChosenContestantsPoints.reduce(
    (a, b) => {
      return a + b;
    },
    0
  );

  const playerWithChosenContestantPoints = {
    ...currentPlayer,
    points: sumOfChosenContestantsPoints,
  };

  return (
    <>
      <SinglePlayer
        playerId={playerId}
        gameId={gameId}
        currentPlayer={currentPlayer}
        currentGame={currentGame}
        onAddChosenContestants={onAddChosenContestants}
        onDeleteChosenContestant={onDeleteChosenContestant}
        sumOfChosenContestantsPoints={sumOfChosenContestantsPoints}
        onSumChange={onSumChange}
      />
      <StyledBackButton onClick={() => router.back()}>
        <SlArrowLeftCircle /> Back
      </StyledBackButton>
    </>
  );
}

const StyledBackButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 20px;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  font-family: inherit;
`;
