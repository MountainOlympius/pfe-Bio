import React, { useCallback, useEffect, useState } from 'react'
import GenusTable from '../components/GenusTable'

import { getGenuses, searchGenus } from '../utils/api'
import { cloneObject } from '../utils/Generic'

import '../styles/Genus.page.scss'

const GenusPage = () => {
    const [genusList, setGenusList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchResult, setSearchResults] = useState({})
    const [searchValue, setSearchValue] = useState('')
    const [isLastPage, setPage] = useState(false)
    const [searchDisplayCount, setDisplayCount] = useState(2)

    useEffect(async () => {
        const response = await getGenuses(currentPage)

        if (response && response.ok && response.data) {
            setGenusList([...genusList, ...response.data])
            if (response.data.length < 10) setPage(true)
        }
    }, [currentPage])

    useEffect(async () => {
		if (searchValue.length <= 0) return

		if (searchValue in searchResult && searchResult[searchValue].length > 0) return

        const response = await searchGenus(searchValue)

        if (response && response.ok && response.data) {
            const result = cloneObject(searchResult)
            result[searchValue] = response.data
            setSearchResults(result)
        }
    }, [searchValue])

    const onSearchChangeCallback = (e) => {
        setSearchValue(e.target.value)
        setDisplayCount(2)
    }

    return (
        <div className='GenusPage'>
            <div className='search-div'>
                <label>Chercher un genre : </label>
                <input type='text' name='search' onChange={onSearchChangeCallback} />
            </div>

            <GenusTable data={searchValue && searchValue.length > 0 ? (searchResult[searchValue] || []).slice(0, searchDisplayCount) : genusList} />
            <div className='more-container'>
            {searchValue.length > 0 ? (
					searchDisplayCount <
					(searchResult[searchValue] || []).length ? (
						<button
							className="more-btn"
							onClick={() =>
								setDisplayCount(searchDisplayCount + 2)
							}
						>
							More
						</button>
					) : null
				) : !isLastPage ? (
					<button
						className="more-btn"
						onClick={() => setPage(currentPage + 1)}
					>
						More
					</button>
				) : null}
                </div>
        </div>
    )
}

export default GenusPage