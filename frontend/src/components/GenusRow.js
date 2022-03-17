import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/GenusRow.scss'

const GenusRow = ({ id, name, description, criteria }) => {
    return (
        <tr className='GenusRow'>
            <td>{id}</td>
            <td>{name}</td>
            <td>{description && description.length > 20 ? description.slice(0, 50) + '...' : description}</td>
            <td>{(criteria || []).length}</td>
            <div className="edilete">
            <td classname="edit">
                <Link className='edit-btn' to='#'>modifier</Link>
            </td>
            <td>
                <button className='delete-btn'>supprimer</button>
            </td>
            </div>
        </tr>
    )
}

export default GenusRow