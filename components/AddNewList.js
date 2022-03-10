import { useState, useEffect } from "react";
import axios from "axios";
import mongoObjectId from "../utils/mongodbIdGenerator";
import template from "../utils/template";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const AddNewList = ({ boardId, setBoardLists }) => {
  // permet d'ouvrir et de ferme le petit module afin de saisir le titre de la liste
  const [showInput, setShowInput] = useState(false);

  const [inputList, setInputList] = useState("");

  const handleNewList = async (e) => {
    e.preventDefault();
    if (inputList === "") {
      return;
    }
    if (inputList !== "") {
      // rénitialisation de l'input
      setInputList("");

      // création d'un id valide avec mongoDB
      const mongoDbId = mongoObjectId();

      const newList = {
        _id: mongoDbId,
        listTitle: inputList,
        boardId: boardId,
      };

      // ajout de la nouvelle liste au board
      setBoardLists((prev) => [...prev, newList]);

      // envoit de la data à l'api
      const data = await axios.post(`${template}api/createlist`, newList);

      // si erreur pendant la création de la nouvelle liste, afficher un message d'erreur
      if (data.data.message === "CreateListError") {
        alert("something went wrong...");
      }

      // si aucun erreur on ajoute la nouvelle liste au board
      if (data.data.message === "NoError") {
        return;
      }
    }
  };

  return (
    <>
      <div className="flex items-center w-60">
        <label
          htmlFor="inputList"
          className={`flex items-center p-2 bg-gray-400/40 gap-x-2 w-fit rounded text-blue-900 cursor-pointer hover:bg-gray-400 ${
            showInput && "hidden"
          }`}
          onClick={() => setShowInput(true)}
        >
          <AddIcon className="text-blue-900" />
          <p className="w-60">Add a new list</p>
        </label>
        <div
          className={`bg-white p-1 rounded ${!showInput ? "hidden" : "block"}`}
        >
          <form onSubmit={handleNewList}>
            <input
              id="inputList"
              type="text"
              value={inputList}
              placeholder="Enter the list title..."
              className="border-2 border-blue-600 rounded outline-0 bg-white w-60 p-2 text-blue-900 placeholder:text-blue-900"
              onChange={(e) => setInputList(e.target.value)}
            />
            <div className="flex items-center gap-x-3">
              <button
                type="submit"
                className="bg-blue-600 py-1 px-5 rounded mt-1 z-10 text-white"
              >
                Add a list
              </button>
              <CloseIcon
                className="text-blue-900 cursor-pointer"
                onClick={() => {
                  setInputList("");
                  setShowInput(false);
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewList;
