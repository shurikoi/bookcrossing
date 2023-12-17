const { Schema, ObjectId, connect, connection, models, model } = require("mongoose");

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
    expires: Date,
    shownContact: Number,
  },
  { versionKey: false }
);

const books = models.books || model("books", book);

async function db() {
  const connectURI =
    "mongodb+srv://Amatsu:n3Wf5ppM5plGywF0@bookcrossingcluster.lcqsqz9.mongodb.net/Bookcrossing?retryWrites=true&w=majority";

  await connect(connectURI);
}

async function handleBookReservation() {
  await db();

  const reservedBooks = await books.find({ reservedBy: { $exists: true } }, { expires: 1, _id: 1 });

  const expiredBooks = reservedBooks.map(async (reservedBook) => {
    if (new Date(reservedBook.expires).getTime() - Date.now() <= 0)
      return books.updateOne({ _id: reservedBook._id }, { $unset: { expires: "", reservedBy: "" } });
  });

  Promise.all(expiredBooks).then(() => connection.close());
}

setInterval(handleBookReservation, 1000 * 60);
