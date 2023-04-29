import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  player_one: { type: Schema.Types.ObjectId, ref: "User" },
  player_two: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, required: true, maxLength: 100 },
  winner: { type: Schema.Types.ObjectId, ref: "User" },
  in_progress: { type: Boolean, default: false }
});

// Export model
export default mongoose.model("Game", UserSchema);
