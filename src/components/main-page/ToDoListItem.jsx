import React, { useState } from 'react'
import updateTask from '../../methods/update-task'
import showNotification from '../../methods/show-notification'
import { useNavigate } from 'react-router-dom'
import { Notification } from '../general/Notification'
import './to-do-list-item.scss'

export const ToDoListItem = ({ task, fetchTasks, isAuth, setIsAuth }) => {
    const { id, user_name, email, text, is_done, is_edited } = task
    const [isEditing, setIsEditing] = useState(false)
    const [isDone, setIsDone] = useState(is_done)
    const [localText, setLocalText] = useState(text)
    const [notification, setNotification] = useState(null)
    const navigate = useNavigate()
    const changeHandler = (event) => {
        setIsDone(event.target.checked)
    }
    const cancelChangesEvent = () => {
        setIsEditing(false)
        setIsDone(is_done)
        setLocalText(text)
    }
    const status = is_done ? 'Выполнено' : 'Не выполнено'
    const isDoneCheckboxText = isDone ? 'Выполнена' : 'Невыполнена'
    const notificationPayload = {
        notification,
        setNotification
    }
    const saveEvent = () => {
        updateTask({
            id,
            text: localText !== text ? localText : undefined,
            isDone
        })
            .then(({ needAuth, success }) => {
                if (needAuth) {
                    setIsAuth(false)
                    navigate('/login')
                    return
                }

                if (!success) {
                    showNotification({
                        ...notificationPayload,
                        type: 'error',
                        text: 'Не удалось одновить задачу'
                    })
                    return
                }

                showNotification({
                    ...notificationPayload,
                    type: 'success',
                    text: 'Задача успешно обновлена'
                })
                cancelChangesEvent()
                fetchTasks()
            })
            .catch(() => {
                showNotification({
                    ...notificationPayload,
                    type: 'error',
                    text: 'Произошла ошибка, не удалось одновить задачу'
                })
            })
    }
    const EditedComponent = is_edited ? <p className="to-do-list-item__edited">Отредактировано администратором</p> : ''
    const AdminAreaComponent = !isAuth
        ? ''
        : !isEditing
            ? <div className="to-do-list-item__admin-area">
                <div />
                <button
                    className="to-do-list-item__edit-btn"
                    onClick={() => setIsEditing(true)}
                >
                    Редактировать
                </button>
            </div>
            : <div className="to-do-list-item__admin-area">
                <label className="to-do-list-item__is-done">
                    <input
                        class="to-do-list-item__is-done-checkbox"
                        type="checkbox"
                        checked={isDone}
                        onChange={changeHandler}
                    />
                    { isDoneCheckboxText }
                </label>
                <div className="to-do-list-item__admin-area-right-side">
                    <button
                        className="to-do-list-item__cancel-btn"
                        onClick={cancelChangesEvent}
                    >
                        Отменить изменения
                    </button>
                    <button
                        className="to-do-list-item__save-btn"
                        onClick={saveEvent}
                    >
                        Сохранить изменения
                    </button>
                </div>
            </div>

    return <div className="to-do-list-item">
        { notification ? <Notification data={notification} /> : '' }
        <div className="to-do-list-item__row">
            <p className="to-do-list-item__title">
                Имя пользователя:
            </p>
            <p className="to-do-list-item__value">
                { user_name }
            </p>
        </div>
        <div className="to-do-list-item__row">
            <p className="to-do-list-item__title">
                Email:
            </p>
            <p className="to-do-list-item__value">
                { email }
            </p>
        </div>
        <div className="to-do-list-item__row">
            <p className="to-do-list-item__title">
                Статус:
            </p>
            <p className="to-do-list-item__value">
                { status }
            </p>
        </div>
        { EditedComponent }
        { !isEditing ? <div className="to-do-list-item__text">
            { text }
        </div> : <textarea
            className="to-do-list-item__editing-text"
            onChange={(event) => setLocalText(event.target.value)}
        >
            { localText }
        </textarea> }
        { AdminAreaComponent }
    </div>
}
