import React from "react";
import { Link } from 'react-router-dom';

import '../styles/TryDemoPage.scss';

function TryDemoPage() {
  return (
    <div className="try-demo-page">
      <div className="steps-container">
        <Link to={'/essayer/phylum'}>
        <button>Embranchement</button>
        </Link>
        <Link to={'/essayer/family'}>
        <button>Famille</button>
        </Link>
        <Link to={'/essayer/genus'}>
        <button>Genre</button>
        </Link>
        <Link to={'/essayer/species'}>
        <button>Espece</button>
        </Link>
      </div>
    </div>
  );
}

export default TryDemoPage;
