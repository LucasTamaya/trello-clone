import connectToDatabase from "../../utils/mongodb";
import mongodb, { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { _id, listId, cardTitle, cardDescription } = req.body;

  const newCard = await db.collection("cards").insertOne({
    _id: new ObjectId(_id),
    listId: new ObjectId(listId),
    cardTitle: cardTitle,
    cardDescription: cardDescription,
  });



  // const filter = {
  //   lists: { $elemMatch: { listId: new ObjectId(listId) } },
  // };

  // // ajoute la nouvelle carte à la liste correspondant à l'id donné
  // const newCard = await db.collection("boards").updateOne(filter, {
  //   $push: {
  //     "lists.$.cards": {
  //       cardId: cardId,
  //       cardTitle: cardTitle,
  //       cardDescription: cardDescription,
  //     },
  //   },
  // });
  // if (newCard.modifiedCount === 0) {
  //   return res.send({ message: "CreateCardError" });
  // }
  // if (newCard.modifiedCount !== 0) {
  //   return res.send({ message: "NoError" });
  // }
}

/*
{
      lists: { $elemMatch: { listId: new ObjectId(listId) } },
    }
*/
