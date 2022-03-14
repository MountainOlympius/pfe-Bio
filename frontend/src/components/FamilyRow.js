import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/Generic'

const FamilyRow = ({ id, name, criteria, created_date, deleteCallback }) => {
	return (
		<tr className="FamilyRow">
			<td>{id}</td>
            <td>{name}</td>
            <td>{criteria.length}</td>
            <td>{formatDate(new Date(created_date))}</td>
            <td className="edit">
				<Link to={`/admin/family/${id}/edit`} >edit</Link>
			</td>
            <td>
                <button className='delete-btn' onClick={deleteCallback}>delete</button>
            </td>
		</tr>
	)
}

export default FamilyRow