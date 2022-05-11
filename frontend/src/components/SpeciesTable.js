import React from 'react'
import SpeciesRow from './SpeciesRow'

const SpeciesTable = ({ data , onDeleteCallback }) => {
    return (
        <table className='SpeciesTable'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Le Nom</th>
                    <th>Description</th>
                    <th>Nombre des criteres</th>
                    <th>Date de creation</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map(species => <SpeciesRow key={species.id} onDeleteCallback={onDeleteCallback} {...species} />)}
            </tbody>
        </table>
    )
}

export default SpeciesTable