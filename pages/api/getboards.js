import connectToDatabase from "../../utils/mongodb";
import { nextCors } from "../../utils/cors";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // CORS middleware
  await nextCors(req, res);

  // récupère l'id de l'utilisateur
  const { id } = req.query;

  // récupère tous les tableaux créent par l'utilisateur dans la base de donnée et renvoit la data au frontend
  const userBoards = await db
    .collection("boards")
    .find({ userId: id })
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.send({ message: "GetBoardsError" });
      }

      if (!err) {
        // console.log(data);
        return res.status(200).send({ message: "NoError", userBoards: data });
      }
    });
}
