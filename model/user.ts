import { Schema, models, model } from "mongoose";

const user = new Schema(
    {
        name: String,
        surname: String,
        password: String,
        email: String,
        avatar: String,
        points: Number,
    },
    { versionKey: false }
);
const users = models.users || model("users", user);

export default users;
