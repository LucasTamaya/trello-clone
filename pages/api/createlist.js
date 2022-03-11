import connectToDatabase from "../../utils/mongodb";
import mongodb, { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  //   récupère le titre de la nouvelle liste
  // const { _id, listTitle, boardId } = req.body;
  console.log(req.body)

  //   ajoute la nouvelle liste dans le tableau correspondant dans la base de donnée
  // const newList = await db.collection("lists").insertOne({
  //   _id: new ObjectId(_id),
  //   boardId: new ObjectId(boardId),
  //   listTitle: listTitle,
  // });

  // const newListId = newList.insertedId;

  return res.status(200).send({ message: "NoError", newListId: newListId });
}
