import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const { id }: { id: string } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 404 });

  await connection();

  const book = await books.findOne(
    {
      _id: id,
      $or: [
        { reservedBy: new ObjectId(session.user?.id) },
        { owner: new ObjectId(session.user?.id) },
        { reservedBy: { $exists: false } },
      ],
    },
    { shownContact: 0 }
  );

  if (book.reservedBy) {
    book._doc.isReserved = true;
    delete book._doc.reservedBy;
  }

  if (!book) return NextResponse.json({}, { status: 404 });

  const owner = await users.findOne({ _id: book?.owner }, { _id: 0, avatar: 1, name: 1, surname: 1 });

  book._doc.id = book._doc._id
  delete book._doc._id

  return NextResponse.json({ ...book?._doc, ownerData: owner?._doc });
}
