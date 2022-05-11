import React, { useEffect, useState } from 'react'
import { searchFamily } from '../utils/api'
import { cloneObject } from '../utils/Generic'
import InputDropdown from './InputDropdown'
import { Button } from "@mantine/core";


import '../styles/GenusForm.scss'

const GenusForm = ({ data = {} , onSaveCallback, shouldReset = false}) => {
    const [familyId, setFamilyId] = useState(data?.family?.id || undefined)
    const [criteria, setCriteria] = useState(data?.criteria || [{}])

    useEffect(() => {
        if (data?.criteria) setCriteria(data?.criteria || [{}])
        if (data?.family?.id) setFamilyId(data?.family?.id)
    }, [data])

    const saveGenus = (e) => {
        const elements = e.target.elements

        const formData = {
            family_id: familyId,
            name: elements.name.value,
            description: elements.description.value,
            criteria: criteria.filter(cr => Boolean(cr.content))
        }

        onSaveCallback(formData, () => {
            if (shouldReset) {
                e.target.reset()
                setCriteria([])
                setTimeout(() => setCriteria([{}]), 0)
            }
        })

        e.preventDefault()
    }

    const searchFamilyForGenus = async (query) => {
        if (query.length <= 0) return []

        const response = await searchFamily(query)

        if (response && response.ok && response.data) {
            return response.data.slice(0, 5)
        }

        return []
    }

    const onChangeCallback = (fid) => {
        if (!fid) setFamilyId(data?.family?.id || undefined)
        else setFamilyId(fid)
    }

    const onCriteriaChange = (e, i) => {
        const criteriaData = cloneObject(criteria)
        criteriaData[i].content = e.target.value
        setCriteria(criteriaData)
    }

    const addCriteria = () => {
        if (criteria.length > 0 && (!criteria[criteria.length - 1].content || criteria[criteria.length - 1].content === '')) return

        setCriteria([...criteria, {}])
    }

    const deleteCriteria = (i) => {
        const criteriaData = cloneObject(criteria)
        setCriteria(criteriaData.filter((elt, index) => index !== i))
    }

    return (
        <div className="genus-form-container">
        <form className='GenusForm form' onSubmit={saveGenus}>
            <div className="name-fam-desc">
            <div className='form-div'>
                <label>Le nom : </label>
                <input name='name' defaultValue={data.name} type='text' className='input-elt' />
            </div>

            <InputDropdown fieldName='family' labelText='Famille : ' defaultValue={data?.family?.name} onChangeInput={searchFamilyForGenus} onChoiceChange={onChangeCallback} />

            <div className='form-div'>
                <label>Description : </label>
                <textarea name='description' className='input-elt' defaultValue={data.description} />
            </div>
            </div>

            <div className='form-div criteria-container'>
                <label>Les critères :</label>

                {criteria.map((cr, i) => (
                    <div key={i} className='criteria-div'>
                        <textarea onChange={(e) => onCriteriaChange(e, i)} value={cr.content} className='criteria' />
                        <Button color="red" onClick={() => deleteCriteria(i)} className='delete-criteria' type='button'>supprimer</Button>
                    </div>                        
                ))}

                <Button variant="outline"
					 onClick={addCriteria} type='button' className='add-criteria-btn'>Ajouter critère</Button>
            </div>

            <Button type='submit' className='submit-btn'>Enregistrer</Button>
        </form>
        </div>
    )
}

export default GenusForm