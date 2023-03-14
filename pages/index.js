import { Fragment } from "react";
import CreateGame from "../components/HomePage/CreateGame";
import Game from "../components/HomePage/Game";
import { useSession } from "next-auth/react";
import Login from "../components/Login";

export default function Home({ onCreateGame, onDelete, games }) {
  const { data: session } = useSession();
  return (
    <>
      <Login />
      {session && (
        <>
          <h1>GameChanger 🎲</h1>
          <CreateGame onCreateGame={onCreateGame} />
          {games.map((game) => (
            <Fragment key={game.id}>
              <Game name={game.name} onDelete={onDelete} id={game.id} />
            </Fragment>
          ))}
        </>
      )}
    </>
  );
}
