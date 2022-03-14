import connectToDatabase from "../../utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  //   récupère l'id du board
  const { id } = req.query;

  const data = db
    .collection("boards")
    .find({ _id: new ObjectId(id) })
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.send({ message: "Error" });
      }

      if (!err) {
        console.log(data[0].initialData);
        return res
          .status(200)
          .send({ message: "NoError", data: data[0].initialData });
      }
    });
}
