import { ObjectId } from "mongodb";
import connectToDatabase from "../../utils/mongodb";
import { nextCors } from "../../utils/cors";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // CORS middleware
  await nextCors(req, res);

  //   récupère l'id de la liste correspondante
  const { id } = req.query;

  console.log(id);

  const cards = await db
    .collection("cards")
    .find({ listId: new ObjectId(id) })
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.send({ message: "GetCardError" });
      }

      if (!err) {
        // console.log(data);
        return res.status(200).send({ message: "NoError", cardData: data });
      }
    });
}
