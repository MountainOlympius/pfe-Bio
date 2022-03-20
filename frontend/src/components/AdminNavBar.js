import React from 'react'
import { NavLink } from 'react-router-dom'

import flore from '../assets/flore.png'

import '../styles/AdminNavBar.scss'

const AdminNavBar = () => {
    return (
        <header className='nav-logo-container'>
            <img className='title-img' src={flore} alt="" />
            <nav className='admin-navbar'>
                <ul>
                    <li>
                        <NavLink className='embranchement' to='/admin/phylum'>Embranchements</NavLink>
                    </li>
                    <li> 
                        <NavLink className='famille' to='/admin/family'>Familles</NavLink>
                    </li>
                    <li>
                        <NavLink className='genre' to='/admin/genus'>Genres</NavLink>
                    </li>
                    <li>
                        <NavLink className='espece' to='/admin/species'>Especes</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AdminNavBar