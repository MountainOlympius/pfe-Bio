import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import PhylumsPage from './Phylums.page'
import AdminNavBar from '../components/AdminNavBar'
import NewPhylumPage from './NewPhylum.page'

import PhylumsEditPage from './PhylumEdit.page'
import FamilyPage from './Family.page'
import NewFamilyPage from './NewFamily.page'
import FamilyEditPage from './FamilyEdit.page'
import GenusPage from './Genus.page'
import NewGenusPage from './NewGenus.page'

import '../styles/AdminPages.scss'
import GenusEditPage from './GenusEdit.page'
import NewSpeciesPage from './NewSpecies.page'
import SpeciesEditPage from './SpeciesEdit.page'
import SpeciesPage from './Species.page'

const AdminPages = () => {
    return (
        <div className='AdminPages'>
            <AdminNavBar />
            <Routes>
                <Route path='' element={<Navigate to='phylum' />} />

                <Route path='phylum' element={<PhylumsPage />} />
                <Route path='phylum/new' element={<NewPhylumPage />} />
                <Route path='phylum/edit/:id' element={<PhylumsEditPage />} />

                <Route path='family' element={<FamilyPage />} />
                <Route path='family/new' element={<NewFamilyPage />} />
                <Route path='family/:id/edit' element={<FamilyEditPage />} />

                <Route path='genus' element={<GenusPage />} />
                <Route path='genus/new' element={<NewGenusPage />} />
                <Route path='genus/:id/edit' element={<GenusEditPage />} />

                <Route path='species' element={<SpeciesPage />} />
                <Route path='species/new' element={<NewSpeciesPage />} />
                <Route path='species/:id/edit' element={<SpeciesEditPage />} />
            </Routes>
        </div>
    )
}

export default AdminPages
