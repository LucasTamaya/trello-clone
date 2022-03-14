import connectToDatabase from "../../utils/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  // connexion à la base de donnée
  const { db } = await connectToDatabase();

  const { email, password } = req.body;

  //   vérifie que l'email n'existe pas dans MongoDB
  const existingEmail = await db
    .collection("users")
    .find({ email: email })
    .toArray();

  //   si email non correcte
  if (existingEmail.length < 1) {
    console.log("utilisateur non trouvé");
    res.send({ message: "LoginError" });
  }

  // si email correcte
  if (existingEmail.length >= 1) {
    console.log("utilisateur trouvé");

    // on vérifie les mots de passe hashé
    const isMatch = await bcrypt.compare(password, existingEmail[0].password);

    // si erreur avec le pwd
    if (!isMatch) {
      console.log("mot de passe incorrect");
      return res.send({ message: "LoginError" });
    }

    // si aucune erreur avec le pwd
    if (isMatch) {
      // récupère l'id de l'utilisateur
      const userId = existingEmail[0]._id;
      return res.status(200).send({ message: "NoError", userId: userId });
    }
  }
}
