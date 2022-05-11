import React from "react";
import { Link } from "react-router-dom";

import "../styles/GenusRow.scss";
import { formatDate } from "../utils/Generic";
import { Button, ActionIcon, CloseButton, Group } from "@mantine/core";
import { Trash, Settings } from "tabler-icons-react";

const GenusRow = ({
  id,
  name,
  description,
  criteria,
  created_date,
  deleteCallback,
}) => {
  return (
    <tr className="GenusRow">
      <td>{id}</td>
      <td>{name}</td>
      <td>
        {description && description.length > 20
          ? description.slice(0, 50) + "..."
          : description}
      </td>
      <td>{(criteria || []).length}</td>
      <td>{formatDate(new Date(created_date))} </td>

      <td className="edilete">
        <div className="edit">
          <ActionIcon title="modifier" color="blue" variant="light" component={Link} to={`/admin/genus/${id}/edit`}>
          Modifier
          
          </ActionIcon>
          {/* 
          <Link className="edit-btn" to={`/admin/genus/${id}/edit`}>
            modifier
          </Link>
        */}
        </div>
        <div>
        
          <Button
            variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
            className="/delete-btn"
            onClick={() => deleteCallback(id)}
          >
            supprimer
          </Button>
        {/*
          <Group position="center">
      <CloseButton onClick={() => deleteCallback(id)} color="red" title="delete" size="l" iconSize={20} />
    </Group>
    */}
        </div>
      </td>
    </tr>
  );
};

export default GenusRow;
