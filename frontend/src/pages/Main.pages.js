import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainNavBar from '../components/MainNavBar'

import HomePage from '../pages/HomePage'


const MainPages = () => {
    return (
        <div className="App MainPages">
            <MainNavBar />
            <Routes>
                <Route path='' element={<HomePage to='/' />} />
            </Routes>

        </div>
    )
}

export default MainPages