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

    const start = lists.filter((x) => x.listId === source.droppableId);
    const finish = lists.filter((x) => x.listId === destination.droppableId);

    // console.log(destination);
    console.log(source);
    // console.log(draggableId);

    // si je bouge les éléments à l'intérieur de la même liste
    if (start[0].listId == finish[0].listId) {
      // récupère la liste dans laquelle on a bougé les éléments
      const list = lists.filter((x) => x.listId === source.droppableId);
      // console.log("Voila la liste qui a bougé", list);

      // récupère les tâches de la liste
      const currentCards = list[0].cards;

      // récupère les ids des tâches de cette liste
      const newCardIds = list[0].cards.map((x) => x.cardId);

      // on remplace les positions des éléments qui ont bougés
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      // console.log(newCardIds);

      // on créé une copie la liste des tâches modifiées
      mapOrder(currentCards, newCardIds, "cardId");
    }

    // si je bouge les éléments dans une autre liste
    if (start[0].listId !== finish[0].listId) {

      // récupère l'élément qu'on souhaite déplacer
      const movingCard = start[0].cards[source.index];
      console.log("element a deplace", movingCard);

      // supprime l'élément qu'on déplace de la liste source
      start[0].cards.splice(source.index, 1);

      // liste de tâches de la liste de destination
      const finishCards = finish[0].cards;
      console.log("liste de destination: ", finishCards);

      // ajout du nouvel élément à la liste de destination
      finishCards.push(movingCard)

      // const finishCardIds = finishCardsOrder.map((x) => x.cardId);

      // finishCardIds.splice(destination.index, 0, draggableId);
      // // console.log(draggableId)
      // // console.log("finish cards id: ", finishCardIds)
      // // on créé une copie la liste des tâches modifiées
      // mapOrder(finishCardsOrder, finishCardIds, "cardId");
    }
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
