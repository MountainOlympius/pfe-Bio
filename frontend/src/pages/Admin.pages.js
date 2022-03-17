import React from 'react'
import { Route, Routes } from 'react-router-dom'

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

const AdminPages = () => {
    return (
        <div className='AdminPages'>
            <AdminNavBar />
            <Routes>
                <Route path='phylum' element={<PhylumsPage />} />
                <Route path='phylum/new' element={<NewPhylumPage />} />
                <Route path='phylum/edit/:id' element={<PhylumsEditPage />} />

                <Route path='family' element={<FamilyPage />} />
                <Route path='family/new' element={<NewFamilyPage />} />
                <Route path='family/:id/edit' element={<FamilyEditPage />} />

                <Route path='genus' element={<GenusPage />} />
                <Route path='genus/new' element={<NewGenusPage />} />
                <Route path='genus/:id/edit' element={<GenusEditPage />} />
            </Routes>
        </div>
    )
}

export default AdminPages
