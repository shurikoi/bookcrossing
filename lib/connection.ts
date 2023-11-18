import { connect, connection as connectionToDatabase } from "mongoose";

export default async function connection() {
    const connectURI = process.env.MONGO_URI as string;

    if (connectionToDatabase.readyState != 1 && connectionToDatabase.readyState != 2) return connect(connectURI);
}
