import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './header.scss'

export const Header = ({ isAuth, setIsAuth }) => {
    const logoutEvent = () => {
        axios.post('/api/logout')
            .then((resp) => {
                const { data } = resp

                if (!data) {
                    return
                }

                setIsAuth(false)
            })
    }

    return <header className="header">
        <div className="wrapper">
            {!isAuth ? <Link className="header__btn" to="/login">
                Авторизоваться
            </Link> : <button className="header__btn" onClick={logoutEvent}>
                Выйти
            </button>}
        </div>
    </header>
}
