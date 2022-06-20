import React, { useState, useEffect } from 'react';
import { getFamily } from '../utils/api';

import '../styles/FamilyDescription.scss';

const FamilyDescription = (props) => {
    const [description, setDescription] = useState('');

    const fetchFamily = async () => {
        const response = await getFamily(props.familyId);
    
        if (response && response.ok && response.data) setDescription(response.data.description);
      };
    
      useEffect(() => {
        fetchFamily();
      }, []);

  return (
    <div>
        <div>{description}</div>
    </div>
  )
}

export default FamilyDescription