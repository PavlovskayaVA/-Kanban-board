import { useState } from 'react'
import css from './card.module.scss'
import { IconRemove } from '../../shared/icons/icon-remove'
import { IconConfirm } from '../../shared/icons/icon-confirm'
import { Link } from "react-router-dom";

export const Card = ({tasks, idEditCard, titleEditCard, descriptionEditCard, onSubmitEditTask, setIsShowEditCard}) => {
    const [editTitle, setEditTitle] = useState()
    const [editDescription, setEditDescription] = useState()

    const [isShowInputTitle, setIsShowInputTitle] = useState(false)
    const [isShowInputDescription, setIsShowInputDescription] = useState(false)
    
    return (
        <div className={css.card}>
            {isShowInputTitle ? 
                <label>
                    Editing the title for {titleEditCard}:
                    <input value={editTitle} onChange={(event) => setEditTitle(event.target.value)}></input>
                </label> : 
                <div className={css.text} onClick={() => setIsShowInputTitle(true)}>{titleEditCard}</div>
            }

            {isShowInputDescription ? 
                <label>
                    Editing the description for {titleEditCard}: 
                    <input value={editDescription} onChange={(event) => setEditDescription(event.target.value)}></input>
                </label> : 
                <div>
                    <div className={css.text} onClick={() => setIsShowInputDescription(true)}>{(editDescription === undefined) ? <p> <IconConfirm/> Add description</p> : <p>{descriptionEditCard}</p>}</div>
                    <p className={css.text}>{descriptionEditCard}</p>
                </div>
            }   
            <Link to={`/`}>
                <button  className={css.button} onClick={() => {
                            if (editDescription === undefined || editTitle === undefined) {
                                if (editTitle === undefined) {
                                    onSubmitEditTask(idEditCard, titleEditCard, editDescription)
                                } else if (editDescription === undefined) {
                                    onSubmitEditTask(idEditCard, editTitle, descriptionEditCard)
                                }
                            } else {
                                onSubmitEditTask(idEditCard, editTitle, editDescription) 
                                
                            }
                            setIsShowEditCard(false)
          
                }}>Submit
                </button>  
            </Link>
            <Link to={`/`} className={css.remove} onClick={() => setIsShowEditCard(false)}>
                <IconRemove />
            </Link>
        </div>
    )
}