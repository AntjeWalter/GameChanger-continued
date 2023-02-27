import { useEffect } from "react";
import GlobalStyles from "../components/GlobalStyles";
import { useLocalStorage } from "../helpers/hooks";

function MyApp({ Component, pageProps }) {
  const [games, setGames] = useLocalStorage("games", []);

  function handleCreateGame(newGame) {
    setGames([...games, newGame]);
  }

  function handleDeleteGame(id) {
    if (confirm("Do you really want to delete this game?")) {
      const updatedGames = games.filter((game) => {
        return game.id !== id;
      });
      setGames([...updatedGames]);
    }
  }

  function handleAddNewPlayer(newPlayer, gameId) {
    setGames(
      games.map((game) =>
        game.id === gameId
          ? { ...game, players: [...game.players, newPlayer] }
          : game
      )
    );
  }

  function handleAddNewContestant(newContestant, gameId) {
    setGames(
      games.map((game) =>
        game.id === gameId
          ? { ...game, contestants: [...game.contestants, newContestant] }
          : game
      )
    );
  }

  function handleAddPoints(playerId, currentGame, gameId) {
    const currentPlayer = currentGame.players.find(
      (player) => player.id === playerId
    );

    const newPoints = currentPlayer.points + 1;
    const playerNewPoints = currentGame.players.map((player) =>
      player.id === playerId ? { ...player, points: newPoints } : player
    );

    setGames(
      games.map((game) =>
        game.id === gameId
          ? {
              ...game,
              players: playerNewPoints,
            }
          : game
      )
    );
  }

  function handleRemovePoints(playerId, currentGame, gameId) {
    const currentPlayer = currentGame.players.find(
      (player) => player.id === playerId
    );

    const newPoints = currentPlayer.points - 1;
    const playerNewPoints = currentGame.players.map((player) =>
      player.id === playerId ? { ...player, points: newPoints } : player
    );

    setGames(
      games.map((game) =>
        game.id === gameId
          ? {
              ...game,
              players: playerNewPoints,
            }
          : game
      )
    );
  }

  function handleAddNotes(gameNotes, gameId) {
    setGames(
      games.map((game) =>
        game.id === gameId ? { ...game, notes: gameNotes } : game
      )
    );
  }

  function handleAddRules(gameRules, gameId) {
    setGames(
      games.map((game) =>
        game.id === gameId ? { ...game, rules: gameRules } : game
      )
    );
  }

  function handleAddChosenContestants(chosenName, playerId, gameId) {
    const currentGame = games.find((game) => game.id === gameId);

    const addedContestant = currentGame.contestants.find(
      (contestant) => contestant.name === chosenName
    );

    const playerWithChosenContestant = currentGame.players.map((player) =>
      player.id === playerId
        ? {
            ...player,
            chosenContestants: [...player.chosenContestants, addedContestant],
          }
        : player
    );

    setGames(
      games.map((game) =>
        game.id === gameId
          ? {
              ...game,
              players: playerWithChosenContestant,
            }
          : game
      )
    );
  }

  function handleDeleteChosenContestant(contestantId, gameId, currentPlayerId) {
    if (
      confirm("Do you really want to delete this contestant from the list?")
    ) {
      const currentGame = games.find((game) => game.id === gameId);
      const currentPlayer = currentGame.players.find(
        (player) => player.id === currentPlayerId
      );
      const currentPlayersContestants = currentPlayer.chosenContestants;

      const updatedList = currentPlayersContestants.filter((contestant) => {
        return contestant.id !== contestantId;
      });

      console.log(updatedList, "updatedList");

      const playerWithUpdatedList = currentGame.players.map((player) =>
        player.id === currentPlayerId
          ? {
              ...player,
              chosenContestants: updatedList,
            }
          : player
      );

      setGames(
        games.map((game) =>
          game.id === gameId
            ? {
                ...game,
                players: playerWithUpdatedList,
              }
            : game
        )
      );
    }
  }

  function handleAddContestantPoints(contestantId, currentGame, gameId) {
    const currentContestant = currentGame.contestants.find(
      (contestant) => contestant.id === contestantId
    );

    const newPoints = currentContestant.points + 1;

    const contestantNewPoints = currentGame.contestants.map((contestant) =>
      contestant.id === contestantId
        ? { ...contestant, points: newPoints }
        : contestant
    );

    const playersChosenContestantWithNewPoints = currentGame.players.map(
      (player) => {
        return {
          ...player,
          chosenContestants: player.chosenContestants.map((contestant) =>
            contestant.id === contestantId
              ? { ...contestant, points: contestant.points + 1 }
              : contestant
          ),
        };
      }
    );

    const playersNewSumOfPoints = playersChosenContestantWithNewPoints.map(
      (player) => {
        return {
          ...player,
          points: player.chosenContestants
            .map((points) => points.points)
            .reduce((a, b) => {
              return a + b;
            }, 0),
        };
      }
    );

    setGames(
      games.map((game) =>
        game.id === gameId
          ? {
              ...game,
              contestants: contestantNewPoints,
              players: playersNewSumOfPoints,
            }
          : game
      )
    );
  }

  function handleRemoveContestantPoints(contestantId, currentGame, gameId) {
    const currentContestant = currentGame.contestants.find(
      (contestant) => contestant.id === contestantId
    );

    const newPoints = currentContestant.points - 1;

    const contestantNewPoints = currentGame.contestants.map((contestant) =>
      contestant.id === contestantId
        ? { ...contestant, points: newPoints }
        : contestant
    );

    const playersChosenContestantWithNewPoints = currentGame.players.map(
      (player) => {
        return {
          ...player,
          chosenContestants: player.chosenContestants.map((contestant) =>
            contestant.id === contestantId
              ? { ...contestant, points: contestant.points - 1 }
              : contestant
          ),
        };
      }
    );

    const playersNewSumOfPoints = playersChosenContestantWithNewPoints.map(
      (player) => {
        return {
          ...player,
          points: player.chosenContestants
            .map((points) => points.points)
            .reduce((a, b) => {
              return a + b;
            }, 0),
        };
      }
    );

    setGames(
      games.map((game) =>
        game.id === gameId
          ? {
              ...game,
              contestants: contestantNewPoints,
              players: playersNewSumOfPoints,
            }
          : game
      )
    );
  }

  function handleDeleteContestant(contestantId, currentGame, gameId) {
    const updatedContestantList = currentGame.contestants.filter(
      (contestant) => {
        return contestant.id !== contestantId;
      }
    );
    setGames(
      games.map((game) =>
        game.id === gameId
          ? { ...game, contestants: [...updatedContestantList] }
          : game
      )
    );
  }

  function handleDeletePlayer(playerId, currentGame, gameId) {
    const updatedPlayerList = currentGame.players.filter((player) => {
      return player.id !== playerId;
    });
    setGames(
      games.map((game) =>
        game.id === gameId ? { ...game, players: [...updatedPlayerList] } : game
      )
    );
  }

  return (
    <>
      <GlobalStyles />
      <Component
        {...pageProps}
        onCreateGame={handleCreateGame}
        onDelete={handleDeleteGame}
        onAddNewPlayer={handleAddNewPlayer}
        onAddNewContestant={handleAddNewContestant}
        onAddChosenContestants={handleAddChosenContestants}
        onDeleteChosenContestant={handleDeleteChosenContestant}
        onAddPoints={handleAddPoints}
        onRemovePoints={handleRemovePoints}
        onAddContestantPoints={handleAddContestantPoints}
        onRemoveContestantPoints={handleRemoveContestantPoints}
        onAddNotes={handleAddNotes}
        onAddRules={handleAddRules}
        onDeleteContestant={handleDeleteContestant}
        onDeletePlayer={handleDeletePlayer}
        games={games}
      />
    </>
  );
}

export default MyApp;
