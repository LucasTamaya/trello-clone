import React from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import mapOrder from "../utils/mapOrder";

const Tasks = ({ data, setData }) => {
  console.log(data);

  // fonction qui va gérer le drag and drop des éléments
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    console.log(destination);
    console.log(source);
    console.log(draggableId);

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
    console.log(start);
    const finish = data.columns.filter(
      (x) => x._id === destination.droppableId
    );

    // si on déplace un élément dans sa même liste source
    if (start[0]._id === finish[0]._id) {
      // récupère les ids de la tâche
      const newTaskIds = Array.from(start[0].taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start[0],
        taskIds: newTaskIds,
      };
      console.log(newColumn);

      const index = data.columns.findIndex((x) => x._id === source.droppableId);

      const newState = Array.from(data.columns)
      newState[index]=newColumn

      console.log(newState)

      console.log(data)

      setData({...data, columns: newState})

      // console.log(start[0].taskIds.length)
      // const nb = start[0].taskIds.length
      // start[0].taskIds.splice(0, nb)
      // newTaskIds.map(x => start[0].taskIds.push(x))
      // start[0].taskIds.push("push work")

      //test d'ajout avec la méthode Arra.from(data)
      // récupère l'index de la column
      // const index = data.columns.findIndex((x) => x._id === source.droppableId);
      // console.log(index);
      // const newState = Array.from(data.columns);
      // newState[index].taskIds.splice(0, 1, newTaskIds[0])
      // console.log(newState[index])

      /*
const [questions, setQuestions] = React.useState(initialState);

const addChoice = (questionId, choice) => {
    setQuestions(question.map(q => {
        if(q.question === questionId){
            return {...q, choices: [...q.choices, choice]}
        }
        return q;
    }))
};
      */

      // test d'ajout avec un maping dans le hook
      // setData({
      //   ...data,
      //   columns: [
      //     ...data.columns,
      //     data.columns.map((x) => {
      //       if (x._id === source.droppableId) {
      //         return { ...x, taskIds: newTaskIds };
      //       } else {
      //         return {...x}
      //       }
      //     }),
      //   ],
      // });
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
