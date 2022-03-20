import React, { useEffect, useState } from 'react'

import { searchGenus } from '../utils/api'
import InputDropdown from './InputDropdown'

// TODO : Add criterias
// TODO : Add images

const SpeciesForm = ({ data = {} , onSubmitCallback, shouldReset = false }) => {
    const [genusId, setGenusId] = useState(data?.genus?.id || undefined)

    useEffect(() => {
        if (data?.genus?.id && genusId !== data?.genus?.id) setGenusId(data?.genus?.id)
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

    const saveGenusData = (e) => {
        const elements = e.target.elements

        const data = {
            name: elements.name.value,
            description: elements.description.value,
            genus_id: genusId
        }

        onSubmitCallback(data, () => {
            if (shouldReset) e.target.reset()
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

            <button className='submit-btn'>Enregistrer</button>
        </form>
    )
}

export default SpeciesForm