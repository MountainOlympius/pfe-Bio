import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import GenusForm from '../components/GenusForm'
import { addGenusCriteria, deleteGenusCriteria, getGenusDetails, updateGenus } from '../utils/api'
import { cloneObject, getCriteriaDiff, getObjectDiff } from '../utils/Generic'

const GenusEditPage = () => {
    const [originData,setOriginData] = useState({})
    const [genusData, setGenusData] = useState({})
    const [messages, setMessages] = useState([])
    const [errors, setErrors] = useState([])
    const { id } = useParams()

    useState(async () => {
        if (id === originData.id) return
        
        const response = await getGenusDetails(id)
        
        if (response && response.ok && response.data) {
            const data = response.data
            delete data['id']
            delete data['created_date']
            delete data['species']
            const origin = cloneObject(response.data)
            const genus = cloneObject(response.data)

            origin.family_id = origin.family?.id
            delete origin.family

            setOriginData(origin)
            setGenusData(genus)
        }
    }, [id])

    const saveGenus = async (data) => {
        const dataClone = cloneObject(data)
        const criteriaClone = cloneObject(data.criteria)
        const originalDataClone = cloneObject(originData)
        let finalData = cloneObject(originData)

        delete dataClone['criteria']
        delete originalDataClone['criteria']

        const updatedData = getObjectDiff(originalDataClone, dataClone)

        const response = Object.keys(updatedData).length > 0 ? await updateGenus(id, updatedData) : null

        if (response && response.ok) {
            finalData = {...finalData, ...updatedData}
            setMessages(['Le genre a été enregistrée avec succès'])
        }

        const [deletedCriteria, addedCriteria] = getCriteriaDiff(originData.criteria, criteriaClone)

        await Promise.all(deletedCriteria.map(cr => deleteGenusCriteria(id, cr.id)))
        await Promise.all(addedCriteria.map(cr => addGenusCriteria(id, cr.content)))

        if (deletedCriteria.length > 0 || addedCriteria.length > 0) {
            finalData.criteria = cloneObject(criteriaClone)
            setMessages([...messages, 'Les critères ont été enregistrés avec succès'])
        }

        setTimeout(() => setMessages([]), 2000)

        if (Object.entries(updatedData).length > 0 || deletedCriteria.length > 0 || addedCriteria.length > 0) {
            setOriginData(cloneObject(finalData))
        }
    }


    return (
        <div className='GenusEditPage'>
            <GenusForm data={genusData} onSaveCallback={saveGenus} />

            <div className='errors-div'>
                    {errors.map((error, i) => <p key={i}>{error}</p>)}
                </div>

            <div className='messages-div'>
                {messages.map((msg, i) => <p key={i}>{msg}</p>)}
            </div>
        </div>
    )
}

export default GenusEditPage