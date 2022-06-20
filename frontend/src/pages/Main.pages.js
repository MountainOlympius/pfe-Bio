import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainNavBar from '../components/MainNavBar'

import HomePage from './HomePage'
import TryDemoPage from './TryDemoPage'
import AboutPage from './AboutPage'

import ClassifyPhylumPage from './ClassifyPhylum.page'
import ClassifyFamilyPage from './ClassifyFamily.page'

import '../styles/MainPages.scss';
import ClassifyGenusPage from './ClassifyGenus.page'
import ClassifySpeciesPage from './ClassifySpecies.page'


const MainPages = () => {
    return (
        <div className="App MainPages">
            <MainNavBar />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='/essayer' element={<TryDemoPage />} />
                <Route path='/apropos' element={<AboutPage />} />

                <Route path='/essayer/phylum' element={<ClassifyPhylumPage />} />
                <Route path='/essayer/family/:phylumId' element={<ClassifyFamilyPage />} />
                <Route path='/essayer/genus/:familyId' element={<ClassifyGenusPage />} />
                <Route path='/essayer/species/:genusId/:familyId/:phylumId' element={<ClassifySpeciesPage />} />
            </Routes>
        </div>
    )
}

export default MainPages