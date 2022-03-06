import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import BoardsComponent from "../components/BoardsComponent";
import CreateBoard from "../components/CreateBoard";
import { useState, useEffect } from "react";

export default function Boards() {
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  // permet d'ouvrir et de fermer le module de création de tableau
  useEffect(() => {
    console.log(showCreateBoard);
  }, [showCreateBoard]);

  return (
    <>
      <Header setShowCreateBoard={setShowCreateBoard} />
      <BoardsComponent setShowCreateBoard={setShowCreateBoard} />
      {showCreateBoard && (
        <CreateBoard setShowCreateBoard={setShowCreateBoard} />
      )}
    </>
  );
}
