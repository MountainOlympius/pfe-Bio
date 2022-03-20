import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/FamilyRow.scss'
import { formatDate } from '../utils/Generic'

const FamilyRow = ({ id, name, criteria, created_date, deleteCallback }) => {
	return (
		<tr className="FamilyRow">
			<td>{id}</td>
            <td>{name}</td>
            <td>{criteria.length}</td>
            <td>{formatDate(new Date(created_date))}</td>

            <td className="edilete">
            <div className="edit">
				<Link className='edit-btn' to={`/admin/family/${id}/edit`} >modifier</Link>
			</div>
            <div>
                <button className='delete-btn' onClick={deleteCallback}>supprimer</button>
            </div>
            </td>
		</tr>
	)
}

export default FamilyRow