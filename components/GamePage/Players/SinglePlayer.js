import { Fragment } from "react";
import ChosenContestant from "./ChosenContestants";
import styled from "styled-components";
import { SlTrophy } from "react-icons/sl";

export default function SinglePlayer({
  playerId,
  currentGame,
  currentPlayer,
  onAddChosenContestants,
  onDeleteChosenContestant,
  sumOfChosenContestantsPoints,
}) {
  const currentName = currentPlayer.name;
  const contestants = currentGame.contestants;
  const gameId = currentGame.id;
  const currentPlayersContestants = currentPlayer.chosenContestants;

  function handleChange(event) {
    event.preventDefault();
    const chosenName = event.target.value;
    onAddChosenContestants(chosenName, playerId, gameId, contestants);
    event.target.value = "selected";
  }

  return (
    <>
      <h3>Player: {currentName}</h3>
      <p>
        <SlTrophy /> Total points: {sumOfChosenContestantsPoints}
      </p>
      <br />
      <h4>Chosen Contestants:</h4>
      <StyledSelect onChange={handleChange}>
        <option value="selected">Which contestant do you bet on?</option>
        {contestants.map((contestant) => (
          <option key={contestant.id}>{contestant.name}</option>
        ))}
      </StyledSelect>
      <StyledList>
        {currentPlayersContestants.map((contestant) => (
          <Fragment key={contestant.id}>
            <ChosenContestant
              contestantId={contestant.id}
              contestantName={contestant.name}
              contestantPoints={contestant.points}
              onDeleteChosenContestant={onDeleteChosenContestant}
              gameId={currentGame.id}
              currentPlayerId={currentPlayer.id}
            />
          </Fragment>
        ))}
      </StyledList>
    </>
  );
}

const StyledSelect = styled.select`
  font-family: inherit;
  width: 70%;
  height: 30px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding-left: 10px;
`;
