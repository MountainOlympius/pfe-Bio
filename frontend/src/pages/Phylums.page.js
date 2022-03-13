import React, { useEffect, useState } from 'react'
import PhylumsTable from '../components/PhylumsTable'
import { getPhylums } from '../utils/api'

const PhylumsPage = () => {
    const [phylumsList, setPhylumsList] = useState([])

    useEffect(async () => {
        const response = await getPhylums()

        if (response && response.ok && response.data) {
            setPhylumsList(response.data)
        }
    }, [])

    console.log(phylumsList)

    return (
        <div className='PhylumsPage'>
            <PhylumsTable data={phylumsList} />
        </div>
    )    
}

export default PhylumsPage