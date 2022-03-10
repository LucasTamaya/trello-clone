import connectToDatabase from "../../utils/mongodb";
import mongodb, { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  //   récupère le titre de la nouvelle liste
  const { listId, listTitle, boardId } = req.body;

  //   ajoute la nouvelle liste dans le tableau correspondant dans la base de donnée
  const newList = await db.collection("boards").updateOne(
    { _id: new ObjectId(boardId) },
    {
      $push: {
        lists: {
          listId: listId,
          listTitle: listTitle,
          cards: [],
        },
      },
    }
  );

  if (newList.modifiedCount === 0) {
    return res.send({ message: "CreateListError" });
  }
  if (newList.modifiedCount !== 0) {
    return res.send({ message: "NoError" });
  }
}
