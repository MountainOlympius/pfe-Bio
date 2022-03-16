import React, { useCallback, useEffect, useState } from 'react'
import PhylumsTable from '../components/PhylumsTable'
import { deletePhylum, getPhylums } from '../utils/api'

import '../styles/PhylumsPage.scss'

const PhylumsPage = () => {
    const [phylumsList, setPhylumsList] = useState([])

    useEffect(async () => {
        const response = await getPhylums()

        if (response && response.ok && response.data) {
            setPhylumsList(response.data)
        }
    }, [])

    const deletePhylumCallback = useCallback((id) => {
        deletePhylum(id).then(response => {
            if (response && response.ok) 
                setPhylumsList(phylumsList.filter(phylum => phylum.id !== id))
        })
    }, [phylumsList])

    return (
        <div className='PhylumsPage'>
            <div className="data-container">
            <PhylumsTable data={phylumsList} deleteCallback={deletePhylumCallback} />
            </div>
        </div>
    )    
}

export default PhylumsPage