import React, { useState } from 'react'

import FamilyForm from '../components/FamilyForm'
import { addFamilyCriteria, createFamily } from '../utils/api'
import { translateErrors } from '../utils/Generic'

const NewFamilyPage = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])

    const submitCallback = async (data) => {
        const familyData = {...data}
        delete familyData['criteria']

        setErrors([])

        const response = await createFamily(familyData)

        if (response && response.ok && response.data && response.data.id) {
            await Promise.all(data.criteria.map(cr =>
                addFamilyCriteria(response.data.id, cr.content)
            ))

            setMessages(['La famille a été créé avec succès'])
            setTimeout(() => setMessages([]), 2000)
        } else if (response.errors) {
            setErrors(translateErrors(response.errors))
        }
    }

    return (
        <div className='NewFamilyPage'>
            <FamilyForm submitCallback={submitCallback} />

            <div className='errors-div'>
                {errors.map((error, i) => <p key={i}>{error}</p>)}
            </div>

            <div className='messages-div'>
                {messages.map((msg, i) => <p key={i}>{msg}</p>)}
            </div>
        </div>
    )
}

export default NewFamilyPage