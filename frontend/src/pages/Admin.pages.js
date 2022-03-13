import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PhylumsPage from './Phylums.page'
import AdminNavBar from '../components/AdminNavBar'
import NewPhylumPage from './NewPhylum.page'

import '../styles/AdminPages.scss'
import PhylumsEditPage from './PhylumEdit.page'

const AdminPages = () => {
    return (
        <div className='AdminPages'>
            <AdminNavBar />
            <Routes>
                <Route path='phylum' element={<PhylumsPage />} ></Route>
                <Route path='phylum/new' element={<NewPhylumPage />} ></Route>
                <Route path='phylum/edit/:id' element={<PhylumsEditPage />} ></Route>
            </Routes>
        </div>
    )
}

export default AdminPages
