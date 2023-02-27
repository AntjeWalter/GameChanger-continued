import { Fragment } from "react";
import Contestant from "./Contestant";

export default function ContestantsAndPoints({
  contestantsArray,
  onAddContestantPoints,
  onRemoveContestantPoints,
  onDeleteContestant,
  currentGame,
  gameId,
}) {
  return contestantsArray.map((contestant) => {
    return (
      <Fragment key={contestant.id}>
        <Contestant
          contestantId={contestant.id}
          name={contestant.name}
          points={contestant.points}
          onAddContestantPoints={onAddContestantPoints}
          onRemoveContestantPoints={onRemoveContestantPoints}
          onDeleteContestant={onDeleteContestant}
          currentGame={currentGame}
          gameId={gameId}
        />
      </Fragment>
    );
  });
}
