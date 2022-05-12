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
                <Route path='' element={<HomePage to='/' />} />
                <Route path='' element={<TryDemoPage to='/essayer' />} />
                <Route path='' element={<AboutPage to='/apropos' />} />
            </Routes>
        </div>
    )
}

export default MainPages