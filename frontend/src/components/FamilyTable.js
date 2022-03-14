import React from 'react'
import FamilyRow from './FamilyRow'

const FamilyTable = ({ data, deleteCallback }) => {
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
                {data.map((family, i) => <FamilyRow deleteCallback={() => deleteCallback(family.id)} key={i} {...family} />)}
            </tbody>
        </table>
    )
}

export default FamilyTable