import connectToDatabase from "../../utils/mongodb";
import mongodb, { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { index, listId, cardTitle, cardDescription } = req.body;

  console.log(index);

  const filter = {
    lists: { $elemMatch: { listId: new ObjectId(listId) } },
  };

  // ajoute la nouvelle carte à la liste correspondant à l'id donné
  db.collection("boards").updateOne(filter, {
    $push: {
      "lists.$.cards": {
        cardId: new ObjectId(),
        cardTitle: cardTitle,
        cardDescription: cardDescription,
      },
    },
  });
}

/*
{
      lists: { $elemMatch: { listId: new ObjectId(listId) } },
    }
*/
