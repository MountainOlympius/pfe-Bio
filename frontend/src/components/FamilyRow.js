import { useState } from "react";

import { Link } from "react-router-dom";

import "../styles/FamilyRow.scss";
import { formatDate } from "../utils/Generic";
import { ActionIcon, Button  } from "@mantine/core";


const FamilyRow = ({ id, name, criteria, created_date, deleteCallback }) => {

  const RealyWannaDelete = (e) => {
    e.preventDefault()
    

  }

  return (
    <tr className="FamilyRow">
      <td>{id}</td>
      <td>{name}</td>
      <td>{criteria.length}</td>
      <td>{formatDate(new Date(created_date))}</td>

      <td className="edilete">
        <div className="edit">
          <ActionIcon
            title="modifier"
            color="blue"
            variant="light"
            component={Link}
            to={`/admin/family/${id}/edit`}
          >
            Modifier
          </ActionIcon>
        </div>
        <div>
          <Button
            variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
            className="/delete-btn"
            onClick={RealyWannaDelete}
          >
            supprimer
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default FamilyRow;
