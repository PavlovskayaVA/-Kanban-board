import { useState } from 'react'
import css from './card.module.scss'
import { IconRemove } from '../../shared/icons/icon-remove'

export const Card = ({idEditCard, titleEditCard, descriptionEditCard, onSubmitEditTask, setIsShowEditCard}) => {
    const [editTitle, setEditTitle] = useState()
    const [editDescription, setEditDescription] = useState()
    
    
    return (
        <div className={css.card}>
            <label>
                Editing the title for {titleEditCard}:
                <input value={editTitle} placeholder={titleEditCard} onChange={(event) => setEditTitle(event.target.value)}></input>
            </label>
            <label>
                Editing the description for {titleEditCard}: 
                <input value={editDescription} onChange={(event) => setEditDescription(event.target.value)}></input>
            </label>
            <p>{descriptionEditCard}</p>
            <button  className={css.button} onClick={() => {
                        if (editTitle === undefined) {
                            onSubmitEditTask(idEditCard, titleEditCard, editDescription)
                        } else {
                            onSubmitEditTask(idEditCard, editTitle, editDescription)
                        }
                        setIsShowEditCard(false)
             }}>Submit</button>  
             <div className={css.remove} onClick={() => setIsShowEditCard(false)}>
                <IconRemove/>
             </div>
        </div>
    )
}