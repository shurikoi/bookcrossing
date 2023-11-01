import { Schema, models, model } from "mongoose";

const user = new Schema(
    {
        name: String,
        surname: String,
        password: String,
        email: String,
        provider: { type: String, default: "credentials" },
        avatar: { type: String, value: "/avatars/01.png" },
        points: { type: Number, default: 1 },
        contact: { Telegram: String, Snapchat: String, Messenger: String, Instagram: String },
        date: Date,
    },
    { versionKey: false }
);
const users = models.users || model("users", user);

export default users;
