import dbConnect from "../../../db/dbConnect";
import Games from "../../../db/Models/Games";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const id = req.query.id;
    // const {id} = req.query;

    try {
      const game = await Games.findById(id);
      res.status(200).json({
        id: game._id,
        name: game.name,
        rules: game.rules,
        notes: game.notes,
        players: game.players,
        contestants: game.contestants,
      });
    } catch {
      res.status(400).json({ message: "mistake" });
    }
  }

  if (req.method === "DELETE") {
    const id = req.query.id;

    const result = await Games.findByIdAndDelete(id);

    if (result) {
      res.status(200).json({ message: "game deleted" });
    } else {
      res.status(404).json({ message: "document not found" });
    }
  }

  if (req.method === "PUT") {
    const id = req.query.id;

    const updatedGame = await Games.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    res.status(200).json(updatedGame);
  }
}
