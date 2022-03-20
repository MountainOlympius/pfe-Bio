import React, { useState } from 'react'
import SpeciesForm from '../components/SpeciesForm'
import { addSpecies } from '../utils/api'
import { cloneObject, translateErrors } from '../utils/Generic'

const NewSpeciesPage = () => {
    const  [errors, setErrors] = useState([])
    const  [messages, setMessages] = useState([])

    const saveSpecies = async (data, onSuccessCallback) => {
        const dataClone = cloneObject(data)
        const localErrors = []

        setErrors([])
        setMessages([])

        if (!('name' in data) || data.name === '') localErrors.push('Le champ du nom est obligatoire')
        if (!data.genus_id) localErrors.push('Le champ du genre est obligatoire')

        if (localErrors.length > 0) return setErrors(localErrors)

        const response = await addSpecies(dataClone)

        if (response && response.ok) {
            setMessages(['L\'espèce a été créé avec succès'])
            onSuccessCallback()
        } else if (response && response.errors) {
            return setErrors(translateErrors(response.errors))
        }

        setTimeout(() => setMessages([]), 2000)
    }

    return (
        <div className='NewSpeciesPage'>
            <SpeciesForm onSubmitCallback={saveSpecies} shouldReset />

            <div className='errors-div'>
                {errors.map((error, i) => <p key={i}>{error}</p>)}
            </div>

            <div className='messages-div'>
                {messages.map((msg, i) => <p key={i}>{msg}</p>)}
            </div>
        </div>
    )
}

export default NewSpeciesPage