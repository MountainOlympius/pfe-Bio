import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFamily } from "../utils/api";
import { ActionIcon, Button } from "@mantine/core";
import { Check } from "tabler-icons-react";

import GenusDetails from "../components/GenusDetails";

import "../styles/ClassifyGenusPage.scss";

const ClassifyGenusPage = () => {
  const { familyId } = useParams();
  const [family, setFamily] = useState({});
  const [selectedPhylum, setselectedPhylum] = useState({});
  const [selectedGenus, setSelectedGenus] = useState({});
  const [selectedCriteria, setSelectedCriteria] = useState({});
  //const [selectedFamily, setSelectedFamily] = useState({ id: "", name: "" });

  const fetchFamily = async () => {
    const response = await getFamily(familyId);

    if (response && response.ok && response.data) setFamily(response.data);
    setselectedPhylum(response.data.phylum);
  };

  useEffect(() => {
    fetchFamily();
  }, []);

  return (
    <div className="classify-genus-page">
      <h2>Sélectionner Un genre</h2>
      <h3>
        Embranchement:{" "}
        <span>{selectedPhylum.name || "n'est pas encore sélectionné"}</span>
      </h3>
      <h3>
        Famille: <span>{family.name || "n'est pas encore sélectionné"}</span>
      </h3>
      <h3>
        Gengre:{" "}
        <span>{selectedGenus.name || "n'est pas encore sélectionné"}</span>
      </h3>
      <h3 className="genus-selected">
        Gengre:{" "}
        <span>{selectedGenus.name || "n'est pas encore sélectionné"}</span>
      </h3>

      <div className="genuses-container">
        {family?.genuses?.map((genus, index) => {
          return (
            <div key={index} className="genus-container">
              <div className="genus-name">
                <h2
                  className={
                    genus.name == selectedGenus.name ? "activeName" : "name"
                  }
                >
                  {genus.name}
                </h2>
                <Button
                  size="xs"
                  onClick={() =>
                    setSelectedGenus({ id: genus.id, name: genus.name })
                  }
                >
                  <Check />
                </Button>
              </div>
              <GenusDetails genusId={genus.id}/>
              <div className="criteria-container">
                {genus.criteria.map((criteria, index) => {
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
      {selectedGenus.id ? (<Link className="suivant-btn" to={`/essayer/species/${selectedGenus.id}/${familyId}/${selectedPhylum.id}`}>
      <Button size="lg">Suivant</Button>
      </Link>) : (<Button className="suivant-btn" disabled>Suivant</Button>)
      }
      
    </div>
  );
};

export default ClassifyGenusPage;
