import connectToDatabase from "../../../utils/mongodb";
import mongodb, { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

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
