import React from "react";
import { useState, useEffect } from "react";
import AddNewList from "./AddNewList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import template from "../utils/template";
import useFetch from "../hooks/useFetch";

const Tasks = ({ boardId }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // setLoading(true);
    useFetch(`${template}api/board`, boardId).then((data) => {
      setLists(data.data.lists);
      // setLoading(false);
    });
  }, []);

  const onDragEnd = (result) => {
    console.log("dragging")
    // if (result.reason === "DROP") {
    //   if (!result.destination) {
    //     return;
    //   }
    //   dispatch({
    //     type: "MOVE",
    //     from: result.source.droppableId,
    //     to: result.destination.droppableId,
    //     fromIndex: result.source.index,
    //     toIndex: result.destination.index,
    //   });
    // }
  };

  return (
    <div className="flex justify-between">
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
        {lists.map((x) => {
          return <List key={x.listId} list={x} tasks={x.cards} />;
        })}
      {/* </DragDropContext> */}
    </div>

    // {/* A la réception de la data: affiche toutes les listes du tableau */}
    // {/* {lists.length > 0 && (
    //   <ul className="flex items-start gap-x-2">
    //     {lists.map((x) => (
    //       <li
    //         key={x.listId}
    //         className="text-blue-900 font-bold p-2 rounded bg-[rgb(235,236,240)] cursor-pointer"
    //       >
    //         <div className="w-80">
    //           <div className="flex justify-between">
    //             <h2>{x.listTitle}</h2>
    //             <MoreHorizIcon />
    //           </div>
    //           <ul className="mt-2">
    //             <li className="w-full h-fit p-2 text-blue-900 bg-white rounded">
    //               Voila la description de la tache{" "}
    //             </li>
    //           </ul>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // )} */}
  );
};

export default Tasks;
