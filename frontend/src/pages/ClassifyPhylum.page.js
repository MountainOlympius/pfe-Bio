import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getPhylums } from "../utils/api";
import { ScrollArea, Button } from "@mantine/core";
import { Check } from 'tabler-icons-react'

import "../styles/ClassifyPhylumPage.scss";

const ClassifyPhylumPage = () => {
    const [phylumsList, setPhylumsList] = useState([]);
    const [selectedPhylum, setSelectedPhylum] = useState({id: '', name: ''});

  const fetchPylums = async () => {
    const response = await getPhylums();

    if (response && response.ok && response.data) {
      setPhylumsList(response.data);
    }
  }

  useEffect(() => {
    fetchPylums()
  }, []);

  return (
    <div className="classify-phylum-page">
      <h2>Sélectionner Un Embranchement</h2>
      <h3>Embranchement: <span>{selectedPhylum.name || "n'est pas encore sélectionné"}</span></h3>
      <div className="phylums-container">
        {
            phylumsList.map((phylum, index) => {
                return (
                    <div key={index} className="phylum-container">
                    <h2 className="title">{phylum.name}</h2>
                    <div className="scroll-and-button">
                        <ScrollArea style={{ height: 100, minWidth: 100 }}>
                            <div className="scroll">
                            {phylum.description}
                            </div>
                        </ScrollArea>
                        <Button onClick={() => setSelectedPhylum({id: phylum.id, name: phylum.name})} variant="outline"><Check/></Button>
                    </div>
                    </div>
                )
            })
        }
        <div className="next-btn">
        {selectedPhylum.id ? (<Link to={`/essayer/family/${selectedPhylum.id}`}>
        <Button className="suivant-btn">Suivant</Button>
        </Link>) : (<Button className="suivant-btn" disabled>Suivant</Button>)

        }
        </div>
      </div>
    </div>
  );
};

export default ClassifyPhylumPage;
