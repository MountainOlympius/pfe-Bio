import React from 'react'
import PhylumRow from './PhylumRow'

import '../styles/PhylumsTable.scss'

const PhylumsTable = ({ data, deleteCallback }) => {
	return (
		<table className="phylums-table">
			<thead>
				<tr>
					<th>#</th>
					<th>name</th>
					<th>description</th>
					<th>created</th>
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
