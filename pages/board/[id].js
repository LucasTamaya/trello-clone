import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Tasks from "../../components/Tasks";
import useFetch from "../../hooks/useFetch";
import template from "../../utils/template";
import Loading from "../../components/Loading";
import AddNewList from "../../components/AddNewList";

export default function SingleBoard({ boardId }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  // récupère les listes et les cards d'un tableau donné au premier montage du composant
  useEffect(() => {
    setLoading(true);
    useFetch(`${template}api/board`, boardId).then((data) => {
      setLists(data.data.lists);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Header />
      <main>
        {loading && (
          <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
            <Loading />
          </div>
        )}
        <div className="h-[90vh] p-7 bg-[rgb(208,202,192)] flex items-start gap-x-2 flex-nowrap overflow-x-auto">
          <Tasks lists={lists} />
          {!loading && <AddNewList boardId={boardId} setLists={setLists} />}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(typeof id);

  return {
    props: {
      boardId: id,
    },
  };
}
