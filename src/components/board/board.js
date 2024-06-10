
import css from './board.module.scss'
import { Column } from './column/column'
import { Card } from './card/card'
import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage404 from "../../error-page-404";

export const Board = ({getFromBoardToApp}) => {
    const [valueActiveTasks, setValueActiveTasks] = useState('')
    const [valueFinishedTasks, setValueFinishedTasks] = useState('')

    const [idEditCard, setIdEditCard] = useState('')
    const [titleEditCard, setTitleEditCard] = useState('')
    const [descriptionEditCard, setDescriptionEditCard] = useState('')

    const [isShowEditCard, setIsShowEditCard] = useState(false)

    function getFromColumnToBoard(activeTasks,finishedTasks) {
        setValueActiveTasks(activeTasks);
        setValueFinishedTasks(finishedTasks)
    }

    {getFromBoardToApp(valueActiveTasks, valueFinishedTasks)} 

    const taskStatuses= ['Backlog','Ready','In Progress','Finished']

    const initialTasks = [];
    
    const [tasks, setTasks] = useState(() => {
        const saveTasks= localStorage.getItem("tasks");
        return saveTasks ? JSON.parse(saveTasks) : initialTasks
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function onStatusChange(id, newStatus) {
        setTasks(
            tasks.map((task) => {
              if (task.id === id) {
                return { ...task, status: newStatus };
              }
              return task;
            }),
          );
    }

    function onCardChange(title, newStatus) {
        setTasks(
            tasks.map((task) => {
              if (task.title === title) {
                return { ...task, status: newStatus };
              }
              return task;
            }),
          );
    }

    function  onSubmitNewTask(task) {
        setTasks([...tasks, {...task, id: Math.random(), status: 'Backlog', description: 'This task has no description'}])
    }

    function onCardEdit(id, editTitle, editDescription) { // получаем данные с карты, по который тыкнули
        setIdEditCard(id)
        setTitleEditCard(editTitle)
        setDescriptionEditCard(editDescription)
        setIsShowEditCard(true)
    }

    function onSubmitEditTask(idEditCard, titleEditCard, descriptionEditCard) {
        setTasks(
            tasks.map((task) => {
              if (task.id === idEditCard) {
                return { ...task, title: titleEditCard, description: descriptionEditCard };
              }
              return task;
            }),
          );
    }

    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <div className={css.board}>
            {taskStatuses.map((taskStatus) => {
                return <Column 
                          className={css.column} 
                          taskStatus={taskStatus} 
                          tasks={tasks} 
                          taskStatuses={taskStatuses} 
                          onStatusChange={onStatusChange} 
                          onCardChange={onCardChange} 
                          getFromColumnToBoard={getFromColumnToBoard}  
                          onSubmitNewTask={onSubmitNewTask}
                          onCardEdit={onCardEdit}
                        />
                })
            }
          </div>
        ),
        errorElement: <ErrorPage404 />,
      },
  
      {
        path: "/Card",
        element: (
          <div>
            <Card 
              tasks={tasks} 
              idEditCard={idEditCard} 
              titleEditCard={titleEditCard} 
              descriptionEditCard={descriptionEditCard} 
              onSubmitEditTask={onSubmitEditTask} 
              setIsShowEditCard={setIsShowEditCard}
            />
          </div>
        ),
        errorElement: <ErrorPage404 />,
      },
    ]);

    return (
    <div>
        <RouterProvider router={router} />      
    </div>
    )
}
