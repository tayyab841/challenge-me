import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  player_one: { type: Schema.Types.ObjectId, ref: "Player" },
  player_two: { type: Schema.Types.ObjectId, ref: "Player" },
  winner: { type: Schema.Types.ObjectId, ref: "Player" },
  in_progress: { type: Boolean, default: true }
});

// Export model
export default mongoose.model("Game", UserSchema);
