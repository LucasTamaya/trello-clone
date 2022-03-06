import connectToDatabase from "../../utils/mongodb";
import mongodb, { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  //   récupère l'id du tableau
  const { id } = req.query;

  console.log(req)

  console.log("voila l'id", id);

  const boardData = await db
    .collection("boards")
    .find({ _id: new ObjectId(id) })
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.send({ message: "BoardDataError" });
      }

      if (!err) {
        // console.log(data);
        // console.log("data precise: ", data[0].lists)
        return res.status(200).send({ message: "NoError", lists: data[0].lists });
      }
    });
}
