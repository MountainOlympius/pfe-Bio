import React, { useState, useEffect } from 'react'

import FamilyForm from '../components/FamilyForm'
import { addFamilyCriteria, createFamily } from '../utils/api'
import { translateErrors } from '../utils/Generic'
import toast, { Toaster } from 'react-hot-toast'

import '../styles/NewFamilyPage.scss'

const NewFamilyPage = () => {
    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])

    const notifyerr = (toastmsg) => toast.error(`${toastmsg}`)
    
    const notifymsg = (toastmsg) => toast.success(`${toastmsg}`)

    useEffect(() => {
        errors.forEach(err => {
            notifyerr(err);
        });
        messages.forEach(msg => {
            notifymsg(msg)
        });
    }, [errors, messages])

    const submitCallback = async (data, onSuccessCallback) => {
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
            onSuccessCallback()
        } else if (response.errors) {
            setErrors(translateErrors(response.errors))
        }
    }

    return (
        <div className='NewFamilyPage'>
            <h3>Ajouter une nouvelle Famille</h3>
            <FamilyForm submitCallback={submitCallback} shouldReset />

            <div className='errors-div'>
                {errors.map((error, i) => <p key={i}>{error}</p>)}
            </div>

            <div className='messages-div'>
                {messages.map((msg, i) => <p key={i}>{msg}</p>)}
            </div>
            <div><Toaster/></div>
        </div>
    )
}

export default NewFamilyPage