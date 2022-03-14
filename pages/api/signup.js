import connectToDatabase from "../../utils/mongodb";
import bcrypt from "bcrypt";
import { nextCors } from "../../utils/cors";

export default async function handler(req, res) {
  // connexion à la base de donnée
  const { db } = await connectToDatabase();

  // CORS middleware
  await nextCors(req, res);

  const { email, name, password } = req.body;

  //   vérifie que l'email n'existe pas dans MongoDB
  const existingEmail = await db
    .collection("users")
    .find({ email: email })
    .toArray();

  // si email existant
  if (existingEmail.length >= 1) {
    console.log("email existant");
    return res.send({ message: "ExistingEmailError" });
  }

  //   si email correcte
  if (existingEmail.length < 1) {
    console.log("nouvel utilisateur");

    // hash du password avec bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // enregistre le nouvel utilisateur dans MongoDB
    const newUser = await db.collection("users").insertOne({
      email: email,
      name: name,
      password: hashPassword,
    });

    // récupère l'id de l'utilisateur
    const userId = newUser.insertedId;

    res.status(200).send({ message: "NoError", userId: userId });
  }
}
