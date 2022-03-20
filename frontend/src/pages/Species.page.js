import React, { useEffect, useReducer, useState } from 'react'

import { getSpecies, searchSpecies } from '../utils/api'
import SpeciesTable from '../components/SpeciesTable'
import { cloneObject } from '../utils/Generic'

const SpeciesPage = () => {
    const [speciesList, setSpecies] = useState([])
    const [currentPage, setPage] = useState(1)
    const [isLastPage, setLastPage] = useState(false)
    const [searchResult, setSearchResult] = useState({})
    const [searchValue, setSearchValue] = useState('')
    const [displayCount, setDisplayCount] = useState(10)

    useEffect(async () => {
        if (isLastPage) return

        const response = await getSpecies(currentPage)

        if (!response || !response.ok || !response.data) return setLastPage(true)

        if (response.data.length < 10) setLastPage(true)
        setSpecies([...speciesList, ...response.data])
    }, [currentPage])

    useEffect(async () => {
        const query = searchValue

        setDisplayCount(10)

        if (query.length <= 0) return

		if (query in searchResult && searchResult[query].length > 0) return

        const response = await searchSpecies(query)

        if (response && response.ok && response.data) {
            const results = cloneObject(searchResult)
            results[query] = response.data
            setSearchResult(results)
            console.log(results)
        }

    }, [searchValue])

    return (
		<div className="SpeciesPage">
			<div className="search-div">
				<label>Chercher une espèce : </label>
				<input
					className="input-elt"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>

			<SpeciesTable
				data={searchValue.length <= 0 ? speciesList : (searchResult[searchValue] || []).slice(0,displayCount)}
			/>

			{searchValue.length <= 0 ? 
                (
                    !isLastPage ? <button className='more-btn' onClick={() => setPage(currentPage +1)}>Plus</button> : null
                ) : (
                    displayCount < (searchResult[searchValue] || []).length ? <button className='more-btn' onClick={() => setDisplayCount(displayCount + 10)}>Plus</button> : null
                )
            }
		</div>
	)
}

export default SpeciesPage