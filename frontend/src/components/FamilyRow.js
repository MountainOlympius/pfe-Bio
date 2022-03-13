import React from 'react'

const FamilyRow = ({ id, name, criteria, created_date }) => {
	return (
		<tr className="FamilyRow">
			<td>{id}</td>
            <td>{name}</td>
            <td>{criteria.length}</td>
            <td>{created_date}</td>
            <td>
                <button className='edit-btn'>edit</button>
            </td>
            <td>
                <button className='delete-btn'>delete</button>
            </td>
		</tr>
	)
}

export default FamilyRow