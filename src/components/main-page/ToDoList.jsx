import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToDoListItem } from './ToDoListItem'
import { ToDoListPagination } from './ToDoListPagination'
import './to-do-list.scss'

const SORTING_TYPES = [
    { key: '', title: 'Ничего не выбрано' },
    { key: 'name:asc', title: 'Имя пользователя по возрастанию' },
    { key: 'name:desc', title: 'Имя пользователя по убыванию' },
    { key: 'email:asc', title: 'Email по возрастанию' },
    { key: 'email:desc', title: 'Email по убыванию' },
    { key: 'status:asc', title: 'Сначала не выполненые' },
    { key: 'status:desc', title: 'Сначала выполненные' }
]

export const ToDoList = ({ tasksData, fetchTasks, isAuth, setIsAuth }) => {
    const { tasks, totalAmount } = tasksData
    const [sorting, setSorting] = useState('')
    const navigate = useNavigate()
    const { search } = useLocation()
    const sortingEvent = (event) => {
        const value = event.target.value
        const hasSortingInSearch = search.includes('sorting=')
        const newQuery = hasSortingInSearch
            ? value
                ? '/' + search.replace(/sorting=[^&]+/, `sorting=${value}`)
                : '/' + search.replace(/(\?|&)sorting=[^&]+/, '')
            : search
                ? `/${search}&sorting=${value}`
                : `/?sorting=${value}`

        setSorting(value)
        fetchTasks({ newSorting: value })
        navigate(newQuery)
    }

    return <div className="to-do-list">
        <div className="to-do-list__sorting">
            <select
                className="to-do-list__sorting-select"
                value={sorting}
                onChange={sortingEvent}
            >
                {SORTING_TYPES.map((sortingType, key) => (
                    <option value={sortingType.key}>{ sortingType.title }</option>
                ))}
            </select>
        </div>
        <div className="to-do-list__list">
            {tasks.map((task, key) => (
                <ToDoListItem
                    key={key}
                    task={task}
                    fetchTasks={fetchTasks}
                    isAuth={isAuth}
                    setIsAuth={setIsAuth}
                />
            ))}
        </div>
        <ToDoListPagination tasksAmount={totalAmount} fetchTasks={fetchTasks} />
    </div>
}
