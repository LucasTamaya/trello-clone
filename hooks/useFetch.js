import axios from "axios";

// hook perso qui permet de fetch de la data depuis une url et des paramètres données
const useFetch = async (url, userId) => {
  
  const data = await axios.get(url, { params: { userId: userId } });

  return data;
};

export default useFetch;
