import React, { useCallback, useEffect, useState } from "react";
import GenusTable from "../components/GenusTable";

import { deleteGenus, getGenuses, searchGenus } from "../utils/api";
import { cloneObject } from "../utils/Generic";

import { ActionIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import { NewSection } from "tabler-icons-react";

import "../styles/Genus.page.scss";

const GenusPage = () => {
  const [genusList, setGenusList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResults] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isLastPage, setPage] = useState(false);
  const [searchDisplayCount, setDisplayCount] = useState(10);

  const fetchGenuses = async () => {
    const response = await getGenuses(currentPage);

    if (response && response.ok && response.data) {
      setGenusList([...genusList, ...response.data]);
      if (response.data.length < 10) setPage(true);
    }
  }

  const fetchSearch = async () => {
    if (searchValue.length <= 0) return;

    if (searchValue in searchResult && searchResult[searchValue].length > 0)
      return;

    const response = await searchGenus(searchValue);

    if (response && response.ok && response.data) {
      const result = cloneObject(searchResult);
      result[searchValue] = response.data;
      setSearchResults(result);
    }
  }

  useEffect(() => {
    fetchGenuses()
  }, [currentPage]);

  useEffect(() => {
    fetchSearch()
  }, [searchValue]);

  const onSearchChangeCallback = (e) => {
    setSearchValue(e.target.value);
    setDisplayCount(2);
  };

  const deleteGenusCallback = async (id) => {
    const response = await deleteGenus(id);

    if (response && response.ok) {
      setGenusList(genusList.filter((genus) => genus.id !== id));
    }

    setSearchResults(
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
    <div className="GenusPage">
      <div className="search-div">
        <label>Chercher un genre : </label>
        <div className="input-new">
          <input type="text" name="search" onChange={onSearchChangeCallback} />

          <ActionIcon
            title="modifier"
            color="blue"
            variant="light"
            component={Link}
            to={`/admin/genus/new`}
            size="xl"
          >
            <NewSection size={16} />
          </ActionIcon>
        </div>
      </div>

      <GenusTable
        onDeleteCallback={deleteGenusCallback}
        data={
          searchValue && searchValue.length > 0
            ? (searchResult[searchValue] || []).slice(0, searchDisplayCount)
            : genusList
        }
      />
      <div className="more-container">
        {searchValue.length > 0 ? (
          searchDisplayCount < (searchResult[searchValue] || []).length ? (
            <button
              className="more-btn"
              onClick={() => setDisplayCount(searchDisplayCount + 10)}
            >
              More
            </button>
          ) : null
        ) : !isLastPage ? (
          <button
            className="more-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            More
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default GenusPage;
