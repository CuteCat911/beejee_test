import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import fetchTasks from '../methods/fetch-tasks'
import showNotification from '../methods/show-notification'
import { AddNewToDo } from '../components/main-page/AddNewToDo'
import { EmptyToDoList } from '../components/main-page/EmptyToDoList'
import { ToDoList } from '../components/main-page/ToDoList'
import { Notification } from '../components/general/Notification'

export const MainPage = ({ isAuth, setIsAuth }) => {
    const [tasksData, setTasksData] = useState({ tasks: [], totalAmount: 0 })
    const [notification, setNotification] = useState(null)
    const { search } = useLocation()
    const fetchTasksEvent = ({ newPage, newSorting } = {}) => {
        const payload = search
            .replace('?', '')
            .split('&')
            .filter((searchItem) => {
                return searchItem.includes('sorting') || searchItem.includes('page')
            })
            .reduce((acc, searchItem) => {
                const searchItemPaths = searchItem.split('=')
                acc[searchItemPaths[0]] = searchItemPaths[1]
                return acc
            }, {})

        if (newPage) {
            payload.page = newPage
        }

        if (newSorting !== undefined) {
            payload.sorting = newSorting
        }

        fetchTasks(payload)
            .then((data) => {
                const { tasks, totalAmount, isAuth } = data

                setTasksData({ tasks, totalAmount })
                setIsAuth(isAuth)
            })
            .catch((error) => {
                console.error(error)
                showNotification({
                    notification,
                    setNotification,
                    type: 'error',
                    text: 'Произошла ошибка на сервере, не удалось получить список задач'
                })
            })
    }

    useEffect(() => {
       fetchTasksEvent()
    }, [])

    const tasksListContent = !tasksData.tasks.length
        ? <EmptyToDoList />
        : <div className="main-page__to-do-list">
            <ToDoList
                tasksData={tasksData}
                fetchTasks={fetchTasksEvent}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
            />
        </div>

    return <div className="main-page">
        { notification ? <Notification data={notification} /> : '' }
        <div className="wrapper">
            <AddNewToDo fetchTasks={fetchTasksEvent} />
            { tasksListContent }
        </div>
    </div>
}
