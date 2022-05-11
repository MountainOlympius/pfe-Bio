import React from "react";
import { Link } from "react-router-dom";

import { formatDate } from "../utils/Generic";
import { Button, ActionIcon } from "@mantine/core";

import "../styles/SpeciesRow.scss";

const SpeciesRow = ({
  id,
  name,
  description,
  created_date,
  criteria,
  onDeleteCallback,
}) => {
  return (
    <tr className="SpeciesRow">
      <td className="id">{id}</td>
      <td className="name">{name}</td>
      <td className="description">
        {description && description.length > 20
          ? description.slice(0, 15)
          : description}
      </td>
      <td className="criteria">{criteria?.length || 0}</td>
      <td className="created_date">{formatDate(new Date(created_date))}</td>

      <td className="edilete">
        <div className="edit">
          <ActionIcon
            title="modifier"
            color="blue"
            variant="light"
            component={Link}
            to={`/admin/species/${id}/edit`}
          >
            Modifier
          </ActionIcon>
        </div>
        <div className="delete">
          <Button variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} onClick={() => onDeleteCallback(id)} className="/delete-btn">
            Supprimer
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default SpeciesRow;
