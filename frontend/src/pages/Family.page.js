import React, { useEffect, useState } from 'react'
import FamilyTable from '../components/FamilyTable'
import { getFamilies, searchFamily } from '../utils/api'

const FamilyPage = () => {
	const [familiesList, setFamiliesList] = useState([])
	const [currentPage, setPage] = useState(1)
	const [searchValue, setSearch] = useState('')
	const [searchResult, setSearchResult] = useState({})
	const [isLastPage, setLastPage] = useState(false)
	const [searchDisplayCount, setDisplayCount] = useState(10)

	useEffect(async () => {
		const response = await getFamilies(currentPage)

		if (response && response.ok && response.data)
			setFamiliesList([...familiesList, ...response.data])

		if (!response || !response.ok || response.data.length < 10)
			setLastPage(true)
	}, [currentPage])

	useEffect(async () => {
		if (searchValue.length <= 0 || searchValue in searchResult) return

		const response = await searchFamily(searchValue)

		if (response && response.ok && response.data) {
			const result = {...searchResult}
			result[searchValue] = response.data

			setSearchResult({...result})

			console.log(result)
		}
	}, [searchValue])

	const onChangeSearch = (e) => {
		setDisplayCount(10)
		setSearch(e.target.value)
	}

	return (
		<div className="FamilyPage">
			<div className="search-container">
				<label>chercher une famille : </label>
				<input
					name="search"
					type="text"
					value={searchValue}
					onChange={onChangeSearch}
				/>
			</div>

			<div className="data-container">
				<FamilyTable
					data={
						searchValue.length <= 0
							? familiesList
							: (searchResult[searchValue] || []).slice(
									0,
									searchDisplayCount
							  )
					}
				/>
				{searchValue.length > 0 ? (
					searchDisplayCount < (searchResult[searchValue] || []).length ? (
						<button className="more-btn" onClick={() => setDisplayCount(searchDisplayCount + 10)}>More</button>
					) : null
				) : !isLastPage ? (
					<button className="more-btn" onClick={() => setPage(currentPage + 1)}>More</button>
				) : null}
			</div>
		</div>
	)
}

export default FamilyPage
