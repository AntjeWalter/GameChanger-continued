import mongoose from "mongoose";

const { Schema } = mongoose;

const contestantsSchema = new Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  id: { type: String, required: true },
});

const chosenContestantsSchema = new Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  id: { type: String, required: true },
});

const playersSchema = new Schema({
  name: { type: String, required: true },
  points: { type: String, required: true },
  chosenContestants: [chosenContestantsSchema],
  id: { type: String, required: true },
});

const gamesSchema = new Schema({
  name: { type: String, required: true },
  notes: { type: String, required: false },
  rules: { type: String, required: false },
  players: [playersSchema],
  contestants: [contestantsSchema],
  user: { type: String, required: true },
});

const Games = mongoose.models.Games || mongoose.model("Games", gamesSchema);

export default Games;
