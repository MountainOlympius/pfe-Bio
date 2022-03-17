import React, { useEffect, useState } from 'react'

import '../styles/InputDropdown.scss'

const InputDropdown = ({ labelText, fieldName, defaultValue, onChangeInput, onChoiceChange }) => {
    const [searchValue, setSearchValue] = useState(defaultValue || "")
    const [dropdownElts, setDropdownElts] = useState([])

    useEffect(() => {
        if (defaultValue && defaultValue !== searchValue) setSearchValue(defaultValue)
    }, [defaultValue])

    const onChangeCallback = async (e) => {
        setSearchValue(e.target.value)
        onChoiceChange(undefined)

        if (e.target.value === '') return setDropdownElts([])

        const data = await onChangeInput(e.target.value)
        setDropdownElts(data)
    }

    const changeChoiceCallback = (id, name) => {
        setSearchValue(name)
        onChoiceChange(id)
        setDropdownElts([])
    }

    return (
        <div className='form-div InputDropdown'>
            <label>{labelText}</label>
            <input className='input-elt' name={fieldName} type='text' value={searchValue} onChange={onChangeCallback} autoComplete="off" />

            <div className='dropdown'>
                {dropdownElts.map(elt => (<div onClick={() => changeChoiceCallback(elt.id, elt.name)} className='dropdown-elt' key={elt.id}>
                    <p>{elt.name}</p>
                </div>))}
            </div>
        </div>
    )
}

export default InputDropdown
