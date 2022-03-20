import React from 'react'
import { Link } from 'react-router-dom'

import { formatDate } from '../utils/Generic'

const SpeciesRow = ({ id, name, description, created_date, criteria}) => {
    return (
        <tr className='SpeciesRow'>
            <td className='id'>{id}</td>
            <td className='name'>{name}</td>
            <td className='description'>{description && description.length > 20 ? description.slice(0, 15) : description}</td>
            <td className='criteria'>{criteria?.length || 0}</td>
            <td className='created_date'>{formatDate(new Date(created_date))}</td>

            <td className='edilete'>
                <div className='edit'>
                    <Link className='edit-btn' to={`/admin/species/${id}/edit`}>Modifier</Link>
                </div>
                <div className='delete'>
                    <button className='delete-btn'>Supprimer</button>
                </div>
            </td>
        </tr>
    )
}

export default SpeciesRow