import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminPages from './pages/Admin.pages'
import MainPages from './pages/Main.pages'

import './App.css'

function App() {
    return (
        <Routes>
            <Route path='/admin' element={<AdminPages />} />
            <Route path='' element={<MainPages />} />
        </Routes>
    )
}

export default App
