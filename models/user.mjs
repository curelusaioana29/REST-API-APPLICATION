// user.mjs

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";

const { Schema } = mongoose;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (this.isNew) {
    this.avatarURL = gravatar.url(this.email, { s: "250", d: "retro" }, true);
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
