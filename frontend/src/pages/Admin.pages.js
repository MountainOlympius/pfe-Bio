import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import PhylumsPage from './Phylums.page'
import AdminNavBar from '../components/AdminNavBar'
import NewPhylumPage from './NewPhylum.page'

import '../styles/AdminPages.scss'
import PhylumsEditPage from './PhylumEdit.page'
import FamilyPage from './Family.page'
import NewFamilyPage from './NewFamily.page'
import FamilyEditPage from './FamilyEdit.page'

const AdminPages = () => {
    return (
        <div className='AdminPages'>
            <AdminNavBar />
            <Routes>
                <Route path='' element={<Navigate to='phylum' /> } />
                <Route path='phylum' element={<PhylumsPage />} />
                <Route path='phylum/new' element={<NewPhylumPage />} />
                <Route path='phylum/edit/:id' element={<PhylumsEditPage />} />

                <Route path='family' element={<FamilyPage />} />
                <Route path='family/new' element={<NewFamilyPage />} />
                <Route path='family/:id/edit' element={<FamilyEditPage />} />

            </Routes>
        </div>
    )
}

export default AdminPages
