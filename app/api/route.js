import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("da");
    const posts = await db.collection("user").find({}).toArray();
    return new Response(JSON.stringify(posts));
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ message: "error" }));
  }
}

export async function POST(request) {
  const postdata = await request.json();
  const client = await clientPromise;
  const db = client.db("da");
  const resss = await db.collection("user").insertOne({
    task: postdata.task,
    timeadd: new Date(),
    checked: false,
  });

  return new Response(JSON.stringify({ 
    _id:resss.insertedId,
    task: postdata.task,
    timeadd: new Date(),
    checked: false
  }));
}

export async function PATCH(request) {
  try {
    const postdata = await request.json();
    const client = await clientPromise;
    const db = client.db("da");
    db.collection("user").updateOne(
      { _id: new ObjectId(postdata._id) },
      { $set: { checked: postdata.checked } }
    );
    return new Response(JSON.stringify({
      _id: postdata._id,
      checked: !postdata.checked ,
      timeadd: postdata.timeadd,
      task:postdata.task
      }));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error }));
  }
}

export async function DELETE(request) {
  const delData = await request.json();
  const client = await clientPromise;
  const db = client.db("da");
  db.collection("user").deleteOne({ _id: new ObjectId(delData._id) });
  return new Response(JSON.stringify({ message: `delete id${delData._id}`}));
}
