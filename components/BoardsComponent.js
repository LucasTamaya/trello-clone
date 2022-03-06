import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import template from "../utils/template";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Boards = ({ setShowCreateBoard }) => {
  const [boards, setBoards] = useState([]);

  // récupères les tableaux créent par l'utilisateur
  useEffect(() => {
    useFetch(`${template}api/getboards`, localStorage.getItem("userId")).then(
      (data) => {
        console.log(data);
        setBoards(data.data.userBoards);
      }
    );

    // console.log(boards)
  }, []);

  return (
    <main className="max-w-6xl mx-auto mt-10 p-3 bg-red-500">
      <div className="flex items-center gap-x-2">
        <PersonOutlineOutlinedIcon className="text-blue-900 text-3xl" />
        <h2 className="text-2xl font-bold text-blue-900">Your boards</h2>
      </div>
      <div className="mt-5">
        <ul className="grid grid-flow-col auto-cols-fr wrap">
          {boards && boards.map((x) => <li className="w-48 px-4 py-8 bg-gray-200/50 text-blue-900">{x.boardTitle}</li>)}

          <li
            className="w-48 px-4 py-8 bg-gray-200/50 text-blue-900 flex justify-center items-center rounded cursor-pointer transition ease hover:bg-gray-200"
            onClick={() => setShowCreateBoard(true)}
          >
            Create new board
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Boards;
