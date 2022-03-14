import React, { useState } from 'react'

import PhylumForm from '../components/PhylumForm'
import { createPhylum } from '../utils/api'
import { translateErrors } from '../utils/Generic'

import '../styles/NewPhylumPage.scss'

const NewPhylumPage = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])

    const createPhylumCallback = (e) => {
        const elements = e.target.elements
        const data = {
			name: elements['name'].value,
			description: elements['description'].value,
		}

        createPhylum(data).then(response => {
            if (response && response.ok) {
                e.target.reset()
                
                setErrors([])
                setMessages(["Embranchement a été créé avec succès"])

                setTimeout(() => setMessages([]), 2000)
            } else if (response && response.errors) {
                setErrors(translateErrors(response.errors))
            }
        })

        e.preventDefault()
    }

	return (
		<div className="NewPhylumPage">
			<PhylumForm onSubmitCallback={createPhylumCallback} buttonText='Ajouter' />
            
            {errors.length > 0 ? (
                <div className='errors-div'>
                    {errors.map((error, i) => <p key={i}>{error}</p>)}
                </div>
            ) : null}

            {messages.length > 0 ? (
                <div className='messages-div'>
                    {messages.map((msg,i) => <p key={i}>{msg}</p>)}
                </div>
            ) : null}
		</div>
	)
}

export default NewPhylumPage
