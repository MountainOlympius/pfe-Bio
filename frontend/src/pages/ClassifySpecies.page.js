import React, { useState, useEffect } from "react";
import { getFamily, getGenusDetails, getSpecies } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import { ActionIcon, Button } from "@mantine/core";
import { Check } from 'tabler-icons-react';

import "../styles/ClassifySpeciesPage.scss";

const ClassifySpeciesPage = () => {
  const { genusId, familyId, phylumId } = useParams();
  const [selectedPhylum, setSelectedPhylum] = useState({});
  const [selectedFamily, setSelectedFamily] = useState({});
  const [selectedGenus, setSelectedGenus] = useState({});
  const [specie, setSpecie] = useState([]);
  const [selectedSpecie, setSelectedSpecie] = useState({});
  const [selectedCriteria, setSelectedCriteria] = useState({});


  const fetchFamily = async () => {
    const response = await getFamily(familyId);

    if (response && response.ok && response.data) setSelectedFamily(response.data);
    setSelectedPhylum(response.data.phylum);
  };

  const fetchGenus = async () => {
    const response = await getGenusDetails(genusId); 

    if (response && response.ok && response.data) setSelectedGenus(response.data);
  }

  const fetchSpecie = async () => {
    const response = await getSpecies()

    if (response && response.ok && response.data) setSpecie(response.data);
  }

  useEffect(() => {
    fetchFamily();
  }, []);

  useEffect(() => {
    fetchGenus();
  }, []);
  
  useEffect(() => {
    fetchSpecie();
  }, []);

  return (
    <div className="classify-species-page">
      <h2>Sélectionner Une espèce</h2>
      <h3>
        Embranchement:{" "}
        <span>{selectedPhylum.name || "n'est pas encore sélectionné"}</span>
      </h3>
      <h3>
        Famille:{" "}
        <span>{selectedFamily.name || "n'est pas encore sélectionné"}</span>
      </h3>
      <h3>
        Gengre:{" "}
        <span>{selectedGenus.name || "n'est pas encore sélectionné"}</span>
      </h3>
      <h3>
        espèce:{" "}
        <span>{selectedSpecie.name || "n'est pas encore sélectionné"}</span>
      </h3>
      <h3 className="specie-selected">
        espèce:{" "}
        <span>{selectedSpecie.name || "n'est pas encore sélectionné"}</span>
      </h3>


      <div className="species-container">
        {specie?.map((specie, index) => {
          return (
            <div key={index} className="specie-container">
              <div className="specie-name">
                <h2
                  className={
                    specie?.name == selectedSpecie.name ? "activeName" : "name"
                  }
                >
                  {specie?.name}
                </h2>
                <Button
                  size="xs"
                  onClick={() =>
                    setSelectedSpecie({ id: specie.id, name: specie.name })
                  }
                >
                  <Check />
                </Button>
              </div>
              <div>{specie.description}</div>
              <div className="criteria-container">
                {specie.criteria.map((criteria, index) => {
                  return (
                    <div key={index} className="criteria">
                      <ActionIcon
                        className={
                          selectedCriteria.id == criteria.id ? "activeCriteriaContent" : "criteriaContent"
                        }
                        component={Button}
                        onClick={() =>
                          setSelectedCriteria({
                            id: criteria.id,
                            content: criteria.content,
                          })
                        }
                      >
                        <div className="criteria-content">
                        {criteria.content}
                        </div>
                      </ActionIcon>
                    </div>
                  );
                })}
              </div>
              
            </div>
          );
        })}
      </div>

      <Link className="suivant-btn" to={`/essayer`}>
      <Button size="lg">Ressayer</Button>
      </Link>
    </div>
  );
};

export default ClassifySpeciesPage;
