import { ObjectId } from "mongodb";
import connectToDatabase from "../../utils/mongodb";
import { nextCors } from "../../utils/cors";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // CORS middleware
  await nextCors(req, res);

  const { newColumn, index, id } = req.body;

  const moveCard = await db.collection("boards").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        ["initialData.columns." + index]: newColumn,
      },
    }
  );
}
