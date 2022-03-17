import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import GenusForm from '../components/GenusForm'
import { getGenusDetails } from '../utils/api'
import { cloneObject } from '../utils/Generic'

const GenusEditPage = () => {
    const [originData,setOriginData] = useState({})
    const { id } = useParams()

    useState(async () => {
        if (id === originData.id) return
        
        const response = await getGenusDetails(id)
        
        if (response && response.ok && response.data) {
            setOriginData(cloneObject(response.data))
        }
    }, [id])


    return (
        <div className='GenusEditPage'>
            <GenusForm data={cloneObject(originData)} />
        </div>
    )
}

export default GenusEditPage