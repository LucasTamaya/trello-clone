import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import template from "../utils/template";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AuthLoading from "./AuthLoading";

const CreateBoard = ({ setShowCreateBoard }) => {
  const [input, setInput] = useState("");
  const [isFulfilled, setIsFulfilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const boardColors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-lime-400",
    "bg-green-400",
    "bg-cyan-400",
    "bg-fuchsia-400",
  ];

  // génère un nombre aléatoire entre 0 et la taille du tableau boardColors
  const randomNb = () => {
    return Math.floor(Math.random() * boardColors.length);
  };

  //   fonction qui envoit la data à l'API afin de créer le nouveau tableau
  const handleCreateBoard = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (input === "") {
      return;
    }

    if (input !== "") {
      const data = await axios.post(`${template}api/createboard`, {
        boardTitle: input,
        userId: localStorage.getItem("userId"),
        initialData: {
          tasks: [],
          columns: [],
        },
        boardColor: boardColors[randomNb()],
      });

      if (data.data.message === "CreateBoardError") {
        alert("Error, please try again");
      }

      if (data.data.message === "NoError") {
        router.push(`/board/${data.data.boardId}`);
        setLoading(false)
      }
    }
  };

  //   détecte si le champ d'input est vide ou rempli
  useEffect(() => {
    if (input.length === 0) {
      setIsFulfilled(false);
    }

    if (input.length > 0) {
      setIsFulfilled(true);
    }
  }, [input]);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-gray-200/70 flex justify-center items-center">
      <div className="w-80 h-fit bg-white p-4 lg:w-96 rounded">
        <div className="flex w-full flex justify-end">
          <CloseOutlinedIcon
            className="text-blue-900 cursor-pointer"
            onClick={() => setShowCreateBoard(false)}
          />
        </div>
        <img
          src="/create-board-img.jpg"
          alt="create board image"
          className="mx-auto mb-8"
        />
        <form onSubmit={handleCreateBoard}>
          <label className="text-blue-900 font-bold">
            Board title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={input}
            className={`outline-0 border-2 p-1 w-full rounded bg-gray-100/70 ${
              !isFulfilled ? "border-red-500" : "border-[#2aa10f]"
            }`}
            onChange={(e) => setInput(e.target.value)}
          />
          <p
            className={`text-blue-900 mb-5 transition ease ${
              isFulfilled && "opacity-0"
            }`}
          >
            👋 Board title is required
          </p>
          <button
            type="submut"
            className={`w-full h-10 flex justify-center items-center p-1 rounded transition ease ${
              !isFulfilled
                ? "bg-gray-100/70 text-gray-400 cursor-pointer cursor-not-allowed"
                : "bg-blue-600 text-white cursor-pointer"
            }`}
          >
            {!loading ? <div>Create</div> : <AuthLoading />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBoard;
