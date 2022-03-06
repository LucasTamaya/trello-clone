import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "./Loading";
import axios from "axios";
import template from "../utils/template";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const AddNewList = ({ boardId }) => {
  // permet d'ouvrir et de ferme le petit module afin de saisir le titre de la liste
  const [showInput, setShowInput] = useState(false);

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const [inputList, setInputList] = useState("");

  const handleNewList = async (e) => {
    e.preventDefault();
    if (inputList === "") {
      return;
    }
    if (inputList !== "") {
      axios.post(`${template}api/createlist`, {
        listTitle: inputList,
        boardId: boardId,
      });
    }
  };

  return (
    //
    <div>
      <div className="flex items-center w-60">
        <label
          htmlFor="inputList"
          className={`flex items-center w-60 p-2 bg-gray-100/40 gap-x-2 w-fit rounded text-white cursor-pointer ${
            showInput && "hidden"
          }`}
          onClick={() => setShowInput(true)}
        >
          <AddIcon className="text-white" />
          <p>Add a new list</p>
        </label>
        <div
          className={`bg-gray-100/40 p-1 rounded ${
            !showInput ? "hidden" : "block"
          }`}
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
    </div>
    // </main>
  );
};

export default AddNewList;
