import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FamilyForm from '../components/FamilyForm'
import { addFamilyCriteria, deleteFamilyCriteria, getFamily, updateFamily } from '../utils/api'
import { cloneObject, getCriteriaDiff, getObjectDiff, translateErrors } from '../utils/Generic'

import '../styles/FamilyEditPage.scss'

const FamilyEditPage = () => {
    const { id } = useParams()
    const [familyData, setFamilyData] = useState(undefined)
    const [originData, setOriginData] = useState({})

    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(async () => {
        const response = await getFamily(id)

        if (response && response.ok && response.data) {
            const dataClone = {}
            dataClone.name = response.data.name
            dataClone.description = response.data.description
            dataClone.phylum_id = response.data.phylum.id
            dataClone.criteria = [...response.data.criteria]

            setFamilyData(dataClone)
            setOriginData(cloneObject(dataClone))
        } else {
            setFamilyData(null)
        }
    }, [id])

    const saveFamily = useCallback(async (data) => {
        const dataClone = cloneObject(data)
        const originalDataClone = cloneObject(originData)
        let finaleOriginalData = cloneObject(originData)

        delete dataClone['criteria']
        delete originalDataClone['criteria']

        const updatedData = getObjectDiff(originalDataClone, dataClone)

        console.log(data)
        console.log(originData)

        setErrors([])
        setMessages([])

        if (Object.entries(updatedData).length > 0) {
            const response = await updateFamily(id, updatedData)

            if (response && response.ok) {
                finaleOriginalData = Object.assign(finaleOriginalData, updatedData)
                setMessages(['La famille a été enregistrée avec succès'])
            } else if (response.errors) {
                setErrors(translateErrors(response.errors))
            }
        }

        const updatedCriteria = getCriteriaDiff(originData.criteria, data.criteria || [])

        await Promise.all(updatedCriteria[0].map(cr => deleteFamilyCriteria(id, cr.id)))
        await Promise.all(updatedCriteria[1].map(cr => addFamilyCriteria(id, cr.content)))

        if (updatedCriteria[0].length > 0 || updatedCriteria[1].length > 0) {
            setMessages([...messages, 'Les critères ont été enregistrés avec succès'])
        }

        setTimeout(() => setMessages([]), 2000)

        if (Object.entries(updatedData).length > 0 || updatedCriteria[0].length > 0 || updatedCriteria[1].length > 0) {
            setOriginData(cloneObject(finaleOriginalData))
        }
    }, [id, originData])

    if (familyData === undefined) {
        return (<></>)
    } else if (familyData === null) {
        // TODO : Must display not found
        return <p>Family Not found</p>
    } else {
        return (
            <div className='FamilyEditPage'>
                <FamilyForm data={familyData} submitCallback={saveFamily} />

                <div className='errors-div'>
                    {errors.map((error, i) => <p key={i}>{error}</p>)}
                </div>

                <div className='messages-div'>
                    {messages.map((msg, i) => <p key={i}>{msg}</p>)}
                </div>
            </div>
        )
    }
}

export default FamilyEditPage