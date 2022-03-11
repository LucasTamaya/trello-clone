import connectToDatabase from "../../../utils/mongodb";
import mongodb, { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { id } = req.query;

  const { _id, cardTitle, cardDescription, index } = req.body;

  console.log("id", req.query);

  const newCard = await db.collection("boards").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $push: {
        "initialData.tasks": {
          _id: _id,
          cardTitle: cardTitle,
          cardDescription: cardDescription,
        },
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
        return res.send({ message: "Error" });
      }

      if (!err) {
        console.log(data);
      }
    }
  );

  // ajout de l'id de la nouvelle tache au tableau
  const newCardId = await db.collection("boards").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $push: {
        ["initialData.columns." + index + ".taskIds"]: _id, //syntaxe afin d'update un array selon un index donné
      },
    }
  );
}
