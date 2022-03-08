import React from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

const List = ({ list, tasks }) => {
  console.log(list);
  console.log(tasks);

  return (
    <div className="flex-1">
      <h2 className="text-center">{list.listTitle}</h2>
      {/* <Droppable droppableId={list.listId} className="min-w-96"> */}
      <Droppable droppableId="droparea" className="min-w-96">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            // className="flex flex-col min-h-96 border border-gray-500 rounded p-1"
          >
            {tasks.map((x, index) => (
              <Card
                key={x.cardId}
                id={x.cardId}
                title={x.cardTitle}
                description={x.cardDescription}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
