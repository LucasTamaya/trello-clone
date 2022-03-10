import React from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import mapOrder from "../utils/mapOrder";
const Tasks = ({ lists }) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // si je bouge un élément en dehors des zones droppable
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
    // console.log(source);
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

      // récupère la liste de tâches de la liste de destination
      const finishCards = finish[0].cards;
      console.log("liste de destination: ", finishCards);

      // ajout du nouvel élément à la liste de destination
      finishCards.push(movingCard);
    }
  };

  return (
    <div className="flex justify-between gap-x-2">
      <DragDropContext onDragEnd={onDragEnd}>
        {lists.map((x, index) => (
          <div key={x.listId} className="flex items-start bg-white rounded p-4 h-fit">
            <List list={x} tasks={x.cards} index={index} />
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Tasks;
