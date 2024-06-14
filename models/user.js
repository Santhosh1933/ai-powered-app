import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  userId: {
    type: String,
    required: [true, "userId is required"],
  },
  plan: {
    type: String,
    enum: ["free", "basic", "premium"],
    default: "free",
    required: [true, "plan is required"],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
