import React, { useState, useEffect } from 'react';
import { getGenusDetails  } from '../utils/api';

import '../styles/GenusDetails.scss'

const GenusDetails = (props) => {
    const [description, setDescription] = useState('');

    const fetchGenusDetails = async () => {
        const response = await getGenusDetails(props.genusId);
    
        if (response && response.ok && response.data) setDescription(response.data.description);
      };
    
      useEffect(() => {
        fetchGenusDetails();
      }, []);

  return (
    <div>
        <div>{description}</div>
    </div>
  )
}

export default GenusDetails