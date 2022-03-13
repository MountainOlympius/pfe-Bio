import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PhylumsPage from './Phylums.page'

import '../styles/AdminPages.scss'

const AdminPages = () => {
    return (
        <Routes>
            <Route path='phylum' element={<PhylumsPage />} ></Route>
            <Route path='phylum/new' element={<div>New phylum</div>} ></Route>
            <Route path='phylum/edit/:id' element={<div>Edit phylum</div>} ></Route>
        </Routes>
    )
}

export default AdminPages
