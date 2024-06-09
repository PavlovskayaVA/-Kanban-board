
import Scrollbars from 'react-custom-scrollbars-2'
import { Card } from './card/card'
import css from './column.module.scss'
import { IconConfirm } from '../../shared/icons/icon-confirm'
import { useState } from 'react'

export const Column = ({taskStatus, tasks, taskStatuses, onStatusChange, onCardChange, getFromColumnToBoard, onSubmitNewTask, onCardEdit}) => {
    const [isClick, setIsClick] = useState(false)
    const [isClickInput, setIsClickInput] = useState(false)

    const [title, setTitle] = useState()

    let arrFinished = []
    let finishedTasks;
    let activeTasks;

    return (
        <div className={css.column} >
            <header className={css.header}>{taskStatus}</header>
            <div className={css.wrapper}>
                <Scrollbars autoHeight autoHeightMax={500}>
                    {tasks
                        .filter(task => taskStatus === task.status)
                        .map(task => 
                            {
                                return  <Card taskId={task.id} taskTitle={task.title} taskDescription={task.description} taskStatus={task.status} taskStatuses={taskStatuses} onStatusChange={onStatusChange} onCardEdit={onCardEdit}/>
                            }
                        )}
                </Scrollbars>
            </div>
            <footer className={css.footer} >
                
                {isClickInput ?
                    <div>
                        <input value={title} onChange={event => setTitle(event.target.value)}></input>
                        <button  className={css.button} onClick={() => {
                            onSubmitNewTask({title})
                            setTitle('')
                            setIsClickInput(false)
                        }}>Submit</button>
                    </div> :
                    <div onClick={() => setIsClickInput(true)}>  
                        {(taskStatus === 'Backlog') && <div><IconConfirm/> Add card</div>}
                    </div>
                }

                {isClick ?
                    <select onChange={(event) => {
                        onCardChange(event.target.value, taskStatus);
                        setIsClick(false)
                    }}>
                        <option selected="true" disabled="disabled">Task</option>
                        {tasks.map((task) => {
                            return (  
                                taskStatus === 'Ready' ? task.status === 'Backlog' && <option>{task.title}</option> : 
                                taskStatus === 'In Progress' ? task.status === 'Ready' && <option>{task.title}</option> : 
                                taskStatus === 'Finished' ? task.status === 'In Progress' && <option>{task.title}</option> : 
                                <option>{task.title}</option> 
                            )}
                        )}
                    </select> : 
                    <div onClick={() => 
                        {
                            if (taskStatus === 'Backlog') {
                                setIsClickInput(true)
                            } else {
                                setIsClick(true)
                            }
                        }
                    }>
                         {(taskStatus !== 'Backlog') && <div><IconConfirm/> Add card</div>}
                    </div>
                }
                {tasks.map(task => {
                    if (task.status === 'Finished') {
                        arrFinished.push(task)
                    }

                    finishedTasks = arrFinished.length;
                    activeTasks = tasks.length - arrFinished.length;
                    getFromColumnToBoard(activeTasks,finishedTasks)
                })}
            </footer>
        </div>
        
    )
}