
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";


export async function GET(request) {
  const id = await request.url.slice(request.url.lastIndexOf('/')+1)
  try {
    const client = await clientPromise;
    const db = client.db("da");
    const posts = await db.collection("user").find({ _id: new ObjectId(id) }).toArray();
    return new Response(JSON.stringify(posts));
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: "error" }));
  }
}

  
