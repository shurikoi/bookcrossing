import { ObjectId } from "mongodb";
import { Schema, models, model } from "mongoose";

const book = new Schema(
    {
        title: String,
        category: String,
        owner: ObjectId,
        author: String,
        image: String,
        description: String,
        messenger: String,
        messengerDescription: String,
        language: String,
        state: String,
        date: Date,
        reservedBy: ObjectId,
        shownContact: Number
    },
    { versionKey: false }
);

const books = models.books || model("books", book);

export default books;
