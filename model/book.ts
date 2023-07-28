import { Schema, models, model } from "mongoose";

const book = new Schema(
    {
        title: String,
        category: String,
        owner: String,
        author: String,
        image: String,
        description: String,
        date: Date,
    },
    { versionKey: false }
);

const books = models.books || model("books", book);

export default books;
