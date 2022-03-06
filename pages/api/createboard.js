import connectToDatabase from "../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { boardTitle, userId } = req.body;

  console.log(boardTitle, userId);

  const newBoard = await db.collection("boards").insertOne({
    boardTitle: boardTitle,
    userId: userId,
    lists: [],
  });

  // récupère l'id du tableau crée
  const boardId = newBoard.insertedId;

//   console.log(boardId);

  return res.status(200).send({ message: "NoError", boardId: boardId });
}
