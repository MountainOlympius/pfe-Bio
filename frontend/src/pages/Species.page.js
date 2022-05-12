import React, { useEffect, useState } from "react";

import { deleteSpecies, getSpecies, searchSpecies } from "../utils/api";
import SpeciesTable from "../components/SpeciesTable";
import { cloneObject } from "../utils/Generic";

import { ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import { NewSection } from "tabler-icons-react";

import "../styles/SpeciePage.scss";

const SpeciesPage = () => {
  const [speciesList, setSpecies] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [isLastPage, setLastPage] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [displayCount, setDisplayCount] = useState(10);

  const fetchSpecies = async () => {
    if (isLastPage) return;

    const response = await getSpecies(currentPage);

    if (!response || !response.ok || !response.data) return setLastPage(true);

    if (response.data.length < 10) setLastPage(true);
    setSpecies([...speciesList, ...response.data]);
  }

  const updateSearch = async () => {
    const query = searchValue;

    setDisplayCount(10);

    if (query.length <= 0) return;

    if (query in searchResult && searchResult[query].length > 0) return;

    const response = await searchSpecies(query);

    if (response && response.ok && response.data) {
      const results = cloneObject(searchResult);
      results[query] = response.data;
      setSearchResult(results);
      console.log(results);
    }
  }

  useEffect(() => {
    fetchSpecies()
  }, [currentPage]);

  useEffect(() => {
    updateSearch()
  }, [searchValue]);

  const onDeleteCallback = async (id) => {
    const response = await deleteSpecies(id);

    if (!response || !response.ok) return;

    setSpecies(speciesList.filter((sp) => sp.id !== id));

    setSearchResult(
      Object.fromEntries(
        Object.entries(cloneObject(searchResult)).map((result) => {
          return [
            result[0],
            cloneObject(result[1]).filter((family) => family.id != id),
          ];
        })
      )
    );
  };

  return (
    <div className="SpeciesPage">
      <div className="search-div">
        <label>Chercher une espèce : </label>
        <div className="input-new">
        <input
          className="input-elt"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ActionIcon
          title="modifier"
          color="blue"
          variant="light"
          component={Link}
          to={`/admin/species/new`}
          size="xl"
        >
          <NewSection size={16} />
        </ActionIcon>
            </div>
      </div>

      <SpeciesTable
        onDeleteCallback={onDeleteCallback}
        data={
          searchValue.length <= 0
            ? speciesList
            : (searchResult[searchValue] || []).slice(0, displayCount)
        }
      />

      {searchValue.length <= 0 ? (
        !isLastPage ? (
          <button className="more-btn" onClick={() => setPage(currentPage + 1)}>
            Plus
          </button>
        ) : null
      ) : displayCount < (searchResult[searchValue] || []).length ? (
        <button
          className="more-btn"
          onClick={() => setDisplayCount(displayCount + 10)}
        >
          Plus
        </button>
      ) : null}
    </div>
  );
};

export default SpeciesPage;
