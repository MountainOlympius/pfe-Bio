import React, { useEffect, useState } from 'react'

import { searchGenus } from '../utils/api'
import { cloneObject } from '../utils/Generic'
import InputDropdown from './InputDropdown'

// TODO : Add images

const SpeciesForm = ({ data = {} , onSubmitCallback, shouldReset = false }) => {
    const [genusId, setGenusId] = useState(data?.genus?.id || undefined)
    const [criteria, setCriteria] = useState(data?.criteria || [{}])

    useEffect(() => {
        if (data?.genus?.id && genusId !== data?.genus?.id) setGenusId(data?.genus?.id)
        if (data?.criteria) setCriteria(data.criteria)
    }, [data])

    const searchForGenus = async (query) => {
        const response = await searchGenus(query)

        if (response && response.ok && response.data) return response.data 
        return []
    }

    const changeGenusId = (value) => {
        if (!value) setGenusId(data?.genus?.id || undefined)
        else setGenusId(value)
    }

    const onCriteriaChange = (e, i) => {
        const criteriaClone = cloneObject(criteria)
        criteriaClone[i].content = e.target.value
        setCriteria(criteriaClone)
    }
    
    const onCriteriaDelete = (i) => {
        const criteriaClone = cloneObject(criteria)
        setCriteria(criteriaClone.filter((cr, index) => index !== i))
    }

    const onAddCriteria = () => {
        if (criteria.length > 0 && (!criteria[criteria.length - 1].content || criteria[criteria.length - 1].content === '')) return

        const criteriaClone = cloneObject(criteria)
        setCriteria([...criteriaClone, {}])
    }

    const saveGenusData = (e) => {
        const elements = e.target.elements

        const data = {
            name: elements.name.value,
            description: elements.description.value,
            genus_id: genusId,
            criteria: criteria.filter(cr => Boolean(cr.content))
        }

        onSubmitCallback(data, () => {
            if (shouldReset) {
                e.target.reset()
                setCriteria([])
                setTimeout(() => setCriteria([{}]), 0)
            }
        })

        e.preventDefault()
    }

    return (
        <form className='SpeciesForm form' onSubmit={saveGenusData}>
            <div className='form-div'>
                <label>Le nom : </label>
                <input name='name' defaultValue={data?.name} className='input-elt' />
            </div>

            <InputDropdown onChangeInput={searchForGenus} onChoiceChange={changeGenusId} labelText='Le nom du genre : ' />

            <div className='form-div'>
                <label>Description : </label>
                <textarea name='description' defaultValue={data?.description} className='input-elt' />
            </div>

            <div className='form-div criteria-container'>
                <label>Les critères :</label>

                {criteria.map((cr, i) => (
                    <div key={i} className='criteria-div'>
                        <textarea onChange={(e) => onCriteriaChange(e, i)} value={cr.content} className='criteria' />
                        <button onClick={() => onCriteriaDelete(i)} type='button' className='delete-btn'>supprimer</button>
                    </div>
                ))}

                <button onClick={onAddCriteria} type='button' className='add-criteria-btn'>Ajouter critère</button>
            </div>

            <button className='submit-btn'>Enregistrer</button>
        </form>
    )
}

export default SpeciesForm