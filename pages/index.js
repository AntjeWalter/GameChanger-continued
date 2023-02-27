import { Fragment } from "react";
import CreateGame from "../components/HomePage/CreateGame";
import Game from "../components/HomePage/Game";

export default function Home({ onCreateGame, onDelete, games }) {
  return (
    <>
      <h1>GameChanger 🎲</h1>
      <CreateGame onCreateGame={onCreateGame} />
      {games.map((game) => (
        <Fragment key={game.id}>
          <Game name={game.name} onDelete={onDelete} id={game.id} />
        </Fragment>
      ))}
    </>
  );
}
