import React from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddNewCard from "./AddNewCard";
import { useState } from "react";
import AddNewCardModal from "./AddNewCardModal";

const List = ({ list, tasks, index }) => {

  // permet d'ouvrir et de fermer le modal afin d'ajouter une nouvelle carte
  const [showAddNewCardModal, setShowAddNewCardModal] = useState(false);

  return (
    <div className="w-80">
      <div className="flex justify-between">
        <h2 className="text-blue-900 font-bold">{list.listTitle}</h2>
        <MoreHorizIcon className="text-blue-900" />
      </div>

      <Droppable droppableId={list.listId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="text-blue-900 font-bold rounded cursor-pointer"
          >
            {!tasks ? (
              <></>
            ) : (
              tasks.map((x, index) => (
                <Card
                  key={x.cardId}
                  id={x.cardId}
                  title={x.cardTitle}
                  description={x.cardDescription}
                  index={index}
                />
              ))
            )}
            {provided.placeholder}
            <AddNewCard setShowAddNewCardModal={setShowAddNewCardModal} />
          </div>
        )}
      </Droppable>
      {!showAddNewCardModal ? <></> : <AddNewCardModal index={index} listId={list.listId} listTitle={list.listTitle} setShowAddNewCardModal={setShowAddNewCardModal} />}
    </div>
  );
};

export default List;
