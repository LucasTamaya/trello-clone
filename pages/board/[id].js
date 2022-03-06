import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import AddNewList from "../../components/AddNewList";
import Lists from "../../components/Lists";
import useFetch from "../../hooks/useFetch";
import template from "../../utils/template";

export default function SingleBoard({ id }) {
  const [lists, setLists] = useState([]);

  const router = useRouter();
  const boardId = router.query.id;

  // récupère les listes et les cardes d'un tableau donné au premier montage du composant
  useEffect(() => {
    console.log(id);
    useFetch(`${template}api/board`, id).then((data) => {
      console.log(data);
      setLists(data.data.lists);
    });
  }, []);

  return (
    <>
      <Header />
      <main className="p-7 bg-gray-400 w-screen h-[90vh]">
        <AddNewList boardId={boardId} />
        <Lists lists={lists} />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(typeof id);

  return {
    props: {
      id: id,
    },
  };
}
