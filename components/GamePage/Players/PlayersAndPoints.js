import { Fragment } from "react";
import Player from "./Player";

export default function PlayersAndPoints({
  playersArray,
  onAddPoints,
  onRemovePoints,
  gameId,
  currentGame,
  onAddChosenContstants,
  onDeletePlayer,
  games,
}) {
  return playersArray.map((player) => {
    return (
      <Fragment key={player.id}>
        <Player
          playerId={player.id}
          name={player.name}
          points={player.points}
          onAddPoints={onAddPoints}
          onRemovePoints={onRemovePoints}
          gameId={gameId}
          currentGame={currentGame}
          onAddChosenContstants={onAddChosenContstants}
          onDeletePlayer={onDeletePlayer}
          games={games}
        />
      </Fragment>
    );
  });
}
