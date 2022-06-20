import React from "react";
import { Link } from 'react-router-dom';

import '../styles/TryDemoPage.scss';

function TryDemoPage() {
  return (
    <div className="try-demo-page">
      <div className="steps-container">
        <Link to={'/essayer/phylum'}>
        <button>Commencer</button>
        </Link>
      </div>
    </div>
  );
}

export default TryDemoPage;
