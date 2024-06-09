import css from './card.module.scss'

export const Card = (props) => {
    return (
        <div className={css.card} onClick={() => {props.onCardEdit(props.taskId, props.taskTitle)}}>
            <h3>{props.taskTitle}</h3>
        </div>
    )
}