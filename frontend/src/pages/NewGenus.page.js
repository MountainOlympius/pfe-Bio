import React, { useState } from 'react'

import { cloneObject, translateErrors } from '../utils/Generic'
import { createGenus } from '../utils/api'
import GenusForm from '../components/GenusForm'

const NewGenusPage = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])

    const onSaveCallback = async (data, onSuccessCallback) => {
        const localErrors = []

        setErrors([])
        setMessages([])

        if (!('name' in data) || data.name === '') localErrors.push('Le champ du nom est obligatoire')
        if (!('description' in data) || data.description === '') localErrors.push('Le champ du description est obligatoire')
        if (!data.family_id) localErrors.push('Le champ du famille est obligatoire')

        if (localErrors.length > 0) return setErrors(cloneObject(localErrors))

        const response = await createGenus(data)

        if (response && response.ok) {
            onSuccessCallback()
            setMessages(['Le genre a été créé avec succès'])
            setTimeout(() => setMessages([]), 2000)
        } else if (response && response.errors) {
            setErrors(translateErrors(response.errors))
        }
    }

    return (
        <div className='NewGenusPage'>
            <GenusForm onSaveCallback={onSaveCallback} />

            <div className='errors-div'>
                {errors.map((error, i) => <p key={i}>{error}</p>)}
            </div>

            <div className='messages-div'>
                {messages.map((msg, i) => <p key={i}>{msg}</p>)}
            </div>
        </div>
    )
}

export default NewGenusPage