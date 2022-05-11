import React from "react";
import { Link } from "react-router-dom";

import { formatDate } from "../utils/Generic";

import "../styles/PhylumRow.scss";
import { Button, ActionIcon } from "@mantine/core";
import { Trash } from "tabler-icons-react";

const PhylumRow = ({ id, name, description, created_date, onDeleteBtn }) => {
  return (
    <tr className="phylum-row">
      <td className="id">{id}</td>
      <td className="name">{name}</td>
      <td className="description">
        {description && description.length > 50
          ? description.slice(0, 50) + "..."
          : description}
      </td>
      <td className="created-date">{formatDate(new Date(created_date))}</td>

      <td className="edilete">
        <div className="edit">
		  <ActionIcon title="modifier" color="blue" variant="light" component={Link} to={`/admin/phylum/edit/${id}`}>
          Modifier
          
          </ActionIcon>
        </div>
        <div className="delete">
          <Button
            variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
            onClick={onDeleteBtn}
            className="/delete-btn"
          >
            supprimer
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default PhylumRow;
