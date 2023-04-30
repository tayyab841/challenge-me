import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
    player_one: { type: Schema.Types.ObjectId, ref: "User" },
    player_two: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ['accepted', 'rejected', 'pending'], default: 'pending' }
});

// Export model
export default mongoose.model("Challenge", ChallengeSchema);
