import type { NextApiResponse } from "next";
import { MongoClient, Db, Collection } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGODB_URI as string;
const database = process.env.MONGODB_DATABASE as string;
const collection = process.env.MONGODB_COLLECTION as string;
const client = new MongoClient(uri);

// Interface for the items stored in the database
interface Item {
  sentence: string;
}

async function connectToDatabase(): Promise<Collection<Item>> {
  await client.connect();
  const db: Db = client.db(database);
  return db.collection<Item>(collection);
}

export const GET = async (
  req: NextRequest,
  res: NextApiResponse
): Promise<NextResponse> => {
  try {
    const limit = Number(req.nextUrl.searchParams.get("page")) || 10;
    const collection: Collection<Item> = await connectToDatabase();
    const items: Item[] = await collection.find({}, { limit }).toArray();
    const data = items.map((item) => item.sentence);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
