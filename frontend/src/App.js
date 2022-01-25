import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminPages from './pages/Admin.pages'
import MainPages from './pages/Main.pages'
import AuthenticatedOnly from './components/AuthenticatedOnly'
import AdminOnly from './components/AdminOnly'
import LoginPage from './pages/Login.page'

import './App.css'

function App() {
    return (
        <Routes>
            <Route
                path="/admin/*"
                element={
                    <AuthenticatedOnly>
                        <AdminOnly>
                            <AdminPages />
                        </AdminOnly>
                    </AuthenticatedOnly>
                }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<MainPages />} />
        </Routes>
    )
}

export default App
