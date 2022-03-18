import React from 'react'
import GenusRow from './GenusRow'

const GenusTable = ({ data, onDeleteCallback }) => {
    return (
        <table className='GenusTable'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Nombre de critères</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {data.map(genus => <GenusRow key={genus.id} deleteCallback={onDeleteCallback} {...genus} />)}
            </tbody>
        </table>
    )
}

export default GenusTable
