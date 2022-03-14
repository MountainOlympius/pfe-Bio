import React from 'react'
import { Link } from 'react-router-dom'

import { formatDate } from '../utils/Generic'

import '../styles/PhylumRow.scss'

const PhylumRow = ({ id, name, description, created_date, onDeleteBtn }) => {
	return (
		<tr className="phylum-row">
			<td className="id">{id}</td>
			<td className="name">{name}</td>
			<td className="description">{description && description.length > 50 ? description.slice(0, 50) + '...' : description}</td>
			<td className="created-date">{formatDate(new Date(created_date))}</td>
			<td className="edit">
				<Link to={`/admin/phylum/edit/${id}`} >edit</Link>
			</td>
			<td className="delete">
				<button onClick={onDeleteBtn} className="delete-btn">
					delete
				</button>
			</td>
		</tr>
	)
}

export default PhylumRow
