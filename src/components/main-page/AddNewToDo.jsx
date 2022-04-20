import React, { useState } from 'react'
import { Notification } from '../general/Notification'
import createTask from '../../methods/create-task'
import showNotification from '../../methods/show-notification'
import './add-new-to-do.scss'

export const AddNewToDo = ({ fetchTasks }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [taskText, setTaskText] = useState('')
    const [hasNameError, setHasNameError] = useState(false)
    const [hasEmailError, setHasEmailError] = useState(false)
    const [hasTaskTextError, setHasTaskTextError] = useState(false)
    const [hasValidationEmailError, setHasValidationEmailError] = useState(false)
    const [notification, setNotification] = useState(null)
    const handleChange = (event, type) => {
        const value = event.target.value

        switch (type) {
            case 'name':
                setName(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'taskText':
                setTaskText(value)
                break
        }
    }
    const validateForm = () => {
        if (!name || !email || !taskText) {
            if (!name) {
                setHasNameError(true)
            }

            if (!email) {
                setHasEmailError(true)
            }

            if (!taskText) {
                setHasTaskTextError(true)
            }

            return false
        }

        if (!/.+@.+\..{2,}/g.test(email)) {
            setHasValidationEmailError(true)
            return false
        }

        return true
    }
    const clearFormEvent = () => {
        setName('')
        setEmail('')
        setTaskText('')
    }
    const handleSubmit = (event) => {
        event.preventDefault()

        const formIsValid = validateForm()

        if (!formIsValid) {
            return
        }

        const notificationPayload = {
            notification,
            setNotification
        }

        createTask({ name, email, taskText })
            .then((status) => {
                if (!status) {
                    showNotification({
                        ...notificationPayload,
                        type: 'error',
                        text: 'Не удалось создать задачу'
                    })
                }

                clearFormEvent()
                fetchTasks()
                showNotification({
                    ...notificationPayload,
                    type: 'success',
                    text: 'Задача успешно создана'
                })
            })
            .catch(() => {
                showNotification({
                    ...notificationPayload,
                    type: 'error',
                    text: 'Произошла ошибка на сервере, не удалось создать задачу'
                })
            })
    }
    const clearErrorEvent = (type) => {
        switch (type) {
            case 'name':
                setHasNameError(false)
                break
            case 'email':
                setHasEmailError(false)
                setHasValidationEmailError(false)
                break
            case 'taskText':
                setHasTaskTextError(false)
                break
        }
    }
    const EmptyFieldErrorComponent = (text = 'Поле обязательно для ввода') => {
        return <p className="add-new-to-do__input-error">{ text }</p>
    }
    const NameErrorComponent = hasNameError ? EmptyFieldErrorComponent() : ''
    const EmailErrorComponent = hasEmailError
        ? EmptyFieldErrorComponent()
        : hasValidationEmailError
            ? EmptyFieldErrorComponent('Указан невалидный email')
            : ''
    const TaskTextErrorComponent = hasTaskTextError ? EmptyFieldErrorComponent() : ''

    return <div className="add-new-to-do">
        { notification ? <Notification data={notification} /> : '' }
        <p className="add-new-to-do__title">
            Добавить новую задачу
        </p>
        <form className="add-new-to-do__form" onSubmit={handleSubmit}>
            <div className="add-new-to-do__row">
                <div className="add-new-to-do__input-wrapper">
                    <p className="add-new-to-do__input-title">
                        Ваше имя
                    </p>
                    <input
                        className="add-new-to-do__input"
                        type="text"
                        value={name}
                        onChange={(event) => handleChange(event, 'name')}
                        onFocus={() => clearErrorEvent('name')}
                    />
                    { NameErrorComponent }
                </div>
                <div className="add-new-to-do__input-wrapper">
                    <p className="add-new-to-do__input-title">
                        Ваш email
                    </p>
                    <input
                        className="add-new-to-do__input"
                        type="text"
                        value={email}
                        onChange={(event) => handleChange(event, 'email')}
                        onFocus={() => clearErrorEvent('email')}
                    />
                    { EmailErrorComponent }
                </div>
            </div>
            <p className="add-new-to-do__input-title">
                Текст задачи
            </p>
            <textarea
                className="add-new-to-do__textarea"
                value={taskText}
                onChange={(event) => handleChange(event, 'taskText')}
                onFocus={() => clearErrorEvent('taskText')}
            />
            { TaskTextErrorComponent }
            <div className="add-new-to-do__submit-wrapper">
                <button className="add-new-to-do__submit">
                    Добавить задачу
                </button>
            </div>
        </form>
    </div>
}
