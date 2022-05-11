import { useState } from "react";

import { Link } from "react-router-dom";

import "../styles/FamilyRow.scss";
import { formatDate } from "../utils/Generic";
import { ActionIcon, Button, Text, MantineProvider  } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import {useModals} from "@mantine/modals"

const FamilyRow = ({ id, name, criteria, created_date, deleteCallback }) => {

  const RealyWannaDelete = (e) => {
    e.preventDefault()
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a modal. Please click
          one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteCallback
    });

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
