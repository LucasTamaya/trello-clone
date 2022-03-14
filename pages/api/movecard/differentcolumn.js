import { ObjectId } from "mongodb";
import connectToDatabase from "../../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { newState, index, id } = req.body;

  const moveCard = await db.collection("boards").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        "initialData.columns": newState,
      },
    }
  );
}
