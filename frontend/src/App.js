import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminPages from './pages/Admin.pages'
import MainPages from './pages/Main.pages'

import './App.css'
import { AuthenticatedOnly } from './components/AuthenticatedOnly'

function App() {
    return (
        <Routes>
            <Route path='/admin' element={<AuthenticatedOnly><AdminPages /></AuthenticatedOnly>} />
            <Route path='' element={<MainPages />} />
        </Routes>
    )
}

export default App
