import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { SlArrowLeftCircle } from "react-icons/sl";
import PlayerForm from "../../../components/GamePage/Players/PlayerForm";
import PlayersAndPoints from "../../../components/GamePage/Players/PlayersAndPoints";
import NotesAndRules from "../../../components/GamePage/Home/NotesAndRules";
import ContestantsForm from "../../../components/GamePage/Contestants/ContestantsForm";
import ContestantsAndPoints from "../../../components/GamePage/Contestants/ContestantsAndPoints";
import Link from "next/link";

export default function GamePage({
  onAddNewPlayer,
  onAddNewContestant,
  onAddChosenContestants,
  onDeleteChosenContestant,
  onAddContestantPoints,
  onRemoveContestantPoints,
  onAddNotes,
  onAddRules,
  onDeleteContestant,
  onDeletePlayer,
  games,
}) {
  const router = useRouter();
  const { id } = router.query;

  const [home, setHome] = useState(true);
  const [players, setPlayers] = useState(false);
  const [contestants, setContestants] = useState(false);

  if (!games) {
    return null;
  }

  const currentGame = games.find((game) => game.id === id);

  if (!currentGame) {
    return null;
  }

  const playersArray = currentGame.players;
  const contestantsArray = currentGame.contestants;

  function handleClickHome() {
    setHome(true);
    setPlayers(false);
    setContestants(false);
  }

  function handleClickPlayers() {
    setHome(false);
    setPlayers(true);
    setContestants(false);
  }

  function handleClickContestants() {
    setHome(false);
    setPlayers(false);
    setContestants(true);
  }

  return (
    <>
      <h2>{currentGame.name}</h2>
      <StyledNavigation>
        <StyledButton onClick={handleClickHome}>Home</StyledButton>
        <StyledButton onClick={handleClickPlayers}>Players</StyledButton>
        <StyledButton onClick={handleClickContestants}>
          Contestants
        </StyledButton>
      </StyledNavigation>

      {home ? (
        <>
          <h3>Home</h3>
          <NotesAndRules
            gameId={currentGame.id}
            onAddNotes={onAddNotes}
            notes={currentGame.notes}
            onAddRules={onAddRules}
            rules={currentGame.rules}
          />
        </>
      ) : players ? (
        <>
          <h3>Players</h3>
          <PlayerForm onAddNewPlayer={onAddNewPlayer} gameId={currentGame.id} />
          <StyledInfo>Click on a player to choose contestants:</StyledInfo>
          <PlayersAndPoints
            gameId={currentGame.id}
            playersArray={playersArray}
            currentGame={currentGame}
            onAddChosenContestants={onAddChosenContestants}
            onDeleteChosenContestant={onDeleteChosenContestant}
            onDeletePlayer={onDeletePlayer}
            games={games}
          />
        </>
      ) : contestants ? (
        <>
          <h3>Contestants</h3>
          <ContestantsForm
            onAddNewContestant={onAddNewContestant}
            gameId={currentGame.id}
          />
          <StyledInfo>Give points to contestants:</StyledInfo>
          <StyledContestantContainer>
            <ContestantsAndPoints
              gameId={currentGame.id}
              contestantsArray={contestantsArray}
              onAddContestantPoints={onAddContestantPoints}
              onRemoveContestantPoints={onRemoveContestantPoints}
              onDeleteContestant={onDeleteContestant}
              currentGame={currentGame}
            />
          </StyledContestantContainer>
        </>
      ) : null}

      <Link href={`/`}>
        <StyledBackButton>
          <SlArrowLeftCircle /> Back
        </StyledBackButton>
      </Link>
    </>
  );
}

const StyledNavigation = styled.section`
  display: flex;
  justify-content: space-around;
  font-family: inherit;
`;

const StyledInfo = styled.p`
  font-size: 0.9rem;
  margin-bottom: 25px;
`;

const StyledContestantContainer = styled.section`
  margin-bottom: 50px;
`;

const StyledButton = styled.button`
  padding: 3px 10px;
  border: none;
  border-bottom: 3px solid #990d35;
  background-color: transparent;
  font-size: 0.9rem;
  font-family: inherit;
  font-weight: ;
`;

const StyledBackButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 20px;
  background-color: #f6f8ff;
  border: none;
  font-size: 1rem;
  font-family: inherit;
`;
