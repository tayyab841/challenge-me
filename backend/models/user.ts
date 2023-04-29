import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },
    games_played: { type: Number, min: 0, default: 0 },
    win_percentage: { type: Number, min: 0, max: 100, default: 0 },
    status: { type: String, enum: ['online', 'offline'], default: 'offline' }
});

// Export model
export default mongoose.model("User", UserSchema);
