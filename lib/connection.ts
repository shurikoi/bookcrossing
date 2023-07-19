import { connect, createConnection } from "mongoose";

export default async function connection() {
    const connectURI = process.env.MONGO_URI as string;

    await connect(connectURI);
}
