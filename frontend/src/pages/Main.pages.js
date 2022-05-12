import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainNavBar from '../components/MainNavBar'

import HomePage from './HomePage'
import TryDemoPage from './TryDemoPage'
import AboutPage from './AboutPage'


const MainPages = () => {
    return (
        <div className="App MainPages">
            <MainNavBar />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='/essayer' element={<TryDemoPage />} />
                <Route path='/apropos' element={<AboutPage />} />
            </Routes>
        </div>
    )
}

export default MainPages