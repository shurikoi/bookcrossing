import { Schema, model, models } from "mongoose";

const user = new Schema(
  {
    name: String,
    surname: String,
    password: String,
    login: String,
    group: String,
    email: String,
    avatar: { type: String, default: "/api/avatars/01.png" },
    points: { type: Number, default: 1 },
    contact: { Telegram: String, Snapchat: String, Messenger: String, Instagram: String },
  },
  { versionKey: false }
);

const users = models.users || model("users", user);

export default users;
