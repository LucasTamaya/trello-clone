import React from "react";
import { useState, useEffect } from "react";
import AddNewList from "./AddNewList";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import { DesignServices } from "@mui/icons-material";
import mapOrder from "../utils/mapOrder";
const Tasks = ({ lists }) => {

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // si je bouge un élément en dehors de la zone Droppable
    if (!destination) {
      return;
    }

    // si je bouge un élément et je le remet à sa position initiale
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    console.log(destination);
    console.log(source);
    console.log(draggableId);

    // si je bouge correctement les éléments
    // récupère la liste dans laquelle on a bougé les éléments
    const list = lists.filter((x) => x.listId === source.droppableId);
    console.log("Voila la liste qui a bougé", list);

    // récupère les ids des tâches de cette liste
    const newCardIds = list[0].cards.map((x) => x.cardId);
    console.log("Voila les ids des taches de cette liste: ", newCardIds);

    const newCardsOrder = list[0].cards;

    // on remplace les positions des éléments qui ont bougés
    newCardIds.splice(source.index, 1);
    newCardIds.splice(destination.index, 0, draggableId);
    console.log(newCardIds);

    // on créé une copie la liste des tâches modifiées
    mapOrder(newCardsOrder, newCardIds, "cardId");
  };

  return (
    <div className="flex justify-between">
      <DragDropContext onDragEnd={onDragEnd}>
        {lists.map((x) => {
          return <List key={x.listId} list={x} tasks={x.cards} />;
        })}
      </DragDropContext>
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
