import css from './footer.module.scss'

export const Footer = (props) => {
    return (
        <footer className={css.footer}>
            <div>
                <span>Active tasks: {props.valueActiveTasks}</span>
                <span>Finished tasks:  {props.valueFinishedTasks}</span>
            </div>
            <div>Kanban board by Victoria 2024</div>
        </footer>
    )
}