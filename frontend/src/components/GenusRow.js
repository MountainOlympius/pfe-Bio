import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/GenusRow.scss'
import { formatDate } from '../utils/Generic'

const GenusRow = ({ id, name, description, criteria, created_date, deleteCallback }) => {
    return (
        <tr className='GenusRow'>
            <td>{id}</td>
            <td>{name}</td>
            <td>{description && description.length > 20 ? description.slice(0, 50) + '...' : description}</td>
            <td>{(criteria || []).length}</td>
            <td>{formatDate(new Date(created_date))} </td>

            <td className="edilete">
            <div className="edit">
                <Link className='edit-btn' to={`/admin/genus/${id}/edit`}>modifier</Link>
            </div>
            <div>
                <button className='delete-btn' onClick={() => deleteCallback(id)}>supprimer</button>
            </div>
            </td>
        </tr>
    )
}

export default GenusRow