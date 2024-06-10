import css from './card.module.scss'
import { Link } from "react-router-dom";

export const Card = (props) => {
    return (
        <div className={css.card} >
            <Link to={`/Card`} onClick={() => {props.onCardEdit(props.taskId, props.taskTitle, props.taskDescription)}} className={css.link} >
                <h3>{props.taskTitle}</h3>
            </Link>
        </div>
    )
}