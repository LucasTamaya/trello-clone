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

const List = ({ list, index }) => {
  const [card, setCard] = useState([]);

  // permet d'ouvrir et de fermer le modal afin d'ajouter une nouvelle carte
  const [showAddNewCardModal, setShowAddNewCardModal] = useState(false);

  useEffect(() => {
    useFetch(`${template}api/getcards`, list._id).then((data) => {
      console.log(data);
      setCard(data.data.cardData);
    });
  }, []);

  useEffect(() => {
    console.log(card);
  }, [card]);

  return (
    <div className="w-80">
      <div className="flex justify-between">
        <h2 className="text-blue-900 font-bold">{list.listTitle}</h2>
        <MoreHorizIcon className="text-blue-900" />
      </div>

      <Droppable droppableId={list._id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="text-blue-900 font-bold rounded cursor-pointer"
          >
            {!card ? (
              <></>
            ) : (
              card.map((x, index) => (
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
          listId={list._id}
          setCard={setCard}
          setShowAddNewCardModal={setShowAddNewCardModal}
        />
      )}
    </div>
  );
};

export default List;
