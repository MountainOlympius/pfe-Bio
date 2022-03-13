import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/AdminNavBar.scss'

const AdminNavBar = () => {
    return (
        <nav className='admin-navbar'>
            <ul>
                <li>
                    <NavLink to='#'>Embranchements</NavLink>
                </li>
                <li>
                    <NavLink to='#'>Familles</NavLink>
                </li>
                <li>
                    <NavLink to='#'>Genres</NavLink>
                </li>
                <li>
                    <NavLink to='#'>Especes</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AdminNavBar