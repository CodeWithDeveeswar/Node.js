// Define the User schema and create the Mongoose model
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_name: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },

  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
