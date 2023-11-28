import { Schema, models, model } from "mongoose";

const user = new Schema(
  {
    name: String,
    surname: String,
    password: String,
    login: String,
    group: String,
    email: String,
    avatar: { type: String, default: "/avatars/01.png" },
    points: { type: Number, default: 1 },
    contact: { Telegram: String, Snapchat: String, Messenger: String, Instagram: String },
  },
  { versionKey: false }
);

const users = models.users || model("users", user);

export default users;
