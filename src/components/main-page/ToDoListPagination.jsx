import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import './to-do-list-pagination.scss'

const TASKS_ON_PAGE = 3
const generatePath = (pageNumber) => {
    const { search } = useLocation()
    const hasPageInSearch = search.includes('page=')

    return hasPageInSearch
        ? '/' + search.replace(/page=\d+/, `page=${pageNumber}`)
        : search
            ? `/${search}&page=${pageNumber}`
            : `/?page=${pageNumber}`
}

export const ToDoListPagination = ({ tasksAmount, fetchTasks }) => {
    const pagesAmount = Math.ceil(tasksAmount / TASKS_ON_PAGE)
    const { search } = useLocation()
    const regExpPageMatch = search ? search.match(/\d+/) : null
    const currentPage = regExpPageMatch ? regExpPageMatch[0] : 1

    return pagesAmount ? <div className="to-do-list-pagination">
        {[...Array(pagesAmount)].map((_, index) => (
            <Link
                key={index}
                className={`to-do-list-pagination__page ${index + 1 === Number(currentPage) ? 'to-do-list-pagination__page--active' : ''}`}
                to={generatePath(index + 1)}
                onClick={() => {fetchTasks({ newPage: index + 1 })}}
            >
                { index + 1 }
            </Link>
        ))}
    </div> : ''
}
