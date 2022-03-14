import connectToDatabase from "../../../utils/mongodb";
import { ObjectId } from "mongodb";
import { nextCors } from "../../../utils/cors";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // CORS middleware
  await nextCors(req, res);

  const { id } = req.query;

  const { _id, title, taskIds } = req.body;

  console.log(req.body);

  const newList = await db.collection("boards").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $push: {
        "initialData.columns": {
          _id: _id,
          title: title,
          taskIds: taskIds,
        },
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      }

      if (!err) {
        console.log(data);
      }
    }
  );

  return res.status(200).send({ message: "NoError" });
}
