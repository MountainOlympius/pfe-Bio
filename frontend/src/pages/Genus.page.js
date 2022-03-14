import React, { useEffect, useState } from 'react'
import GenusTable from '../components/GenusTable'

import { getGenuses } from '../utils/api'

const GenusPage = () => {
    const [genusList, setGenusList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(async () => {
        const response = await getGenuses(currentPage)

        if (response && response.ok && response.data)
            setGenusList([...genusList, ...response.data])
    }, [currentPage])

    return (
        <div className='GenusPage'>
            <GenusTable data={genusList} />
            <button className='more-btn' onClick={() => setCurrentPage(currentPage + 1)}>More</button>
        </div>
    )
}

export default GenusPage