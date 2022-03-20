import React from 'react'
import SpeciesRow from './SpeciesRow'

const SpeciesTable = ({ data , onDeleteCallback }) => {
    return (
        <table className='SpeciesTable'>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Le Nom</td>
                    <td>Description</td>
                    <td>Nombre des criteres</td>
                    <td>Date de creation</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {data.map(species => <SpeciesRow key={species.id} onDeleteCallback={onDeleteCallback} {...species} />)}
            </tbody>
        </table>
    )
}

export default SpeciesTable