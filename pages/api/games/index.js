import dbConnect from "../../../db/dbConnect";
import Games from "../../../db/Models/Games";
//import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  await dbConnect();

  /*   const session = await getSession({ req });
  const email = session?.user.email;

  if (!email) {
    return res.status(401).json({ message: "Bitte erneut einloggen" });
  } */

  if (req.method === "GET") {
    const games = await Games.find();
    const gamesArray = games.map((game) => {
      return {
        id: game._id,
        name: game.name,
        rules: game.rules,
        notes: game.notes,
        players: game.players,
        contestants: game.contestants,
      };
    });

    res.status(200).json(gamesArray);
  }

  if (req.method === "POST") {
    const data = req.body;

    try {
      const newGame = await Games.create(data);

      return res.status(201).json(newGame);
    } catch (error) {
      return res.status(404).json({ error });
    }
  }
}
