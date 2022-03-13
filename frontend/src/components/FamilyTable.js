import React from 'react'
import FamilyRow from './FamilyRow'

const FamilyTable = ({ data }) => {
    return (
        <table className='FamilyTable'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Nombre de critères</th>
                    <th>Date de creation</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((family, i) => <FamilyRow key={i} {...family} />)}
            </tbody>
        </table>
    )
}

export default FamilyTable