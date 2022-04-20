import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import showNotification from '../methods/show-notification'
import { Notification } from '../components/general/Notification'
import './login.scss'

export const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [hasLoginError, setHasLoginError] = useState(false)
    const [hasPasswordError, setHasPasswordError] = useState(false)
    const [hasAuthError, setHasAuthError] = useState(false)
    const [notification, setNotification] = useState(null)
    const navigate = useNavigate()
    const handleChange = (event, type) => {
        const value = event.target.value

        switch (type) {
            case 'login':
                setLogin(value)
                break
            case 'password':
                setPassword(value)
                break
        }
    }
    const validateForm = () => {
        if (!login || !password) {
            if (!login) {
                setHasLoginError(true)
            }

            if (!password) {
                setHasPasswordError(true)
            }

            return false
        }

        return true
    }
    const submitEvent = (event) => {
        event.preventDefault()

        const isValidForm = validateForm()

        if (!isValidForm) {
            return
        }

        axios.post('/api/login', { login, password })
            .then((resp) => {
                const { data } = resp

                if (!data) {
                    setHasAuthError(true)
                    return
                }

                navigate('/')
            })
            .catch((error) => {
                console.error(error)
                showNotification({
                    notification,
                    setNotification,
                    type: 'error',
                    text: 'Не удалось авторизоваться'
                })
            })
    }
    const clearErrorEvent = (type) => {
        switch (type) {
            case 'login':
                setHasLoginError(false)
                break
            case 'password':
                setHasPasswordError(false)
                break
        }

        setHasAuthError(false)
    }
    const ErrorComponent = <p className="login__input-error">Поле обязательно для заполнения</p>
    const LoginErrorComponent = hasLoginError ? ErrorComponent : ''
    const PasswordErrorComponent = hasPasswordError ? ErrorComponent : ''
    const AuthErrorComponent = hasAuthError ? <p className="login__input-error">Неверный логин или пароль</p> : ''

    return <div className="login">
        { notification ? <Notification data={notification} /> : '' }
        <div className="wrapper">
            <form className="login__form" onSubmit={submitEvent}>
                <Link className="login__return" to="/">
                    Назад
                </Link>
                <div className="login__input-wrapper">
                    <p className="login__input-title">
                        Логин
                    </p>
                    <input
                        className="login__input"
                        value={login}
                        type="text"
                        onChange={(event) => handleChange(event, 'login')}
                        onFocus={() => clearErrorEvent('login')}
                    />
                    { LoginErrorComponent }
                    { AuthErrorComponent }
                </div>
                <div className="login__input-wrapper">
                    <p className="login__input-title">
                        Пароль
                    </p>
                    <input
                        className="login__input"
                        value={password}
                        type="password"
                        onChange={(event) => handleChange(event, 'password')}
                        onFocus={() => clearErrorEvent('password')}
                    />
                    { PasswordErrorComponent }
                    { AuthErrorComponent }
                </div>
                <div className="login__submit-wrapper">
                    <button className="login__submit">
                        Войти
                    </button>
                </div>
            </form>
        </div>
    </div>
}
