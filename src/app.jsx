import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/general/Header'
import { MainPage } from './pages/Main.page'
import { LoginPage } from './pages/Login.page'

export const App = () => {
    const [isAuth, setIsAuth] = useState(false)

    return <BrowserRouter>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} />
        <main>
            <Routes>
                <Route path="/" element={<MainPage isAuth={isAuth} setIsAuth={setIsAuth} />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </main>
    </BrowserRouter>
}
