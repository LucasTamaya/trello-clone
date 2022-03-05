import connectToDatabase from "../../utils/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  // connexion à la base de donnée
  const { db } = await connectToDatabase();
  const { email, name, password } = req.body;
  console.log(email, name, password);

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

    res.status(200).send({message: "NoError"});
  }
}
