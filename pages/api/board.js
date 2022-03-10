import connectToDatabase from "../../utils/mongodb";
import mongodb, { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  //   récupère l'id du board
  const { id } = req.query;

  // récupère toutes les listes du board
  const boardLists = await db
    .collection("lists")
    .find({ boardId: new ObjectId(id) })
    .toArray((err, data) => {
      if (err) {
        // console.log(err);
        return res.send({ message: "BoardDataError" });
      }

      if (!err) {
        // console.log(data);
        return res.status(200).send({ message: "NoError", boardLists: data });
      }
    });
}
