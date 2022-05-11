import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpeciesForm from '../components/SpeciesForm'
import { addSpeciesCriteria, deleteSpeciesCriteria, deleteSpeciesImages, getSpeciesDetails, updateSpecies, uploadSpeciesImages } from '../utils/api'
import { cloneObject, getCriteriaDiff, getImagesDiff, getObjectDiff } from '../utils/Generic'


import '../styles/SpeciesEditPage.scss'

const SpeciesEditPage = () => {
    const { id } = useParams()
    const [originalData, setOriginalData] = useState(undefined)
    const [speciesData, setSpeciesData] = useState(undefined)
    const [messages, setMessages]  = useState([])
    const [errors, setErrors]  = useState([])

    useEffect(async () => {
        const response = await getSpeciesDetails(id)

        if (!response || !response.ok || !response.data) return setOriginalData(null)

        const dataClone = cloneObject(response.data)
        dataClone.genus_id = dataClone?.genus?.id
        delete dataClone['id']
        delete dataClone['created_date']
        delete dataClone['genus']

        setOriginalData(dataClone)
        setSpeciesData(cloneObject(response.data))
    }, [id])

    const saveSpecies = async (data) => {
        const dataClone = cloneObject(data)
        let imagesClone = [...data.images]
        let originImages = cloneObject(originalData.images)
        let originalClone = cloneObject(originalData)
        let finalData = cloneObject(speciesData)
        let finalCriteria = cloneObject(originalData.criteria)
        const criteriaClone = cloneObject(data.criteria)
        const localErrors = []
        const localMessages = []

        delete dataClone['criteria']
        delete dataClone['images']
        delete originalClone['criteria']
        delete originalClone['images']

        if (!('name' in data) || data.name === '') localErrors.push('Le champ du nom est obligatoire')
        if (!data.genus_id) localErrors.push('Le champ du genre est obligatoire')

        if (localErrors.length > 0) return setErrors(localErrors)

        const updatedData = getObjectDiff(originalClone, dataClone)

        const response = Object.keys(updatedData).length > 0 ? await updateSpecies(id, dataClone) : null
        
        if (response && response.ok) {
            Object.assign(originalClone, updatedData)
            Object.assign(finalData, updatedData)
            localMessages.push('l\'espèce a été enregistrée avec succès')
        }

        const [deleted, added] = getCriteriaDiff(originalData.criteria || [], criteriaClone)

        if (deleted.length > 0) {
            const toDelete = deleted.map(cr => cr.id)
            await deleteSpeciesCriteria(id, toDelete)
            finalCriteria = finalCriteria.filter(cr => !toDelete.includes(cr.id))
        }

        if (added.length > 0) {
            const toAdd = added.map(cr => cr.content)
            const addResponse = await addSpeciesCriteria(id, toAdd)
            if (addResponse && addResponse.ok && addResponse.data) finalCriteria.push(...addResponse.data)
        }
        
        const [deletedImages, addedImages] = getImagesDiff(originImages, imagesClone)

        if (deletedImages.length > 0) {
            const deleted = await deleteSpeciesImages(id, deletedImages)
            
            if (deleted && deleted.ok) {
                originImages = [...originImages].filter(img => !deletedImages.includes(img.id))
            }
        }

        if (addedImages.length > 0) {
            const added = await uploadSpeciesImages(id, addedImages)

            if (added && added.ok && added.data) originImages.push(...added.data)
        }

        originalClone.criteria = cloneObject(finalCriteria)
        finalData.criteria = cloneObject(finalCriteria)
        finalData.images = cloneObject(originImages)
        originalClone.images = cloneObject(originImages)

        setOriginalData(originalClone)
        setSpeciesData(finalData)
        setMessages(localMessages)
        setTimeout(() => setMessages([]), 2000)
    }

    if (speciesData === undefined) {
        return (<></>)
    } else if (!speciesData) {
        // TODO : Must display 404 page
        return (<div>NOT FOUND 404</div>)
    }

    return (
        <div className='SpeciesEditPage'>
            <h3 className='h3'>Modifier l'espèce</h3>

            <SpeciesForm onSubmitCallback={saveSpecies} data={speciesData} />

            <div className='errors-div'>
                {errors.map((error, i) => <p key={i}>{error}</p>)}
            </div>

            <div className='messages-div'>
                {messages.map((msg, i) => <p key={i}>{msg}</p>)}
            </div>
        </div>
    )
}

export default SpeciesEditPage