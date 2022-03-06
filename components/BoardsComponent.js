import { useState, useEffect } from "react";
import Link from "next/link";
import useFetch from "../hooks/useFetch";
import template from "../utils/template";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Loading from "./Loading";

const Boards = ({ setShowCreateBoard }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);

  // récupères les tableaux créent par l'utilisateur
  useEffect(() => {
    setLoading(true);
    useFetch(`${template}api/getboards`, localStorage.getItem("userId")).then(
      (data) => {
        console.log(data);
        setBoards(data.data.userBoards);
        setLoading(false);
      }
    );

    // console.log(boards)
  }, []);

  return (
    <main className="max-w-6xl mx-auto mt-10 p-3">
      {/* Pendant le chargement de la data */}
      {loading && (
        <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
          <Loading />
        </div>
      )}

      {/* A la réception de la data */}
      {boards.length > 0 && (
        <div className="flex flex-col w-fit mx-auto">
          <div className="flex items-center gap-x-2">
            <PersonOutlineOutlinedIcon className="text-blue-900 text-3xl" />
            <h2 className="text-2xl font-bold text-blue-900">Your boards</h2>
          </div>

          <ul className="mx-auto mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {boards.map((x) => (
              <Link href={`/board/${x._id}`}>
                <li
                  className={`${x.boardColor} w-44 p-4 h-24 text-blue-900 font-bold rounded flex items-start md:w-52 md:h-28 cursor-pointer`}
                >
                  {x.boardTitle}
                </li>
              </Link>
            ))}
            <li
              className="w-44 px-4 py-8 bg-gray-200/50 text-blue-900 flex justify-center items-center rounded cursor-pointer transition ease hover:bg-gray-200 md:w-52 md:py-10"
              onClick={() => setShowCreateBoard(true)}
            >
              Create new board
            </li>
          </ul>
        </div>
      )}

      {boards.length <= 0 && loading === false && (
        <ul className="mx-auto mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          <li
            className="w-44 px-4 py-8 bg-gray-200/50 text-blue-900 flex justify-center items-center rounded cursor-pointer transition ease hover:bg-gray-200 md:w-52 md:py-10"
            onClick={() => setShowCreateBoard(true)}
          >
            Create new board
          </li>
        </ul>
      )}
    </main>
  );
};

export default Boards;
