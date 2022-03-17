import React, { useState } from 'react'

import { cloneObject, translateErrors } from '../utils/Generic'
import { addGenusCriteria, createGenus } from '../utils/api'
import GenusForm from '../components/GenusForm'

import '../styles/NewGenus.page.scss'

const NewGenusPage = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])

    const onSaveCallback = async (data, onSuccessCallback) => {
        const localErrors = []
        const genusData = cloneObject(data)

        setErrors([])
        setMessages([])

        delete genusData['criteria']

        if (!('name' in data) || data.name === '') localErrors.push('Le champ du nom est obligatoire')
        if (!('description' in data) || data.description === '') localErrors.push('Le champ du description est obligatoire')
        if (!data.family_id) localErrors.push('Le champ du famille est obligatoire')

        if (localErrors.length > 0) return setErrors(cloneObject(localErrors))

        const response = await createGenus(genusData)

        if (response && response.ok && response.data && response.data.id) {
            setMessages(['Le genre a été créé avec succès'])
        } else if (response && response.errors) {
            return setErrors(translateErrors(response.errors))
        } else return
        
        await Promise.all(data.criteria.map(cr => addGenusCriteria(response.data.id, cr.content)))
        
        setMessages([...messages, 'Les critères du genre ont été créé avec succès'])
        onSuccessCallback()
        setTimeout(() => setMessages([]), 2000)
    }

    return (
        <div className='NewGenusPage'>
            <GenusForm onSaveCallback={onSaveCallback} shouldReset />

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