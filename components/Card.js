import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ id, title, description, index }) => {
  // console.log(id);
  // console.log(index);

  return (
    <div className="mt-2">
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <p className="w-full h-fit p-3 text-blue-900 rounded bg-white cursor-pointer border border-blue-900">
              {title}
            </p>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Card;
