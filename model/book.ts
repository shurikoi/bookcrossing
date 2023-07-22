import { Schema, models, model } from "mongoose";

const book = new Schema(
    {
        name: String,
        author: String,
        description: String,
        date: Date,
    },
    { versionKey: false }
);

const books = models?.books || model("users", book);

export default books;
