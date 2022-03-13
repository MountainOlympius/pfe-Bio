import React, { useEffect, useState } from 'react'
import { useLocation, useMatch, useParams } from 'react-router-dom'

import PhylumForm from '../components/PhylumForm'
import { getPhylum, updatePhylum } from '../utils/api'
import { translateErrors } from '../utils/Generic'

const PhylumsEditPage = () => {
	const { id } = useParams()
	const [data, setData] = useState({})
	const [errors, setErrors] = useState([])
	const [messages, setMessages] = useState([])

	useEffect(async () => {
		const response = await getPhylum(id)

		if (response && response.ok) {
			setData({
				name: response.data.name,
				description: response.data.description,
			})
		}
	}, [id])

	const updatePhylumCallback = (e) => {
		const elements = e.target.elements
		const data = {
			name: elements['name'].value,
			description: elements['description'].value,
		}

		updatePhylum(id, data).then((response) => {
			if (response && response.ok) {
				setErrors([])
				setMessages(['Embranchement a été modifié avec succès'])
                
                setTimeout(() => setMessages([]), 2000)
			} else if (response && response.errors){
                setErrors(translateErrors(response.errors))
			}
		})

		e.preventDefault()
	}

	return (
		<div className="PhylumEditPage">
			<PhylumForm
				buttonText="Enregistrer"
				data={data}
				onSubmitCallback={updatePhylumCallback}
			/>

			{errors.length > 0 ? (
				<div className="errors-div">
					{errors.map((error, i) => (
						<p key={i}>{error}</p>
					))}
				</div>
			) : null}

			{messages.length > 0 ? (
				<div className="messages-div">
					{messages.map((msg, i) => (
						<p key={i}>{msg}</p>
					))}
				</div>
			) : null}
		</div>
	)
}

export default PhylumsEditPage
