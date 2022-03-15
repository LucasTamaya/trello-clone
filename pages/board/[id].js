import React from "react";
import { useState, useEffect } from "react";
import Tasks from "../../components/Tasks";
import useFetch from "../../hooks/useFetch";
import template from "../../utils/template";
import Loading from "../../components/Loading";
import AddNewList from "../../components/AddNewList";
import BoardHeader from "../../components/BoardHeader";

export default function SingleBoard({ boardId }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showCardDetails, setShowCardDetails] = useState(false);

  // récupère toute la data nécessaire au premier montage
  useEffect(() => {
    setLoading(true);
    useFetch(`${template}api/board`, boardId).then((data) => {
      setData(data.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <BoardHeader />
      <main>
        {loading && (
          <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
            <Loading />
          </div>
        )}

        {!loading && (
          <div className="h-[90vh] p-7 bg-[rgb(235,236,240)] flex items-start gap-x-2 flex-nowrap overflow-x-auto">
            {!loading && data && <Tasks data={data} setData={setData} />}
            <AddNewList boardId={boardId} data={data} setData={setData} />
          </div>
        )}
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
