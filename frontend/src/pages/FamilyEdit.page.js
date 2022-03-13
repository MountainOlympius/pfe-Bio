import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FamilyForm from '../components/FamilyForm'
import { addFamilyCriteria, deleteFamilyCriteria, getFamily, updateFamily } from '../utils/api'
import { getCriteriaDiff, getObjectDiff } from '../utils/Generic'

const FamilyEditPage = () => {
    const { id } = useParams()
    const [familyData, setFamilyData] = useState(undefined)
    const [originData, setOriginData] = useState({})

    useEffect(async () => {
        const response = await getFamily(id)

        if (response && response.ok && response.data) {
            const dataClone = {}
            dataClone.name = response.data.name
            dataClone.description = response.data.description
            dataClone.phylum_id = response.data.phylum.id
            dataClone.criteria = [...response.data.criteria]

            setFamilyData(dataClone)
            setOriginData({
				...dataClone,
				criteria: [
					...response.data.criteria.map((cr) => {
						return { ...cr }
					}),
				],
			})
        } else {
            setFamilyData(null)
        }
    }, [id])

    const saveFamily = useCallback(async (data) => {
        const dataClone = {...data}
        const originalDataClone = {...originData}
        let finaleOriginalData = {...originData}

        delete dataClone['criteria']
        delete originalDataClone['criteria']

        const updatedData = getObjectDiff(originalDataClone, dataClone)

        if (Object.entries(updatedData).length > 0) {
            const response = await updateFamily(id, updatedData)

            if (response && response.ok) {
                finaleOriginalData = {...finaleOriginalData, updatedData}
            }
        }

        const updatedCriteria = getCriteriaDiff(originData.criteria, data.criteria || [])

        console.log(updatedCriteria[0])
        console.log(updatedCriteria[1])

        await Promise.all(updatedCriteria[0].map(cr => deleteFamilyCriteria(id, cr.id)))
        await Promise.all(updatedCriteria[1].map(cr => addFamilyCriteria(id, cr.content)))

        setOriginData({...finaleOriginalData})

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
            </div>
        )
    }
}

export default FamilyEditPage