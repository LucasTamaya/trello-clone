import { ObjectId } from "mongodb";
import connectToDatabase from "../../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

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
