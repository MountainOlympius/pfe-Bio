import React, { useCallback, useEffect, useState } from 'react'
import { getPhylums } from '../utils/api'

const FamilyForm = ({ data = {}, submitCallback, shouldReset = false}) => {
	const [phylums, setPhylums] = useState([])
	const [criteria, setCriteria] = useState(data.criteria || [{}])

	useEffect(async () => {
		const response = await getPhylums()

		if (response && response.ok && response.data) {
			setPhylums(response.data)
		}
	}, [])

	const addCriteriaCallback = useCallback(() => {
		if (
			criteria.length <= 0 ||
			(criteria[criteria.length - 1].content &&
				criteria[criteria.length - 1].content !== '')
		) {
			setCriteria([...criteria, {}])
		}
	}, [criteria])

	const onChangeCriteriaCallback = useCallback(
		(i, e) => {
			const criteriaClone = [...criteria]
			criteriaClone[i].content = e.target.value
			setCriteria(criteriaClone)
		},
		[criteria]
	)

	const deleteCriteriaCallback = useCallback(
		(i) => {
			const criteriaClone = [...criteria]
			criteriaClone.pop(i)
			setCriteria(criteriaClone)
		},
		[criteria]
	)

	const saveFamily = (e) => {
		const elements = e.target.elements

		const data = {
			name: elements['name'].value,
			description: elements['description'].value,
			phylum_id: elements['phylum_id'].value,
			criteria: criteria
				.filter((cr) => Boolean(cr.content))
				.map((cr) => {
					return { id: cr.id, content: cr.content }
				}),
		}

		submitCallback(data, () => {
            if (shouldReset) {
                e.target.reset()
                setCriteria([])
                setTimeout(() => setCriteria([{}]), 0)
            }
        })

		e.preventDefault()
	}

	return (
		<form className="FamilyForm" onSubmit={saveFamily}>
			<div className="form-div">
				<label>Nom de famille</label>
				<input type="text" name="name" defaultValue={data.name} />
			</div>

			<div className="form-div">
				<label>Description</label>
				<textarea name="description" defaultValue={data.description} />
			</div>

			<div className="form-div">
				<label>Embranchement</label>
				<select defaultValue={data.phylum_id} name="phylum_id">
					{phylums.map((phylum, i) => (
						<option key={i} value={phylum.id}>
							{phylum.name}
						</option>
					))}
				</select>
			</div>

			<div className="form-div">
				<label>Les critères :</label>

				{criteria.map((cr, i) => (
					<div key={i} className="criteria-div">
						<textarea
							onChange={(e) => onChangeCriteriaCallback(i, e)}
							className="criteria"
							defaultValue={cr.content}
						/>
						<button
							onClick={deleteCriteriaCallback}
							type="button"
							className="delete-criteria"
						>
							supprimer critère
						</button>
					</div>
				))}

				<button
					type="button"
					onClick={addCriteriaCallback}
					className="add-criteria-btn"
				>
					Ajouter critère
				</button>
			</div>

			<button className="save-btn">Enregistrer</button>
		</form>
	)
}

export default FamilyForm
