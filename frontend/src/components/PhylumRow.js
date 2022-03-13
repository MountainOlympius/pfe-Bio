import React from 'react'

const PhylumRow = ({ id, name, description, created_date}) => {
    return (
        <tr className='phylum-row'>
            <td className='id'>{id}</td>
            <td className='name'>{name}</td>
            <td className='description'>{description}</td>
            <td className='created-date'>{created_date}</td>
            <td className='edit'>
                <button className='edit-btn'>edit</button>
            </td>
            <td className='delete'>
                <button className='delete-btn'>delete</button>
            </td>
        </tr>
    )
}

export default PhylumRow