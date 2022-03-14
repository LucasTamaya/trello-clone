import React from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import { useRouter } from "next/router";
import axios from "axios";
import template from "../utils/template";

const Tasks = ({ data, setData }) => {
  const router = useRouter();

  // fonction afin de mettre à jour la base de donnée lorsqu'on déplace un élément dans une même liste
  const moveCardSameListDb = async (newColumn, index) => {
    const req = await axios.post(`${template}api/movecard/samecolumn`, {
      newColumn: newColumn,
      index: index,
      id: router.query.id,
    });

    if (req.data.message === "MoveCardError") {
      alert("something went wrong");
    }

    if (req.data.message === "NoError") {
      return;
    }
  };

  // fonction afin de mettre à jour la base de donnée lorsqu'on déplace un élément dans une même liste
  const moveCardDifferentListDb = async (newState) => {
    const req = await axios.post(`${template}api/movecard/differentcolumn`, {
      newState: newState,
      id: router.query.id,
    });

    if (req.data.message === "MoveCardError") {
      alert("something went wrong");
    }

    if (req.data.message === "NoError") {
      return;
    }
  };

  // fonction qui va gérer le drag and drop des éléments
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // si on déplace un élément dans une zone non droppable
    if (!destination) {
      return;
    }

    // si on déplace un élément et qu'on le remet à sa place initiale
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = Array.from(
      data.columns.filter((x) => x._id === source.droppableId)
    );
    const finish = data.columns.filter(
      (x) => x._id === destination.droppableId
    );

    // si on déplace un élément dans sa même liste source
    if (start[0]._id === finish[0]._id) {
      // récupère le tableau des ids des tâches de la liste
      const newTaskIds = Array.from(start[0].taskIds);

      // modification de l'ordre des tâches
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      // création de la nouvelle liste
      const newColumn = {
        ...start[0],
        taskIds: newTaskIds,
      };

      // récupération de l'index de la liste à modifier
      const index = data.columns.findIndex((x) => x._id === source.droppableId);

      const newState = Array.from(data.columns);
      // modification la liste avec nouvelle liste crée
      newState[index] = newColumn;

      // update du state de la liste source
      setData({ ...data, columns: newState });

      // update au niveau de la base de donnée
      moveCardSameListDb(newColumn, index);
    }

    // si on déplace un élément dans une autre liste
    if (start[0]._id !== finish[0]._id) {
      // récupère la liste des ids des tâches de la liste source
      const newTaskIds = Array.from(start[0].taskIds);
      // supprime l'id correspondant à la tâche qu'on déplace
      newTaskIds.splice(source.index, 1);
      // création de la nouvelle liste avec la nouvelle liste d'ids de tâches
      const newColumn = {
        ...start[0],
        taskIds: newTaskIds,
      };
      // récupère l'index de la liste à modifier
      const index = data.columns.findIndex((x) => x._id === source.droppableId);

      // récupère les ids des tâches de la liste destination,
      const destinationTaskIds = Array.from(finish[0].taskIds);

      // ajout de l'id de l'élément à déplacer dans la liste de destination
      destinationTaskIds.splice(destination.index, 0, draggableId);

      // création de la nouvelle liste de destination
      const newDestinationColumn = {
        ...finish[0],
        taskIds: destinationTaskIds,
      };

      // récupère l'index de la liste de destination
      const destinationIndex = data.columns.findIndex(
        (x) => x._id === destination.droppableId
      );

      // copie du tableau des listes
      const newState = Array.from(data.columns);

      // modification de la liste source
      newState[index] = newColumn;

      // modification de la liste destination
      newState[destinationIndex] = newDestinationColumn;

      // update du state de la data avec la nouvelle liste source et la nouvelle liste destination
      setData({ ...data, columns: newState });

      // update au niveau de la base de donnée
      moveCardDifferentListDb(newState);
    }
  };

  return (
    <div className="flex justify-between gap-x-2">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columns.map((x, index) => (
          <div
            key={x._id}
            className="flex items-start bg-white rounded p-4 h-fit"
          >
            <List
              column={x}
              taskIds={x.taskIds}
              tasks={data.tasks}
              index={index}
              data={data}
              setData={setData}
            />
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Tasks;
