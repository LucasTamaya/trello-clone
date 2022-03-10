import React from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import mapOrder from "../utils/mapOrder";

const Tasks = ({ boardLists }) => {

  // fonction qui va gérer le drag and drop des éléments
  const onDragEnd = (result) => {

    const { destination, source, draggableId } = result;

    console.log(destination)
    console.log(source)
    console.log(draggableId)

    
  };

  return (
    <div className="flex justify-between gap-x-2">
      <DragDropContext onDragEnd={onDragEnd}>
        {boardLists.map((x, index) => (
          <div
            key={x._id}
            className="flex items-start bg-white rounded p-4 h-fit"
          >
            <List list={x} index={index} />
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Tasks;
