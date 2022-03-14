import connectToDatabase from "../../utils/mongodb";
import { nextCors } from "../../utils/cors";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  // CORS middleware
  await nextCors(req, res);

  const { boardTitle, userId, initialData, boardColor } = req.body;

  // création et enregistrement du nouveau tableau dans la base de donnée
  const newBoard = await db.collection("boards").insertOne({
    boardTitle: boardTitle,
    userId: userId,
    initialData: initialData,
    boardColor: boardColor,
  });

  // récupère l'id du tableau crée afin de le renvoyer au frontend pour créer un lien dynamique vers ce tableau lorsqu'on clique dessus
  const boardId = newBoard.insertedId;

  return res.status(200).send({ message: "NoError", boardId: boardId });
}
