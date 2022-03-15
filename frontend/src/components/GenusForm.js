import React, { useState } from 'react'
import { searchFamily } from '../utils/api'
import InputDropdown from './InputDropdown'

const GenusForm = ({ data = {} , onSaveCallback}) => {
    const [familyId, setFamilyId] = useState(data.family_id || undefined)

    const saveGenus = (e) => {
        const elements = e.target.elements

        const formData = {
            family_id: familyId,
            name: elements.name.value,
            description: elements.description.value,
        }

        onSaveCallback(formData, () => e.target.reset())

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
        if (!fid) setFamilyId(data.family_id || undefined)
        else setFamilyId(fid)
    }

    return (
        <form className='GenusForm form' onSubmit={saveGenus}>
            <div className='form-div'>
                <label>Le nom : </label>
                <input name='name' defaultValue={data.name} type='text' className='input-elt' />
            </div>

            <InputDropdown fieldName='family' labelText='Famille : ' onChangeInput={searchFamilyForGenus} onChoiceChange={onChangeCallback} />

            <div className='form-div'>
                <label>Description : </label>
                <textarea name='description' className='input-elt' defaultValue={data.description} />
            </div>

            <button type='submit' className='submit-btn'>Enregistrer</button>
        </form>
    )
}

export default GenusForm