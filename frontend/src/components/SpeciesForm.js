import React, { useEffect, useState } from "react";

import { searchGenus } from "../utils/api";
import { cloneObject } from "../utils/Generic";
import FormImagesInput from "./FormImagesInput";
import InputDropdown from "./InputDropdown";
import '../styles/SpeciesForm.scss'


import { Button } from "@mantine/core";

const SpeciesForm = ({ data = {}, onSubmitCallback, shouldReset = false }) => {
  const [genusId, setGenusId] = useState(data?.genus?.id || undefined);
  const [criteria, setCriteria] = useState(data?.criteria || [{}]);
  const [images, setImages] = useState(data?.images || []);

  useEffect(() => {
    if (data?.genus?.id && genusId !== data?.genus?.id)
      setGenusId(data?.genus?.id);
    if (data?.criteria) setCriteria(data.criteria);
    if (data?.images) setImages(data?.images);
  }, [data]);

  const searchForGenus = async (query) => {
    const response = await searchGenus(query);

    if (response && response.ok && response.data) return response.data;
    return [];
  };

  const changeGenusId = (value) => {
    if (!value) setGenusId(data?.genus?.id || undefined);
    else setGenusId(value);
  };

  const onCriteriaChange = (e, i) => {
    const criteriaClone = cloneObject(criteria);
    criteriaClone[i].content = e.target.value;
    setCriteria(criteriaClone);
  };

  const onCriteriaDelete = (i) => {
    const criteriaClone = cloneObject(criteria);
    setCriteria(criteriaClone.filter((cr, index) => index !== i));
  };

  const onAddCriteria = () => {
    if (
      criteria.length > 0 &&
      (!criteria[criteria.length - 1].content ||
        criteria[criteria.length - 1].content === "")
    )
      return;

    const criteriaClone = cloneObject(criteria);
    setCriteria([...criteriaClone, {}]);
  };

  const onUpdateImages = (imgs) => setImages(imgs);

  const saveSpeciesData = (e) => {
    const elements = e.target.elements;

    const data = {
      name: elements.name.value,
      description: elements.description.value,
      genus_id: genusId,
      criteria: criteria.filter((cr) => Boolean(cr.content)),
      images,
    };

    onSubmitCallback(data, () => {
      if (shouldReset) {
        e.target.reset();
        setCriteria([]);
        setImages([]);
        setTimeout(() => setCriteria([{}]), 0);
      }
    });

    e.preventDefault();
  };

  return (
      <div className="species-form-container">
    <form className="SpeciesForm form" onSubmit={saveSpeciesData}>
      <div className="form-div">
          <div className="name">
        <label>Le nom : </label>
        <input name="name" defaultValue={data?.name} className="input-elt" />
        </div>
      

      <div className="genre">
          <label>le nom du genre: </label>
      <InputDropdown
        defaultValue={data?.genus?.name}
        onChangeInput={searchForGenus}
        onChoiceChange={changeGenusId}
        labelText=""
      />
      </div>

      <div className="description">
        <label>Description : </label>
        <textarea
          name="description"
          defaultValue={data?.description}
          className="input-elt"
        />
      </div>

      <div className="criteria criteria-container">
        <label>Les critères :</label>

        {criteria.map((cr, i) => (
          <div key={i} className="criteria-div">
            <textarea
              onChange={(e) => onCriteriaChange(e, i)}
              value={cr.content}
              className="criteria"
            />
            <Button
              color="red"
              onClick={() => onCriteriaDelete(i)}
              type="button"
              className="delete-btn"
            >
              supprimer
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={onAddCriteria}
          type="button"
          className="add-criteria-btn"
        >
          Ajouter critère
        </Button>
      </div>

      <FormImagesInput
        defaultImages={images}
        onUpdateCallback={onUpdateImages}
        max={3}
      />

      <Button type="submit" className="submit-btn">Enregistrer</Button>
      </div>
    </form>
    </div>
  );
};

export default SpeciesForm;
