import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import GlobalStyles from "../components/GlobalStyles";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [games, setGames] = useState([]);

  async function getGames() {
    const response = await fetch("/api/games");
    const gamesList = await response.json();
    setGames(gamesList);
  }

  useEffect(() => {
    getGames();
  }, []);

  async function handleCreateGame(newGame) {
    await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    });
    getGames();
  }

  async function handleDeleteGame(id) {
    if (confirm("Do you really want to delete this game?")) {
      await fetch("/api/games/" + id, {
        method: "DELETE",
      });
    }
    getGames();
  }

  async function handleAddNewPlayer(newPlayer, gameId) {
    const currentGame = games.find((game) => game.id === gameId);
    const gameWithNewPlayer = {
      ...currentGame,
      players: [...currentGame.players, newPlayer],
    };

    await fetch("/api/games/" + gameId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameWithNewPlayer),
    });
    getGames();
  }

  async function handleAddNewContestant(newContestant, gameId) {
    const currentGame = games.find((game) => game.id === gameId);
    const gameWithNewContestant = {
      ...currentGame,
      contestants: [...currentGame.contestants, newContestant],
    };

    await fetch("/api/games/" + gameId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameWithNewContestant),
    });
    getGames();
  }

  async function handleAddNotes(gameNotes, gameId) {
    const currentGame = games.find((game) => game.id === gameId);
    const gameWithNotes = { ...currentGame, notes: gameNotes };

    await fetch("/api/games/" + gameId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameWithNotes),
    });
    getGames();
  }

  async function handleAddRules(gameRules, gameId) {
    const currentGame = games.find((game) => game.id === gameId);
    const gameWithRules = { ...currentGame, rules: gameRules };

    await fetch("/api/games/" + gameId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameWithRules),
    });
    getGames();
  }

  async function handleAddChosenContestants(chosenName, playerId, gameId) {
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

    const gameWithPlayersChosenContestant = {
      ...currentGame,
      players: playerWithChosenContestant,
    };

    await fetch("/api/games/" + gameId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameWithPlayersChosenContestant),
    });
    getGames();
  }

  async function handleDeleteChosenContestant(
    contestantId,
    gameId,
    currentPlayerId
  ) {
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

      const playerWithUpdatedList = currentGame.players.map((player) =>
        player.id === currentPlayerId
          ? {
              ...player,
              chosenContestants: updatedList,
            }
          : player
      );

      const gameWithUpdatedChosenContestantList = {
        ...currentGame,
        players: playerWithUpdatedList,
      };

      await fetch("/api/games/" + gameId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameWithUpdatedChosenContestantList),
      });
      getGames();
    }
  }

  async function handleAddContestantPoints(contestantId, currentGame, gameId) {
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

    const gameWithAddedContestantPoints = {
      ...currentGame,
      players: playersNewSumOfPoints,
      contestants: contestantNewPoints,
    };

    await fetch("/api/games/" + gameId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameWithAddedContestantPoints),
    });
    getGames();
  }

  async function handleRemoveContestantPoints(
    contestantId,
    currentGame,
    gameId
  ) {
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

    const gameWithRemovedContestantPoints = {
      ...currentGame,
      players: playersNewSumOfPoints,
      contestants: contestantNewPoints,
    };

    await fetch("/api/games/" + gameId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameWithRemovedContestantPoints),
    });
    getGames();
  }

  async function handleDeleteContestant(contestantId, currentGame, gameId) {
    const updatedContestantList = currentGame.contestants.filter(
      (contestant) => {
        return contestant.id !== contestantId;
      }
    );

    const gameWithoutDeletedContestant = {
      ...currentGame,
      contestants: [...updatedContestantList],
    };

    await fetch("/api/games/" + gameId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameWithoutDeletedContestant),
    });
    getGames();
  }

  async function handleDeletePlayer(playerId, currentGame, gameId) {
    const updatedPlayerList = currentGame.players.filter((player) => {
      return player.id !== playerId;
    });

    const gameWithoutDeletedPlayer = {
      ...currentGame,
      players: [...updatedPlayerList],
    };

    await fetch("/api/games/" + gameId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameWithoutDeletedPlayer),
    });
    getGames();
  }

  return (
    <SessionProvider session={session}>
      <Head>
        <title>GameChanger</title>
      </Head>
      <GlobalStyles />
      <Component
        {...pageProps}
        onCreateGame={handleCreateGame}
        onDelete={handleDeleteGame}
        onAddNewPlayer={handleAddNewPlayer}
        onAddNewContestant={handleAddNewContestant}
        onAddChosenContestants={handleAddChosenContestants}
        onDeleteChosenContestant={handleDeleteChosenContestant}
        onAddContestantPoints={handleAddContestantPoints}
        onRemoveContestantPoints={handleRemoveContestantPoints}
        onAddNotes={handleAddNotes}
        onAddRules={handleAddRules}
        onDeleteContestant={handleDeleteContestant}
        onDeletePlayer={handleDeletePlayer}
        games={games}
      />
    </SessionProvider>
  );
}

export default MyApp;
