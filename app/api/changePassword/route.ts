import users from "@/model/user"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const newPassword = await req.text()

    const { user } = (await getServerSession(authOptions)) as { user: { email: string } };

    users.updateOne({ email: user.email }, { password: newPassword })
}