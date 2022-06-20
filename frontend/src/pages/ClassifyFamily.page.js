import React, { useState, useEffect } from "react";
import { getPhylum, getFamilies } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import { ActionIcon, Button, ScrollArea } from "@mantine/core";
import { Check } from "tabler-icons-react";

import FamilyDescription from "../components/FamilyDescription";

import "../styles/ClassifyFamilyPage.scss";

const ClassifyFamilyPage = () => {
  const { phylumId } = useParams();

  const [familiesList, setFamiliesList] = useState([]);

  const [selectedPhylum, setSelectedPhylum] = useState({});
  const [selectedFamily, setSelectedFamily] = useState({ id: "", name: "" });
  const [selectedCriteria, setSelectedCriteria] = useState({
    id: "",
    content: "",
  });

  const fetchPylums = async () => {
    const response = await getPhylum(phylumId);

    if (response && response.ok) {
      setSelectedPhylum({
        name: response.data.name,
        description: response.data.description,
      });
    }
  };

  const fetchFamily = async () => {
    const response = await getFamilies();

    if (response && response.ok && response.data)
      setFamiliesList([...familiesList, ...response.data]);
  };

  useEffect(() => {
    fetchPylums();
  }, [phylumId]);

  useEffect(() => {
    fetchFamily();
  }, []);

  return (
    <div className="classify-family-page">
      <h2>Sélectionner Une Famille</h2>
      <h3>
        Embranchement:{" "}
        <span>{selectedPhylum.name || "n'est pas encore sélectionné"}</span>
      </h3>
      <h3>
        Famille:{" "}
        <span>{selectedFamily.name || "n'est pas encore sélectionné"}</span>
      </h3>
      <h3 className="family-selected">
        Famille:{" "}
        <span>{selectedFamily.name || "n'est pas encore sélectionné"}</span>
      </h3>

      <div className="families-container">
        {familiesList.map((family, index) => {
          return (
            <div key={index} className="family-container">
              <div className="family-name">
                <h2
                  className={
                    selectedFamily.name == family.name ? "activeName" : "name"
                  }
                >
                  {family.name}
                </h2>
                <Button
                  size="xs"
                  onClick={() =>
                    setSelectedFamily({ id: family.id, name: family.name })
                  }
                >
                  <Check />
                </Button>
              </div>
              <FamilyDescription  familyId={family.id}/>
              <div className="criteria-container">
                {family.criteria.map((criteria, index) => {
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

      {selectedFamily.id ? (
        <Link
          className="suivant-btn"
          to={`/essayer/genus/${selectedFamily.id}`}
        >
          <Button size="lg">Suivant</Button>
        </Link>
      ) : (
        <Button className="suivant-btn" disabled>Suivant</Button>
      )}
    </div>
  );
};

export default ClassifyFamilyPage;
