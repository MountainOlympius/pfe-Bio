import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/FamilyRow.scss'

const FamilyRow = ({ id, name, criteria, created_date, deleteCallback }) => {
	return (
		<tr className="FamilyRow">
			<td>{id}</td>
            <td>{name}</td>
            <td>{criteria.length}</td>
            <td>{created_date}</td>

            <div className="edilete">
            <td className="edit">
				<Link className='edit-btn' to={`/admin/family/${id}/edit`} >edit</Link>
			</td>
            <td>
                <button className='delete-btn' onClick={deleteCallback}>delete</button>
            </td>
            </div>
		</tr>
	)
}

export default FamilyRow