import { connect, connection } from "mongoose";

export default async function connectionToDatabase() {
    const connectURI = process.env.MONGO_URI as string;

    if (connection.readyState != 1 && connection.readyState != 2) 
    return connect(connectURI);
}
