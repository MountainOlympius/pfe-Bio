import React, { useState, useEffect } from "react";
import { getPhylum, getFamilies } from "../utils/api";
import { useParams } from "react-router-dom";
import { Button, ScrollArea } from "@mantine/core";
import { Check } from "tabler-icons-react";

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

      <div className="families-container">
        {familiesList.map((family) => {
          return (
            <div className="family-container">
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
              <div className="criteria-container">
                {family.criteria.map((criteria) => {
                  return (
                    <div className="criteria">
                      <Button
                        fullWidth
                        color={
                          selectedCriteria.id == criteria.id ? "red" : "green"
                        }
                        variant="outline"
                        onClick={() =>
                          setSelectedCriteria({
                            id: criteria.id,
                            content: criteria.content,
                          })
                        }
                      >
                        {criteria.content}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassifyFamilyPage;
