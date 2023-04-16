import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    email: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 }
});

// Export model
export default mongoose.model("User", UserSchema);
