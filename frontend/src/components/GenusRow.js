import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/Generic'

const GenusRow = ({ id, name, description, criteria }) => {
    return (
        <tr className='GenusRow'>
            <td>{id}</td>
            <td>{name}</td>
            <td>{description && description.length > 20 ? description.slice(0, 20) + '...' : description}</td>
            <td>{(criteria || []).length}</td>
            <td>
                <Link className='edit-btn' to='#'>modifier</Link>
            </td>
            <td>
                <button className='delete-btn'>supprimer</button>
            </td>
        </tr>
    )
}

export default GenusRow