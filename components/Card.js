import React from "react";
import { Draggable } from "react-beautiful-dnd";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState, useEffect } from "react";

const Card = ({ id, title, description, index }) => {
  const [test, setTest] = useState(false);

  return (
    <div className="mt-2">
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            onClick={() => setTest(true)}
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

      {test && (
        <div className="absolute top-0 left-0 w-screen h-screen p-7 bg-gray-200/70 flex justify-center items-center cursor-default">
          <div className="w-full max-w-[500px] h-96 bg-white p-4">
            <div className="flex justify-between">
              <h3 className="mb-10 font-bold text-blue-900 text-lg">{title}</h3>
              <CloseOutlinedIcon
                className="cursor-pointer"
                onClick={() => setTest(false)}
              />
            </div>
            <div className="flex gap-x-2">
              <DescriptionIcon />
              <div>
                <h3 className="font-bold text-blue-900 text-lg">Description</h3>
                <p className="font-normal">{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
