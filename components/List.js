import React from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddNewCard from "./AddNewCard";
import { useState, useEffect } from "react";
import AddNewCardModal from "./AddNewCardModal";
import useFetch from "../hooks/useFetch";
import template from "../utils/template";

// Composant représentant un liste du board

const List = ({ column, taskIds, tasks, index, data, setData }) => {
  // const [card, setCard] = useState([]);

  console.log(column);
  console.log(taskIds);
  console.log(tasks);

  // permet d'ouvrir et de fermer le modal afin d'ajouter une nouvelle carte
  const [showAddNewCardModal, setShowAddNewCardModal] = useState(false);

  return (
    <div className="w-80">
      <div className="flex justify-between">
        <h2 className="text-blue-900 font-bold">{column.title}</h2>
        <MoreHorizIcon className="text-blue-900" />
      </div>

      <Droppable droppableId={column._id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="text-blue-900 font-bold rounded cursor-pointer"
          >
            {!taskIds ? (
              <></>
            ) : (
              tasks
                .filter((task) => taskIds.includes(task._id))
                .map((x, index) => (
                  <Card
                    key={x._id}
                    id={x._id}
                    title={x.cardTitle}
                    description={x.cardDescription}
                    index={index}
                  />
                ))
            )}
            {provided.placeholder}

            {/* Bouton afin d'ouvrir le modal d'ajout de card */}
            <AddNewCard setShowAddNewCardModal={setShowAddNewCardModal} />
          </div>
        )}
      </Droppable>

      {/* Modal d'ajout de card */}
      {!showAddNewCardModal ? (
        <></>
      ) : (
        <AddNewCardModal
          setShowAddNewCardModal={setShowAddNewCardModal}
          id={column._id}
          index={index}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
};

export default List;
