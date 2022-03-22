import React, { useState } from 'react'
import SpeciesForm from '../components/SpeciesForm'
import { addSpecies, addSpeciesCriteria, uploadSpeciesImages } from '../utils/api'
import { cloneObject, translateErrors } from '../utils/Generic'

const NewSpeciesPage = () => {
    const  [errors, setErrors] = useState([])
    const  [messages, setMessages] = useState([])

    const saveSpecies = async (data, onSuccessCallback) => {
        const dataClone = cloneObject(data)
        const imagesClone = [...data.images]
        const criteriaClone = cloneObject(data.criteria)
        const localErrors = []

        setErrors([])
        setMessages([])

        delete dataClone['criteria']
        delete dataClone['images']

        if (!('name' in data) || data.name === '') localErrors.push('Le champ du nom est obligatoire')
        if (!data.genus_id) localErrors.push('Le champ du genre est obligatoire')

        if (localErrors.length > 0) return setErrors(localErrors)

        const response = await addSpecies(dataClone)

        if (response && response.ok && response.data && response.data.id) {
            setMessages(['L\'espèce a été créé avec succès'])
            onSuccessCallback()
        } else if (response && response.errors) {
            return setErrors(translateErrors(response.errors))
        }
        
        const createdCriteria = await addSpeciesCriteria(response.data.id, criteriaClone.map(cr => cr.content))
        
        if (imagesClone.length > 0) {
            await uploadSpeciesImages(response.data.id, imagesClone.map(img => img.file))
        }

        if (createdCriteria && createdCriteria.ok) {
            setMessages(['L\'espèce a été créé avec succès', 'Les critères d\'espèce ont été créé avec succès'])
        }

        setTimeout(() => setMessages([]), 2000)
    }

    return (
        <div className='NewSpeciesPage'>
            <h3>Ajouter une nouvelle espèce</h3>
            
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