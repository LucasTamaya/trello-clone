import axios from "axios";

// hook perso qui permet de fetch de la data depuis une url et un id donné
const useFetch = async (url, id) => {
  console.log(id);

  const data = await axios.get(url, { params: { id: id } });

  return data;
};

export default useFetch;
