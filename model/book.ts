import { Schema, models, model } from "mongoose";

const book = new Schema(
    {
        name: String,
        owner: String,
        author: String,
        description: String,
        date: Date,
    },
    { versionKey: false }
);

const books = models.books || model("books", book);

export default books;
