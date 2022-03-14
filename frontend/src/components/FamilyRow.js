import React from 'react'
import { Link } from 'react-router-dom'

const FamilyRow = ({ id, name, criteria, created_date, deleteCallback }) => {
	return (
		<tr className="FamilyRow">
			<td>{id}</td>
            <td>{name}</td>
            <td>{criteria.length}</td>
            <td>{created_date}</td>
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