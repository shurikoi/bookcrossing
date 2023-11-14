const mongoose = require("mongoose")

const user = new mongoose.Schema(
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
const users = mongoose.models.users || mongoose.model("users", user);

async function connection() {
    const connectURI = 'mongodb://127.0.0.1:27017/Bookcrossing';

    mongoose.connect(connectURI);
}

async function getUsers(){
    await connection()

    const allUsers = await users.find({})

    mongoose.connection.close()

    console.log(allUsers)
}

getUsers()