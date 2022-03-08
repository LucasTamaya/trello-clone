import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const Card = ({ id, title, description, index }) => {
  console.log(id);
  console.log(index);

  return (
    // <div className="border border-gray-500 bg-white p-1 m-1">
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="text-red-500 mb-2">{title}</p>
        </div>
      )}
    </Draggable>
    // </div>
  );
};

export default Card;
