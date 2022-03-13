import React from 'react'
import PhylumRow from './PhylumRow'

import '../styles/PhylumsTable.scss'

const PhylumsTable = ({ data, deleteCallback }) => {
	return (
		<table className="phylums-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Nom</th>
					<th>Description</th>
					<th>Ajoute le</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{data
					? data.map((phylum) => (
							<PhylumRow
								key={phylum.id}
								onDeleteBtn={() => deleteCallback(phylum.id)}
								{...phylum}
							/>
					  ))
					: null}
			</tbody>
		</table>
	)
}

export default PhylumsTable
